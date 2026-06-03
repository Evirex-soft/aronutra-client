"use client"

import { useState, useEffect } from "react"
import { MapPin, CreditCard, Building, Banknote, ShoppingBag } from "lucide-react";
import { openRazorpay } from "@/utils/razorpay";
import { toast } from "react-toastify";
import { z } from "zod";
import { useRouter } from "next/navigation";


interface Coupon {
    id: string;
    code: string;
    discount: number;
    discountType: 'percentage' | 'fixed';
}

type PaymentMethod = "upi" | "card" | "netbanking" | "cod" | "razorpay"

type CheckoutItem = {
    name: string
    description: string
    image?: string
    mrp: number
    price: number
    quantity: number
    total: number
}

// Zod Schema for Validation
const addressSchema = z.object({
    fullName: z.string().min(3, "Full name must be atleat 3 characters"),
    phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number"),
    email: z.string().email("Enter a valid email address"),
    streetAddress: z.string().min(5, "Street address is too short"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    pincode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
})

type Errors = Partial<Record<keyof typeof addressSchema.shape, string>>

export default function CheckoutAddressPage() {
    const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>("razorpay")
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        email: "",
        streetAddress: "",
        city: "",
        state: "",
        pincode: "",
    })
    const [errors, setErrors] = useState<Errors>({})
    const [item, setItem] = useState<CheckoutItem | null>(null)
    const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
    const router = useRouter();


    useEffect(() => {
        const savedItem = localStorage.getItem("checkoutItem");
        const savedCoupon = localStorage.getItem("appliedCoupon");

        if (savedItem) {
            setItem(JSON.parse(savedItem))
        } else {
            setItem({
                name: "Stylish Wireless Headphones",
                description: "High-fidelity sound with a sleek, comfortable design.",
                image: "",
                mrp: 3999,
                price: 2499,
                quantity: 1,
                total: 2499,
            })
        }
        if (savedCoupon) {
            setAppliedCoupon(JSON.parse(savedCoupon))
        }
    }, [])

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        setErrors((prev) => ({ ...prev, [field]: "" }))
    }


    // Validate before proceeding
    const handleProceed = () => {
        const validation = addressSchema.safeParse(formData)

        if (!validation.success) {
            const newErrors: Errors = {}
            validation.error.issues.forEach((err) => {
                const field = err.path[0] as keyof typeof addressSchema.shape
                newErrors[field] = err.message
            })
            setErrors(newErrors)
            return
        }

        // ✅ If valid proceed to payment
        if (selectedPayment === "razorpay" && item) {
            openRazorpay(item, appliedCoupon, formData, router);
        } else if (selectedPayment === "cod") {
            toast.success("Order placed with Cash on Delivery")
        }
    }

    const paymentMethods = [
        { id: "razorpay" as PaymentMethod, name: "Razorpay", icon: Building, description: "All major banks supported" },
        { id: "cod" as PaymentMethod, name: "Cash on Delivery", icon: Banknote, description: "Pay upon receiving your order" },
    ]

    return (
        <div className="min-h-screen pt-16 bg-gradient-to-br from-orange-100 via-orange-50 to-blue-50 p-4 sm:p-6 lg:p-8 relative overflow-hidden">

            <div className="max-w-7xl pt-16 mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-1">Secure Checkout</h1>
                    <p className="text-gray-600 text-sm">Complete your purchase in just a few steps.</p>
                </div>

                {/* Main Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

                    {/* Address Form Section - First on mobile, spans 2 columns on desktop */}
                    <div className="order-1 lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/50">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-gradient-to-r from-pink-500 to-orange-500 p-3 rounded-xl shadow-md">
                                <MapPin className="text-white w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">Shipping Address</h2>
                                <p className="text-sm text-gray-600">Where should we deliver your order?</p>
                            </div>
                        </div>

                        <div className="bg-white/50 rounded-xl p-5 border border-white/50 shadow-inner">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Full Name</label>
                                    <input type="text" placeholder="Enter your full name" value={formData.fullName} onChange={(e) => handleInputChange("fullName", e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 bg-white/80" />
                                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Phone Number</label>
                                    <input type="tel" placeholder="Enter phone number" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 bg-white/80" />
                                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Email Address</label>
                                    <input type="email" placeholder="Enter email address" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 bg-white/80" />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Street Address</label>
                                    <input type="text" placeholder="House no, Building name, Street name" value={formData.streetAddress} onChange={(e) => handleInputChange("streetAddress", e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 bg-white/80" />
                                    {errors.streetAddress && <p className="text-red-500 text-xs mt-1">{errors.streetAddress}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">City</label>
                                    <input type="text" placeholder="Enter city" value={formData.city} onChange={(e) => handleInputChange("city", e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 bg-white/80" />
                                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">State</label>
                                    <input type="text" placeholder="Enter state" value={formData.state} onChange={(e) => handleInputChange("state", e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 bg-white/80" />
                                    {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Pincode / ZIP</label>
                                    <input type="text" placeholder="Enter pincode" value={formData.pincode} onChange={(e) => handleInputChange("pincode", e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 bg-white/80" />
                                    {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary & Payment - Second on mobile, single column on desktop */}
                    <div className="order-2 flex flex-col gap-6 lg:gap-8">
                        {/* Product Details Card - Second on mobile */}
                        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-5 border border-white/50">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-gradient-to-r from-pink-500 to-orange-500 p-2 rounded-xl shadow-md">
                                    <ShoppingBag className="text-white w-5 h-5" />
                                </div>
                                <h2 className="text-lg font-bold text-gray-800">Order Summary</h2>
                            </div>

                            {item ? (
                                <div className="flex gap-4">
                                    {item.image && (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-20 h-20 object-contain rounded-lg shadow-sm flex-shrink-0"
                                        />
                                    )}
                                    <div className="flex-grow">
                                        <h3 className="text-base font-semibold text-gray-800">{item.name}</h3>
                                        <p className="text-xs text-gray-500">{item.description}</p>
                                        <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                                        <div className="mt-2 text-sm">
                                            <span className="text-pink-600 font-bold">₹{item.total}</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-gray-600 text-sm">No product in your cart.</p>
                            )}
                        </div>

                        {/* Payment Methods Section - Third on mobile */}
                        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/50">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="bg-gradient-to-r from-pink-500 to-orange-500 p-2 rounded-xl shadow-md">
                                    <CreditCard className="text-white w-5 h-5" />
                                </div>
                                <h2 className="text-lg font-bold text-gray-800">Payment Method</h2>
                            </div>

                            <div className="grid gap-3">
                                {paymentMethods.map((method) => {
                                    const Icon = method.icon
                                    const isSelected = selectedPayment === method.id
                                    return (
                                        <div
                                            key={method.id}
                                            onClick={() => setSelectedPayment(method.id)}
                                            className={`relative p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 ${isSelected
                                                ? "border-pink-400 bg-pink-50/50 shadow-md scale-[1.03]"
                                                : "border-gray-200 bg-white/60 hover:border-gray-300"
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`p-1.5 rounded-md ${isSelected ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white" : "bg-gray-100 text-gray-600"}`}>
                                                    <Icon className="w-5 h-5" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-sm text-gray-800">{method.name}</h3>
                                                </div>
                                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isSelected ? "border-pink-500 bg-pink-500" : "border-gray-300"}`}>
                                                    {isSelected && <div className="w-2 h-2 rounded-full bg-white"></div>}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                                {/* Proceed Button */}
                                <div className="flex justify-center mt-8">
                                    <button
                                        className="w-full max-w-md flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-3 rounded-lg font-bold text-base shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
                                        onClick={handleProceed}
                                    >
                                        <CreditCard className="w-5 h-5" />
                                        <span>Proceed to Pay {item && `(₹${item.total})`}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}