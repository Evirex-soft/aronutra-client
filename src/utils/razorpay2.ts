import { toast } from "react-toastify";
import { SavedCheckout } from "@/types/checkout";



interface AddressFormData {
    fullName: string
    phone: string
    email: string
    streetAddress: string
    city: string
    state: string
    pincode: string
}

export const loadRazorpay = () => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

export async function openRazorpay(item: SavedCheckout, formData: AddressFormData, router: any) {
    try {
        const createOrderRes = await fetch("/api/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: item.totals.finalTotal }),
        });

        if (!createOrderRes.ok) {
            toast.error("Failed to create Order. Please try again.");
            return;
        }

        const order = await createOrderRes.json();

        const isLoaded = await loadRazorpay();
        if (!isLoaded) {
            toast.error("Failed to load Razorpay SDK");
            return;
        }

        const options: any = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: "AroNutra",
            description: `Payment for ${item.cart.length} items`,
            order_id: order.id,
            handler: async function (response: any) {
                // handler called only on successful payment
                try {
                    const verifyRes = await fetch("/api/verify-payment", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(response),
                    });
                    const verifyData = await verifyRes.json();

                    if (verifyData.success) {
                        toast.success("Payment Successful!");

                        // Save order after verification
                        const saveOrderRes = await fetch("/api/orders/create", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                item,
                                formData,
                                paymentDetails: {
                                    razorpay_order_id: response.razorpay_order_id,
                                    razorpay_payment_id: response.razorpay_payment_id,
                                    razorpay_signature: response.razorpay_signature,
                                },
                            }),
                        });

                        const saveOrderData = await saveOrderRes.json();
                        if (saveOrderData.success) {
                            toast.success("Order placed successfully!");
                            localStorage.removeItem("aroNutraCheckout456");
                            router.push(`/orders/${saveOrderData.order.orderId}`);
                        } else {
                            toast.error(
                                `Payment successful, but order creation failed! Please contact support immediately. Payment ID: ${response.razorpay_payment_id}`,
                                { autoClose: false }
                            );
                        }
                    } else {
                        toast.error(
                            `Payment verification failed!
                        If money was deducted from your account, please contact support.
                        Payment ID: ${response.razorpay_payment_id}`,
                            { autoClose: false }
                        );
                    }
                } catch (error) {
                    console.error("Error during payment verification or order saving:", error);
                    toast.error("An unexpected error occurred. Please contact support.");
                }
            },
            modal: {
                // User Cancels Payment 
                ondismiss: function () {
                    toast.warn("Payment was cancelled.");
                }
            },
            theme: { color: "#FFFFFF" },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
    } catch (error) {
        // Catches network errors 
        console.error("Error in openRazorpay function:", error);
        toast.error("A network error occurred. Please try again.");
    }


}
