"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Page from "@/components/_ui/containers/base/page";
import { Grid } from "@/components/_ui/containers/container-simple";
import { OrderSummary } from "./order-summary-component";
import { openRazorpayModal, RazorpayIntegration } from "./razorpay-integration";
import { checkoutService, shippingAddressService } from "@/lib/api/storefront/services";
import type {
  CheckoutPreviewDto,
  CreateShippingAddressRequest,
  ShippingAddressDto,
} from "@/lib/api/storefront/types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux-hooks";
import { clearCartState, fetchCart } from "@/lib/redux/store/slices/cartSlice";

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
  const cart = useAppSelector((state) => state.cart.cart);
  const [addresses, setAddresses] = useState<ShippingAddressDto[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [addressForm, setAddressForm] = useState(emptyAddress);
  const [preview, setPreview] = useState<CheckoutPreviewDto | null>(null);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (authStatus === "unauthenticated") router.push("/login?next=/store/shop/cart/checkout");
    if (authStatus === "authenticated") {
      dispatch(fetchCart());
      shippingAddressService.list().then((items) => {
        setAddresses(items);
        const defaultAddress = items.find((address) => address.isDefault) || items[0];
        if (defaultAddress) setSelectedAddressId(defaultAddress.id);
      }).catch((err) => setError(err.message));
    }
  }, [authStatus, dispatch, router]);

  useEffect(() => {
    if (!selectedAddressId) {
      setPreview(null);
      return;
    }
    checkoutService
      .preview({ shippingAddressId: selectedAddressId, notes })
      .then(setPreview)
      .catch((err) => setError(err.message));
  }, [selectedAddressId, notes]);

  useEffect(() => {
    if (authStatus === "authenticated" && cart && cart.items.length === 0) {
      router.push("/store/shop/cart");
    }
  }, [authStatus, cart, router]);

  const handleCreateAddress = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    const created = await shippingAddressService.create(addressForm);
    setAddresses((prev) => [...prev, created]);
    setSelectedAddressId(created.id);
    setAddressForm(emptyAddress);
  };

  const handlePayment = async () => {
    if (!selectedAddressId) {
      setError("Please select or create a shipping address.");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const session = await checkoutService.createPaymentSession({
        shippingAddressId: selectedAddressId,
        notes,
      });
      openRazorpayModal(session, async (response) => {
        try {
          const order = await checkoutService.verifyPayment({
            orderId: session.orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          });
          dispatch(clearCartState());
          dispatch(fetchCart());
          router.push(`/account/orders/${order.id}`);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Payment verification failed");
        }
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Page className="py-10 md:py-16">
      <Grid className="items-start gap-12">
        <div className="col-12 lg:col-7 flex flex-col gap-8">
          <section className="store-surface p-6">
            <h2 className="font-display text-3xl font-bold mb-6 text-[var(--ink)]">1. Shipping Address</h2>

            {addresses.length > 0 && (
              <div className="space-y-3 mb-8">
                {addresses.map((address) => (
                  <label key={address.id} className="flex items-start gap-3 border border-[var(--border)] bg-[var(--paper)] p-4">
                    <input
                      type="radio"
                      checked={selectedAddressId === address.id}
                      onChange={() => setSelectedAddressId(address.id)}
                      className="mt-1"
                    />
                    <span className="text-sm">
                      <strong>{address.fullName}</strong>
                      <br />
                      {address.addressLine1}, {address.city}, {address.state} {address.postalCode}
                      <br />
                      {address.phoneNumber}
                    </span>
                  </label>
                ))}
              </div>
            )}

            <form onSubmit={handleCreateAddress} className="grid gap-4">
              <input className="p-3" placeholder="Full name" value={addressForm.fullName || ""} onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })} required />
              <input className="p-3" placeholder="Phone number" value={addressForm.phoneNumber || ""} onChange={(e) => setAddressForm({ ...addressForm, phoneNumber: e.target.value })} required />
              <input className="p-3" placeholder="Address line 1" value={addressForm.addressLine1 || ""} onChange={(e) => setAddressForm({ ...addressForm, addressLine1: e.target.value })} required />
              <input className="p-3" placeholder="Address line 2" value={addressForm.addressLine2 || ""} onChange={(e) => setAddressForm({ ...addressForm, addressLine2: e.target.value })} />
              <div className="grid md:grid-cols-2 gap-4">
                <input className="p-3" placeholder="City" value={addressForm.city || ""} onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })} required />
                <input className="p-3" placeholder="State" value={addressForm.state || ""} onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })} required />
                <input className="p-3" placeholder="Postal code" value={addressForm.postalCode || ""} onChange={(e) => setAddressForm({ ...addressForm, postalCode: e.target.value })} required />
                <input className="p-3" placeholder="Country code" value={addressForm.countryCode || ""} onChange={(e) => setAddressForm({ ...addressForm, countryCode: e.target.value })} required />
              </div>
              <button type="submit" className="rounded-full border border-[var(--ink)] px-5 py-3 font-semibold transition hover:bg-[var(--ink)] hover:text-[var(--paper)]">
                Save Address
              </button>
            </form>
          </section>

          <section className="store-surface p-6">
            <h2 className="font-display text-3xl font-bold mb-6 text-[var(--ink)]">2. Payment</h2>
            <textarea
              className="w-full p-3 mb-4"
              placeholder="Order notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
            />
            {error && <p className="text-sm text-[var(--danger)] mb-4">{error}</p>}
            <button
              onClick={handlePayment}
              disabled={!preview || isLoading}
              className="w-full rounded-full bg-[var(--ink)] text-[var(--paper)] py-4 font-bold hover:bg-[var(--ink-soft)] disabled:bg-[var(--muted)]"
            >
              {isLoading ? "Starting payment..." : "Pay with Razorpay"}
            </button>
          </section>
        </div>

        <div className="col-12 lg:col-5">
          <OrderSummary preview={preview} />
        </div>
      </Grid>
      <RazorpayIntegration />
    </Page>
  );
}
