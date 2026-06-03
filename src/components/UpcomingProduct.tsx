"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MoveRight, ShieldCheck, Droplets, Star } from "lucide-react";

const products = [
    {
        id: 1,
        title: "AroNutra Berry Honey",
        image: "/images/menu_img.jpg",
        tags: ["Organic", "Raw", "Natural"],
        description:
            "Crafted from nectar gathered around wild berry blossoms, this honey offers a delicate sweetness with subtle fruity undertones. Naturally raw and unprocessed, it captures the pure essence of nature in every spoonful.",
    },
    {
        id: 2,
        title: "AroNutra Eucalyptus Honey",
        image: "/images/eucal.png",
        tags: ["Premium", "Raw", "Wild"],
        description:
            "Harvested from pristine eucalyptus-rich landscapes, this variety is known for its refreshing aroma and smooth character. Its naturally balanced flavor makes it a perfect companion for daily wellness and mindful living.",
    },
    {
        id: 3,
        title: "AroNutra Wayanadan Honey",
        image: "/images/wayanad.png",
        tags: ["Wild", "Organic", "Pure"],
        description:
            "Collected from the lush forests of Wayanad, this honey reflects the richness of one of India's most biodiverse regions. Deep in flavor and naturally nutrient-rich, it delivers an authentic taste of the Western Ghats.",
    },
];

