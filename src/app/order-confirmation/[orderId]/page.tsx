import { MapPin, CreditCard, ShoppingBag, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import OrderActions from "./OrderActions";
import OrderSuccessAnimation from "./OrderAnimation";
import { getOrderById } from "@/lib/services/order";
import Link from "next/link";


export default async function OrderSuccessPage({ params }: { params: Promise<{ orderId: string }> }) {
    const { orderId } = await params;
    const order = await getOrderById(orderId);

    if (!order) return notFound();

    const isPaid = order?.paymentDetails.status === "Paid";

    const orderDate = new Date(order.createdAt);
    const expectedDeliveryDate = new Date(orderDate);
    expectedDeliveryDate.setDate(expectedDeliveryDate.getDate() + 7);

    const deliveryDate = expectedDeliveryDate.toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric",
    });


    return (
        <div className="min-h-screen bg-[#052c22] print:bg-white text-white print:text-black selection:bg-[#d4af37] selection:text-[#052c22] overflow-x-hidden relative">

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 md:pt-16 md:pb-24">

                {/* SUCCESS HEADER */}
                <div className="flex flex-col items-center text-center mb-10 md:mb-16">
                    <div className="print:hidden mb-4 transform scale-90 md:scale-100">
                        <OrderSuccessAnimation />
                    </div>

                    <div className="space-y-2">
                        <p className="text-[#d4af37] print:text-black uppercase tracking-[0.3em] text-[10px] font-bold">
                            Order Confirmed
                        </p>
                        <h1 className="text-4xl md:text-6xl font-serif italic">Thank You.</h1>

                        <div className="pt-4 flex flex-col items-center gap-2">
                            <span className="text-white/40 print:text-gray-500 text-[10px] uppercase tracking-widest font-bold">Order Reference</span>
                            <span className="px-4 py-1 rounded-full border border-white/10 bg-white/5 print:bg-gray-100 print:border-gray-300 text-[#d4af37] print:text-black font-mono text-sm">
                                #{order.orderId}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">

                    {/* LEFT COLUMN: ITEMS  */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-white/[0.03] print:bg-transparent border border-white/10 print:border-gray-200 backdrop-blur-md rounded-3xl p-5 md:p-8">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-2">
                                    <ShoppingBag size={18} className="text-[#d4af37] print:text-black" />
                                    <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70 print:text-black">Your Selection</h2>
                                </div>
                                <span className="text-[10px] text-white/30 print:text-gray-400 uppercase tracking-widest">{order.items.length} Items</span>
                            </div>

                            <div className="divide-y divide-white/5 print:divide-gray-100">
                                {order.items.map((item: any, idx: number) => (
                                    <Link key={idx} href={`/products/${item.slug}`} className="py-4 first:pt-0 last:pb-0 flex items-center gap-4">
                                        <div className="relative w-16 h-16 md:w-20 md:h-20 bg-white/5 print:bg-gray-50 rounded-xl border border-white/5 flex-shrink-0">
                                            <Image
                                                src={item.image || "https://via.placeholder.com/150"}
                                                alt={item.name}
                                                fill
                                                className="object-contain p-2"
                                            />
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <h3 className="text-sm md:text-base font-serif text-white/90 print:text-black truncate">{item.name}</h3>
                                            {item.selectedWeight && (
                                                <div className="mt-1">
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#d4af37]/10 text-[#d4af37] text-[9px] font-bold uppercase tracking-widest">
                                                        {item.selectedWeight}
                                                    </span>
                                                </div>
                                            )}
                                            <p className="text-[10px] text-white/40 print:text-gray-500 font-bold uppercase tracking-tighter mt-0.5">
                                                Qty: {item.quantity} • ₹{item.sellingPrice.toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <p className="text-sm md:text-base font-medium text-white print:text-black">
                                                ₹{(item.sellingPrice * item.quantity).toLocaleString()}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-[#d4af37]/20 print:border-gray-200">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-[10px] text-[#d4af37] print:text-black font-black uppercase tracking-widest">Total Amount</p>
                                        <p className="text-white/30 print:text-gray-400 text-[9px]">Includes Taxes & Shipping</p>
                                    </div>
                                    <div className="text-2xl md:text-3xl font-medium text-white print:text-black">
                                        <span className="text-sm align-top mr-1 font-sans">₹</span>
                                        {order.totalAmount.toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: INFO & ACTIONS */}
                    <div className="lg:col-span-5 space-y-4 md:space-y-6">
                        {/* Shipping Info */}
                        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <MapPin size={16} className="text-[#d4af37]" />
                                <h2 className="text-[10px] font-black uppercase tracking-widest text-white/50">Shipping To</h2>
                            </div>
                            <div className="space-y-1">
                                <p className="text-lg font-serif text-white">{order.shippingAddress.fullName}</p>
                                <p className="text-white/50 text-xs leading-relaxed font-light">
                                    {order.shippingAddress.streetAddress}<br />
                                    {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                                </p>
                                <p className="text-[10px] text-[#d4af37]/70 font-mono mt-3 uppercase tracking-tighter">
                                    Contact: {order.shippingAddress.phone}
                                </p>
                            </div>
                        </div>

                        {/* Expected Delivery */}
                        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <CheckCircle2 size={16} className="text-[#d4af37]" />
                                <h2 className="text-[10px] font-black uppercase tracking-widest text-white/50">
                                    Expected Delivery
                                </h2>
                            </div>

                            <p className="text-2xl font-serif text-[#d4af37]">
                                {deliveryDate}
                            </p>

                            <p className="mt-2 text-xs text-white/50">
                                Usually delivered within 7 business days.
                            </p>
                        </div>

                        {/* Payment Info */}
                        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <CreditCard size={16} className="text-[#d4af37]" />
                                <h2 className="text-[10px] font-black uppercase tracking-widest text-white/50">Payment</h2>
                            </div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-white text-xs font-bold tracking-widest uppercase">{order.paymentDetails.method}</p>
                                    <p className="text-white/30 text-[9px] font-mono mt-1 break-all max-w-[200px]">
                                        Ref: {order.paymentDetails.razorpay_payment_id || "Processing"}
                                    </p>
                                </div>
                                <div
                                    className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${isPaid
                                        ? "text-emerald-400 bg-emerald-400/10"
                                        : "text-amber-400 bg-amber-400/10"
                                        }`}
                                >
                                    <CheckCircle2 size={12} />
                                    {isPaid ? "Paid" : "Pending"}
                                </div>
                            </div>
                        </div>

                        {/* Actions Component */}
                        <div className="pt-2">
                            <OrderActions />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}