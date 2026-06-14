"use client";

import React, { useState } from "react";
import { Minus, Plus, Heart, ShoppingBag, ArrowRight } from "lucide-react";
import { IProduct } from "@/types/product";
import { useCart } from "@/app/contexts/CartContext";
import { useWishlist } from "@/app/contexts/WishlistContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { acceleratedValues } from "framer-motion";

export default function ProductActions({
    product,
    activeVariant,
    displayWeight,
    displayPrice,
    displayStock
}: {
    product: any;
    activeVariant: any;
    displayWeight: string;
    displayPrice: number;
    displayStock: number;
}) {
    const [quantity, setQuantity] = useState(1);
    const router = useRouter();
    const { addToCart, cart } = useCart();
    const { toggleWishlist, isProductInWishlist } = useWishlist();

    const isPackage = product.productType === "PACKAGE";
    const hasVariants = product.variants && product.variants.length > 0;
    const isOutOfStock = displayStock <= 0;

    // Check if this specific variant/product is in cart
    const isInCart = cart.some(item =>
        activeVariant
            ? (
                item._id === product._id &&
                item.selectedVariantId === activeVariant._id
            )
            : item._id === product._id
    );

    const handleWeightChange = (weight: string) => {
        setQuantity(1); // Reset quantity when size changes
        router.push(`?weight=${weight}`, { scroll: false });
    };

    const handleAddToCart = () => {
        if (isOutOfStock) return;

        const cartItem = activeVariant
            ? {
                ...product,

                sellingPrice: activeVariant.sellingPrice,
                mrp: activeVariant.mrp,
                stockQuantity: activeVariant.stockQuantity,

                selectedVariantId: activeVariant._id,
                selectedWeight: activeVariant.weight,
            }
            : {
                ...product,

                sellingPrice: product.sellingPrice,
                mrp: product.mrp,
                stockQuantity: product.stockQuantity,
            };

        addToCart(cartItem, quantity);
    };

    return (
        <div className="space-y-8 p-8 bg-white rounded-[2rem] text-[#052c22] shadow-xl">

            {/* 1. VARIANT SELECTOR (Only if Single Product) */}
            {hasVariants && (
                <div className="space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Select Jar Size</p>
                    <div className="flex gap-3">
                        {product.variants.map((v: any) => (
                            <button
                                key={v._id}
                                onClick={() => handleWeightChange(v.weight)}
                                className={`px-6 py-2 rounded-full border-2 text-[11px] font-black uppercase transition-all ${displayWeight === v.weight
                                    ? "border-[#d4af37] bg-[#d4af37] text-[#052c22]"
                                    : "border-stone-100 bg-stone-50 text-stone-400 hover:border-stone-200"
                                    }`}
                            >
                                {v.weight}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* 2. PRICE REFLECTION */}
            <div className="flex items-center justify-between border-y border-stone-100 py-6">
                <div>
                    <p className="text-[10px] font-black uppercase text-stone-400">Selection</p>
                    <p className="text-2xl font-serif">{isPackage ? "Complete Box" : displayWeight}</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-black uppercase text-stone-400">Subtotal</p>
                    <p className="text-2xl font-medium text-[#d4af37]">₹{(displayPrice * quantity).toLocaleString()}</p>
                </div>
            </div>

            {/* 3. QUANTITY SELECTOR */}
            <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest">Quantity</span>
                <div className="flex items-center gap-6 bg-stone-50 px-4 py-2 rounded-full border border-stone-200">
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="text-stone-400 hover:text-[#d4af37]"><Minus size={16} /></button>
                    <span className="font-bold text-lg">{quantity}</span>
                    <button
                        onClick={() => setQuantity(q => q + 1)}
                        disabled={quantity >= displayStock}
                        className="text-stone-400 hover:text-[#d4af37]"
                    >
                        <Plus size={16} />
                    </button>
                </div>
            </div>

            {/* 4. ACTIONS */}
            <div className="space-y-3">
                <button
                    disabled={isOutOfStock}
                    onClick={isInCart ? () => router.push('/cart') : handleAddToCart}
                    className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 transition-all ${isOutOfStock ? "bg-stone-200 text-stone-400" :
                        isInCart ? "bg-[#d4af37] text-[#052c22]" : "bg-[#052c22] text-white hover:bg-black"
                        }`}
                >
                    {isOutOfStock ? "Out of Stock" : isInCart ? <><ArrowRight size={16} /> View Cart</> : <><ShoppingBag size={16} /> Add to Selection</>}
                </button>

                <button
                    onClick={() => toggleWishlist(product._id)}
                    className="w-full py-4 text-[10px] font-black uppercase tracking-widest text-stone-400 hover:text-[#d4af37] transition-colors flex items-center justify-center gap-2"
                >
                    <Heart size={14} className={isProductInWishlist(product._id) ? "fill-[#d4af37] text-[#d4af37]" : ""} />
                    {isProductInWishlist(product._id) ? "Saved in Wishlist" : "Save for later"}
                </button>
            </div>
        </div>
    );
}