"use client";

import { useAppSelector, useAppDispatch } from "@/lib/hooks/redux-hooks";
import { removeItem, updateQuantity } from "@/lib/redux/store/slices/cartSlice";
import { ContainerSimple } from "@/components/_ui/containers/container-simple";
import { Button } from "@/components/_ui/primitives/button";
import { ClientOnly } from "@/components/client-only-helper";

export default function CartPage() {
  const { cartItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );


  let cartContent;
  if (cartItems.length === 0) {
    cartContent =  <div className="p-10 text-center text-neutral-500">Your cart is empty.</div>
  }
  else{
    cartContent = <ContainerSimple className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8">Your Shopping Cart</h1>

      <div className="flex flex-col gap-8">
        {cartItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="flex flex-col md:flex-row justify-between gap-6 border-b pb-8"
          >
            {/* 1. Product Info & Price Breakup */}
            <div className="flex-1">
              <h3 className="text-lg font-bold text-neutral-900">
                {item.name}
              </h3>

              {/* Breakup Card */}
              <div className="mt-3 inline-block w-full max-w-sm bg-neutral-50 border border-neutral-100 rounded-lg p-4">
                <p className="text-xs font-bold uppercase text-neutral-400 mb-2 tracking-wider">
                  Price Breakup
                </p>

                {/* Base Price */}
                <div className="flex justify-between text-sm py-1">
                  <span className="text-neutral-600">Base Price</span>
                  <span className="font-medium">
                    {item.currencyCode} {item.basePrice.toFixed(2)}
                  </span>
                </div>

                {/* Variant Modifiers */}
                {/* Variant Modifiers Section */}
                {item.selectedVariants?.map((v) => {
                  const isNegative = v.priceModifier && v.priceModifier < 0;
                  const isPositive = v.priceModifier && v.priceModifier > 0;

                  if(!isNegative && !isPositive) return <div key={v.label} className="hidden"></div>

                  return (
                    <div key={v.label} className="flex justify-between text-sm py-1 border-t border-neutral-100">
                      <span className="text-neutral-500">{v.label}:{" "}
                        <span className="text-neutral-800 font-medium">{v.choice}</span>
                      </span>

                      <span className={`font-medium ${isNegative? "text-red-500" : isPositive? "text-green-600": "text-neutral-400"}`}>
                        {isNegative? `- ${Math.abs(v.priceModifier!).toFixed(2)}` : isPositive? `+ ${v.priceModifier!.toFixed(2)}`: "Included"}
                      </span>
                    </div>
                  );
                })}

                {/* Calculated Unit Price */}
                <div className="flex justify-between text-sm font-bold pt-2 border-t border-neutral-200 mt-1">
                  <span>Unit Total</span>
                  <span>
                    {item.currencyCode} {item.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Controls & Line Subtotal */}
            <div className="flex flex-col items-end justify-between gap-4">
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-end">
                  <span className="text-xs text-neutral-400 font-medium mb-1">
                    Quantity
                  </span>
                  <input type="number" min="1" value={item.quantity}
                    className="w-16 border border-neutral-200 rounded-md p-2 text-center focus:ring-2 focus:ring-black outline-none"
                    onChange={(e) => dispatch(updateQuantity({
                          id: item.id,
                          variants: item.selectedVariants,
                          quantity: Math.max(1, parseInt(e.target.value) || 1),
                        }),
                      )
                    }
                  />
                </div>

                <div className="text-right min-w-25">
                  <p className="text-xs text-neutral-400 font-medium mb-1">
                    Total
                  </p>
                  <p className="text-lg font-bold">
                    {item.currencyCode}{" "}
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>

              <button
                className="text-red-500 text-xs font-semibold hover:text-red-700 transition-colors bg-red-50 px-3 py-1.5 rounded-md"
                onClick={() =>dispatch(removeItem({id: item.id,variants: item.selectedVariants, }), )}
              >
                Remove Item
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Cart Summary Footer */}
      <div className="mt-12 bg-neutral-50 rounded-2xl p-8 flex flex-col items-end">
        <div className="w-full max-w-xs space-y-3">
          <div className="flex justify-between text-neutral-500">
            <span>Subtotal</span>
            <span>₹ {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-neutral-500 pb-4 border-b">
            <span>Estimated Shipping</span>
            <span className="text-green-600 font-medium">FREE</span>
          </div>
          <div className="flex justify-between text-xl font-black pt-2">
            <span>Total Amount</span>
            <span>₹ {subtotal.toFixed(2)}</span>
          </div>
          <Button href="/store/shop/cart/checkout" variant={"pill"} className="w-full mt-6 bg-black text-white py-4 rounded-xl font-bold hover:bg-neutral-800 transform active:scale-[0.98] transition-all">
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </ContainerSimple>
  }

  return (
    <ClientOnly>
      {cartContent}
    </ClientOnly>
    
  );
}
