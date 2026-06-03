import { getProducts } from "@/lib/getProducts";
import { ProductCard } from "@/components/ProductCard";
import { ArrowRight, Award, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function CollectionPage() {
    const products = await getProducts();

    // DYNAMIC PRICE CALCULATION
    const bundlePrice = products
        .slice(0, 12)
        .reduce((sum, product) => sum + (product.sellingPrice || 0), 0);

    const bundleMrp = products
        .slice(0, 12)
        .reduce((sum, product) => sum + (product.mrp || 0), 0);

    return (
        <div className="pt-32 pb-24 bg-[#052c22] min-h-screen">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-20">

                {/* 1. THE PACKAGE BANNER (Above the Grid) */}
                <section className="mb-24 relative">
                    <div className="bg-[#FFFDF8] border border-[#E8D9A8]/40 rounded-[3rem] p-8 lg:p-16 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.08)] relative group">

                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl -mr-20 -mt-20" />
                        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#052c22]/5 rounded-full blur-3xl -ml-20 -mb-20" />

                        <div className="grid lg:grid-cols-[1fr_auto_auto] gap-12 items-center">

                            {/* Content */}
                            <div className="space-y-8 relative z-10">
                                <div className="inline-flex items-center gap-3 bg-[#052c22] text-white px-5 py-2 rounded-full">
                                    <Award size={14} className="text-[#d4af37]" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                                        The Signature Collection
                                    </span>
                                </div>

                                <h2 className="text-5xl lg:text-7xl font-serif text-[#052c22] leading-[1.1] tracking-tight">
                                    The Discovery Collection
                                </h2>

                                <p className="text-[#052c22]/70 text-lg lg:text-xl font-light italic max-w-xl leading-relaxed">
                                    Experience the full artisanal spectrum. A curated package
                                    containing one 50g jar of every unique monofloral variety we harvest.
                                </p>

                                <div className="grid grid-cols-2 gap-y-4 gap-x-8 max-w-md">
                                    {[
                                        "12 Unique Jars",
                                        "50g Per Variety",
                                        "Signature Gift Box",
                                        "Limited Harvest",
                                    ].map((feat) => (
                                        <div
                                            key={feat}
                                            className="flex items-center gap-2 text-[#052c22] text-[10px] font-black uppercase tracking-widest"
                                        >
                                            <CheckCircle2 size={14} className="text-[#d4af37]" />
                                            {feat}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Product Image */}
                            <div className="relative z-10 flex justify-center">
                                <Image
                                    src="/images/packet.png"
                                    alt="Discovery Collection"
                                    width={450}
                                    height={450}
                                    className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.15)] hover:scale-105 transition-transform duration-700"
                                />
                            </div>

                            {/* Price Card */}
                            <div className="w-full lg:w-auto relative z-10">
                                <div className="bg-[#052c22] p-10 lg:p-12 rounded-[2.5rem] text-white text-center shadow-2xl lg:min-w-[320px]">

                                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4af37] mb-4">
                                        Complete Package
                                    </p>

                                    <div className="space-y-1 mb-10">
                                        <p className="text-5xl font-light">
                                            ₹{bundlePrice.toLocaleString()}
                                        </p>

                                        <p className="text-white/30 line-through text-sm tracking-widest">
                                            ₹{bundleMrp.toLocaleString()}
                                        </p>
                                    </div>

                                    <Link
                                        href="/products/discovery-collection"
                                        className="w-full bg-[#d4af37] text-[#052c22] py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:bg-white transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95"
                                    >
                                        Shop Now <ArrowRight size={14} />
                                    </Link>

                                    <p className="mt-6 text-[9px] text-white/40 uppercase tracking-[0.2em]">
                                        Includes complimentary delivery
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* 2. GRID HEADER */}
                <header className="mb-20">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-[1px] bg-[#d4af37]"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#d4af37]">
                            Individual Varieties
                        </span>
                    </div>
                    <h2 className="font-m text-4xl md:text-5xl text-white tracking-tight">
                        Single-Origin Jars
                    </h2>
                </header>

                {/* 3. PRODUCT GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}