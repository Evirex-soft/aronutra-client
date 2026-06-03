"use client";

import React, { useEffect, useState } from "react";
import { ShoppingBag, CreditCard, Tag, X } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import CouponModal from "@/components/CouponModal";


interface Coupon {
    id: string;
    code: string;
    title: string;
    description: string;
    discount: number;
    discountType: 'percentage' | 'fixed';
    minimumAmount: number;
    maxDiscount?: number;
    expiryDate: string;
    isActive: boolean;
}

type CheckoutItem = {
    name: string;
    description: string;
    image?: string;
    mrp: number;
    price: number;
    quantity: number;
    total: number;
};


export default function CheckoutPage() {
    const [item, setItem] = useState<CheckoutItem | null>(null);
    const [discount, setDiscount] = useState(0);
    const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const router = useRouter();

    // A consistent base price for calculations
    const subtotal = item ? item.price * item.quantity : 0;

    // Helper function to calculate discount based on coupon type
    const calculateDiscount = (coupon: Coupon, total: number): number => {
        if (coupon.discountType === 'fixed') {
            return Math.min(coupon.discount, total); // Ensure discount isn't more than total
        }
        // Percentage based discount
        const percentageDiscount = (total * coupon.discount) / 100;
        return coupon.maxDiscount
            ? Math.min(percentageDiscount, coupon.maxDiscount)
            : percentageDiscount;
    };


    useEffect(() => {
        const savedItem = localStorage.getItem("checkoutItem");
        if (savedItem) {
            setItem(JSON.parse(savedItem));
        }

        const savedCoupon = localStorage.getItem("appliedCoupon");

        if (savedCoupon && savedItem) {
            const parsedCoupon: Coupon = JSON.parse(savedCoupon);
            const parsedItem: CheckoutItem = JSON.parse(savedItem);
            const currentSubtotal = parsedItem.price * parsedItem.quantity;

            // Re-validate and apply coupon on load
            if (parsedCoupon && currentSubtotal >= parsedCoupon.minimumAmount) {
                const discountAmount = calculateDiscount(parsedCoupon, currentSubtotal);
                setDiscount(discountAmount);
                setAppliedCoupon(parsedCoupon);
            } else {
                // If coupon is no longer valid, remove it
                localStorage.removeItem("appliedCoupon");
            }
        }
    }, []);


    const handleProceed = () => {
        if (!item) return;
        const finalTotal = subtotal - discount;
        updateOrderInStorage(finalTotal, appliedCoupon);

        router.push("/checkoutAddress");
    };

    const updateOrderInStorage = (finalTotal: number, coupon: Coupon | null) => {
        if (!item) return;
        const updatedItem = { ...item, total: finalTotal };
        localStorage.setItem("checkoutItem", JSON.stringify(updatedItem));

        if (coupon) {
            localStorage.setItem("appliedCoupon", JSON.stringify(coupon));
        } else {
            localStorage.removeItem("appliedCoupon");
        }
    };


    const handleApplyCoupon = (coupon: Coupon) => {
        if (!item) return;

        const discountAmount = calculateDiscount(coupon, subtotal);
        const finalTotal = subtotal - discountAmount;

        setDiscount(discountAmount);
        setAppliedCoupon(coupon);

        // Save to local storage
        updateOrderInStorage(finalTotal, coupon);

        toast.success(`🎉 Coupon ${coupon.code} applied! You saved ₹${discountAmount.toFixed(0)}`);
        setIsModalOpen(false); // Close modal on success
    };

    const removeCoupon = () => {
        if (!item) return;

        setDiscount(0);
        setAppliedCoupon(null);

        // Restore original price and remove coupon from storage
        updateOrderInStorage(subtotal, null);

        toast.info("Coupon removed");
    };

    if (!item) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-br from-orange-100 via-orange-200 to-blue-100">
                <div className="text-gray-600 text-lg font-medium animate-pulse">
                    No items in checkout
                </div>
            </div>
        );
    }

    const finalTotal = item.total - discount;

    return (
        <>
            <div className="min-h-screen pt-20 bg-gradient-to-br from-orange-100 via-orange-120 to-blue-50 p-8 relative overflow-hidden">
                {/* Floating bg shapes */}
                <div className="absolute top-10 right-20 w-64 h-64 bg-orange-200/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 left-10 w-48 h-48 bg-blue-200/20 rounded-full blur-2xl animate-pulse delay-1000"></div>

                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-black text-gray-800 mb-2">Complete Your Purchase</h1>
                        <p className="text-gray-600">Review your order and proceed to payment</p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* LEFT: Product Section */}
                        <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 relative overflow-hidden group hover:shadow-3xl transition-all duration-500">
                            {/* Product Details */}
                            <div className="flex items-center gap-4 mb-8">
                                <div className="bg-gradient-to-r from-pink-500 to-orange-500 p-3 rounded-2xl shadow-lg">
                                    <ShoppingBag className="text-white text-2xl" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-extrabold text-gray-800">My Bag</h1>
                                    <p className="text-gray-600">Review your selected items</p>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-white/60 to-white/40 rounded-2xl p-6 border border-white/60 shadow-inner">
                                <div className="flex flex-col sm:flex-row gap-6 items-start">
                                    <div className="relative">
                                        <div className="relative w-36 h-36 rounded-xl overflow-hidden shadow-xl">
                                            <img
                                                src={item.image || "/placeholder.png"}
                                                alt={item.name}
                                                className="w-full h-full object-contain transition-transform duration-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <p className="text-2xl font-bold text-gray-800 mb-2">{item.name}</p>
                                            <p className="text-gray-600 leading-relaxed">{item.description}</p>
                                        </div>
                                        <div className="inline-flex items-center bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold">
                                            Qty: {item.quantity}
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center gap-4">
                                                <span className="text-gray-500 line-through text-lg">₹{item.mrp}</span>
                                                <span className="text-3xl font-black text-gray-900">₹{item.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Price Summary */}
                        <div className="space-y-6">
                            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 sticky top-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-gradient-to-r from-pink-500 to-orange-500 p-2 rounded-xl">
                                        <CreditCard className="text-white text-xl" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800">Price Details</h2>
                                </div>

                                <div className="space-y-4 text-gray-700">
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="font-medium">Price</span>
                                        <span className="font-semibold">₹{item.price}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="font-medium">Quantity</span>
                                        <span className="font-semibold">{item.quantity}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="font-medium">Coupon</span>
                                        {!appliedCoupon ? (
                                            <button
                                                onClick={() => setIsModalOpen(true)}
                                                className="text-pink-600 font-semibold hover:underline flex items-center gap-1"
                                            >
                                                <Tag className="w-4 h-4" />
                                                Apply Coupon
                                            </button>
                                        ) : (
                                            <span className="font-semibold">{appliedCoupon.code}</span>
                                        )}
                                    </div>




                                    {appliedCoupon && (
                                        <div className="flex justify-between py-2 border-b border-gray-100 text-green-600 font-medium">
                                            <span>Coupon ({appliedCoupon.code})</span>
                                            <div className="flex items-center gap-2">
                                                <span>- ₹{discount.toFixed(0)}</span>
                                                <button
                                                    onClick={removeCoupon}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex justify-between py-4 bg-gradient-to-r from-orange-50 to-blue-50 rounded-xl px-4 border-2 border-orange-200">
                                        <span className="text-xl font-black text-gray-900">Total</span>
                                        <span className="text-2xl font-black text-gray-900">₹{finalTotal.toFixed(0)}</span>
                                    </div>
                                </div>

                              


                                <button onClick={handleProceed} className="w-full mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white px-5 py-3 rounded-lg font-semibold text-base shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all">
                                    <CreditCard className="w-4 h-4" />
                                    <span>Place Order</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Render the Coupon Modal */}
            <CouponModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onApplyCoupon={handleApplyCoupon}
                appliedCoupon={appliedCoupon}
                cartTotal={subtotal}
            />
        </>
    );
}