import Page from "@/components/_ui/containers/base/page";
import { OrderSummary } from "./order-summary-component";
import { AddressFormData, ShippingAddressForm } from "./shipping-address-form";
import { Grid } from "@/components/_ui/containers/container-simple";
import { openRazorpayModal, RazorpayIntegration } from "./razorpay-integration";
import { CartItem } from "@/lib/redux/store/slices/cartSlice";
import { CalculatePriceANdShipping } from "./calcPriceAndShipping";
import items from "razorpay/dist/types/items";

export default function CheckoutPage() {

  const handlePayment = async (addressData: AddressFormData, cartItems:CartItem[]) => {
    const {total,subtotal,shipping} = CalculatePriceANdShipping(cartItems)

    // 1. Prepare the payload
    const checkoutPayload = {
        address: addressData,
        items: cartItems.map(item => ({
            id: item.id,
            quantity: item.quantity,
            price: item.price, // Final calculated price per unit
            variants: item.selectedVariants, // Important for order fulfillment
        })),
        subtotal,
        shipping,
        totalAmount: total,
        currency: cartItems[0].currencyCode ||"INR"
    };

    try{
        const response = await fetch('/api/create-razorpay-order', {
        method: 'POST',
        body: JSON.stringify(checkoutPayload),
    });
    
    const order = await response.json();

    if(!order) {
      alert("Encountered an Error")
    }
    
    // 3. Trigger Razorpay Modal (See step 2)
    order && openRazorpayModal(order,addressData)
    }
    catch(error){
        alert("Encountered an  error");
        console.error(error)
    }
    
};



  return (
    <Page>
      <Grid className="items-start gap-12">
        
        {/* Left: Forms */}
        <div className="col-12 lg:col-7">
          <section>
            <div className="p-8 border-2 border-dashed rounded-xl text-neutral-400 text-center">
                <ShippingAddressForm/>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">2. Payment Method</h2>
            {/* Payment Integration (Stripe/Razorpay) */}
            <div className="p-8 bg-neutral-50 rounded-xl border">
               Select Payment Method
            </div>
          </section>
        </div>

        {/* Right: Summary */}
        <div className="col-12 lg:col-5">
          <OrderSummary />
        </div>

      </Grid>
      <RazorpayIntegration/>
    </Page>
  );
}