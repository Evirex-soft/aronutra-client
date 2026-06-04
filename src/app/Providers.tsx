"use client";

import { SessionProvider } from "next-auth/react";
import { WishlistProvider }from "./contexts/WishlistContext";
import { CartProvider } from "./contexts/CartContext";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <WishlistProvider>
                <CartProvider>{children}</CartProvider>
            </WishlistProvider>
        </SessionProvider>
    );
}