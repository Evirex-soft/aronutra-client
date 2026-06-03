"use client";

import { STORAGE_KEYS } from "@/constants/storage";
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { toast } from "react-toastify";

interface WishlistContextype {
    wishlist: string[];
    toggleWishlist: (productId: string) => void;
    isProductInWishlist: (productId: string) => boolean;
    removeFromWishlist: (productId: string) => void;
}

// Create the context
const WishlistContext = createContext<WishlistContextype | undefined>(undefined);

// Provider component
export const WishlistProvider = ({ children }: { children: ReactNode }) => {
    const [wishlist, setWishlist] = useState<string[]>([]);
    const WISHLIST_STORAGE_KEY = STORAGE_KEYS.WISHLIST;

    // Load from local storage on initial mount
    useEffect(() => {
        try {
            const storedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
            if (storedWishlist) {
                setWishlist(JSON.parse(storedWishlist));
            }
        } catch (error) {
            console.error("Failed to parse wishlist from localStorage", error);
        }
    }, []);

    // Save wishlist to local storage
    useEffect(() => {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    }, [wishlist]);

    const toggleWishlist = (productId: string) => {
        setWishlist((prevWishlist) => {
            if (prevWishlist.includes(productId)) {
                // remove from wishlist
                toast.info("Removed from wishlist");
                return prevWishlist.filter((id) => id !== productId);
            } else {
                // add to wishlist
                toast.success("Added to wishlist!");
                return [...prevWishlist, productId];
            }
        })
    };

    const isProductInWishlist = (productId: string) => {
        return wishlist.includes(productId);
    };

    const removeFromWishlist = (productId: string) => {
        setWishlist((prev) => prev.filter((id) => id !== productId));
    };

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist, isProductInWishlist, removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    )
};

// custom hook
export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error("useWishlist must be used within a wishlistProvider")
    }
    return context;
}