"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Page from "@/components/_ui/containers/base/page";
import { checkoutService } from "@/lib/api/storefront/services";
import type { OrderDto } from "@/lib/api/storefront/types";
import { useAppSelector } from "@/lib/hooks/redux-hooks";

export default function OrdersPage() {
  const router = useRouter();
  const authStatus = useAppSelector((state) => state.auth.status);
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authStatus === "unauthenticated") router.push("/login?next=/account/orders");
    if (authStatus === "authenticated") {
      checkoutService.orders().then((result) => setOrders(result.items)).catch((err) => setError(err.message));
    }
  }, [authStatus, router]);

  return (
    <Page className="max-w-5xl mx-auto py-16">
      <div className="store-surface p-8">
        <h1 className="font-display text-4xl font-bold mb-6 text-[var(--ink)]">Orders</h1>
        {error && <p className="text-[var(--danger)]">{error}</p>}
        {orders.length === 0 && !error ? (
          <p className="text-[var(--ink-soft)]">No orders yet.</p>
        ) : (
          <div className="divide-y divide-[var(--border)]">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/account/orders/${order.id}`}
                className="flex flex-col md:flex-row md:items-center justify-between gap-2 py-4"
              >
                <span>
                  <strong>{order.orderNumber || `Order #${order.id}`}</strong>
                  <br />
                  <span className="text-sm text-[var(--ink-soft)]">{new Date(order.createdAt).toLocaleDateString()}</span>
                </span>
                <span className="text-sm">{order.status} / {order.paymentStatus}</span>
                <span className="font-semibold">{order.currencyCode || "INR"} {order.totalAmount.toFixed(2)}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Page>
  );
}
