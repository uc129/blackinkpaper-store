"use client";

import { useRouter } from "next/navigation";
import { use, useCallback, useEffect, useRef, useState } from "react";
import Page from "@/components/_ui/containers/base/page";
import { Button } from "@/components/_ui/primitives/button";
import {
  getPaymentStatusMessage,
  isPaymentCaptured,
  shouldPollOrderPayment,
} from "@/features/checkout/payment-status";
import { checkoutService } from "@/lib/api/storefront/services";
import type { OrderDto } from "@/lib/api/storefront/types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux-hooks";
import { fetchCart } from "@/lib/redux/store/slices/cartSlice";

const ORDER_POLL_INTERVAL_MS = 5_000;

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state) => state.auth.status);
  const { orderId: orderIdParam } = use(params);
  const parsedOrderId = Number(orderIdParam);
  const orderId = Number.isInteger(parsedOrderId) ? parsedOrderId : null;
  const [order, setOrder] = useState<OrderDto | null>(null);
  const [error, setError] = useState<string | null>(null);
  const hasSyncedCapturedCart = useRef(false);

  const loadOrder = useCallback(async (id: number) => {
    try {
      const nextOrder = await checkoutService.orderById(id);
      setOrder(nextOrder);
      setError(null);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Could not load this order",
      );
    }
  }, []);

  useEffect(() => {
    if (authStatus === "unauthenticated") {
      router.push("/login?next=/account/orders");
      return;
    }
    if (authStatus !== "authenticated") return;

    if (orderId === null) {
      setError("Invalid order number");
      return;
    }
    void loadOrder(orderId);
  }, [authStatus, loadOrder, orderId, router]);

  useEffect(() => {
    if (!orderId || !order || !shouldPollOrderPayment(order)) return;

    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        void loadOrder(orderId);
      }
    }, ORDER_POLL_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [loadOrder, order, orderId]);

  useEffect(() => {
    if (!order || !isPaymentCaptured(order) || hasSyncedCapturedCart.current)
      return;

    hasSyncedCapturedCart.current = true;
    void dispatch(fetchCart());
  }, [dispatch, order]);

  return (
    <Page className="py-16">
      <div className="store-surface mx-auto max-w-4xl p-8">
        {error && (
          <p className="text-[var(--danger)]" role="alert">
            {error}
          </p>
        )}
        {!order && !error ? (
          <p className="text-[var(--ink-soft)]">Loading order...</p>
        ) : order ? (
          <div className="space-y-8">
            <div>
              <h1 className="font-display text-4xl font-bold text-[var(--ink)]">
                {order.orderNumber || `Order #${order.id}`}
              </h1>
              <p className="mt-2 text-[var(--ink-soft)]">
                {order.status} / {order.paymentStatus}
              </p>
              <div
                className="mt-4 border border-[var(--border)] bg-[var(--paper-deep)] p-4 text-sm"
                aria-live="polite"
              >
                {getPaymentStatusMessage(order)}
              </div>
              {shouldPollOrderPayment(order) && orderId && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => void loadOrder(orderId)}
                >
                  Refresh status
                </Button>
              )}
            </div>

            <div className="divide-y divide-[var(--border)]">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between py-4">
                  <span>
                    <strong>{item.name}</strong>
                    <br />
                    <span className="text-sm text-[var(--ink-soft)]">
                      Qty {item.quantity}
                    </span>
                  </span>
                  <span>
                    {item.currencyCode || order.currencyCode || "INR"}{" "}
                    {item.lineTotal.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t border-[var(--border)] pt-4">
              <p className="flex justify-between">
                <span>Subtotal</span>
                <span>
                  {order.currencyCode || "INR"} {order.subtotal.toFixed(2)}
                </span>
              </p>
              <p className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {order.currencyCode || "INR"}{" "}
                  {order.shippingAmount.toFixed(2)}
                </span>
              </p>
              <p className="flex justify-between">
                <span>Tax</span>
                <span>
                  {order.currencyCode || "INR"} {order.taxAmount.toFixed(2)}
                </span>
              </p>
              <p className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>
                  {order.currencyCode || "INR"} {order.totalAmount.toFixed(2)}
                </span>
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </Page>
  );
}
