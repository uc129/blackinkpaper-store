'use client'
import { useAppSelector } from "@/lib/hooks/redux-hooks";
import { CalculatePriceANdShipping } from "./calcPriceAndShipping";

export function OrderSummary() {
  const { cartItems } = useAppSelector((state) => state.cart);
  const {total, subtotal, shipping}= CalculatePriceANdShipping(cartItems);

  return (
    <div className="bg-white border rounded-2xl p-6 sticky top-8">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      
      <div className="space-y-4 max-h-100 overflow-y-auto mb-6 pr-2">
        {cartItems.map((item, idx) => (
          <div key={`${item.id}-${idx}`} className="flex justify-between text-sm">
            <div className="flex-1">
              <p className="font-semibold">{item.name} <span className="text-neutral-400">x{item.quantity}</span></p>
              <p className="text-xs text-neutral-500 italic">
                {item.selectedVariants?.map(v => v.choice).join(', ')}
              </p>
            </div>
            <p className="font-medium">₹ {(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-neutral-600">
          <span>Subtotal</span>
          <span>₹ {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-neutral-600">
          <span>Shipping</span>
          <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
            {shipping === 0 ? "FREE" : `₹ ${shipping}`}
          </span>
        </div>
        <div className="flex justify-between text-xl font-bold pt-2 border-t mt-2">
          <span>Total</span>
          <span>₹ {total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}