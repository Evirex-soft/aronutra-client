import { getOrderById } from "@/lib/services/order";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, MapPin, Tag, CreditCard, Calendar } from "lucide-react";

export default async function OrderDetailPage({ params }: { params: Promise<{ orderId: string }> }) {
    const { orderId } = await params;
    const order = await getOrderById(orderId);

    if (!order) notFound();

    // Format Date
    const formattedDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    const expectedDeliveryDate = new Date(order.createdAt);
    expectedDeliveryDate.setDate(expectedDeliveryDate.getDate() + 7);

    const deliveryDate = expectedDeliveryDate.toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    // Calculate Subtotal from items
    const subtotal = order.items.reduce((acc: number, item: any) => acc + (item.sellingPrice * item.quantity), 0);

    const totalMrp = order.items.reduce(
        (acc, item) => acc + item.mrp * item.quantity,
        0
    );

    const productDiscount = totalMrp - subtotal;

    // If you store coupon discount separately
    const couponDiscount = order.appliedCoupon?.amountSaved || 0;

    const finalTotal = order.totalAmount;

    return (
        <div className="min-h-screen bg-[#052c22] text-white pt-32 pb-20">
            <div className="max-w-5xl mx-auto px-6">
                <Link href="/orders" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-[#d4af37] mb-12 transition-colors">
                    <ChevronLeft size={14} /> Back to History
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* LEFT: ITEMS LIST */}
                    <div className="lg:col-span-7 space-y-8">
                        <header>
                            <div className="flex items-center gap-3 text-[#d4af37] mb-2">
                                <Calendar size={14} />
                                <span className="text-[10px] uppercase tracking-[0.2em] font-mono">Placed on {formattedDate}</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-serif italic mb-2 tracking-tight">Order Details</h1>
                            <p className="text-white/40 font-mono text-sm tracking-tighter">Order ID: <span className="text-[#d4af37]">#{order.orderId}</span></p>
                        </header>

                        <div className="bg-white/[0.03] border border-white/10 rounded-[40px] overflow-hidden">
                            <div className="p-8 border-b border-white/5">
                                <h2 className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold mb-6">Purchased Items</h2>
                                <div className="space-y-6">
                                    {order.items.map((item: any, idx: number) => (
                                        <Link
                                            key={`${item.productId}-${item.selectedVariantId || "default"}`}
                                            href={`/products/${item.slug}`}
                                            className="flex gap-6 items-center group cursor-pointer"
                                        >
                                            <div className="w-20 h-24 bg-white rounded-2xl border border-white/5 flex-shrink-0 overflow-hidden">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-serif italic text-lg group-hover:text-[#d4af37] transition-colors">{item.name}</h3>
                                                <div className="flex gap-4 mt-2 items-center flex-wrap">
                                                    <p className="text-[10px] uppercase tracking-widest text-white/30">
                                                        Qty: {item.quantity}
                                                    </p>

                                                    {item.selectedWeight ? (
                                                        <span className="px-2 py-1 rounded-md bg-[#d4af37]/10 text-[#d4af37] text-[9px] font-bold uppercase tracking-widest">
                                                            {item.selectedWeight}
                                                        </span>
                                                    ) : (
                                                        item.weight && (
                                                            <p className="text-[10px] uppercase tracking-widest text-white/30">
                                                                Wt: {item.weight}g
                                                            </p>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-medium">₹{item.sellingPrice.toLocaleString()}</p>
                                                {item.mrp > item.sellingPrice && (
                                                    <p className="text-[10px] text-white/30 line-through">₹{item.mrp}</p>
                                                )}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* BILLING SUMMARY */}
                            <div className="p-8 bg-white/[0.02] space-y-3">

                                {/* MRP Total */}
                                <div className="flex justify-between text-sm text-white/60">
                                    <span>MRP Total</span>
                                    <span>₹{totalMrp.toLocaleString()}</span>
                                </div>

                                {/* Product Discount */}
                                {productDiscount > 0 && (
                                    <div className="flex justify-between text-sm text-green-400">
                                        <span>Product Discount</span>
                                        <span>- ₹{productDiscount.toLocaleString()}</span>
                                    </div>
                                )}

                                {/* Coupon Discount */}
                                {couponDiscount > 0 && (
                                    <div className="flex justify-between text-sm text-green-400">
                                        <span>Coupon Discount</span>
                                        <span>- ₹{couponDiscount.toLocaleString()}</span>
                                    </div>
                                )}

                                {/* Shipping */}
                                <div className="flex justify-between text-sm text-white/60">
                                    <span>Shipping Charge</span>
                                    <span className="text-green-400">FREE</span>
                                </div>

                                {/* Divider */}
                                <div className="border-t border-white/10 pt-4" />

                                {/* Total */}
                                <div className="flex justify-between text-xl font-medium text-[#d4af37]">
                                    <span>Total Amount</span>
                                    <span>₹{finalTotal.toLocaleString()}</span>
                                </div>

                                {/* Savings */}
                                {(productDiscount + couponDiscount) > 0 && (
                                    <div className="text-right text-xs text-green-400">
                                        You saved ₹{(productDiscount + couponDiscount).toLocaleString()}
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>

                    {/* RIGHT: SHIPPING & STATUS */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* Delivery Status Card */}
                        <div className="bg-[#d4af37] text-[#052c22] rounded-[32px] p-8 shadow-xl">
                            <div className="flex items-center gap-3 mb-6">
                                <Tag size={18} />
                                <h2 className="text-[11px] font-black uppercase tracking-[0.2em]">Current Status</h2>
                            </div>
                            <p className="text-3xl font-serif italic mb-1 capitalize">{order.status}</p>
                            <p className="text-[10px] uppercase tracking-widest opacity-70">
                                {order.status === 'Placed' ? 'We are processing your order' : 'Your order has been updated'}
                            </p>
                            <div className="mt-6 pt-5 border-t border-[#052c22]/20">
                                <p className="text-[10px] uppercase tracking-[0.25em] opacity-70 mb-2">
                                    Expected Delivery
                                </p>

                                <p className="text-xl font-serif italic">
                                    {deliveryDate}
                                </p>

                                <p className="text-[10px] uppercase tracking-widest opacity-60 mt-2">
                                    Within 7 business days
                                </p>
                            </div>
                        </div>

                        {/* Payment Details Card */}
                        <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8">
                            <div className="flex items-center gap-3 mb-6 text-[#d4af37]">
                                <CreditCard size={18} />
                                <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/70">Payment Info</h2>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Method</p>
                                    <p className="text-sm font-medium uppercase italic font-serif tracking-wider">
                                        {order.paymentDetails.method === 'cod' ? 'Cash on Delivery' : order.paymentDetails.method}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Status</p>
                                    <span className={`text-[10px] px-3 py-1 rounded-full uppercase tracking-tighter font-bold ${order.paymentDetails.status === 'Paid' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}`}>
                                        {order.paymentDetails.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Shipping Address Card */}
                        <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8">
                            <div className="flex items-center gap-3 mb-6 text-[#d4af37]">
                                <MapPin size={18} />
                                <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/70">Shipping To</h2>
                            </div>
                            <div className="text-sm text-white/60 leading-relaxed font-light italic">
                                <p className="text-white font-medium not-italic mb-1">{order.shippingAddress.fullName}</p>
                                <p>{order.shippingAddress.streetAddress}</p>
                                <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                                <p className="tracking-widest mt-2 text-white/40 not-italic text-xs font-mono">{order.shippingAddress.pincode}</p>
                                <p className="mt-4 text-xs not-italic text-white/40">Contact: {order.shippingAddress.phone}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}