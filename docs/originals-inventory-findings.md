# Originals — inventory & sold-out findings

Investigation of whether a purchased **Original** (single, one-of-a-kind piece)
is correctly removed from sale. **Short answer: no.** Two gaps let an Original be
oversold and stay visible after it sells.

## How inventory is applied today

On payment capture the checkout calls
`MarkPaymentCapturedAndApplyInventory` → `ApplyInventoryForOrderItem` per order
item (`OrderRepository.cs:275`, triggered from
`CheckoutApplicationService.cs:238` and `:327`).

`ApplyInventoryForOrderItem` (`OrderRepository.cs:637`):

1. If the item has **physical variants**, decrement each
   `ProductVariantOptions.StockQuantity` under a `StockQuantity >= @Quantity`
   guard (throws on insufficient stock) and return. ✅ Works for Prints.
2. Otherwise, only if **`item.FulfillmentType == physical`**, decrement
   `Products.StockQuantity` (same guard). — `OrderRepository.cs:714-741`
3. Digital / untracked stock (`StockQuantity IS NULL`) is skipped. ✅ Correct.

## Gap 1 — an Original's stock is never decremented

An Original has **no variants**, so `FulfillmentType` is derived from an empty
variant list and is **`null`**:

```
// CartApplicationService.cs:67
var fulfillmentType = selectedVariants
    .LastOrDefault(v => v.FulfillmentType.HasValue)?.FulfillmentType;  // -> null
```

That `null` flows onto the cart item → order item. In
`ApplyInventoryForOrderItem`, the no-variant branch is gated on
`item.FulfillmentType == physical`, so for an Original it **returns without
decrementing** (`OrderRepository.cs:714-717`). `Products.StockQuantity` stays at
`1`, and the oversell guard never runs — **the same Original can be sold more
than once.**

## Gap 2 — sold-out products stay visible

Nothing in checkout/inventory ever sets `IsAvailable = false` (the only writes to
`IsAvailable` are admin create/update). Public visibility filters on
`IsAvailable`, **not** on `StockQuantity`:

- Search: `WHERE (@IsAvailable IS NULL OR p.IsAvailable = @IsAvailable)` with the
  storefront forcing `IsAvailable = true` — stock is not considered
  (`ProductRepository.cs:70`).
- Detail: `GetById`/`GetBySlug` 404 only when `IsAvailable = false`.

So even if stock reached 0, the product would still list and open.

## Scope

This pre-dates the Originals work — it affects **any** no-variant physical
product with tracked stock — but Originals make it acute, since "exactly one
piece" is the entire point.

## Fixes applied

Both in `ApplyInventoryForOrderItem` (`OrderRepository.cs`):

1. **Decrement no-variant tracked-stock items.** The product-level decrement is
   now gated on `productStock.HasValue` instead of `FulfillmentType == physical`.
   Digital (null stock) is still skipped by the `HasValue` guard; the variant
   branch still returns early when it decremented, so there is no
   double-decrement. Originals now decrement and the `StockQuantity >= @Quantity`
   guard blocks a second sale (throws "Insufficient stock", failing the capture).
2. **Hide sold-out.** After a successful decrement, `IsAvailable` is set to
   `FALSE` when `StockQuantity <= 0`. Public listing/detail already filter on
   `IsAvailable`, so a sold Original drops out of the store with no query changes.

### Still optional / not done

- **Variant-level sold-out** (flip a Print's availability when *all* its variant
  options hit 0) is a separate, more involved change and was left alone.
- **Defense in depth** — re-checking stock at add-to-cart/order placement (today
  add-to-cart only checks `IsAvailable`, `CartApplicationService.cs:54`). The
  capture-time guard already prevents the oversell; this would just fail faster.

### Verification note

The decrement lives in `OrderRepository`, which is covered by the integration
suite (needs `TEST_SQLSERVER_CONNECTION_STRING`), not the fake-based unit tests.
Verify with an end-to-end capture against a real DB.

## Storefront implication

The store can now rely on the API: a sold Original is removed from listings/detail
(via `IsAvailable`), and the storefront may additionally badge "sold out" from
`stats.stockQuantity` for snappier UX. That badge is display only — the actual
oversell protection is the capture-time stock guard above.
