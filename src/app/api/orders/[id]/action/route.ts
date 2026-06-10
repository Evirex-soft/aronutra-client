import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Order from "@/models/Order";
import { Product } from "@/models/Product";
import Notification from "@/models/Notification";
import Razorpay from "razorpay";
import { Resend } from "resend";
import { render } from "@react-email/render";
import OrderCancelledEmail from "@/emails/OrderCancelledEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { action, reason } = await req.json();
        const { id } = await params;
        const order = await Order.findById(id);

        if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

        if (action === "CANCEL") {
            if (order.status !== "Placed") return NextResponse.json({ error: "Order cannot be cancelled now" }, { status: 400 });

            let refundInitiated = false;

            // Handle Razorpay Refund
            if (order.paymentDetails.method === "razorpay" && order.paymentDetails.status === "Paid") {
                try {
                    // Trigger full refund
                    await razorpay.payments.refund(order.paymentDetails.razorpay_payment_id, {
                        notes: { reason: reason || "User cancelled order" }
                    });
                    order.paymentDetails.status = "Refunded";
                } catch (rzpError: any) {
                    await Notification.create({
                        title: "Action Required: Refund Failed!",
                        message: `Refund for Order #${order.orderId} failed. Please process manually via Razorpay Dashboard.`,
                        type: "PAYMENT", // Using your PAYMENT enum type
                        link: `/orders/${order._id}`,
                    });
                }
            }

            // Restore Stock
            const stockUpdates = order.items.map((item: any) =>
                Product.findByIdAndUpdate(item.productId, { $inc: { stockQuantity: item.quantity } })
            );
            await Promise.all(stockUpdates);

            order.status = "Cancelled";
            order.cancellationReason = reason;

            await order.save();

            //  SEND CANCELLATION EMAIL TO USER
            try {
                const emailHtml = await render(
                    OrderCancelledEmail({
                        orderId: order.orderId,
                        customerName: order.shippingAddress.fullName,
                        totalAmount: order.totalAmount,
                        refundInitiated: refundInitiated,
                    })
                );

                await resend.emails.send({
                    from: "AroNutra Concierge <onboarding@resend.dev>", // Replace with your domain in prod
                    to: [order.shippingAddress.email],
                    subject: `Cancellation Confirmed: Order #${order.orderId}`,
                    html: emailHtml,
                });
            } catch (emailErr) {
                console.error("Cancellation email failed to send:", emailErr);
            }

            //  CREATE ADMIN NOTIFICATION
            await Notification.create({
                title: "Order Cancelled",
                message: `Order #${order.orderId} was cancelled by the user. Reason: ${reason}. ${order.paymentDetails.method === 'razorpay' ? 'Refund initiated.' : ''}`,
                type: "ORDER",
                link: `/orders/${order._id}`,
            });

            return NextResponse.json({ success: true, message: "Order cancelled and refund initiated" });

        }

        else if (action === "REFUND") {
            if (order.status !== "Delivered") return NextResponse.json({ error: "Only delivered orders can be refunded" }, { status: 400 });

            order.status = "Refund Requested";
            order.refundReason = reason;

            await order.save();

            await Notification.create({
                title: "Refund Requested",
                message: `User has requested a refund for Order #${order.orderId}. Reason: ${reason}`,
                type: "PAYMENT",
                link: `/orders/${order._id}`,
            });

            return NextResponse.json({ success: true, status: order.status });
        }

        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}