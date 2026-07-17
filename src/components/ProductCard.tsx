"use client";

import React, { useState, MouseEvent } from "react";
import { IProduct } from "@/types/product";
import { useWishlist } from "@/app/contexts/WishlistContext";
import Link from "next/link";
import { Plus, Minus, Heart, ArrowRight } from "lucide-react";
import Image from "next/image";

interface ProductCardProps {
    product: IProduct;
    fromWishlist?: boolean;
}

export function ProductCard({ product }: ProductCardProps) {
    const { toggleWishlist, isProductInWishlist } = useWishlist();
    console.log("product:", product)

    // Logic to handle Variants vs Fixed Product
    const hasVariants = product.variants && product.variants.length > 0;

    // State: If variants exist, we track the index. If not, we track quantity.
    const [variantIndex, setVariantIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);

    // 1. Determine Display Weight
    const displayWeight = hasVariants
        ? product.variants[variantIndex].weight  // e.g., "250g"
        : `${(product.weight || 0) * quantity}G`; // e.g., "600G"

    // 2. Determine Display Price
    const displayPrice = hasVariants
        ? product.variants[variantIndex].sellingPrice
        : (product.sellingPrice || 0) * quantity;

    const displayMrp = hasVariants
        ? product.variants[variantIndex].mrp
        : (product.mrp || 0) * quantity;

    const discountPercentage =
        displayMrp > displayPrice
            ? Math.round(((displayMrp - displayPrice) / displayMrp) * 100)
            : 0;

    const isInWishlist = product._id ? isProductInWishlist(product._id.toString()) : false;

    const handleWishlistToggle = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        if (product._id) toggleWishlist(product._id.toString());
    };

    const handleAdjustment = (e: MouseEvent<HTMLButtonElement>, action: 'add' | 'sub') => {
        e.stopPropagation();
        e.preventDefault();

        if (hasVariants) {
            // Cycle through available variants (e.g., 250g -> 500g)
            if (action === 'add') {
                setVariantIndex((prev) => Math.min(prev + 1, product.variants.length - 1));
            } else {
                setVariantIndex((prev) => Math.max(0, prev - 1));
            }
        } else {
            // Fallback: Multiplier logic for products without variants
            if (action === 'add') {
                setQuantity((q) => q + 1);
            } else {
                setQuantity((q) => Math.max(1, q - 1));
            }
        }
    };

    // URL Construction: Pass the weight/variant selected to the detail page
    const detailUrl = `/products/${product.slug}?${hasVariants
        ? `weight=${product.variants[variantIndex].weight}`
        : `qty=${quantity}`
        }`;

    return (
        <Link href={detailUrl} className="group block h-full">
            <div className="relative flex h-full flex-col items-center bg-[#1b4332] rounded-[2.5rem] p-8 transition-all duration-700 hover:bg-[#0d3d32] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] border border-white/5 overflow-hidden">

                {/* Top Tag */}
                <div className="absolute top-6 left-8">
                    <span className="bg-[#b4d3b2] text-[#052c22] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                        {product.productType === "PACKAGE" ? "Special Pack" : "Pure Natural"}
                    </span>
                </div>

                {/* Wishlist Button */}
                <button
                    onClick={handleWishlistToggle}
                    className="absolute top-6 right-8 z-30 text-white/30 hover:text-[#d4af37] transition-colors"
                >
                    <Heart size={20} className={isInWishlist ? "fill-[#d4af37] text-[#d4af37]" : ""} />
                </button>

                {/* Header Section */}
                <div className="text-center mt-4 mb-8">
                    <div className="inline-block border border-white/20 rounded-full px-4 py-1 mb-4">
                        <span className="text-white/40 text-[9px] font-bold tracking-[0.2em] uppercase">
                            {product.sku}
                        </span>
                    </div>
                    <h3 className="text-white text-3xl font-serif tracking-tight leading-tight min-h-[4rem]">
                        {product.name}
                    </h3>
                </div>

                {/* Centered Image */}
                <div className="relative aspect-square w-full max-w-[200px] mb-10 transition-transform duration-1000 group-hover:scale-110">
                    <Image
                        src={product.images?.[0] || "/placeholder.png"}
                        alt={product.name}
                        fill
                        className="object-contain"
                        sizes="200px"
                    />
                </div>

                {/* Interactive Area */}
                <div className="w-full mt-auto flex flex-col items-center gap-6">

                    {/* Weight & Price Selector */}
                    <div className="flex items-center justify-between w-full bg-white/5 rounded-2xl p-2 border border-white/10">
                        <button
                            onClick={(e) => handleAdjustment(e, 'sub')}
                            className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl hover:bg-[#d4af37] hover:text-[#052c22] transition-all text-white/60"
                        >
                            <Minus size={14} />
                        </button>

                        <div className="text-center">
                            <div className="flex items-baseline justify-center gap-2">
                                <span className="text-md sm:text-lg font-black text-[#d4af37] tracking-tight">
                                    ₹ {displayPrice.toLocaleString()}
                                </span>

                                {displayMrp > displayPrice && (
                                    <span className="text-sm text-white/35 line-through">
                                        ₹ {displayMrp.toLocaleString()}
                                    </span>
                                )}
                            </div>

                            {displayMrp > displayPrice && (
                                <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#b4d3b2]">
                                    Save {discountPercentage}%
                                </div>
                            )}

                            <div className="mt-2 text-xs font-semibold text-white/90 tracking-wide">
                                {displayWeight}
                            </div>
                        </div>

                        <button
                            onClick={(e) => handleAdjustment(e, 'add')}
                            className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl hover:bg-[#d4af37] hover:text-[#052c22] transition-all text-white/60"
                        >
                            <Plus size={14} />
                        </button>
                    </div>

                    {/* Shop Now Button */}
                    <div className="w-full py-4 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 flex items-center justify-center gap-3 bg-white text-[#052c22] group-hover:bg-[#d4af37] shadow-xl">
                        View Details <ArrowRight size={14} />
                    </div>

                    {/* Subtle Subtext */}
                    <p className="text-white/20 text-[7px] font-bold tracking-widest uppercase text-center px-4">
                        {product.harvestRegion || "Sourced from Nature"}
                    </p>
                </div>
            </div>
        </Link>
    );
}