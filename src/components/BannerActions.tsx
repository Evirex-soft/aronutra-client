"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart, CartItem } from "@/app/contexts/CartContext";

export default function BannerActions({ product }: { product: any }) {
    const router = useRouter();
    const { buyNow } = useCart() as any;

    const handleBuyNow = () => {
        const itemToBuy: CartItem = {
            ...product,
            quantity: 1,
            selectedWeight: product.variants?.[0]?.weight || (product.weight ? `${product.weight}g` : "Standard"),
            selectedVariantId: product.variants?.[0]?._id || undefined
        };

        // Add to cart 
        buyNow(itemToBuy);

        // Redirect
        router.push("/cart-checkout-address");
    };

    return (
        <div className="flex flex-col sm:flex-row gap-4 w-full">
            {/* View Details - Secondary Button */}
            <Link
                href={`/products/${product.slug}`}
                className="flex-1 bg-white/10 border border-white/20 text-white py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white/20 transition-all flex items-center justify-center gap-3 active:scale-95"
            >
                View Details
            </Link>

            {/* Shop Now - Primary Action */}
            <button
                onClick={handleBuyNow}
                className="flex-1 bg-[#d4af37] text-[#052c22] py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95"
            >
                Shop Now
                <ArrowRight size={14} />
            </button>
        </div>
    );
}