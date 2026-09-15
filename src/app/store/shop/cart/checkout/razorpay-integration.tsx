import Script from "next/script";
import type { PaymentSessionDto } from "@/lib/api/storefront/types";

export type RazorpaySuccessResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type RazorpayFailureResponse = {
  error?: {
    description?: string;
  };
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpaySuccessResponse) => void;
  prefill: {
    name: string;
    contact: string;
  };
  modal: {
    ondismiss: () => void;
  };
  theme: {
    color: string;
  };
};

type RazorpayInstance = {
  open: () => void;
  on: (
    event: "payment.failed",
    handler: (response: RazorpayFailureResponse) => void,
  ) => void;
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

type RazorpayModalHandlers = {
  onSuccess: (response: RazorpaySuccessResponse) => void;
  onDismiss: () => void;
  onFailure: (message: string) => void;
};

export function openRazorpayModal(
  session: PaymentSessionDto,
  handlers: RazorpayModalHandlers,
) {
  if (!window.Razorpay) {
    throw new Error("Razorpay Checkout is still loading. Please try again.");
  }
  if (!session.razorpayKeyId || !session.razorpayOrderId) {
    throw new Error("The payment session is incomplete. Please try again.");
  }

  const options: RazorpayOptions = {
    key: session.razorpayKeyId,
    amount: session.amountInSubunits,
    currency: session.currencyCode || "INR",
    name: session.displayName || "BlackInkPaper",
    description:
      session.displayDescription || session.orderNumber || "Order Checkout",
    order_id: session.razorpayOrderId,
    handler: handlers.onSuccess,
    prefill: {
      name:
        session.prefillName || session.preview.shippingAddress.fullName || "",
      contact:
        session.prefillContact ||
        session.preview.shippingAddress.phoneNumber ||
        "",
    },
    modal: {
      ondismiss: handlers.onDismiss,
    },
    theme: {
      color: "#000000",
    },
  };

  const razorpay = new window.Razorpay(options);
  razorpay.on("payment.failed", (response) => {
    handlers.onFailure(
      response.error?.description || "Razorpay could not complete the payment.",
    );
  });
  razorpay.open();
}

type RazorpayIntegrationProps = {
  onReady: () => void;
  onError: () => void;
};

export function RazorpayIntegration({
  onReady,
  onError,
}: RazorpayIntegrationProps) {
  return (
    <Script
      src="https://checkout.razorpay.com/v1/checkout.js"
      strategy="afterInteractive"
      onReady={onReady}
      onError={onError}
    />
  );
}
