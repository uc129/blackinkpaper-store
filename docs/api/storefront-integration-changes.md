# Storefront Integration — changes since Ria's catalogue seeding

Covers `460913e..a894983` (the catalogue/seeding commit through phone-first login).
Verified against a live spec generated from the API on 2026-09-15, not from reading code alone.

---

## 0. Read this first: every response is enveloped

`ControllerResponseExtensions.ToApiResult` returns **two different shapes**:

| Outcome | Body |
|---|---|
| Success | the full `ServiceResponse<T>` envelope — `{ success, statusCode, errorCode, message, data }` |
| Failure | RFC7807 `ProblemDetails` — `{ title, detail, status, errorCode, metadata }` |

The spec **now documents this correctly**. `ServiceResponseEnvelopeFilter` rewrites every
documented response at generation time: 2xx schemas become `ServiceResponse<T>` (emitted as e.g.
`PaymentSessionDtoServiceResponse`, whose `data` is the DTO), and 4xx/5xx become `ProblemDetails`.

Controller annotations still name the **payload** type — the filter supplies the wrapper — so a
generated client is correct at the top level and new endpoints inherit this automatically.

Either generate a client from the refreshed spec, or hand-write the envelope:

```ts
type ApiOk<T>   = { success: true; statusCode: number; message: string; data: T };
type ApiErr     = { title: string; detail?: string; status: number; errorCode?: string };

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res  = await fetch(`${BASE}/${path}`, init);
  const body = await res.json();
  if (!res.ok) throw new ApiError(body as ApiErr);   // ProblemDetails
  return (body as ApiOk<T>).data;                     // envelope
}
```

Branch on `errorCode`, never on `message` — codes are stable, messages are prose.

---

## 1. Phone-first login (new)

Four endpoints under `/api/accounts/phone`, all **absent from the storefront's checked-in spec**.

| Endpoint | Auth | Rate limit | Body | Returns (inside `data`) |
|---|---|---|---|---|
| `POST /api/accounts/phone/start` | anon | `otp` — 10 / 10 min / IP | `{ phoneNumber }` | `StartPhoneAuthResponse { channel, expiresInSeconds }` |
| `POST /api/accounts/phone/verify` | anon | `auth` — 5 / min / IP | `{ phoneNumber, code, fullName? }` | `AuthResponse { token, refreshToken, expiresIn }` |
| `POST /api/accounts/phone/link/start` | Bearer | `otp` | `{ phoneNumber }` | `StartPhoneAuthResponse` |
| `POST /api/accounts/phone/link` | Bearer | `auth` | `{ phoneNumber, code }` | `409 phone_already_linked` if taken |

### Behaviour the UI has to account for

- **`start` is deliberately uninformative.** The response is identical for a known and an
  unknown number, by design — it cannot be used to enumerate customers. So the UI *cannot*
  know before `verify` whether this is a signup or a login.
- **`verify` auto-creates the account** when the number is unseen (`PhoneAuthService:119-127`).
  `fullName` is optional but only ever consulted at creation — collect it on the OTP screen, or
  the customer is created nameless.
- **A second OTP limit exists that the rate-limit headers won't show you.** The per-IP `otp`
  policy is a coarse ceiling; the real limit is per *phone number* (`Otp:MaxSendsPerWindow` = 3
  per 10 min) enforced in the DB, because the partition key is resolved before the body is read.
  Surface a resend cooldown from `expiresInSeconds`; expect failures even under the IP limit.
- `Otp:ExpiryMinutes` = 10, `Otp:MaxVerifyAttempts` = 5, `Otp:CodeLength` = 6.

### Local development — no Msg91 account needed

`Program.cs:156-173` picks the sender by whether `Msg91:AuthKey` is set. Blank (the default)
registers `LoggingWhatsAppSender` / `LoggingSmsSender`, which **log the OTP to the console**:

```
[StubWhatsApp] To=+9199... Template=otp_login Params=123456 | 10
```

So phone login works end-to-end locally with zero configuration — read the code from the API
log. In production the key is supplied out-of-band as env var `Msg91__AuthKey`, never from
appsettings.

---

## 2. Razorpay checkout

Two distinct order paths share `/api/checkout` — pick one deliberately:

- **`POST /payment-session` → Razorpay Checkout → `POST /verify-payment`** — the online path.
- **`POST /place-order`** — creates an order with **no payment method** (`BuildOrder(..., null)`).
  An offline/manual path. Do not call it as a step of the Razorpay flow; it is an alternative to it.

### The Razorpay sequence

1. `POST /api/checkout/preview` — `{ shippingAddressId, notes? }` → totals for display.
2. `POST /api/checkout/payment-session` — **creates the order row up front** (status pending),
   then the Razorpay order. Returns `PaymentSessionDto`: `razorpayOrderId`, `razorpayKeyId`,
   `amountInSubunits` (paise — already converted, pass through unchanged), `displayName`,
   `prefillName`, `prefillContact`, and the full `preview`. Everything the Checkout widget needs
   is here; do not hardcode the key client-side.
