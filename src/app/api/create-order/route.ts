import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: Request) {
    const { amount, currency = "INR", receipt } = await req.json();

    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID!,
        key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const options = {
        amount: amount * 100,
        currency,
        receipt: receipt || "receipt#1",
    };

    try {
        const order = await razorpay.orders.create(options);
        return NextResponse.json(order)
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 })
    }
}