
import { CartItem } from "@/lib/redux/store/slices/cartSlice";

export function CalculatePriceANdShipping(cartItems:CartItem[]){
      const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
      const shipping = subtotal > 1000 ? 0 : 150; // Example logic
      const total = subtotal + shipping;
      return {subtotal, shipping, total}
}