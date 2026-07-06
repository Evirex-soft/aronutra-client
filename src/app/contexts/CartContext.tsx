"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { IProduct } from "@/types/product";
import { toast } from "react-toastify";
import { STORAGE_KEYS } from "@/constants/storage";

export interface CartItem extends IProduct {
    quantity: number;

    selectedVariantId?: string;
    selectedWeight?: string;
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
    addToCart: (product: CartItem, quantity?: number) => void;
    buyNow: (product: CartItem) => void;
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


    const addToCart = (product: CartItem, quantity: number = 1) => {
        if (product.stockQuantity <= 0) {
            toast.error(`Sorry, ${product.name} is currently out of stock.`);
            return;
        }

        setCart((prevCart) => {
            const existingItem = prevCart.find(item => {
                if (product.selectedVariantId) {
                    return (
                        item._id === product._id &&
                        item.selectedVariantId === product.selectedVariantId
                    );
                }

                return item._id === product._id;
            });

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

                return prevCart.map((item) => {
                    const isSameItem = product.selectedVariantId
                        ? (
                            item._id === product._id &&
                            item.selectedVariantId === product.selectedVariantId
                        )
                        : item._id === product._id;

                    return isSameItem
                        ? { ...item, quantity: newQuantity }
                        : item;
                });
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

    const removeFromCart = (
        productId: string,
        variantId?: string
    ) => {
        setCart(prev => {

            const itemToRemove = prev.find(item =>
                variantId
                    ? (
                        item._id === productId &&
                        item.selectedVariantId === variantId
                    )
                    : item._id === productId
            );

            if (itemToRemove) {
                toast.info(
                    `${itemToRemove.name} removed from cart`
                );
            }

            return prev.filter(item => {
                if (variantId) {
                    return !(
                        item._id === productId &&
                        item.selectedVariantId === variantId
                    );
                }

                return item._id !== productId;
            });
        });
    };

    const updateQuantity = (productId: string, quantity: number, variantId?: string) => {
        setCart(prev =>
            prev.map(item => {

                const isTarget = variantId
                    ? (
                        item._id === productId &&
                        item.selectedVariantId === variantId
                    )
                    : item._id === productId;

                if (!isTarget) return item;

                const newQty = Math.max(1, quantity);

                if (newQty > item.stockQuantity) {
                    toast.warning(
                        `Maximum available stock (${item.stockQuantity}) reached`
                    );

                    return {
                        ...item,
                        quantity: item.stockQuantity
                    };
                }

                return {
                    ...item,
                    quantity: newQty
                };
            })
        );
    };


    const buyNow = (product: CartItem, quantity: number = 1) => {
        const existingItem = cart.find(item =>
            product.selectedVariantId
                ? (item._id === product._id && item.selectedVariantId === product.selectedVariantId)
                : item._id === product._id
        );

        let updatedCart: CartItem[];

        if (existingItem) {
            updatedCart = cart.map(item => {
                const isSame = product.selectedVariantId
                    ? (item._id === product._id && item.selectedVariantId === product.selectedVariantId)
                    : item._id === product._id;
                return isSame ? { ...item, quantity: item.quantity + quantity } : item;
            });
        } else {
            updatedCart = [...cart, { ...product, quantity }];
        }

        // Update the actual state for the rest of the app
        setCart(updatedCart);

        // Manually calculate totals using 'updatedCart' 
        const originalTotal = updatedCart.reduce((total, item) => total + item.mrp * item.quantity, 0);
        const cartTotal = updatedCart.reduce((total, item) => total + item.sellingPrice * item.quantity, 0);
        const discount = originalTotal - cartTotal;

        const checkoutData = {
            cart: updatedCart,
            appliedCoupon,
            totals: {
                originalTotal,
                cartTotal,
                discount,
                couponDiscount: getCouponDiscount(), // This is fine if coupon doesn't change
                finalTotal: cartTotal - getCouponDiscount(),
            },
            savedAt: new Date().toISOString(),
        };

        // 4. Save to localStorage immediately so the next page finds it
        localStorage.setItem(STORAGE_KEYS.CHECKOUT, JSON.stringify(checkoutData));
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

    const extractWeight = (weight: string) =>
        Number(weight.replace("g", ""));

    const getCartWeight = () =>
        cart.reduce((total, item) => {

            const weight =
                item.selectedWeight
                    ? extractWeight(item.selectedWeight)
                    : item.weight || 0;

            return total + weight * item.quantity;

        }, 0);


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
            cart, appliedCoupon, addToCart, buyNow, removeFromCart, updateQuantity, getCartCount, getCartTotal, getCartOriginalTotal,
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
