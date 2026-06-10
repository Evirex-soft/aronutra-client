import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
    try {
        const { amount } = await req.json();

        const options = {
            amount: Math.round(amount * 100), // Amount in paise
            currency: "INR",
            receipt: `rcpt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        return NextResponse.json(order);
    } catch (error) {
        console.error("RAZORPAY_ERR", error);
        return NextResponse.json({ error: "Order creation failed" }, { status: 500 });
    }
}