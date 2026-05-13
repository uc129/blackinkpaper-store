"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Page from "@/components/_ui/containers/base/page";
import { checkoutService } from "@/lib/api/storefront/services";
import type { OrderDto } from "@/lib/api/storefront/types";
import { useAppSelector } from "@/lib/hooks/redux-hooks";

export default function OrderDetailPage({ params }: { params: Promise<{ orderId: string }> }) {
  const router = useRouter();
  const authStatus = useAppSelector((state) => state.auth.status);
  const [order, setOrder] = useState<OrderDto | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authStatus === "unauthenticated") router.push("/login?next=/account/orders");
    if (authStatus === "authenticated") {
      params
        .then(({ orderId }) => checkoutService.orderById(Number(orderId)))
        .then(setOrder)
        .catch((err) => setError(err.message));
    }
  }, [authStatus, params, router]);

  return (
    <Page className="max-w-4xl mx-auto py-16">
      <div className="store-surface p-8">
        {error && <p className="text-[var(--danger)]">{error}</p>}
        {!order && !error ? (
          <p className="text-[var(--ink-soft)]">Loading order...</p>
        ) : order ? (
          <div className="space-y-8">
            <div>
              <h1 className="font-display text-4xl font-bold text-[var(--ink)]">{order.orderNumber || `Order #${order.id}`}</h1>
              <p className="text-[var(--ink-soft)]">{order.status} / {order.paymentStatus}</p>
            </div>

            <div className="divide-y divide-[var(--border)]">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between py-4">
                  <span>
                    <strong>{item.name}</strong>
                    <br />
                    <span className="text-sm text-[var(--ink-soft)]">Qty {item.quantity}</span>
                  </span>
                  <span>{item.currencyCode || order.currencyCode || "INR"} {item.lineTotal.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-[var(--border)] pt-4 space-y-2">
              <p className="flex justify-between"><span>Subtotal</span><span>{order.currencyCode || "INR"} {order.subtotal.toFixed(2)}</span></p>
              <p className="flex justify-between"><span>Shipping</span><span>{order.currencyCode || "INR"} {order.shippingAmount.toFixed(2)}</span></p>
              <p className="flex justify-between"><span>Tax</span><span>{order.currencyCode || "INR"} {order.taxAmount.toFixed(2)}</span></p>
              <p className="flex justify-between text-xl font-bold"><span>Total</span><span>{order.currencyCode || "INR"} {order.totalAmount.toFixed(2)}</span></p>
            </div>
          </div>
        ) : null}
      </div>
    </Page>
  );
}
