"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { IProduct } from "@/types/product";
import { toast } from "react-toastify";
import { STORAGE_KEYS } from "@/constants/storage";

export interface CartItem extends IProduct {
    quantity: number;
}


export interface Coupon {
    _id: string;
    code: string;
    type: "PERCENTAGE" | "FIXED_AMOUNT" | "FREE_SHIPPING";
    value: number;
    minOrder: number;
    maxDiscount?: number;
    active: boolean;
};

interface CartContextType {
    cart: CartItem[];
    appliedCoupon: Coupon | null;
    addToCart: (product: IProduct, quantity?: number) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    getCartCount: () => number;
    getCartTotal: () => number;
    getCartOriginalTotal: () => number;
    getCartDiscount: () => number;
    getCartWeight: () => number;
    applyCoupon: (coupon: Coupon) => void;
    removeCoupon: () => void;
    getCouponDiscount: () => number;
    getFinalTotal: () => number;
    saveCheckoutData: () => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
    const [isHydrated, setIsHydrated] = useState(false);

    // Load from localStorage on Mount
    useEffect(() => {
        try {
            const storedCart = localStorage.getItem(STORAGE_KEYS.CART);
            if (storedCart) {
                const parsed = JSON.parse(storedCart);
                // Handle if data was saved as an array or as an object {cart, appliedCoupon}
                const items = Array.isArray(parsed) ? parsed : parsed.cart;
                const coupon = parsed.appliedCoupon || null;

                if (items) setCart(items);
                if (coupon) setAppliedCoupon(coupon);
            }
        } catch (error) {
            console.error("Failed to load cart:", error);
        } finally {
            // Signal that we have finished loading and are ready to start saving changes
            setIsHydrated(true);
        }
    }, []);

    useEffect(() => {
        if (isHydrated) {
            localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify({ cart, appliedCoupon }));
        }
    }, [cart, appliedCoupon, isHydrated]);

    const saveCheckoutData = () => {
        const checkoutData = {
            cart,
            appliedCoupon,
            totals: {
                originalTotal: getCartOriginalTotal(),
                cartTotal: getCartTotal(),
                discount: getCartDiscount(),
                couponDiscount: getCouponDiscount(),
                finalTotal: getFinalTotal(),
            },
            savedAt: new Date().toISOString(),
        };

        localStorage.setItem(STORAGE_KEYS.CHECKOUT, JSON.stringify(checkoutData));
    };


    const addToCart = (product: IProduct, quantity: number = 1) => {
        if (product.stockQuantity <= 0) {
            toast.error(`Sorry, ${product.name} is currently out of stock.`);
            return;
        }

        setCart((prevCart) => {
            const existingItem = prevCart.find(
                (item) => item._id === product._id
            );

            // Product already exists in cart
            if (existingItem) {
                const newQuantity = existingItem.quantity + quantity;

                if (newQuantity > product.stockQuantity) {
                    toast.error(
                        `Only ${product.stockQuantity} units available.`
                    );
                    return prevCart;
                }

                toast.success(
                    `${quantity} more ${product.name} added to cart!`
                );

                return prevCart.map((item) =>
                    item._id === product._id
                        ? { ...item, quantity: newQuantity }
                        : item
                );
            }

            // New product
            if (quantity > product.stockQuantity) {
                toast.error(
                    `Only ${product.stockQuantity} units available.`
                );
                return prevCart;
            }

            toast.success(`${product.name} added to cart!`);

            return [...prevCart, { ...product, quantity }];
        });
    };

    const removeFromCart = (productId: string) => {
        setCart((prevCart) => {
            const itemToRemove = prevCart.find(item => item._id === productId);
            if (itemToRemove) {
                toast.error(`${itemToRemove.name} removed from cart`);
            }
            return prevCart.filter((item) => item._id !== productId);
        });
    };

    const updateQuantity = (productId: string, quantity: number) => {
        setCart((prevCart) =>
            prevCart.map((item) => {
                if (item._id === productId) {
                    const newQty = Math.max(1, quantity);
                    // STRICT STOCK CHECK
                    if (newQty > item.stockQuantity) {
                        toast.warning(`Maximum available stock (${item.stockQuantity}) reached.`);
                        return { ...item, quantity: item.stockQuantity };
                    }
                    return { ...item, quantity: newQty };
                }
                return item;
            })
        );
    };

    const clearCart = () => {
        setCart([]);
        setAppliedCoupon(null);
        localStorage.removeItem(STORAGE_KEYS.CHECKOUT);
    };

    const getCartCount = () => {
        return cart.length;
    };

    const getCartOriginalTotal = () =>
        cart.reduce((total, item) => total + item.mrp * item.quantity, 0);

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + item.sellingPrice * item.quantity, 0);
    }

    const getCartDiscount = () => getCartOriginalTotal() - getCartTotal();

    const getCartWeight = () =>
        cart.reduce((total, item) => total + (item.weight! * item.quantity), 0);


    const applyCoupon = (coupon: Coupon) => {
        if (getCartTotal() < coupon.minOrder) {
            toast.error(`Minimum order of ₹${coupon.minOrder} required`);
            return;
        }
        setAppliedCoupon(coupon);
        toast.success("Coupon Applied!");
    };


    const removeCoupon = () => setAppliedCoupon(null);

    const getCouponDiscount = () => {
        if (!appliedCoupon) return 0;

        // AUTO-INVALIDATE if items were removed and total dropped below minimum
        if (getCartTotal() < appliedCoupon.minOrder) {
            return 0;
        }

        if (appliedCoupon.type === "FIXED_AMOUNT") {
            return appliedCoupon.value;
        }

        if (appliedCoupon.type === "PERCENTAGE") {
            const discount = (getCartTotal() * appliedCoupon.value) / 100;
            return appliedCoupon.maxDiscount ? Math.min(discount, appliedCoupon.maxDiscount) : discount;
        }

        return 0;
    };

    const getFinalTotal = () => {
        const total = getCartTotal() - getCouponDiscount();
        return Math.max(0, total);
    };

    if (!isHydrated) return null;

    return (
        <CartContext.Provider value={{
            cart, appliedCoupon, addToCart, removeFromCart, updateQuantity, getCartCount, getCartTotal, getCartOriginalTotal,
            getCartDiscount,
            applyCoupon,
            removeCoupon,
            getCouponDiscount,
            getCartWeight,
            getFinalTotal,
            saveCheckoutData,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
};



export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
