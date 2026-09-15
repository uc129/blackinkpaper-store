"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useState } from "react";
import Page from "@/components/_ui/containers/base/page";
import { Grid } from "@/components/_ui/containers/container-simple";
import { Button } from "@/components/_ui/primitives/button";
import { isPaymentCaptured } from "@/features/checkout/payment-status";
import { ApiError } from "@/lib/api/client";
import {
  checkoutService,
  shippingAddressService,
} from "@/lib/api/storefront/services";
import type {
  CheckoutPreviewDto,
  CreateShippingAddressRequest,
  ShippingAddressDto,
} from "@/lib/api/storefront/types";
import { cartHasAvailabilityIssues } from "@/lib/cart/availability";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux-hooks";
import { clearCartState, fetchCart } from "@/lib/redux/store/slices/cartSlice";
import { OrderSummary } from "./order-summary-component";
import { openRazorpayModal, RazorpayIntegration } from "./razorpay-integration";

const emptyAddress: CreateShippingAddressRequest = {
  fullName: "",
  phoneNumber: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  countryCode: "IN",
  landmark: "",
  isDefault: false,
};

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state) => state.auth.status);
  const profile = useAppSelector((state) => state.auth.profile);
  const cart = useAppSelector((state) => state.cart.cart);
  const [addresses, setAddresses] = useState<ShippingAddressDto[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null,
  );
  const [addressForm, setAddressForm] = useState(emptyAddress);
  const [preview, setPreview] = useState<CheckoutPreviewDto | null>(null);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRazorpayReady, setIsRazorpayReady] = useState(false);
  const [needsContactVerification, setNeedsContactVerification] =
    useState(false);
  const [pendingOrderId, setPendingOrderId] = useState<number | null>(null);
  const hasVerifiedContact = Boolean(
    profile?.emailConfirmed || profile?.phoneNumberConfirmed,
  );
  const hasAvailabilityIssues = cartHasAvailabilityIssues(cart);

  useEffect(() => {
    if (authStatus === "authenticated") {
      dispatch(fetchCart());
      shippingAddressService
        .list()
        .then((items) => {
          setAddresses(items);
          const defaultAddress =
            items.find((address) => address.isDefault) || items[0];
          if (defaultAddress) setSelectedAddressId(defaultAddress.id);
        })
        .catch((err) => setError(err.message));
    }
  }, [authStatus, dispatch]);

  useEffect(() => {
    if (authStatus !== "authenticated") {
      setPreview(null);
      return;
    }
    if (hasAvailabilityIssues) {
      setPreview(null);
      setError(
        "Your cart contains an unavailable item or an invalid quantity. Return to your cart to fix it.",
      );
      return;
    }
    if (!selectedAddressId) {
      setPreview(null);
      return;
    }
    checkoutService
      .preview({ shippingAddressId: selectedAddressId, notes })
      .then(setPreview)
      .catch((err) => setError(err.message));
  }, [authStatus, hasAvailabilityIssues, selectedAddressId, notes]);

  useEffect(() => {
    if (authStatus === "authenticated" && cart && cart.items.length === 0) {
      router.push("/store/shop/cart");
    }
  }, [authStatus, cart, router]);

  const handleCreateAddress = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    try {
      const created = await shippingAddressService.create(addressForm);
      setAddresses((prev) => [...prev, created]);
      setSelectedAddressId(created.id);
      setAddressForm(emptyAddress);
    } catch (addressError) {
      setError(
        addressError instanceof Error
          ? addressError.message
          : "Could not save address",
      );
    }
  };

  const handlePayment = async () => {
    if (hasAvailabilityIssues) {
      setError(
        "Please return to your cart and resolve availability issues before paying.",
      );
      return;
    }
    if (!selectedAddressId) {
      setError("Please select or create a shipping address.");
      return;
    }
    if (!hasVerifiedContact) {
      setNeedsContactVerification(true);
      setError(
        "Verify an email address or phone number before starting payment.",
      );
      return;
    }
    if (!isRazorpayReady) {
      setError("Razorpay Checkout is still loading. Please try again.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setNeedsContactVerification(false);
    try {
      const session = await checkoutService.createPaymentSession({
        shippingAddressId: selectedAddressId,
        notes,
      });
      setPendingOrderId(session.orderId);
      openRazorpayModal(session, {
        onSuccess: async (response) => {
          setIsLoading(true);
          try {
            const order = await checkoutService.verifyPayment({
              orderId: session.orderId,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            });
            if (isPaymentCaptured(order)) {
              dispatch(clearCartState());
              await dispatch(fetchCart());
            }
            router.push(`/account/orders/${order.id}`);
          } catch (verificationError) {
            setError(
              verificationError instanceof Error
                ? verificationError.message
                : "Payment verification failed",
            );
          } finally {
            setIsLoading(false);
          }
        },
        onDismiss: () => {
          setError(
            "Payment window closed. The order remains pending until payment is confirmed.",
          );
        },
        onFailure: (message) => {
          setError(message);
        },
      });
    } catch (checkoutError) {
      if (
        checkoutError instanceof ApiError &&
        checkoutError.errorCode === "contact_not_verified"
      ) {
        setNeedsContactVerification(true);
        setError(
          "Verify an email address or phone number before starting payment.",
        );
      } else {
        setError(
          checkoutError instanceof Error
            ? checkoutError.message
            : "Checkout failed",
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (authStatus === "idle" || authStatus === "loading") {
    return (
      <Page className="py-16">
        <p className="text-center text-[var(--ink-soft)]">
          Preparing checkout...
        </p>
      </Page>
    );
  }

  if (authStatus === "unauthenticated") {
    if (!cart || cart.items.length === 0) {
      return (
        <Page className="py-16">
          <div className="store-surface mx-auto max-w-2xl p-8 text-center md:p-12">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
              Checkout
            </p>
            <h1 className="font-display text-4xl font-bold text-[var(--ink)] md:text-5xl">
              Your cart is empty.
            </h1>
            <p className="mx-auto mt-4 max-w-lg leading-7 text-[var(--ink-soft)]">
              Choose an artwork or print before starting checkout.
            </p>
            <Button
              href="/store"
              variant="pill"
              size="pill_lg"
              className="mt-8"
            >
              Browse the store
            </Button>
          </div>
        </Page>
      );
    }

    return (
      <Page className="py-10 md:py-16">
        <header className="mb-10 border-b border-[var(--border)] pb-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
            Checkout
          </p>
          <h1 className="font-display text-4xl font-bold text-[var(--ink)] md:text-6xl">
            Your order is ready to review.
          </h1>
        </header>

        <Grid className="items-start gap-12">
          <section className="col-12 lg:col-7 store-surface p-6 md:p-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
              Next step
            </p>
            <h2 className="font-display text-3xl font-bold text-[var(--ink)]">
              Sign in to continue
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-[var(--ink-soft)]">
              Your selections are saved. Sign in or create an account to add a
              delivery address, see the final shipping and tax amounts, and
              complete payment.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                href="/login?next=/store/shop/cart/checkout"
                variant="pill"
                size="pill_lg"
              >
                Sign in to checkout
              </Button>
              <Button
                href="/register?next=/store/shop/cart/checkout"
                variant="outline"
                size="pill_lg"
              >
                Create an account
              </Button>
            </div>
          </section>

          <div className="col-12 lg:col-5">
            <OrderSummary preview={null} />
          </div>
        </Grid>
      </Page>
    );
  }

  return (
    <Page className="py-10 md:py-16">
      <Grid className="items-start gap-12">
        <div className="col-12 lg:col-7 flex flex-col gap-8">
          <section className="store-surface p-6">
            <h2 className="font-display text-3xl font-bold mb-6 text-[var(--ink)]">
              1. Shipping Address
            </h2>

            {addresses.length > 0 && (
              <div className="space-y-3 mb-8">
                {addresses.map((address) => (
                  <label
                    key={address.id}
                    className="flex items-start gap-3 border border-[var(--border)] bg-[var(--paper)] p-4"
                  >
                    <input
                      type="radio"
                      checked={selectedAddressId === address.id}
                      onChange={() => setSelectedAddressId(address.id)}
                      className="mt-1"
                    />
                    <span className="text-sm">
                      <strong>{address.fullName}</strong>
                      <br />
                      {address.addressLine1}, {address.city}, {address.state}{" "}
                      {address.postalCode}
                      <br />
                      {address.phoneNumber}
                    </span>
                  </label>
                ))}
              </div>
            )}

            <form onSubmit={handleCreateAddress} className="grid gap-4">
              <input
                className="p-3"
                placeholder="Full name"
                value={addressForm.fullName || ""}
                onChange={(e) =>
                  setAddressForm({ ...addressForm, fullName: e.target.value })
                }
                required
              />
              <input
                className="p-3"
                placeholder="Phone number"
                value={addressForm.phoneNumber || ""}
                onChange={(e) =>
                  setAddressForm({
                    ...addressForm,
                    phoneNumber: e.target.value,
                  })
                }
                required
              />
              <input
                className="p-3"
                placeholder="Address line 1"
                value={addressForm.addressLine1 || ""}
                onChange={(e) =>
                  setAddressForm({
                    ...addressForm,
                    addressLine1: e.target.value,
                  })
                }
                required
              />
              <input
                className="p-3"
                placeholder="Address line 2"
                value={addressForm.addressLine2 || ""}
                onChange={(e) =>
                  setAddressForm({
                    ...addressForm,
                    addressLine2: e.target.value,
                  })
                }
              />
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  className="p-3"
                  placeholder="City"
                  value={addressForm.city || ""}
                  onChange={(e) =>
                    setAddressForm({ ...addressForm, city: e.target.value })
                  }
                  required
                />
                <input
                  className="p-3"
                  placeholder="State"
                  value={addressForm.state || ""}
                  onChange={(e) =>
                    setAddressForm({ ...addressForm, state: e.target.value })
                  }
                  required
                />
                <input
                  className="p-3"
                  placeholder="Postal code"
                  value={addressForm.postalCode || ""}
                  onChange={(e) =>
                    setAddressForm({
                      ...addressForm,
                      postalCode: e.target.value,
                    })
                  }
                  required
                />
                <input
                  className="p-3"
                  placeholder="Country code"
                  value={addressForm.countryCode || ""}
                  onChange={(e) =>
                    setAddressForm({
                      ...addressForm,
                      countryCode: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <button
                type="submit"
                className="rounded-full border border-[var(--ink)] px-5 py-3 font-semibold transition hover:bg-[var(--ink)] hover:text-[var(--paper)]"
              >
                Save Address
              </button>
            </form>
          </section>

          <section className="store-surface p-6">
            <h2 className="font-display text-3xl font-bold mb-6 text-[var(--ink)]">
              2. Payment
            </h2>
            <textarea
              className="w-full p-3 mb-4"
              placeholder="Order notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
            />
            {(needsContactVerification || !hasVerifiedContact) && (
              <div className="mb-4 border border-[var(--border)] bg-[var(--paper-deep)] p-4">
                <p className="mb-3 text-sm text-[var(--ink)]">
                  Verify a phone number before paying. Phone verification also
                  enables order updates.
                </p>
                <Button
                  href="/account#phone-verification"
                  variant="outline"
                  size="sm"
                >
                  Verify phone number
                </Button>
              </div>
            )}
            {error && (
              <p className="mb-4 text-sm text-[var(--danger)]" role="alert">
                {error}
              </p>
            )}
            {pendingOrderId && (
              <p className="mb-4 text-sm text-[var(--ink-soft)]">
                Payment interrupted?{" "}
                <Link
                  className="store-link"
                  href={`/account/orders/${pendingOrderId}`}
                >
                  View the pending order
                </Link>
              </p>
            )}
            <button
              type="button"
              onClick={handlePayment}
              disabled={
                !preview || isLoading || !isRazorpayReady || !hasVerifiedContact
              }
              className="w-full rounded-full bg-[var(--ink)] text-[var(--paper)] py-4 font-bold hover:bg-[var(--ink-soft)] disabled:bg-[var(--muted)]"
            >
              {isLoading
                ? "Starting payment..."
                : isRazorpayReady
                  ? "Pay with Razorpay"
                  : "Loading Razorpay..."}
            </button>
          </section>
        </div>

        <div className="col-12 lg:col-5">
          <OrderSummary preview={preview} />
        </div>
      </Grid>
      <RazorpayIntegration
        onReady={() => setIsRazorpayReady(true)}
        onError={() =>
          setError(
            "Razorpay Checkout could not be loaded. Please try again later.",
          )
        }
      />
    </Page>
  );
}
