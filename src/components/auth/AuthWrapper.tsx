"use client";
import { motion } from "framer-motion";

export const AuthWrapper = ({ children, title }: { children: React.ReactNode, title: string }) => (
    <div className="min-h-screen bg-[#1a2419] flex items-center justify-center p-6 relative overflow-hidden">
        {/* Floating Honey Orbs */}
        <motion.div
            animate={{ y: [0, -20, 0], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 blur-[100px] rounded-full"
        />

        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[40px] shadow-2xl z-10"
        >
            <h2 className="text-3xl font-serif text-amber-400 text-center mb-2">{title}</h2>
            <p className="text-stone-400 text-center text-sm mb-8 italic">Taste the purity of nature</p>
            {children}
        </motion.div>
    </div>
);