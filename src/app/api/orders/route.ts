import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Order from "@/models/Order";
import { Product } from "@/models/Product";
import { Resend } from "resend";
import { OrderConfirmationEmail } from "@/emails/OrderConfirmation";
import { render } from "@react-email/render";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        await dbConnect();
        const body = await req.json();

        // Check if an order for this user with these exact items 
        // was created in the last 30 seconds (Simple Idempotency)
        const existingOrder = await Order.findOne({
            userId: body.userId,
            totalAmount: body.totals.finalTotal,
            createdAt: { $gte: new Date(Date.now() - 30000) } // 30 seconds ago
        });

        if (existingOrder) {
            return NextResponse.json({
                success: true,
                orderId: existingOrder.orderId,
                message: "Duplicate order prevented"
            }, { status: 200 });
        }

        // Generate the Order ID
        const generatedOrderId = `ARO-${Math.floor(100000 + Math.random() * 900000)}`;

        const orderData = {
            orderId: generatedOrderId,
            userId: body.userId || "GUEST",
            items: body.items.map((item: any) => ({
                productId: item._id,
                name: item.name,
                slug: item.slug,
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

        // Check for stock updates
        const stockUpdates = body.items.map(async (item: any) => {
            const product = await Product.findOneAndUpdate(
                { _id: item._id, stockQuantity: { $gte: item.quantity } }, // Ensure enough stock
                { $inc: { stockQuantity: -item.quantity } },
                { new: true }
            );
            if (!product) throw new Error(`Product ${item.name} is out of stock!`);
            return product;
        });

        await Promise.all(stockUpdates);

        // Send Email Notification
        try {
            const emailHtml = await render(OrderConfirmationEmail({
                order: newOrder,
                userEmail: session?.user?.email || body.userEmail
            }));

            // await resend.emails.send({
            //     from: 'onboarding@resend.dev',
            //     to: [session?.user?.email || body.userEmail],
            //     subject: `Order Confirmation - #${newOrder.orderId}`,
            //     html: emailHtml,
            // });

            await resend.emails.send({
                from: 'onboarding@resend.dev',
                to: ['hareeshtj12@gmail.com'],
                subject: `Order Confirmation - #${newOrder.orderId}`,
                html: emailHtml,
            });
        } catch (emailError) {
            console.error("Email failed to send:", emailError);
        }

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