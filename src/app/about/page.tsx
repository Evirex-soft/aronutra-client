"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Leaf, ShieldCheck, Zap, Heart, Users, Compass } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="bg-[#052c22] text-white selection:bg-emerald-700 font-sans">

            {/* --- HERO SECTION --- */}
            <section className="relative pt-32 pb-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-center space-y-6"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full border border-white/20 text-[11px] font-bold tracking-[0.2em] uppercase text-emerald-300">
                            Our Story
                        </span>
                        <h1 className="text-5xl md:text-7xl font-serif leading-[1.1] tracking-tight text-white">
                            Rooted in Nature, <br />
                            <span className="italic text-emerald-300">Refined by Science.</span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-lg text-white/70 font-light leading-relaxed">
                            From the mist-shrouded peaks of Wayanad to your daily ritual—we bridge the gap between ancient botanical wisdom and modern nutritional needs.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* --- IMAGE & VISION SPLIT --- */}
            <section className="pb-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-sm"
                        >
                            <Image
                                src="/images/about_img.png" // Ensure this path is correct
                                alt="Wayanad Landscape"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-emerald-950/10 mix-blend-multiply" />
                        </motion.div>

                        <div className="space-y-12">
                            <div className="space-y-6">
                                <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-white">The Wayanadan Spirit</h2>
                                <p className="text-white/70 leading-relaxed text-lg">
                                    AroNutra was born in 2024 amidst the fertile biodiversity of the Western Ghats. We witnessed the raw power of wholesome ingredients and realized that the modern world had lost its connection to true nourishment.
                                </p>
                                <p className="text-white/70 leading-relaxed text-lg">
                                    Our mission is simple: to deliver nutrition without compromise. No shortcuts, no artificial fillers—just the honest goodness of the earth, delivered with convenience.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                                <div>
                                    <h4 className="font-bold text-sm uppercase tracking-widest mb-2 text-emerald-300">Purity</h4>
                                    <p className="text-sm text-white/60">Sourced directly from organic certified farms.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm uppercase tracking-widest mb-2 text-emerald-300">Purpose</h4>
                                    <p className="text-sm text-white/60">Every product supports local Kerala farmers.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- PHILOSOPHY SECTION --- */}
            <section className="py-32 px-6 bg-[#04241c] text-[#FDFCF8] rounded-[2rem] mx-4">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <motion.div className="space-y-8">
                        <Leaf className="mx-auto text-emerald-400" size={32} />
                        <blockquote className="text-3xl md:text-5xl font-medium italic leading-snug">
                            "True health is a harmony between what we do and what we consume. We are here to simplify that balance."
                        </blockquote>
                        <div className="pt-6">
                            <p className="text-emerald-400 font-bold tracking-widest uppercase text-xs">The Founder's Philosophy</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- VALUES GRID (LIGHT SECTION) --- */}
            <section className="py-32 px-6 bg-[#F9F8F3]">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                        <div className="space-y-4">
                            <span className="text-emerald-800 font-bold text-[10px] tracking-[0.4em] uppercase block">
                                Foundations
                            </span>
                            {/* FIXED: Changed text-white to text-emerald-950 for visibility */}
                            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-[#052c22]">
                                The AroNutra <br /> Standards
                            </h2>
                        </div>
                        {/* FIXED: Changed text-white/60 to text-stone-600 */}
                        <p className="max-w-xs text-stone-600 text-sm font-light leading-relaxed border-l border-emerald-900/10 pl-6">
                            Quality is not an act, it is a habit we cultivate in every step of our botanical process.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {values.map((value, idx) => {
                            const Icon = value.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1, duration: 0.8 }}
                                    className="group relative bg-white p-10 rounded-3xl border border-stone-200 shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all duration-500"
                                >
                                    <span className="absolute top-8 right-10 text-[10px] font-bold text-stone-300 group-hover:text-emerald-500 transition-colors">
                                        0{idx + 1}
                                    </span>

                                    {/* FIXED: Changed bg-red-500 to a theme-consistent color */}
                                    <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700 mb-8 group-hover:bg-emerald-700 group-hover:text-white transition-colors duration-500">
                                        <Icon size={24} strokeWidth={1.5} />
                                    </div>

                                    <h3 className="text-xl font-serif mb-4 text-[#052c22]">
                                        {value.title}
                                    </h3>

                                    <p className="text-stone-500 text-[14px] leading-relaxed font-light">
                                        {value.desc}
                                    </p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* --- FINAL CTA --- */}
            <section className="py-32 px-6 text-center border-t border-white/10 bg-[#052c22]">
                <div className="max-w-3xl mx-auto space-y-10">
                    <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-white">
                        Ready to start your <br /> wellness journey?
                    </h2>
                    <Link
                        href="/collection"
                        /* FIXED: Used hex code bg-[#C5A358] for reliable yellow/gold color */
                        className="inline-flex items-center gap-3 bg-[#ce9929] text-white px-10 py-5 rounded-full hover:bg-[#b38f40] transition-all group shadow-lg shadow-black/20"
                    >
                        <span className="font-bold text-sm uppercase tracking-widest">
                            Shop Collection
                        </span>
                        <ArrowUpRight
                            size={18}
                            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                        />
                    </Link>
                </div>
            </section>
        </div>
    );
}

const values = [
    {
        title: "Quality First",
        desc: "Every batch undergoes rigorous testing to ensure it meets our gold standards for purity and potency.",
        icon: ShieldCheck
    },
    {
        title: "Natural Selection",
        desc: "We hand-pick ingredients that are in their most bio-available form for maximum body absorption.",
        icon: Leaf
    },
    {
        title: "Absolute Trust",
        desc: "Complete transparency from the soil in Wayanad to the final packaging on your shelf.",
        icon: Compass
    },
    {
        title: "Convenient Health",
        desc: "Modern life is fast. Our products are designed to fit seamlessly into your existing routine.",
        icon: Zap
    },
    {
        title: "Community Growth",
        desc: "We invest back into the agricultural communities that make our high-quality ingredients possible.",
        icon: Users
    },
    {
        title: "Purpose Driven",
        desc: "We aren't just selling products; we are advocating for a more intentional, healthier way of living.",
        icon: Heart
    }
];