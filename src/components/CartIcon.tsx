"use client";

import React from "react";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "@/app/contexts/CartContext";

interface CartIconProps {
    isTransparent: boolean;
}

export default function CartIcon({ isTransparent }: CartIconProps) {
    const { getCartCount } = useCart();
    const cartCount = getCartCount();

    const iconColor = isTransparent 
            ? "text-white/90 group-hover:text-orange-300" 
            : "text-white/90 group-hover:text-orange-300";

    return (
        <Link href="/cart" className="relative group p-2">
            <FaShoppingCart className={`w-5 h-5 transition-colors duration-300 ${iconColor}`} />
            {cartCount > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 bg-[#FF8C42] text-white text-xs font-bold rounded-full transform translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform">
                    {cartCount}
                </span>
            )}
        </Link>
    )
}