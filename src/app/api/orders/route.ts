import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Order from "@/models/Order";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();

        // Generate the Order ID
        const generatedOrderId = `ARO-${Math.floor(100000 + Math.random() * 900000)}`;

        const orderData = {
            orderId: generatedOrderId,
            userId: body.userId || "GUEST",
            items: body.items.map((item: any) => ({
                productId: item._id,     // Map frontend _id to schema productId
                name: item.name,
                image: item.images?.[0] || "",
                mrp: item.mrp,
                sellingPrice: item.sellingPrice,
                quantity: item.quantity,
                weight: item.weight || 50
            })),
            totalAmount: body.totals.finalTotal,
            appliedCoupon: body.appliedCoupon ? {
                code: body.appliedCoupon.code,
                discount: body.appliedCoupon.discount,
                title: body.appliedCoupon.title,
            } : undefined,
            shippingAddress: body.shippingAddress,
            paymentDetails: {
                method: body.paymentMethod.toLowerCase(), // Should be "cod" or "razorpay"
                status: "Pending"
            },
            status: "Placed"
        };

        const newOrder = await Order.create(orderData);

        return NextResponse.json({
            success: true,
            orderId: newOrder.orderId,
            orderNumber: newOrder.orderId
        }, { status: 201 });

    } catch (error: any) {
        console.error("ORDER_VALIDATION_ERROR:", error.message);
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 });
    }
}