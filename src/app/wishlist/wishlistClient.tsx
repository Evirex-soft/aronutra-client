"use client";

import React, { useMemo } from "react";
import { useWishlist } from "@/app/contexts/WishlistContext";
import { IProduct } from "@/types/product";
import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";

interface WishlistClientViewProps {
    allProducts: IProduct[];
}

export default function WishlistClientView({ allProducts }: WishlistClientViewProps) {
    const { wishlist } = useWishlist();

    const wishlistedProducts = useMemo(() => {
        return allProducts.filter(product => wishlist.includes(product._id!));
    }, [allProducts, wishlist]);

    return (
        <section className="min-h-screen bg-[#052c22] pt-32 pb-24 px-6 lg:px-20 selection:bg-[#d4af37] selection:text-[#052c22]">
            <div className="max-w-[1400px] mx-auto">

                {/* Header Section */}
                <header className="mb-20">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-[1px] bg-[#d4af37]"></div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#d4af37]">
                            Curated Selection
                        </span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h1 className="text-5xl lg:text-7xl font-serif text-[#FDFCF8] mb-4">
                                Your Wishlist
                            </h1>

                        </div>

                        {wishlistedProducts.length > 0 && (
                            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d4af37] bg-white/5 border border-white/10 px-6 py-3 rounded-full">
                                {wishlistedProducts.length} Items Reserved
                            </div>
                        )}
                    </div>
                </header>

                {/* Products Grid or Empty State */}
                {wishlistedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {wishlistedProducts.map((product) => (
                            <div key={product._id} className="group transition-transform duration-500 hover:-translate-y-2">
                                <ProductCard
                                    product={product}
                                    fromWishlist={true}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Premium Empty State */
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="relative mb-10 inline-block">
                            {/* Subtle gold glow behind icon */}
                            <div className="absolute inset-0 bg-[#d4af37] blur-3xl opacity-10 rounded-full" />
                            <Heart
                                className="w-24 h-24 text-[#d4af37]/20 relative z-10"
                                strokeWidth={1}
                            />
                        </div>

                        <h2 className="text-3xl font-serif text-[#FDFCF8] mb-4">
                            Your Wishlist is Quiet
                        </h2>
                        <p className="text-white/40 font-light mb-12 max-w-md leading-relaxed">
                            You haven't saved any treasures yet. Explore our collection and find your perfect match.
                        </p>

                        <Link href="/collection" passHref>
                            <button className="flex items-center gap-3 bg-[#d4af37] text-[#052c22] font-bold py-5 px-12 rounded-full hover:bg-[#FDFCF8] transition-all duration-500 tracking-[0.2em] text-[10px] uppercase shadow-2xl">
                                Explore Collection <ArrowRight size={14} />
                            </button>
                        </Link>
                    </div>
                )}

                {/* Footer Accent */}
                {wishlistedProducts.length > 0 && (
                    <div className="mt-32 pt-12 border-t border-white/5 text-center">
                        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">
                            Pure • Raw • Sustainably Harvested
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}