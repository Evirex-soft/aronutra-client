"use client";

import React, { useState } from "react";
import { Minus, Plus, Heart, ShoppingBag, ArrowRight } from "lucide-react";
import { IProduct } from "@/types/product";
import { useCart } from "@/app/contexts/CartContext";
import { useWishlist } from "@/app/contexts/WishlistContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ProductActions({ product, initialQuantity }: { product: IProduct; initialQuantity: number }) {
    const [quantity, setQuantity] = useState(initialQuantity);
    const { addToCart, cart } = useCart();
    const { toggleWishlist, isProductInWishlist } = useWishlist();
    const router = useRouter();

    const isInCart = cart.some((item) => item._id === product._id);
    const inWishlist = product._id ? isProductInWishlist(product._id) : false;

    const baseWeight = product.weight || 50;
    const isBundle = product.productType === "BUNDLE";
    const isOutOfStock = !product.stockQuantity || product.stockQuantity <= 0;

    const jarWeight = isBundle ? 50 : baseWeight;

    const currentWeight = quantity * baseWeight;
    const currentPrice = quantity * product.sellingPrice;

    const handleIncrease = () => {
        if (product.stockQuantity !== undefined && quantity >= product.stockQuantity) {
            toast.error(`Limit reached: Only ${product.stockQuantity} jars available.`);
            return;
        }
        setQuantity((prev) => prev + 1);
    };

    const handleDecrease = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    };

    const handleMainAction = () => {
        if (isOutOfStock) return;

        if (isInCart) {
            router.push("/cart");
        } else {
            addToCart(product, quantity);
        }
    }


    const getButtonLabel = () => {
        if (isOutOfStock) return "Currently Out of Stock";
        if (isInCart) return "View in Cart";

        if (isBundle) {
            return quantity === 1
                ? "Add Package to Selection"
                : `Add ${quantity} Packages to Selection`;
        }

        return quantity === 1
            ? "Add Jar to Selection"
            : `Add ${quantity} Jars to Selection`;
    };


    return (
        <div className="space-y-8 p-8 bg-white rounded-[2rem] border border-stone-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] text-[#052c22]">

            {/* Price & Weight Reflection */}
            <div className="flex items-center justify-between border-b border-stone-100 pb-6">
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-1">
                        {isBundle ? "Package" : "Jar"}
                    </p>

                    <p className="text-3xl font-serif text-[#052c22]">
                        {isBundle
                            ? `${quantity} Package${quantity > 1 ? "s" : ""}`
                            : `${jarWeight}g`}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-1">
                        Subtotal
                    </p>
                    <p className="text-3xl font-medium text-[#d4af37]">₹{currentPrice}</p>
                </div>
            </div>

            {/* Quantity Selector */}
            <div className={`flex items-center justify-between ${isInCart ? 'opacity-50 pointer-events-none' : ''}`}>
                <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#052c22]">
                        Select Quantity
                    </span>
                    <p className="text-[10px] text-stone-400 italic">
                        {isBundle
                            ? "12 unique honey varieties • 50g each"
                            : `${jarWeight}g per jar`}
                    </p>
                </div>

                <div className="flex items-center gap-6 bg-stone-50 px-6 py-3 rounded-full border border-stone-200">
                    <button
                        onClick={handleDecrease}
                        className="text-stone-400 hover:text-[#d4af37] transition-colors"
                    >
                        <Minus size={16} />
                    </button>

                    <div className="flex flex-col items-center min-w-[30px]">
                        <span className="font-bold text-lg leading-none">{quantity}</span>
                        <span className="text-[8px] uppercase font-black text-stone-400">{isBundle ? "Box" : "Jar"}</span>
                    </div>

                    <button
                        onClick={handleIncrease}
                        className="text-stone-400 hover:text-[#d4af37] transition-colors"
                        disabled={product.stockQuantity !== undefined && quantity >= product.stockQuantity}
                    >
                        <Plus size={16} />
                    </button>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4">
                <button
                    onClick={handleMainAction}
                    disabled={isOutOfStock}
                    className={`
                w-full flex items-center justify-center gap-3 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] transition-all duration-500 shadow-xl
                ${isOutOfStock
                            ? "bg-stone-200 text-stone-400 cursor-not-allowed"
                            : isInCart
                                ? "bg-[#d4af37] text-[#052c22] hover:bg-[#c4a030]" // Different style for "Go to Cart"
                                : "bg-[#052c22] text-white hover:bg-black"
                        }
                        active:scale-95
            `}
                >
                    {/* Show icon only if in stock */}
                    {isOutOfStock ? null : isInCart ? <ArrowRight size={16} /> : <ShoppingBag size={16} />}

                    {getButtonLabel()}
                </button>

                {/* Stock Warning Text */}
                <div className="text-center mt-2 h-4">
                    {!isOutOfStock && product.stockQuantity < 10 && !isInCart && (
                        <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest flex items-center justify-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                            Low Stock: Only {product.stockQuantity} left
                        </p>
                    )}
                </div>

                <button
                    onClick={() => product._id && toggleWishlist(product._id)}
                    className={`
                        w-full flex items-center justify-center gap-2 border-2 font-black uppercase tracking-[0.2em] text-[11px] py-5 rounded-2xl transition-all duration-500
                        ${inWishlist
                            ? "bg-stone-50 border-stone-100 text-[#d4af37]"
                            : "bg-white border-stone-100 hover:border-[#d4af37]/30 text-[#052c22]"}
                    `}
                >
                    <Heart size={14} className={inWishlist ? "fill-[#d4af37] text-[#d4af37]" : ""} />
                    {inWishlist ? "In Wishlist" : "Save for later"}
                </button>
            </div>



        </div>
    );
}