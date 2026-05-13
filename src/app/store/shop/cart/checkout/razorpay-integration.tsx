import Script from "next/script";
import type { PaymentSessionDto } from "@/lib/api/storefront/types";

type RazorpaySuccessResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

export const openRazorpayModal = (
  session: PaymentSessionDto,
  onSuccess: (response: RazorpaySuccessResponse) => void,
) => {
  const options = {
    key: session.razorpayKeyId,
    amount: session.amountInSubunits,
    currency: session.currencyCode || "INR",
    name: session.displayName || "BlackInkPaper",
    description: session.displayDescription || session.orderNumber || "Order Checkout",
    order_id: session.razorpayOrderId,
    handler: onSuccess,
    prefill: {
      name: session.prefillName || session.preview.shippingAddress.fullName || "",
      contact: session.prefillContact || session.preview.shippingAddress.phoneNumber || "",
    },
    theme: {
      color: "#000000",
    },
  };

  const rzp = new (window as any).Razorpay(options);
  rzp.open();
};

export function RazorpayIntegration() {
  return <Script src="https://checkout.razorpay.com/v1/checkout.js" />;
}
