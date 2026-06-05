"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Lottie from "lottie-react";
import honeyBee from "../../public/animations/honeybee.json";

export default function NotFound() {
    return (
        <div className="min-h-[100dvh] w-full bg-[#052c22] flex items-start justify-center pt-24 lg:pt-32 px-4 sm:px-6 py-10 overflow-hidden relative">

            {/* 1. BACKGROUND DECORATIONS (Non-interactive) */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none select-none">

                {/* Subtle Hexagon Pattern */}
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

            {/* 2. MAIN CONTENT WRAPPER */}
            <div className="relative z-10 text-center w-full max-w-5xl mx-auto flex flex-col items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full"
                >

                    {/* 404 & BEE CONTAINER */}
                    <div className="relative flex items-center justify-center w-full h-[30vh] min-h-[200px] max-h-[450px] mb-4 md:mb-8 select-none">

                        {/* Dynamic Background 404 */}
                        <motion.h2
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 0.1, scale: 1 }}
                            transition={{ duration: 1.2 }}
                            className="absolute font-black text-[#d4af37] leading-none pointer-events-none tracking-tighter
                                       text-[25vw] sm:text-[20vw] md:text-[250px] lg:text-[300px]"
                        >
                            404
                        </motion.h2>

                        {/* Bee */}
                        <motion.div
                            animate={{
                                y: [0, -20, 10, 0],
                                x: [-15, 15, -10, 0],
                                rotate: [0, 5, -5, 0],
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="relative z-20 pointer-events-none
                                       w-[45vw] h-[45vw] 
                                       sm:w-[35vw] sm:h-[35vw] 
                                       md:w-[300px] md:h-[300px] 
                                       lg:w-[400px] lg:h-[400px]"
                        >
                            <Lottie
                                animationData={honeyBee}
                                loop={true}
                                className="w-full h-full object-contain"
                            />
                        </motion.div>
                    </div>

                    {/* TEXT CONTENT */}
                    <div className="space-y-4 md:space-y-6 mb-8 md:mb-12 relative z-30 px-2">
                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="font-serif italic text-white leading-[1.1] tracking-tight
                                       text-4xl sm:text-6xl md:text-7xl lg:text-8xl"
                        >
                            Lost in <br className="hidden xs:block" /> the Wilds?
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-white/60 mx-auto leading-relaxed font-light
                                       text-xs sm:text-sm md:text-base lg:text-lg 
                                       max-w-[280px] sm:max-w-md"
                        >
                            Even the best foragers lose their way sometimes. <br className="hidden sm:block" />
                            This page has been moved or harvested.
                        </motion.p>
                    </div>

                    {/* CALL TO ACTION */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="flex flex-col items-center justify-center px-4"
                    >
                        <Link
                            href="/"
                            className="group relative inline-flex items-center justify-center gap-3 bg-[#d4af37] text-[#052c22] 
                                       px-8 py-4 sm:px-10 sm:py-5 rounded-full font-bold uppercase tracking-[0.2em] 
                                       text-[10px] sm:text-[11px] hover:bg-white hover:scale-105 transition-all 
                                       shadow-[0_20px_40px_rgba(0,0,0,0.4)] active:scale-95 w-full sm:w-auto"
                        >
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Home
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}