import dbConnect from "@/lib/mongoose";
import Order, { IOrder } from "@/models/Order";
import { CheckCircle, Package, MapPin, CreditCard, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import OrderSuccessClientLogic from "./OrderSuccess";


type Props = {
    params: any
    searchParams?: any
};

type IOrderItem = IOrder["items"][0] & {
    _id: string;
};

async function getOrder(orderId: string): Promise<IOrder | null> {
    try {
        await dbConnect();
        const order = await Order.findOne({ orderId }).lean();
        if (!order) {
            console.log(`Order with orderId ${orderId} not found in the database.`);
            return null;
        }
        console.log(`Successfully found order: ${orderId}`);
        return JSON.parse(JSON.stringify(order));
    } catch (error) {
        console.error("Error fetching order from MongoDB:", error);
        return null;
    }
}

export default async function OrderConfirmationPage({
    params }: Props) {
    const orderId = params.orderId as string;
    const order = await getOrder(orderId);

    if (!order) {
        return notFound()
    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-50 to-blue-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <OrderSuccessClientLogic />
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-200">
                {/* Header */}
                <div className="text-center border-b pb-6 mb-6">
                    <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                    <h1 className="text-3xl font-extrabold text-gray-800 mt-4">Order Placed Successfully!</h1>
                    <p className="text-gray-600 mt-2">Thank you for your purchase. We've received your order.</p>
                    <p className="text-sm text-gray-500 mt-2">
                        Order ID: <span className="font-semibold text-gray-700">{order.orderId}</span>
                    </p>
                </div>

                {/* Order Summary */}
                <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
                        <ShoppingCart size={20} /> Items Ordered
                    </h2>
                    <div className="space-y-4">
                        {Array.isArray(order.items) && order.items.map((item: any) => {
                            const price = typeof item.price === "number" ? item.price : 0;
                            const quantity = typeof item.quantity === "number" ? item.quantity : 0;
                            const name = typeof item.name === "string" ? item.name : "";
                            const image = typeof item.image === "string" ? item.image : 'https://via.placeholder.com/150';
                            return (
                                <div key={item._id ?? item.id ?? name} className="bg-gray-50 rounded-lg p-3 flex gap-4 items-center">
                                    <Image
                                        src={image}
                                        alt={name}
                                        width={80}
                                        height={80}
                                        className="w-16 h-16 object-contain rounded-md bg-white border"
                                    />
                                    <div className="flex-grow">
                                        <h3 className="font-semibold text-gray-800">{name}</h3>
                                        <p className="text-sm text-gray-500">Qty: {quantity}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-md font-semibold text-gray-800">
                                            ₹{price * quantity}
                                        </p>
                                        <p className="text-xs text-gray-500">(₹{price} each)</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/*  TOTALS SECTION */}
                    <div className="mt-6 pt-4 border-t">
                        {order.appliedCoupon && (
                            <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                                <span>Coupon Applied ({order.appliedCoupon.code})</span>
                                <span className="font-semibold text-green-600">Discount Applied</span>
                            </div>
                        )}
                        <div className="flex justify-between items-center text-lg font-bold text-gray-800">
                            <span>Grand Total</span>
                            <span className="text-pink-600">₹{order.totalAmount}</span>
                        </div>
                    </div>
                </div>

                {/* Shipping & Payment Details */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">
                            <MapPin size={20} /> Shipping To
                        </h2>
                        <div className="text-sm text-gray-600 space-y-1">
                            <p className="font-semibold">{order.shippingAddress.fullName}</p>
                            <p>{order.shippingAddress.streetAddress}</p>
                            <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
                            <p>Phone: {order.shippingAddress.phone}</p>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">
                            <CreditCard size={20} /> Payment Details
                        </h2>
                        <div className="text-sm text-gray-600 space-y-1">
                            <p>Payment Method: <span className="font-semibold capitalize">{order.paymentDetails.method}</span></p>
                            <p>Payment ID: <span className="font-semibold">{order.paymentDetails.razorpay_payment_id}</span></p>
                            <p className="font-semibold text-green-600">Payment Successful</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}