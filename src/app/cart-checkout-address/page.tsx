"use client"

import { useState, useEffect } from "react"
import {
  MapPin,
  CreditCard,
  Building,
  Banknote,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  ChevronRight
} from "lucide-react"
import { openRazorpay } from "@/utils/razorpay"
import { toast } from "react-toastify"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { SavedCheckout } from "@/types/checkout"
import { STORAGE_KEYS } from "@/constants/storage";
import { useCart } from "@/app/contexts/CartContext";
import { useSession } from "next-auth/react";
import { addressSchema } from "@/utils/validations";

type PaymentMethod = "upi" | "card" | "netbanking" | "cod" | "razorpay"

type Errors = Partial<Record<keyof typeof addressSchema.shape, string>>

export default function CheckoutAddressPage() {
  const { data: session } = useSession();
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>("razorpay")
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    streetAddress: "",
    city: "",
    state: "",
    pincode: ""
  })
  const [errors, setErrors] = useState<Errors>({})
  const [isLoading, setIsLoading] = useState(false);
  const { clearCart } = useCart();
  const [checkoutData, setCheckoutData] = useState<SavedCheckout | null>(null)
  const router = useRouter()

  useEffect(() => {
    const savedItem = localStorage.getItem(STORAGE_KEYS.CHECKOUT)
    if (savedItem) {
      const parsed = JSON.parse(savedItem);
      setCheckoutData(parsed);
    }
  }, []);

  useEffect(() => {
    const savedAddress = localStorage.getItem(STORAGE_KEYS.SHIPPING_ADDRESS)
    if (savedAddress) {
      setFormData(JSON.parse(savedAddress))
      localStorage.removeItem(STORAGE_KEYS.SHIPPING_ADDRESS)
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: "" }))
  }

  const handleProceed = async () => {
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

    const user = session?.user as { id?: string; email?: string } | undefined

    if (!user?.id || !user?.email) {
      toast.info("Please sign in to complete your purchase")

      // Save their progress so they don't have to re-type the address
      localStorage.setItem(STORAGE_KEYS.SHIPPING_ADDRESS, JSON.stringify(formData))

      const returnPath = encodeURIComponent("/cart-checkout-address");
      // Redirect to login with a callback return to this page
      router.push(`/login?callbackUrl=${returnPath}`)
      return
    }

    if (!checkoutData) return;

    setIsLoading(true);

    try {
      // if (selectedPayment === "cod") {

      //   const response = await fetch("/api/orders", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({
      //       items: checkoutData.cart,
      //       shippingAddress: formData,
      //       totals: checkoutData.totals,
      //       appliedCoupon: checkoutData.appliedCoupon,
      //       paymentMethod: "COD",
      //       paymentStatus: "PENDING",
      //       orderStatus: "PLACED",
      //       userId: user.id,
      //       userEmail: user.email,
      //     }),
      //   });

      //   const result = await response.json();

      //   if (response.ok) {
      //     toast.success("Order placed successfully!");
      //     clearCart(); 


      //     localStorage.removeItem(STORAGE_KEYS.CHECKOUT);
      //     localStorage.removeItem(STORAGE_KEYS.SHIPPING_ADDRESS);

      //     router.push(`/order-confirmation/${result.orderId}`); 
      //   } else {
      //     throw new Error(result.message || "Failed to place order");
      //   }
      // } 

      if (selectedPayment === "razorpay") {

        await openRazorpay(
          checkoutData!,
          formData,
          session?.user,
          router,
          clearCart
        );
        setIsLoading(false);
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred while processing your order. Please try again.");
    } finally {
      setIsLoading(false);
    };
  };

  const paymentMethods = [
    {
      id: "razorpay" as PaymentMethod,
      name: "Razorpay Secure",
      icon: Building,
      description: "Cards, UPI, Netbanking"
    },
    // {
    //   id: "cod" as PaymentMethod,
    //   name: "Cash on Delivery",
    //   icon: Banknote,
    //   description: "Pay at your doorstep"
    // }
  ]

  return (
    <div className="min-h-screen bg-[#052c22] pt-32 pb-24 px-6 lg:px-20 selection:bg-[#d4af37] selection:text-[#052c22]">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <header className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-[#d4af37]"></div>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#d4af37]">
              Checkout Process
            </span>
          </div>
          <h1 className="text-5xl font-medium text-[#FDFCF8]">Shipping & Payment</h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Left: Shipping Form */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white/5 rounded-[32px] border border-white/10 p-8 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-10">
                <MapPin className="text-[#d4af37]" size={24} />
                <h2 className="text-xl font-serif text-[#FDFCF8]">Delivery Details</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {[
                  { label: "Full Name", field: "fullName", placeholder: "e.g. John Doe", col: "md:col-span-2" },
                  { label: "Phone Number", field: "phone", placeholder: "10-digit mobile number" },
                  { label: "Email Address", field: "email", placeholder: "john.doe@example.com" },
                  { label: "Street Address", field: "streetAddress", placeholder: "House no, Building, Area", col: "md:col-span-2" },
                  { label: "City", field: "city", placeholder: "City" },
                  { label: "State", field: "state", placeholder: "State" },
                  { label: "Pincode", field: "pincode", placeholder: "6-digit code", col: "md:col-span-2" },
                ].map((input) => (
                  <div key={input.field} className={input.col || ""}>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">
                      {input.label}
                    </label>
                    <input
                      type="text"
                      placeholder={input.placeholder}
                      value={(formData as any)[input.field]}
                      onChange={(e) => handleInputChange(input.field, e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-[#FDFCF8] placeholder:text-white/20 focus:border-[#d4af37]/50 focus:outline-none transition-all"
                    />
                    {(errors as any)[input.field] && (
                      <p className="text-red-400 text-[10px] mt-2 font-bold uppercase tracking-tighter italic">
                        {(errors as any)[input.field]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-6 px-4">
              <div className="flex items-center gap-2 text-white/30 text-[10px] font-bold uppercase tracking-[0.2em]">
                <ShieldCheck size={14} className="text-[#d4af37]" /> SSL Encrypted
              </div>
              <div className="flex items-center gap-2 text-white/30 text-[10px] font-bold uppercase tracking-[0.2em]">
                <ShieldCheck size={14} className="text-[#d4af37]" /> Secure Gateway
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Payment */}
          <div className="lg:col-span-4 space-y-8">

            {/* Order Items Summary */}
            <div className="bg-white rounded-[32px] p-8 shadow-2xl text-[#052c22]">
              <div className="flex items-center gap-2 mb-8">
                <ShoppingBag size={18} className="text-stone-400" />
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-stone-400">
                  Your Selection
                </h2>
              </div>

              {checkoutData ? (
                <div className="space-y-6 mb-8">
                  {checkoutData.cart.map((product) => (
                    <div key={`${product._id}-${product.selectedVariantId || "default"}`} className="flex gap-4 items-center">
                      <div className="w-16 h-16 bg-stone-50 rounded-xl p-2 border border-stone-100 flex-shrink-0">
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-grow min-w-0">
                        <h3 className="text-sm font-serif truncate">
                          {product.name}
                        </h3>

                        {product.selectedWeight && (
                          <span className="inline-block mt-1 px-2 py-1 bg-[#d4af37]/10 text-[#d4af37] rounded-md text-[9px] font-bold uppercase tracking-widest">
                            {product.selectedWeight}
                          </span>
                        )}

                        <p className="mt-2 text-[10px] text-stone-400 font-bold uppercase tracking-tighter">
                          Qty: {product.quantity}
                        </p>

                        <p className="text-sm font-sans font-bold text-[#d4af37]">
                          ₹{product.sellingPrice * product.quantity}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="pt-6 border-t border-stone-100 space-y-3">

                    <div className="flex justify-between text-xs">
                      <span>MRP Total</span>
                      <span>₹{checkoutData.totals.originalTotal}</span>
                    </div>

                    <div className="flex justify-between text-xs text-green-600">
                      <span>Product Discount</span>
                      <span>-₹{checkoutData.totals.discount}</span>
                    </div>

                    <div className="flex justify-between text-xs font-medium">
                      <span>Subtotal</span>
                      <span>₹{checkoutData.totals.cartTotal}</span>
                    </div>

                    {checkoutData.appliedCoupon && (
                      <div className="flex justify-between text-xs text-green-600">
                        <span>Coupon Discount</span>
                        <span>-₹{checkoutData.totals.couponDiscount}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-end pt-4 border-t border-stone-100">
                      <span className="text-xs font-black uppercase tracking-widest">
                        Grand Total
                      </span>
                      <span className="text-2xl font-bold text-[#052c22]">
                        ₹{checkoutData.totals.finalTotal}
                      </span>
                    </div>

                  </div>
                </div>
              ) : (
                <p className="text-stone-400 text-xs py-10 text-center">Your bag is empty.</p>
              )}

              {/* Payment Methods */}
              <div className="pt-8 border-t border-stone-100">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-stone-400">Payment Method</h3>
                <div className="space-y-3">
                  {paymentMethods.map((method) => {
                    const isSelected = selectedPayment === method.id
                    return (
                      <div
                        key={method.id}
                        onClick={() => setSelectedPayment(method.id)}
                        className={`group relative p-4 rounded-2xl border transition-all cursor-pointer ${isSelected
                          ? "bg-[#f6faf8] border-[#b7d8cb]"
                          : "bg-white border-stone-200 hover:border-[#d4af37]/60 hover:bg-stone-50"
                          }`}
                      >
                        <div className="flex items-center gap-4">
                          <method.icon size={20} className={isSelected ? "text-[#d4af37]" : "text-stone-400"} />
                          <div>
                            <p className={`text-xs font-bold uppercase tracking-widest ${isSelected ? "text-[#0b5d46]" : "text-[#052c22]"}`}>
                              {method.name}
                            </p>
                            <p className={`text-[9px] ${isSelected ? "text-[#0b5d46]/60" : "text-stone-400"}`}>
                              {method.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleProceed}
                disabled={!checkoutData || isLoading}
                className="w-full mt-10 bg-[#052c22] text-white py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-[#0a3d30] transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95 disabled:opacity-50"
              >
                {isLoading ? "Processing..." : "Complete Order"}
                {!isLoading && <ArrowRight size={14} />}
              </button>

              <p className="text-[9px] text-center text-stone-400 uppercase tracking-[0.2em] mt-6 leading-relaxed">
                By completing this order, you agree to our <br /> Terms of Service and Quality Promise.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}