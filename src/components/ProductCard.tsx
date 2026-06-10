"use client";

import React, { useState, MouseEvent } from "react";
import { IProduct } from "@/types/product";
import { useWishlist } from "@/app/contexts/WishlistContext";
import { useCart } from "@/app/contexts/CartContext";
import Link from "next/link";
import { Plus, Minus, Heart, ArrowRight } from "lucide-react";
import Image from "next/image";


interface ProductCardProps {
    product: IProduct;
    fromWishlist?: boolean;
}

// Map slug to your actual images or keep the dynamic logic
const getProductImage = (img: string) => img || "/images/honey.png";

export function ProductCard({ product, fromWishlist = false }: ProductCardProps) {
    const { removeFromWishlist, toggleWishlist, isProductInWishlist } = useWishlist();
    const { addToCart } = useCart();

    const [quantity, setQuantity] = useState(1); // 1 unit = 50gm

    const baseWeight = product.weight || 50;
    const currentWeight = quantity * baseWeight;
    const currentPrice = quantity * product.sellingPrice;

    const isInWishlist = product._id
        ? isProductInWishlist(product._id)
        : false;


    // const handleCartClick = (e: MouseEvent<HTMLButtonElement>) => {
    //     e.stopPropagation();
    //     e.preventDefault();
    //     addToCart(product, quantity / 400); // Assuming 400g is 1 unit
    //     if (fromWishlist) {
    //         removeFromWishlist(product._id!);
    //     }
    //     setIsAdded(true);
    //     setTimeout(() => setIsAdded(false), 2000);
    // };

    const handleWishlistToggle = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        if (product._id) {
            toggleWishlist(product._id);
        }
    };

    const handleAdjustment = (e: MouseEvent<HTMLButtonElement>, action: 'add' | 'sub') => {
        e.stopPropagation();
        e.preventDefault();
        if (action === 'add') {
            setQuantity(q => q + 1);
        } else {
            setQuantity(q => Math.max(1, q - 1));
        }
    }

    return (
        <Link href={`/products/${product.slug}?qty=${quantity}`} className="group block h-full">
            <div className="relative flex h-full flex-col items-center bg-[#1b4332] rounded-[2.5rem] p-8 transition-all duration-700 hover:bg-[#0d3d32] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] overflow-hidden border border-white/5">

                {/* Top Tag */}
                <div className="absolute top-6 left-8">
                    <span className="bg-[#b4d3b2] text-[#052c22] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                        Limited
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
                        className="object-cover"
                    />
                </div>

                {/* Interactive Area */}
                <div className="w-full mt-auto flex flex-col items-center gap-6">

                    {/* Weight & Price Preview */}
                    <div className="flex items-center justify-between w-full bg-white/5 rounded-2xl p-2 border border-white/10">
                        <button
                            onClick={(e) => handleAdjustment(e, 'sub')}
                            className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl hover:bg-[#d4af37] hover:text-[#052c22] transition-all text-white/60"
                        >
                            <Minus size={14} />
                        </button>

                        <div className="text-center">
                            <span className="text-sm font-bold text-white block leading-none">{currentWeight}G</span>
                            <span className="text-[9px] text-[#d4af37] font-black tracking-widest uppercase">
                                ₹{currentPrice}
                            </span>
                        </div>

                        <button
                            onClick={(e) => handleAdjustment(e, 'add')}
                            className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl hover:bg-[#d4af37] hover:text-[#052c22] transition-all text-white/60"
                        >
                            <Plus size={14} />
                        </button>
                    </div>

                    {/* Shop Now Button (Navigates to Detail Page) */}
                    <div className="w-full py-4 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 flex items-center justify-center gap-3 bg-white text-[#052c22] group-hover:bg-[#d4af37] shadow-xl">
                        Shop Now <ArrowRight size={14} />
                    </div>

                    {/* Subtle Subtext */}
                    <p className="text-white/20 text-[7px] font-bold tracking-widest uppercase">
                        {product.harvestRegion || "Nature"}
                    </p>
                </div>
            </div>
        </Link>
    );
}