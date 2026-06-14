"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";


const BrandStorySection = () => {
    const { scrollYProgress } = useScroll();
    const yParallax = useTransform(scrollYProgress, [0, 1], [0, -50]);

    return (
        <div className="bg-[#052c22] text-white selection:bg-primary/30">
            {/* SECTION 1: THE PHILOSOPHY (The Quote) */}
            <section className="relative py-32 md:py-48 px-6 overflow-hidden border-b border-white/5">
                {/* Minimalist Ambient Glow */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="space-y-12"
                    >
                        <span className="block font-sans text-[10px] font-bold uppercase tracking-[0.6em] text-primary/80">
                            Our Founding Belief
                        </span>

                        <h2 className="font-serif italic text-3xl md:text-5xl lg:text-[52px] text-stone-100 leading-[1.3] font-light max-w-4xl mx-auto">
                            “At AroNutra, we believe wellness begins with purity. Every creation is
                            sourced from India’s finest landscapes, crafted to elevate
                            health and bring balance to the modern, intentional lifestyle.”
                        </h2>

                        <div className="flex justify-center items-center gap-4">
                            <div className="h-[1px] w-8 bg-primary/40" />
                            <span className="font-serif italic text-primary text-lg">AroNutra</span>
                            <div className="h-[1px] w-8 bg-primary/40" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 2: THE NARRATIVE (What If?) */}
            <section className="py-32 md:py-56 px-6 lg:px-20 relative">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

                        {/* Left: Sticky Text Content */}
                        <div className="lg:col-span-6 lg:sticky lg:top-32 space-y-12">
                            <div className="space-y-6">
                                <motion.span
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="inline-block text-primary font-sans text-[10px] font-black uppercase tracking-[0.5em]"
                                >
                                    The Alchemy of Floral Origins
                                </motion.span>

                                <h3 className="font-serif text-5xl md:text-7xl leading-[1.05] tracking-tight text-stone-50">
                                    What If Honey <br />
                                    <span className="italic font-light text-primary/90">Tasted Different</span> <br />
                                    Every Time?
                                </h3>
                            </div>

                            <div className="space-y-8 font-sans text-stone-300/80 leading-relaxed text-lg font-light max-w-lg">
                                <p>
                                    Most believe honey is a singular taste. <br />
                                    <span className="text-white font-medium italic border-b border-primary/30 pb-1">
                                        Nature reveals a deeper truth.
                                    </span>
                                </p>

                                <p className="text-stone-300">
                                    Character is shaped by journey—the flowers visited, the soil of the region, and the season of the harvest.
                                    When bees collect from diverse floral landscapes, they create liquid signatures of a specific moment in time.
                                </p>

                                <p className="text-stone-100 font-medium">
                                    We have curated <span className="text-primary">12 distinct varieties</span>, each an invitation to experience nature&apos;s raw, unedited diversity.
                                </p>

                                <div className="pt-10">
                                    <Link
                                        href="/about"
                                        className="group inline-flex items-center gap-4 text-primary font-sans text-[11px] font-black uppercase tracking-[0.4em] transition-all"
                                    >
                                        Read Our Full Story
                                        <span className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:text-[#052c22] transition-all duration-500">
                                            <ArrowRight size={16} />
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Right: Immersive Imagery */}
                        <div className="lg:col-span-6 space-y-12">
                            <motion.div
                                style={{ y: yParallax }}
                                className="relative aspect-[3/4] w-full max-w-md ml-auto group"
                            >
                                {/* Thin Luxury Border Frame */}
                                <div className="absolute -inset-4 border border-white/5 rounded-2xl -z-10 transition-transform duration-700 group-hover:scale-105" />

                                <div className="relative h-full w-full overflow-hidden rounded-xl shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
                                    <Image
                                        src="/images/about_img.png"
                                        alt="Nature's Purity"
                                        fill
                                        className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#052c22]/60 via-transparent to-transparent" />
                                </div>

                                {/* Aesthetic Float Badge */}
                                <div className="absolute -bottom-10 -right-10 bg-[#0a3a2d] border border-white/10 backdrop-blur-md p-10 rounded-2xl hidden md:block">
                                    <div className="text-center space-y-2">
                                        <p className="text-primary font-serif text-5xl leading-none">12</p>
                                        <p className="text-white/40 text-[9px] uppercase font-bold tracking-[0.4em] leading-tight">
                                            Curated <br /> Expressions
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Secondary Smaller Detail Text */}
                            <div className="max-w-xs ml-auto pt-12">
                                <p className="font-serif italic text-stone-400 text-sm leading-relaxed">
                                    &ldquo;Every bottle offers a different experience. Every drop tells a unique story of the Indian landscape.&rdquo;
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default BrandStorySection;