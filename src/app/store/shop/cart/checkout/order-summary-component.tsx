"use client";

import type { CheckoutPreviewDto } from "@/lib/api/storefront/types";
import { isCartItemUnavailable } from "@/lib/cart/availability";
import {
  getAdjustedCartItemLineTotal,
  getAdjustedCartSubtotal,
} from "@/lib/cart/pricing";
import { useAppSelector } from "@/lib/hooks/redux-hooks";

export function OrderSummary({
  preview,
}: {
  preview: CheckoutPreviewDto | null;
}) {
  const { cart } = useAppSelector((state) => state.cart);
  const fallbackItems = cart?.items ?? [];
  const currencyCode = preview?.currencyCode || cart?.currencyCode || "INR";
  const adjustedCartSubtotal = getAdjustedCartSubtotal(cart);

  return (
    <div className="store-surface p-6 sticky top-8">
      <h2 className="font-display text-2xl font-bold mb-4 text-[var(--ink)]">
        Order Summary
      </h2>

      <div className="space-y-4 max-h-100 overflow-y-auto mb-6 pr-2">
        {preview
          ? preview.items.map((item) => (
              <div
                key={item.cartItemId}
                className="flex justify-between text-sm"
              >
                <div className="flex-1">
                  <p className="font-semibold">
                    {item.name}{" "}
                    <span className="text-[var(--muted)]">
                      x{item.quantity}
                    </span>
                  </p>
                  <p className="text-xs text-[var(--ink-soft)] italic">
                    {item.selectedVariants.map((v) => v.optionValue).join(", ")}
                  </p>
                </div>
                <p className="font-medium">
                  {currencyCode} {item.lineTotal.toFixed(2)}
                </p>
              </div>
            ))
          : fallbackItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <div className="flex-1">
                  <p className="font-semibold">
                    {item.name}{" "}
                    <span className="text-[var(--muted)]">
                      x{item.quantity}
                    </span>
                  </p>
                  {isCartItemUnavailable(item) && (
                    <p className="text-xs text-[var(--danger)]">
                      No longer available
                    </p>
                  )}
                </div>
                <p className="font-medium">
                  {currencyCode} {getAdjustedCartItemLineTotal(item).toFixed(2)}
                </p>
              </div>
            ))}
      </div>

      <div className="border-t border-[var(--border)] pt-4 space-y-2">
        <div className="flex justify-between text-[var(--ink-soft)]">
          <span>Subtotal</span>
          <span>
            {currencyCode}{" "}
            {(preview?.subtotal ?? adjustedCartSubtotal).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-[var(--ink-soft)]">
          <span>Shipping</span>
          <span>
            {preview
              ? `${currencyCode} ${preview.shippingAmount.toFixed(2)}`
              : "Select address"}
          </span>
        </div>
        <div className="flex justify-between text-[var(--ink-soft)]">
          <span>Tax</span>
          <span>
            {preview
              ? `${currencyCode} ${preview.taxAmount.toFixed(2)}`
              : "Select address"}
          </span>
        </div>
        <div className="flex justify-between text-xl font-bold pt-2 border-t border-[var(--border)] mt-2">
          <span>Total</span>
          <span>
            {currencyCode}{" "}
            {(preview?.totalAmount ?? adjustedCartSubtotal).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
