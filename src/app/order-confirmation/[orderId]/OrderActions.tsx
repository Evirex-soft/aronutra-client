"use client";
import { ArrowRight, Printer } from "lucide-react";
import Link from "next/link";

export default function OrderActions() {
    return (
        <div className="grid grid-cols-1 gap-4 pt-4 no-print">
            <Link
                href="/"
                className="group relative overflow-hidden bg-[#d4af37] text-[#052c22] py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] transition-all flex items-center justify-center gap-3 hover:-translate-y-1"
            >
                <span className="relative z-10 flex items-center gap-2">
                    Return to Home <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
            </Link>

            <button
                onClick={() => window.print()}
                className="flex items-center justify-center gap-2 py-4 text-white/40 hover:text-white transition-colors text-[10px] uppercase tracking-[0.3em] font-bold"
            >
                <Printer size={14} />
                Print Receipt
            </button>
        </div>
    );
}