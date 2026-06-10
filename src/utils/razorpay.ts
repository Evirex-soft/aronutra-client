import { toast } from "react-toastify";
import { SavedCheckout } from "@/types/checkout";


export const loadRazorpay = () => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

export async function openRazorpay(
    checkoutData: SavedCheckout,
    formData: any,
    user: any,
    router: any,
    clearCart: () => void
) {
    try {
        // 1. Create Order ID from our backend
        const res = await fetch("/api/razorpay", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: checkoutData.totals.finalTotal }),
        });

        const rzpOrder = await res.json();
        if (!res.ok) throw new Error("Could not create Razorpay order");

        const isLoaded = await loadRazorpay();
        if (!isLoaded) throw new Error("Razorpay SDK failed to load");

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: rzpOrder.amount,
            currency: "INR",
            name: "Himalayan Wellness",
            description: "Purchase of Premium Wellness Products",
            order_id: rzpOrder.id,
            prefill: {
                name: formData.fullName,
                email: formData.email,
                contact: formData.phone,
            },
            theme: { color: "#052c22" }, // Your Brand Green
            handler: async function (response: any) {
                // 2. Send details to /api/orders for verification and saving
                const saveRes = await fetch("/api/orders", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        items: checkoutData.cart,
                        shippingAddress: formData,
                        totals: checkoutData.totals,
                        appliedCoupon: checkoutData.appliedCoupon,
                        paymentMethod: "razorpay",
                        paymentDetails: {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        },
                        userId: user.id,
                        userEmail: user.email,
                    }),
                });

                const result = await saveRes.json();

                if (saveRes.ok) {
                    toast.success("Order Placed Successfully!");
                    clearCart();
                    localStorage.removeItem("checkout_data");
                    router.push(`/order-confirmation/${result.orderId}`);
                } else {
                    toast.error(result.message || "Verification failed. Contact Support.");
                }
            },
            modal: {
                ondismiss: () => toast.info("Payment cancelled by user"),
            }
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
    } catch (error: any) {
        toast.error(error.message);
    }
}