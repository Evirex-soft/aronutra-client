"use client";

import React, { useRef, useState } from "react";
import { useCart } from "../contexts/CartContext";
import Link from "next/link";
import { FaTag } from "react-icons/fa";
import { ShoppingBag, Minus, Plus, ArrowRight, X, ChevronRight } from "lucide-react";
import CouponModal from "@/components/CouponModal";

// ... (Coupon interface remains same)

export default function CartPage() {
    const {
        cart, removeFromCart, updateQuantity, getCartTotal,
        getCartOriginalTotal, getCartDiscount, getCouponDiscount,
        getFinalTotal, appliedCoupon, applyCoupon, removeCoupon,
        saveCheckoutData
    } = useCart();

    const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
    const holdInterval = useRef<NodeJS.Timeout | null>(null);

    // UPDATED: Uses item._id instead of item.id
    const handleHold = (id: string, currentQty: number, action: "increase" | "decrease") => {
        const newQty = action === "increase" ? currentQty + 1 : Math.max(1, currentQty - 1);
        updateQuantity(id, newQty);

        holdInterval.current = setInterval(() => {
            updateQuantity(id, action === "increase" ? ++currentQty : Math.max(1, --currentQty));
        }, 150);
    };

    const stopHold = () => {
        if (holdInterval.current) {
            clearInterval(holdInterval.current);
            holdInterval.current = null;
        }
    };

    if (cart.length === 0) {
        return (
            <section className="min-h-screen bg-[#052c22] flex items-center justify-center px-6">
                <div className="text-center max-w-md">
                    <div className="relative mb-8 inline-block">
                        <div className="absolute inset-0 bg-[#d4af37] blur-3xl opacity-10 rounded-full" />
                        <ShoppingBag className="w-20 h-20 text-[#d4af37]/40 relative z-10 mx-auto" />
                    </div>
                    <h2 className="text-4xl font-serif text-[#FDFCF8] mb-4">Your Treasury is Empty</h2>
                    <p className="text-white/50 font-light mb-10 leading-relaxed">
                        The finest Himalayan nectar is waiting to be discovered. Begin your journey toward wellness today.
                    </p>
                    <Link href="/collection">
                        <span className="inline-flex items-center gap-3 bg-[#d4af37] text-[#052c22] font-bold py-4 px-10 rounded-full hover:bg-[#FDFCF8] transition-all duration-500 tracking-[0.2em] text-[10px] uppercase cursor-pointer">
                            Explore Collection <ArrowRight size={14} />
                        </span>
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-[#052c22] pt-32 pb-24 px-6 lg:px-20">
            <div className="max-w-[1400px] mx-auto">
                <header className="mb-16">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-[1px] bg-[#d4af37]"></div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#d4af37]">
                            Shopping Bag
                        </span>
                    </div>
                    <h1 className="text-5xl font-serif text-[#FDFCF8]">Review Your Selection</h1>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-white/5 rounded-[32px] border border-white/10 p-8 backdrop-blur-sm">
                            <div className="space-y-10">
                                {cart.map((item) => (
                                    <div key={item._id} className="group relative flex flex-col md:flex-row md:items-center justify-between gap-8 pb-10 border-b border-white/5 last:border-0 last:pb-0">
                                        <div className="flex items-center gap-8 flex-1">
                                            {/* Image */}
                                            <div className="relative w-28 h-28 bg-white rounded-2xl overflow-hidden p-4 flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                                                <img
                                                    src={item.images?.[0] || "/placeholder.png"}
                                                    alt={item.name}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>

                                            <div className="flex-1">
                                                <h3 className="text-xl font-serif text-[#FDFCF8] mb-2">{item.name}</h3>
                                                <div className="flex items-center gap-4">
                                                    {/* sellingPrice */}
                                                    <span className="text-[#d4af37] font-bold">₹{item.sellingPrice}</span>
                                                    {item.mrp && <span className="text-white/20 line-through text-sm">₹{item.mrp}</span>}
                                                    {/* Optional: Show weight */}
                                                    <span className="text-white/20 text-[10px] uppercase font-bold tracking-widest">{item.weight}g</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between md:justify-end gap-10">
                                            {/*  Quantity logic */}
                                            <div className="flex items-center bg-white/5 rounded-full border border-white/10 px-4 py-2">
                                                <button
                                                    onMouseDown={() => handleHold(item._id!, item.quantity, "decrease")}
                                                    onMouseUp={stopHold}
                                                    onMouseLeave={stopHold}
                                                    className="p-2 text-white/40 hover:text-[#d4af37] transition-colors"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="w-10 text-center font-bold text-sm text-[#FDFCF8]">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onMouseDown={() => handleHold(item._id!, item.quantity, "increase")}
                                                    onMouseUp={stopHold}
                                                    onMouseLeave={stopHold}
                                                    className="p-2 text-white/40 hover:text-[#d4af37] transition-colors"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>

                                            {/* Total calculation */}
                                            <div className="min-w-[100px] text-right">
                                                <p className="text-lg font-sans font-medium text-[#FDFCF8]">
                                                    ₹{item.sellingPrice * item.quantity}
                                                </p>
                                            </div>

                                            {/* Remove */}
                                            <button
                                                onClick={() => removeFromCart(item._id!)}
                                                className="text-white/20 hover:text-red-400 transition-all p-2"
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Checkout Summary remains mostly same but ensures clean decimals */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-32 bg-white rounded-[32px] p-8 shadow-2xl text-[#052c22]">
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-8 text-stone-400">
                                Order Summary
                            </h2>

                            <div className="space-y-5">
                                <div className="flex justify-between text-sm">
                                    <span className="text-stone-500 font-medium">Subtotal</span>
                                    <span className="font-bold">₹{getCartOriginalTotal().toLocaleString()}</span>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span className="text-stone-500 font-medium">Instant Discount</span>
                                    <span className="text-green-600 font-bold">-₹{getCartDiscount().toLocaleString()}</span>
                                </div>

                                {appliedCoupon && (
                                    <div className="flex justify-between text-sm bg-green-50 p-3 rounded-xl border border-green-100">
                                        <div>
                                            <span className="text-green-700 font-bold block text-xs uppercase">{appliedCoupon.code}</span>
                                            <button onClick={removeCoupon} className="text-[10px] text-red-500 underline uppercase tracking-tighter">Remove</button>
                                        </div>
                                        <span className="text-green-700 font-bold">-₹{getCouponDiscount().toLocaleString()}</span>
                                    </div>
                                )}

                                {!appliedCoupon && (
                                    <button
                                        onClick={() => setIsCouponModalOpen(true)}
                                        className="w-full flex items-center justify-between py-4 border-y border-stone-100 group transition-colors"
                                    >
                                        <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#052c22]">
                                            <FaTag className="text-[#d4af37]" /> Apply Privilege Code
                                        </span>
                                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                )}

                                <div className="flex justify-between text-sm">
                                    <span className="text-stone-500 font-medium">Delivery</span>
                                    <span className="text-green-600 font-bold tracking-widest text-[10px] uppercase font-black">Free</span>
                                </div>

                                <div className="pt-6 mt-6 border-t border-stone-100">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-sm font-bold uppercase tracking-[0.1em]">Total Payable</span>
                                        <span className="text-3xl font-medium text-[#052c22]">₹{getFinalTotal().toLocaleString()}</span>
                                    </div>
                                    {(getCartDiscount() > 0 || appliedCoupon) && (
                                        <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest text-right">
                                            Total Savings: ₹{(getCartDiscount() + getCouponDiscount()).toLocaleString()}
                                        </p>
                                    )}
                                </div>

                                <Link href="/cart-checkout-address">
                                    <button
                                        onClick={saveCheckoutData}
                                        className="w-full mt-8 bg-[#052c22] text-white py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-[#0a3d30] transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95"
                                    >
                                        Proceed to Checkout <ArrowRight size={14} />
                                    </button>
                                </Link>

                                <p className="text-[9px] text-center text-stone-400 uppercase tracking-[0.2em] mt-6">
                                    Secure Checkout Guaranteed
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <CouponModal
                isOpen={isCouponModalOpen}
                onClose={() => setIsCouponModalOpen(false)}
                onApplyCoupon={applyCoupon}
                appliedCoupon={appliedCoupon}
                cartTotal={getCartTotal()}
            />
        </section>
    );
}