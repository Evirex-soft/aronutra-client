import { CartItem } from "./cart";

export interface Coupon {
    code: string;
    discount: number;
    title: string;
    description: string;
}

export interface SavedCheckout {
    cart: CartItem[];
    appliedCoupon: Coupon | null;
    totals: {
        originalTotal: number;
        cartTotal: number;
        discount: number;
        couponDiscount: number;
        shippingFee: number;
        finalTotal: number;
    };
}