import { getPackages, getSingleProducts } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import BannerActions from "@/components/BannerActions";
import { ArrowRight, Award, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function CollectionPage() {
    // 1. Fetch data separately
    const rawPackages = await getPackages();
    const rawSingles = await getSingleProducts();

    const packages = JSON.parse(JSON.stringify(rawPackages));
    const singles = JSON.parse(JSON.stringify(rawSingles));

    const discoveryPackage = packages[0];

    const bundlePrice = discoveryPackage?.sellingPrice || singles
        .slice(0, 12)
        .reduce((sum: number, product: any) => sum + (product.sellingPrice || 0), 0);

    const bundleMrp = discoveryPackage?.mrp || singles
        .slice(0, 12)
        .reduce((sum: number, product: any) => sum + (product.mrp || 0), 0);

    return (
        <div className="pt-32 pb-24 bg-[#052c22] min-h-screen">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-20">

                {/* THE PACKAGE BANNER - Only show if a package exists */}
                {discoveryPackage && (
                    <section className="mb-24 relative">
                        <div className="bg-[#FFFDF8] border border-[#E8D9A8]/40 rounded-[3rem] p-8 lg:p-12 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.08)] relative">

                            {/* Decorative Background Circles */}
                            <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl -mr-20 -mt-20" />
                            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#052c22]/5 rounded-full blur-3xl -ml-20 -mb-20" />

                            <div className="relative z-10">
                                {/* Top Part: Two Columns */}
                                <div className="grid lg:grid-cols-[1fr_450px] gap-12 items-center mb-12">

                                    {/* Left: Text Content */}
                                    <div className="space-y-6">
                                        <div className="inline-flex items-center gap-3 bg-[#052c22] text-white px-5 py-2 rounded-full">
                                            <Award size={14} className="text-[#d4af37]" />
                                            <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                                                {discoveryPackage.productType || "The Signature Collection"}
                                            </span>
                                        </div>

                                        <h2 className="text-4xl lg:text-6xl font-serif text-[#052c22] leading-tight">
                                            {discoveryPackage.name}
                                        </h2>

                                        <p className="text-[#052c22]/70 text-base lg:text-lg font-light italic max-w-xl leading-relaxed">
                                            {discoveryPackage.shortDescription}
                                        </p>

                                        <div className="grid grid-cols-2 gap-4 max-w-md">
                                            {["12 Unique Jars", "50g Per Variety", "Signature Gift Box", "Limited Harvest"].map((feat) => (
                                                <div key={feat} className="flex items-center gap-2 text-[#052c22] text-[9px] font-black uppercase tracking-widest">
                                                    <CheckCircle2 size={12} className="text-[#d4af37]" />
                                                    {feat}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Right: Product Image */}
                                    <div className="flex justify-center lg:justify-end">
                                        <Image
                                            src={discoveryPackage.images[0] || "/images/packet.png"}
                                            alt={discoveryPackage.name}
                                            width={800}
                                            height={800}
                                            className="w-full max-w-[450px] md:max-w-[550px] lg:max-w-[650px] xl:max-w-[750px] h-auto object-contain rounded-4xl drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
                                        />
                                    </div>
                                </div>

                                {/* Bottom Part: Action Bar (Centered and Compact) */}
                                <div className="max-w-4xl mx-auto">
                                    <BannerActions product={discoveryPackage} />
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* GRID HEADER */}
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

                {/* PRODUCT GRID - Now only showing Single products */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10">
                    {singles.map((product: any) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}