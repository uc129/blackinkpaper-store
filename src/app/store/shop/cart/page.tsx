"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux-hooks";
import {
  fetchCart,
  removeServerCartItem,
  updateServerCartItemQuantity,
} from "@/lib/redux/store/slices/cartSlice";
import { ContainerSimple } from "@/components/_ui/containers/container-simple";
import { Button } from "@/components/_ui/primitives/button";
import { ClientOnly } from "@/components/client-only-helper";
import Page from "@/components/_ui/containers/base/page";
import {
  getAdjustedCartItemLineTotal,
  getAdjustedCartItemUnitPrice,
  getAdjustedCartSubtotal,
} from "@/lib/cart/pricing";

export default function CartPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { cart, status, error } = useAppSelector((state) => state.cart);
  const authStatus = useAppSelector((state) => state.auth.status);
  const cartItems = cart?.items ?? [];
  const adjustedSubtotal = getAdjustedCartSubtotal(cart);

  useEffect(() => {
    if (authStatus === "authenticated") {
      dispatch(fetchCart());
    }
  }, [authStatus, dispatch]);

  useEffect(() => {
    if (authStatus === "unauthenticated") {
      router.push("/login?next=/store/shop/cart");
    }
  }, [authStatus, router]);

  let cartContent;
  if (authStatus !== "authenticated") {
    cartContent = <div className="p-10 text-center text-[var(--ink-soft)]">Please log in to view your cart.</div>;
  } else if (status === "loading" && !cart) {
    cartContent = <div className="p-10 text-center text-[var(--ink-soft)]">Loading cart...</div>;
  } else if (error) {
    cartContent = <div className="p-10 text-center text-[var(--danger)]">{error}</div>;
  } else if (cartItems.length === 0) {
    cartContent = <div className="p-10 text-center text-[var(--ink-soft)]">Your cart is empty.</div>;
  } else {
    cartContent = (
      <ContainerSimple className="max-w-4xl mx-auto py-8">
        <h1 className="font-display text-4xl font-bold mb-8 text-[var(--ink)]">Your Shopping Cart</h1>

        <div className="flex flex-col gap-8">
          {cartItems.map((item) => {
            const adjustedUnitPrice = getAdjustedCartItemUnitPrice(item);
            const adjustedLineTotal = getAdjustedCartItemLineTotal(item);

            return (
              <div
                key={item.id}
                className="flex flex-col md:flex-row justify-between gap-6 border-b border-[var(--border)] pb-8"
              >
              <div className="flex-1">
                <h3 className="font-display text-2xl font-bold text-[var(--ink)]">{item.name}</h3>

                <div className="mt-3 inline-block w-full max-w-sm store-surface p-4">
                  <p className="text-xs font-bold uppercase text-[var(--muted)] mb-2 tracking-wider">
                    Price Breakup
                  </p>
                  <div className="flex justify-between text-sm py-1">
                    <span className="text-[var(--ink-soft)]">Base Price</span>
                    <span className="font-medium">
                      {item.currencyCode} {item.basePrice.toFixed(2)}
                    </span>
                  </div>

                  {item.selectedVariants.map((variant) => (
                    <div key={`${variant.productVariantId}-${variant.productVariantOptionId}`} className="flex justify-between text-sm py-1 border-t border-[var(--border)]">
                      <span className="text-[var(--ink-soft)]">
                        {variant.variantLabel}:{" "}
                        <span className="text-[var(--ink)] font-medium">{variant.optionValue}</span>
                      </span>
                      <span className="font-medium text-[var(--ink-soft)]">
                        {typeof variant.absolutePrice === "number"
                          ? `${item.currencyCode} ${variant.absolutePrice.toFixed(2)}`
                          : variant.priceModifier
                            ? `${item.currencyCode} ${variant.priceModifier.toFixed(2)}`
                            : "Included"}
                      </span>
                    </div>
                  ))}

                  <div className="flex justify-between text-sm font-bold pt-2 border-t border-[var(--border)] mt-1">
                    <span>Unit Total</span>
                    <span>
                      {item.currencyCode} {adjustedUnitPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end justify-between gap-4">
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-[var(--muted)] font-medium mb-1">Quantity</span>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      className="w-16 p-2 text-center outline-none"
                      onChange={(e) =>
                        dispatch(
                          updateServerCartItemQuantity({
                            cartItemId: item.id,
                            quantity: Math.max(1, Number.parseInt(e.target.value, 10) || 1),
                          }),
                        )
                      }
                    />
                  </div>

                  <div className="text-right min-w-25">
                    <p className="text-xs text-[var(--muted)] font-medium mb-1">Total</p>
                    <p className="text-lg font-bold">
                      {item.currencyCode} {adjustedLineTotal.toFixed(2)}
                    </p>
                  </div>
                </div>

                <button
                  className="text-[var(--danger)] text-xs font-semibold hover:underline transition-colors px-3 py-1.5"
                  onClick={() => dispatch(removeServerCartItem(item.id))}
                >
                  Remove Item
                </button>
              </div>
            </div>
            );
          })}
        </div>

        <div className="mt-12 store-surface p-8 flex flex-col items-end">
          <div className="w-full max-w-xs space-y-3">
            <div className="flex justify-between text-[var(--ink-soft)]">
              <span>Subtotal</span>
              <span>
                {cart?.currencyCode || "INR"} {adjustedSubtotal.toFixed(2)}
              </span>
            </div>
            <Button
              href="/store/shop/cart/checkout"
              variant="pill"
              className="w-full mt-6 py-4 font-bold"
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </ContainerSimple>
    );
  }

  return (
    <ClientOnly>
      <Page>{cartContent}</Page>
    </ClientOnly>
  );
}