3. Open Razorpay Checkout with those values.
4. `POST /api/checkout/verify-payment` — `{ orderId, razorpayPaymentId, razorpayOrderId,
   razorpaySignature }` from the widget callback. The server verifies the signature **and
   re-fetches the payment from Razorpay** before trusting it. On `captured` it applies
   inventory, clears the cart, and enqueues the confirmation message. Returns the full `OrderDto`.

### Details that change the UI

- **`authorized` is not `captured`.** If Razorpay returns `authorized`, the order is marked
  authorized and **the cart is not cleared and inventory is not applied**. Don't show a success
  screen on a 200 alone — read `order.paymentStatus`.
- **The webhook is a second, independent path to the same state.** `POST /api/payments/razorpay/webhook`
  reports the same capture; the two are deduplicated by a `dedupe_key` unique constraint on
  `notification_deliveries`. A customer who closes the tab mid-payment still gets a confirmed
  order via the webhook — so the order-detail page should be able to show a confirmed order the
  client never verified. Poll or re-fetch on return rather than assuming client-side verification ran.
- **Checkout is gated on a verified contact.** `payment-session` and `place-order` both 403 with
  `contact_not_verified` unless `EmailConfirmed || PhoneNumberConfirmed`. Phone-first accounts
  pass automatically after OTP; email accounts that never confirmed will fail here. Handle that
  errorCode explicitly — it is a dead end otherwise.
- Webhook signature header is `X-Razorpay-Signature`; idempotency uses `X-Razorpay-Event-Id`,
  falling back to a derived key when absent.

---

## 3. Also new in this range

- `POST /api/contact` (anon) + `GET/PATCH /api/admin/contact` — contact form submissions.
- `POST /api/Accounts/email/link` — attach an email to a phone-first account. **Also missing
  from the storefront spec.**
- `AccountsController` gained refresh-token support (`POST /api/accounts/refresh`).
- WhatsApp order notifications: `order_confirmed` / `shipped` / `delivered` / `cancelled` /
  `payment_failed`, sent via an outbox (`NotificationOutboxRepository`).
- `AppIdentityUser` gained `WhatsAppOptInAt` and `MarketingOptInAt` — transactional and marketing
  consent are **separate permissions**; linking a phone sets only the former.
- Seeding consolidated behind `ISeedRunner`; `SeedController` slimmed by ~180 lines.

---

## 4. OpenAPI status — stale, and understating errors

Storefront copy: `blackinkpaper-store-swagger-apiv1.json`, last refreshed at `ef45b87`
(2026-08-31), which **predates the phone-login commit**. Diffed against a freshly generated spec:

```
live paths: 58    checked-in: 53    removed: 0

missing from the storefront copy:
  /api/Accounts/email/link
  /api/accounts/phone/link
  /api/accounts/phone/link/start
  /api/accounts/phone/start
  /api/accounts/phone/verify
```

Regenerate with the API running in Development:

The spec is committed at **`docs/api/swagger-v1.json`** and regenerated without starting a
server — no port, no environment gate, byte-identical to what `/swagger` serves:

```bash
cd BlackInkPaperAPIService
dotnet run -- --dump-openapi                       # -> docs/api/swagger-v1.json
dotnet run -- --dump-openapi=../some/other.json    # or an explicit path
```

Copy that file into the storefront when you are ready to pick up the changes:

```bash
cp docs/api/swagger-v1.json \
   <storefront>/blackinkpaper-store-swagger-apiv1.json
```

All three defects previously listed here are **fixed** (API-side, verified by regenerating):

| Was | Now |
|---|---|
| Envelope undocumented; `ServiceResponse` absent from `components.schemas` | `ServiceResponseEnvelopeFilter` wraps every 2xx; errors documented as `ProblemDetails` |
| 68 success vs 30 error responses; `login` declared only `200` | 92 error responses declared; `login` declares `200` + `401` |
| No XML docs — zero `summary` fields | `GenerateDocumentationFile` on API/Application/Common; DTO `<summary>` docs now appear as schema descriptions |

Error responses added to the storefront-facing controllers only (accounts, phone auth, checkout,
cart, shipping addresses), grounded in the status codes the services actually return rather than
inferred. Admin controllers were left alone. Notably `403 contact_not_verified` is now declared on
both order-creating endpoints.

Method-level `<summary>` docs are still sparse in the controllers, so only 3 operations carry a
summary — the plumbing works, the prose just has not been written. DTO-level docs come through
well (e.g. `StartPhoneAuthResponse` now carries its enumeration-resistance note in the spec).

Path count is unchanged at 58, so nothing was accidentally added or removed.

The webhook is also emitted with no request schema at all (it reads `Request.Body` manually).
Harmless for the storefront — Razorpay calls it, not you — but it is not documentation.
