"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Minus, Plus, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart, CartItem } from "@/app/contexts/CartContext";

export default function BannerActions({ product }: { product: any }) {
    const router = useRouter();
    const { buyNow } = useCart() as any;
    const [quantity, setQuantity] = useState(1);

    const currentSellingPrice = (product.sellingPrice || 0) * quantity;
    const currentMrp = (product.mrp || 0) * quantity;

    const discountPercentage =
        product.mrp && product.sellingPrice
            ? Math.round(((product.mrp - product.sellingPrice) / product.mrp) * 100)
            : 0;

    const onBuyNow = () => {
        const item: CartItem = {
            ...product,
            quantity: quantity,
            selectedWeight: product.variants?.[0]?.weight || (product.weight ? `${product.weight}g` : "Standard"),
            selectedVariantId: product.variants?.[0]?._id || undefined
        };
        buyNow(item, quantity);
        router.push("/cart-checkout-address");
    };

    return (
        <div className="w-full bg-[#fcfaf6]/60 backdrop-blur-md border border-[#E8D9A8]/50 rounded-[2rem] px-5 py-4 md:px-8 shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">

                {/* 1. Price Section */}
                <div className="flex flex-col items-center md:items-start min-w-fit">
                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-[#d4af37]">Price</span>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl md:text-3xl font-bold text-[#052c22]">
                            ₹{currentSellingPrice.toLocaleString()}
                        </span>
                        {currentMrp > currentSellingPrice && (
                            <span className="text-xs text-[#052c22]/30 line-through">
                                ₹{currentMrp.toLocaleString()}
                            </span>
                        )}
                    </div>
                    {discountPercentage > 0 && (
                        <div className="mt-2 inline-flex items-center rounded-full bg-[#d4af37] px-3 py-1">
                            <span className="text-[10px] font-black uppercase tracking-wider text-[#052c22]">
                                Save {discountPercentage}% OFF
                            </span>
                        </div>
                    )}
                </div>

                {/* 2. Controls Area */}
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">

                    {/* Compact Quantity Selector */}
                    <div className="flex items-center justify-between sm:justify-start bg-white border border-[#E8D9A8]/40 rounded-xl h-11 w-full sm:w-auto">
                        <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 hover:text-[#d4af37] transition-colors"><Minus size={14} /></button>
                        <span className="w-8 text-center font-bold text-[#052c22] text-sm">{quantity}</span>
                        <button onClick={() => setQuantity(q => q + 1)} className="px-3 hover:text-[#d4af37] transition-colors"><Plus size={14} /></button>
                    </div>

                    {/* Buttons Row */}
                    <div className="grid grid-cols-2 gap-2 w-full sm:flex sm:w-auto">
                        <Link
                            href={`/products/${product.slug}`}
                            className="flex items-center justify-center gap-2 px-4 h-11 bg-white border border-[#E8D9A8]/60 text-[#052c22] rounded-xl font-bold uppercase tracking-widest text-[9px] hover:bg-[#052c22] hover:text-white transition-all whitespace-nowrap"
                        >
                            <Eye size={12} />
                            <span>View Details</span>
                        </Link>

                        <button
                            onClick={onBuyNow}
                            className="flex items-center justify-center gap-2 px-6 h-11 bg-[#d4af37] text-[#052c22] rounded-xl font-bold uppercase tracking-widest text-[9px] hover:shadow-md transition-all active:scale-95 whitespace-nowrap"
                        >
                            <span>Shop Now</span>
                            <ArrowRight size={12} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}