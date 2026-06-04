"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-[100dvh] bg-[#052c22] flex items-center justify-center px-6 py-20 overflow-hidden selection:bg-[#d4af37] selection:text-[#052c22]">

            {/* 1. BACKGROUND DECORATIONS */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {/* Glow Effects */}
                <div className="absolute top-[-10%] right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#d4af37]/10 rounded-full blur-[80px] md:blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-white/5 rounded-full blur-[80px] md:blur-[120px]" />

                {/* Subtle Hexagon Pattern (Honeycomb) */}
                <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                                <path d="M25 0 L50 14.4 L50 43.4 L25 57.8 L0 43.4 L0 14.4 Z" fill="none" stroke="#d4af37" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#hexagons)" />
                    </svg>
                </div>
            </div>

            <div className="relative z-10 text-center w-full max-w-2xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >

                    {/* 2. THE FLYING BEE SVG */}
                    <div className="relative h-32 md:h-48 flex items-center justify-center mb-8">
                        <motion.div
                            animate={{
                                y: [0, -15, 0],
                                x: [0, 10, 0],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="relative"
                        >
                            <svg
                                width="80"
                                height="80"
                                viewBox="0 0 100 100"
                                className="md:w-24 md:h-24 filter drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {/* Wings */}
                                <motion.path
                                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                                    transition={{ duration: 0.1, repeat: Infinity }}
                                    d="M50 40 C30 10 10 30 45 45 M50 40 C70 10 90 30 55 45"
                                    stroke="#d4af37"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                                {/* Body */}
                                <path d="M40 50 C40 35 60 35 60 50 C60 65 40 65 40 50 Z" fill="#d4af37" />
                                {/* Stripes */}
                                <path d="M42 48 H58 M42 52 H58 M42 56 H58" stroke="#052c22" strokeWidth="1.5" />
                                {/* Head */}
                                <circle cx="50" cy="38" r="4" fill="#d4af37" />
                                {/* Antennae */}
                                <path d="M47 35 L44 30 M53 35 L56 30" stroke="#d4af37" strokeWidth="1" />
                            </svg>
                        </motion.div>
                    </div>

                    {/* 3. TEXT CONTENT */}
                    <div className="space-y-6 md:space-y-8 mb-12 md:mb-16">
                        <motion.h2
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-[#d4af37] text-[10px] md:text-[12px] font-black uppercase tracking-[0.6em]"
                        >
                            Error 404
                        </motion.h2>

                        <h1 className="text-5xl sm:text-6xl md:text-8xl font-serif italic text-white leading-[1.1] tracking-tight">
                            Lost in <br className="hidden sm:block" /> the Wilds?
                        </h1>

                        <p className="text-white/50 text-sm md:text-base max-w-sm mx-auto leading-relaxed font-light px-4">
                            Even the best foragers lose their way sometimes. This page has been moved or harvested.
                        </p>
                    </div>

                    {/* 4. CALL TO ACTION */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6"
                    >
                        <Link
                            href="/"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#d4af37] text-[#052c22] px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:scale-105 transition-all shadow-[0_20px_40px_rgba(0,0,0,0.3)] active:scale-95 group"
                        >
                            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Home
                        </Link>
                    </motion.div>


                </motion.div>
            </div>
        </div>
    );
}