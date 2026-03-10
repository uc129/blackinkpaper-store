

import Script from 'next/script';
import { AddressFormData } from './shipping-address-form';

 export const openRazorpayModal = (orderData: any, address: AddressFormData) => {
        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
            amount: orderData.amount, // Amount in paisa
            currency: "INR",
            name: "Your Store Name",
            description: "Order Checkout",
            order_id: orderData.id, // Created by your backend
            handler: function (response: any) {
                // This runs on payment success
                alert(`Payment ID: ${response.razorpay_payment_id}`);
                // Redirect to success page: /order-confirmation?id=...
            },
            prefill: {
                name: address.fullName,
                email: address.email,
                contact: address.phone,
            },
            notes: {
                address: `${address.street}, ${address.city}`,
            },
            theme: {
                color: "#000000",
            },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
    };

export function RazorpayIntegration() {
    return ( <><Script src="https://checkout.razorpay.com/v1/checkout.js" /></> );
}