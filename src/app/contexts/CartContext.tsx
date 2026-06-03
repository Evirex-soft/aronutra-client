"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { IProduct } from "../../../types/product";
import { toast } from "react-toastify";
import { STORAGE_KEYS } from "../../constants/storage";

export interface CartItem extends IProduct {
    quantity: number;
}

export interface Coupon {
    id: string;
    code: string;
    title: string;
    description: string;
    discount: number;
    discountType: "percentage" | "fixed";
    minimumAmount: number;
    maxDiscount?: number;
    expiryDate: string;
    isActive: boolean;
}

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

    // Load cart from local storage on initial mount
    useEffect(() => {
        try {
            const storedData = localStorage.getItem(STORAGE_KEYS.CHECKOUT);
            if (storedData) {
                const parsed = JSON.parse(storedData);
                setCart(parsed.cart || []);
                setAppliedCoupon(parsed.appliedCoupon || null);
            }
        } catch (error) {
            console.error("Failed to parse cart from local storage", error);
        }
    }, []);

    // Save cart to local storage
    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify({ cart, appliedCoupon }));
    }, [cart, appliedCoupon]);


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


    const applyCoupon = (coupon: Coupon) => setAppliedCoupon(coupon);

    const removeCoupon = () => setAppliedCoupon(null);

    const getCouponDiscount = () => {
        if (!appliedCoupon) return 0;
        if (appliedCoupon.discountType === "fixed") {
            return appliedCoupon.discount;
        } else {
            const percentageDiscount = (getCartTotal() * appliedCoupon.discount) / 100
            return appliedCoupon.maxDiscount ? Math.min(percentageDiscount, appliedCoupon.maxDiscount) : percentageDiscount;
        }
    }

    const getFinalTotal = () => getCartTotal() - getCouponDiscount();

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
