import dbConnect from "@/lib/mongoose";
import Order, { IOrder } from "@/models/Order";
import { MapPin, CreditCard, ShoppingBag, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import mongoose from "mongoose";
import OrderActions from "./OrderActions";

async function getOrder(orderId: string): Promise<IOrder | null> {
    try {
        await dbConnect();
        const isValidMongoId = mongoose.Types.ObjectId.isValid(orderId);
        const order = await Order.findOne({
            $or: [
                { orderId: orderId },
                ...(isValidMongoId ? [{ _id: orderId }] : [])
            ]
        }).lean();
        if (!order) return null;
        return JSON.parse(JSON.stringify(order));
    } catch (error) {
        return null;
    }
}

export default async function OrderSuccessPage({ params }: { params: Promise<{ orderId: string }> }) {
    const { orderId } = await params;
    const order = await getOrder(orderId);

    if (!order) return notFound();

    return (
        <div className="min-h-screen bg-[#052c22] print:bg-white text-white print:text-black selection:bg-[#d4af37] selection:text-[#052c22] overflow-x-hidden">



            <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 pt-24 pb-20 md:pt-32 md:pb-24">

                {/* SUCCESS HEADER */}
                <div className="flex flex-col items-center text-center mb-16 md:mb-24">


                    <p className="text-[#d4af37] print:text-black uppercase tracking-[0.4em] text-[10px] font-bold mb-4">Order Confirmed</p>
                    <h1 className="text-4xl md:text-7xl font-serif italic mb-6">Thank You.</h1>
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-white/40 print:text-gray-500 text-[11px] uppercase tracking-widest font-bold">Order Reference</span>
                        <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 print:bg-gray-100 print:border-gray-300 text-[#d4af37] print:text-black font-mono text-sm">
                            #{order.orderId}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">

                    {/* LEFT COLUMN: ITEMS */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="bg-white/[0.03] print:bg-transparent border border-white/10 print:border-gray-200 backdrop-blur-md rounded-[32px] md:rounded-[40px] p-6 md:p-10">
                            <div className="flex items-center justify-between mb-10">
                                <div className="flex items-center gap-3">
                                    <ShoppingBag size={20} className="text-[#d4af37] print:text-black" />
                                    <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-white/70 print:text-black">Your Selection</h2>
                                </div>
                                <span className="text-[10px] text-white/30 print:text-gray-400 uppercase tracking-widest">{order.items.length} Items</span>
                            </div>

                            <div className="divide-y divide-white/5 print:divide-gray-100">
                                {order.items.map((item: any, idx: number) => (
                                    <div key={idx} className="py-6 first:pt-0 last:pb-0 flex items-center gap-4 md:gap-6 group">
                                        <div className="relative w-20 h-20 md:w-24 md:h-24 bg-gradient-to-b from-white/10 to-transparent print:bg-gray-50 rounded-2xl p-2 border border-white/5 print:border-gray-100 flex-shrink-0">
                                            <Image
                                                src={item.image || "https://via.placeholder.com/150"}
                                                alt={item.name}
                                                fill
                                                className="object-contain p-2"
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-base md:text-lg font-serif text-white/90 print:text-black">{item.name}</h3>
                                            <p className="text-[10px] text-white/40 print:text-gray-500 font-bold uppercase tracking-widest mt-1">
                                                Qty: {item.quantity} • ₹{item.sellingPrice}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-base md:text-lg font-medium text-white print:text-black">₹{item.sellingPrice * item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 pt-8 border-t border-[#d4af37]/20 print:border-gray-200">
                                <div className="flex justify-between items-end">
                                    <div className="space-y-1">
                                        <p className="text-[10px] text-[#d4af37] print:text-black font-black uppercase tracking-[0.3em]">Total Payable</p>
                                        <p className="text-white/40 print:text-gray-500 text-[10px]">Tax & Shipping Included</p>
                                    </div>
                                    <div className="text-3xl md:text-4xl font-serif text-white print:text-black">
                                        <span className="text-lg align-top mr-1 font-sans">₹</span>
                                        {order.totalAmount}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: INFO */}
                    <div className="lg:col-span-5 space-y-6">

                        {/* Shipping */}
                        <div className="bg-white/[0.02] print:bg-transparent border border-white/10 print:border-gray-200 rounded-[32px] p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <MapPin size={18} className="text-[#d4af37] print:text-black" />
                                <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-white/50 print:text-black">Destination</h2>
                            </div>
                            <p className="text-xl font-serif text-white print:text-black mb-2">{order.shippingAddress.fullName}</p>
                            <p className="text-white/50 print:text-gray-600 text-sm leading-relaxed font-light">
                                {order.shippingAddress.streetAddress}, <br />
                                {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                            </p>
                            <div className="mt-6 pt-6 border-t border-white/5 print:border-gray-100 text-[11px] text-white/30 print:text-gray-500">
                                PHONE: {order.shippingAddress.phone}
                            </div>
                        </div>

                        {/* Payment */}
                        <div className="bg-white/[0.02] print:bg-transparent border border-white/10 print:border-gray-200 rounded-[32px] p-8">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <CreditCard size={18} className="text-[#d4af37] print:text-black" />
                                    <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-white/50 print:text-black">Method</h2>
                                </div>

                            </div>
                            <p className="text-white print:text-black text-sm font-bold tracking-widest uppercase">{order.paymentDetails.method}</p>
                            <p className="text-white/30 print:text-gray-400 text-[9px] font-mono mt-1 break-all">
                                ID: {order.paymentDetails.razorpay_payment_id || "N/A"}
                            </p>
                        </div>

                        {/* OrderActions is the Client Component with Buttons */}
                        <OrderActions />
                    </div>
                </div>
            </div>
        </div>
    );
}