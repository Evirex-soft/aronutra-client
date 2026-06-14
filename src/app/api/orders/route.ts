import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Order from "@/models/Order";
import { Product } from "@/models/Product";
import { Resend } from "resend";
import { OrderConfirmationEmail } from "@/emails/OrderConfirmation";
import { render } from "@react-email/render";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Notification from "@/models/Notification";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        await dbConnect();
        const body = await req.json();

        if (body.paymentMethod.toLowerCase() === "razorpay") {
            // Verify the signature
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body.paymentDetails;
            const sign = razorpay_order_id + "|" + razorpay_payment_id;
            const expectedSign = crypto
                .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
                .update(sign.toString())
                .digest("hex");

            if (razorpay_signature !== expectedSign) {
                return NextResponse.json({ success: false, message: "Invalid payment signature" }, { status: 400 });
            }
        }

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

                selectedVariantId: item.selectedVariantId,
                selectedWeight: item.selectedWeight
            })),
            totalAmount: body.totals.finalTotal,
            appliedCoupon: body.appliedCoupon ? {
                code: body.appliedCoupon.code,
                amountSaved: body.totals.couponDiscount,
            } : undefined,
            shippingAddress: body.shippingAddress,
            paymentDetails: {
                method: body.paymentMethod.toLowerCase(), // Should be "cod" or "razorpay"
                razorpay_order_id: body.paymentDetails?.razorpay_order_id,
                razorpay_payment_id: body.paymentDetails?.razorpay_payment_id,
                razorpay_signature: body.paymentDetails?.razorpay_signature,
                status: body.paymentMethod.toLowerCase() === "razorpay" ? "Paid" : "Pending"
            },
            status: "Placed"
        };

        const newOrder = await Order.create(orderData);

        await Notification.create({
            title: "New Order Received",
            message: `Order ${newOrder.orderId} placed for ₹${newOrder.totalAmount}`,
            type: "ORDER",
            link: `/orders/${newOrder._id}`,
        });

        // Check for stock updates
        const stockUpdates = body.items.map(async (item: any) => {

            // PRODUCT WITH VARIANT
            if (item.selectedVariantId) {

                const product = await Product.findOne({
                    _id: item._id
                });

                if (!product) {
                    throw new Error(`${item.name} not found`);
                }

                const variant = product.variants.id(
                    item.selectedVariantId
                );

                if (!variant) {
                    throw new Error(
                        `Variant not found for ${item.name}`
                    );
                }

                if (variant.stockQuantity < item.quantity) {
                    throw new Error(
                        `${item.name} is out of stock`
                    );
                }

                variant.stockQuantity -= item.quantity;

                await product.save();

                if (variant.stockQuantity <= 5) {
                    await Notification.create({
                        title: "Low Stock Alert",
                        message: `${product.name} (${variant.weight}) has only ${variant.stockQuantity} remaining`,
                        type: "INVENTORY",
                        link: `/products/${product._id}`,
                    });
                }

                return;
            }

            // PACKAGE PRODUCT
            const product = await Product.findOneAndUpdate(
                {
                    _id: item._id,
                    stockQuantity: { $gte: item.quantity }
                },
                {
                    $inc: {
                        stockQuantity: -item.quantity
                    }
                },
                {
                    new: true
                }
            );

            if (!product) {
                throw new Error(
                    `${item.name} is out of stock`
                );
            }

            if (product.stockQuantity <= 5) {
                await Notification.create({
                    title: "Low Stock Alert",
                    message: `${product.name} has only ${product.stockQuantity} remaining`,
                    type: "INVENTORY",
                    link: `/products/${product._id}`,
                });
            }
        });

        await Promise.all(stockUpdates);

        const customerEmail =
            body.shippingAddress?.email ||
            body.userEmail ||
            session?.user?.email;

        // Send Email Notification
        try {
            const emailHtml = await render(OrderConfirmationEmail({
                order: newOrder,
                userEmail: body.shippingAddress?.email
            }));


            // Send Email notification
            await resend.emails.send({
                from: 'contact@aronutra.com',
                to: [customerEmail],
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