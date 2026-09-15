import type { OrderDto } from "@/lib/api/storefront/types";

const CAPTURED_PAYMENT_STATUS = "captured";
const TERMINAL_PAYMENT_STATUSES = new Set([
  CAPTURED_PAYMENT_STATUS,
  "failed",
  "refunded",
]);
const TERMINAL_ORDER_STATUSES = new Set(["cancelled", "canceled"]);

function normalizeStatus(status?: string | null) {
  return status?.trim().toLowerCase() || "";
}

export function isPaymentCaptured(order: Pick<OrderDto, "paymentStatus">) {
  return normalizeStatus(order.paymentStatus) === CAPTURED_PAYMENT_STATUS;
}

export function shouldPollOrderPayment(
  order: Pick<OrderDto, "paymentProvider" | "paymentStatus" | "status">,
) {
  if (normalizeStatus(order.paymentProvider) !== "razorpay") return false;

  const paymentStatus = normalizeStatus(order.paymentStatus);
  const orderStatus = normalizeStatus(order.status);
  return (
    !TERMINAL_PAYMENT_STATUSES.has(paymentStatus) &&
    !TERMINAL_ORDER_STATUSES.has(orderStatus)
  );
}

export function getPaymentStatusMessage(
  order: Pick<OrderDto, "paymentStatus" | "status">,
) {
  const paymentStatus = normalizeStatus(order.paymentStatus);

  if (paymentStatus === CAPTURED_PAYMENT_STATUS) {
    return "Payment captured. Your order is confirmed.";
  }
  if (paymentStatus === "authorized") {
    return "Payment authorised and awaiting capture. This page will update automatically.";
  }
  if (paymentStatus === "failed") {
    return "Payment failed. Your cart has not been cleared.";
  }
  if (paymentStatus === "refunded") {
    return "This payment has been refunded.";
  }
  if (TERMINAL_ORDER_STATUSES.has(normalizeStatus(order.status))) {
    return "This order has been cancelled.";
  }

  return "Payment is still processing. This page will update automatically.";
}
