'use client'

import { useAppSelector, useAppDispatch } from "@/lib/hooks/redux-hooks";
import { removeItem, updateQuantity } from "@/lib/redux/store/slices/cartSlice";
import { ContainerSimple } from "@/components/_ui/containers/container-simple";

export default function CartPage() {
  const { cartItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return <div className="p-10 text-center">Your cart is empty.</div>;
  }

  return (
    <ContainerSimple className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Your Shopping Cart</h1>
      
      <div className="flex flex-col gap-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between items-center border-b pb-4">
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-neutral-500">{item.currencyCode} {item.price}</p>
            </div>
            
            <div className="flex items-center gap-4">
              <input 
                type="number" 
                value={item.quantity}
                className="w-16 border rounded p-1"
                onChange={(e) => dispatch(updateQuantity({ id: item.id, quantity: parseInt(e.target.value) }))}
              />
              <button 
                onClick={() => dispatch(removeItem(item.id))}
                className="text-red-500 text-sm hover:underline"
              >Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t pt-4 flex flex-col items-end gap-2">
        <p className="text-lg font-bold">Subtotal: {subtotal.toFixed(2)}</p>
        <button className="bg-black text-white px-8 py-3 rounded-lg hover:bg-neutral-800">
          Proceed to Checkout
        </button>
      </div>
    </ContainerSimple>
  );
}