const UpcomingProduct = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center px-4 md:px-8 py-12 lg:py-20 bg-[#fdfcf9]">
            {/* BACKGROUND DECOR */}
            <div className="absolute top-[-5%] right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-amber-100/40 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-5%] left-[-10%] w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-stone-200/30 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />

            {/* HEADER */}
            <div className="relative z-20 w-full max-w-7xl mb-10 md:mb-16 text-center lg:text-left">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center lg:justify-start gap-3 mb-3"
                >
                    <span className="h-[1px] w-6 bg-amber-800"></span>
                    <h4 className="text-amber-800 font-bold tracking-[0.2em] text-[10px] uppercase">New Collection</h4>
                </motion.div>
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-[#1a2419] leading-[1.1]">
                    Upcoming <br className="hidden md:block" /> Releases
                </h2>
            </div>

            {/* MAIN CONTENT */}
            <div className="relative z-10 w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">

                {/* IMAGE STACK - Responsive Positioning */}
                <div className="relative h-[350px] sm:h-[450px] lg:h-[550px] w-full lg:w-[55%] flex items-center justify-center lg:justify-start">
                    {products.map((product, index) => {
                        // Responsive positions: Closer together on mobile, spread out on desktop
                        const positions = [
                            { mobile: "10%", desktop: "0%", bottom: "12%", scale: 0.8, z: 10, opacity: 0.5 },
                            { mobile: "25%", desktop: "20%", bottom: "6%", scale: 0.9, z: 20, opacity: 0.7 },
                            { mobile: "40%", desktop: "45%", bottom: "0%", scale: 1.05, z: 30, opacity: 1 },
                        ];

                        const pos = positions[index];
                        const isActive = activeIndex === index;

                        return (
                            <motion.div
                                key={product.id}
                                onClick={() => setActiveIndex(index)}
                                initial={false}
                                animate={{
                                    scale: isActive ? pos.scale + 0.05 : pos.scale,
                                    opacity: isActive ? 1 : pos.opacity,
                                    // Use a CSS variable or dynamic calculation for responsive "left"
                                    x: isActive ? 5 : 0
                                }}
                                className="absolute cursor-pointer transition-all duration-500 ease-out"
                                style={{
                                    left: typeof window !== 'undefined' && window.innerWidth < 1024 ? pos.mobile : pos.desktop,
                                    bottom: pos.bottom,
                                    zIndex: isActive ? 40 : pos.z,
                                    transformOrigin: "bottom center"
                                }}
                            >
                                <div className={`
                                    relative p-4 md:p-6 rounded-[30px] md:rounded-[40px] border transition-all duration-500
                                    ${isActive
                                        ? "bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)] border-amber-200/50"
                                        : "bg-white/40 backdrop-blur-md border-white/60 shadow-lg"
                                    }
                                `}>
                                    <div className="relative aspect-[3/4] w-28 sm:w-40 md:w-48 lg:w-56 flex items-center justify-center">
                                        <Image
                                            src={product.image}
                                            alt={product.title}
                                            fill
                                            className="object-contain drop-shadow-xl"
                                        />
                                    </div>

                                    {isActive && (
                                        <motion.div
                                            layoutId="active-ring"
                                            className="absolute -inset-1.5 rounded-[35px] md:rounded-[45px] border-2 border-amber-500/20 pointer-events-none"
                                        />
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* DESCRIPTION CARD */}
                <div className="w-full lg:w-[460px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4 }}
                            className="relative rounded-[32px] md:rounded-[40px] border border-white bg-white/70 backdrop-blur-3xl p-7 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)]"
                        >
                            {/* RATING & LABEL */}
                            <div className="flex items-center gap-2 mb-5">
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={10} className="fill-amber-500 text-amber-500" />
                                    ))}
                                </div>
                                <span className="text-[9px] font-bold text-stone-400 tracking-[0.15em] uppercase">
                                    Premium Grade
                                </span>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-serif text-[#1a2419] leading-snug">
                                {products[activeIndex].title}
                            </h2>

                            {/* TAGS */}
                            <div className="flex flex-wrap gap-2 mt-5">
                                {products[activeIndex].tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 rounded-full border border-stone-100 bg-white/50 text-[8px] md:text-[9px] font-bold uppercase tracking-wider text-stone-500"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <p className="mt-6 text-stone-500 leading-relaxed text-sm md:text-base">
                                {products[activeIndex].description}
                            </p>

                            {/* INFO GRID */}
                            <div className="mt-8 border-t border-stone-100 pt-7 space-y-5">
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 p-2 bg-amber-50 rounded-xl text-amber-700">
                                        <ShieldCheck size={18} />
                                    </div>
                                    <div>
                                        <h4 className="text-xs md:text-sm font-bold text-stone-800 uppercase tracking-tight">Origin Certified</h4>
                                        <p className="text-[11px] md:text-xs text-stone-500 mt-0.5">Sustainable apiaries from protected lands.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="mt-1 p-2 bg-stone-50 rounded-xl text-stone-700">
                                        <Droplets size={18} />
                                    </div>
                                    <div>
                                        <h4 className="text-xs md:text-sm font-bold text-stone-800 uppercase tracking-tight">Pure & Raw</h4>
                                        <p className="text-[11px] md:text-xs text-stone-500 mt-0.5">Zero processing, unheated, unfiltered.</p>
                                    </div>
                                </div>
                            </div>

                            {/* CTA BUTTON */}
                            <button
                                className="mt-8 md:mt-10 w-full group relative overflow-hidden rounded-2xl bg-[#1a2419] py-4 md:py-5 px-8 flex items-center justify-between text-white transition-transform active:scale-[0.98]"
                            >
                                <span className="relative z-10 uppercase tracking-widest text-[10px] md:text-xs font-bold">Notify Me on Launch</span>
                                <MoveRight className="relative z-10 group-hover:translate-x-2 transition-transform" size={18} />
                                <div className="absolute inset-0 bg-[#2d3a2c] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300" />
                            </button>
                        </motion.div>
                    </AnimatePresence>

                    {/* PAGINATION DOTS (MOBILE VISIBILITY) */}
                    <div className="flex justify-center lg:justify-start gap-3 mt-8">
                        {products.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveIndex(i)}
                                className={`h-1 rounded-full transition-all duration-500 ${activeIndex === i ? "w-10 bg-amber-800" : "w-2 bg-stone-300"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UpcomingProduct;