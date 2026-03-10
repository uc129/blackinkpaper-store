// /api/create-razorpay-order.ts
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
    const { items, totalAmount } = await req.json();

    // SERVER-SIDE SECURITY CHECK
    // 1. Fetch real product prices from your DB
    // 2. Sum them up + handle variants
    // 3. If (calculatedTotal !== totalAmount) throw error!

    const options = {
        amount: Math.round(totalAmount * 100), // Convert to Paisa
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
    };

    try {
        const order = await razorpay.orders.create(options);
        return Response.json(order);
    } catch (error) {
        return Response.json({ error: "Order creation failed" }, { status: 500 });
    }
}