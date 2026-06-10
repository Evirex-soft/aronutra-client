"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Loader2, MailCheck } from "lucide-react";
import Link from "next/link";
import { forgotPasswordSchema, type ForgotPasswordInput } from "@/utils/validations";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<keyof ForgotPasswordInput, string>>>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        // 1. Zod Validation
        const result = forgotPasswordSchema.safeParse({ email });
        if (!result.success) {
            const fieldErrors: any = {};
            result.error.issues.forEach((issue) => {
                fieldErrors[issue.path[0]] = issue.message;
            });
            setErrors(fieldErrors);
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (res.ok) {
                setSubmitted(true);
            } else {
                const data = await res.json();
                setErrors({ email: data.error || "Something went wrong" });
            }
        } catch (err) {
            console.error(err);
            setErrors({ email: "Network error occurred." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#052c22] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-[400px]">
                {!submitted ? (
                    <>
                        <div className="text-center mb-10">
                            <h1 className="font-serif italic text-4xl text-stone-100 mb-4">Reset Password</h1>
                            <p className="text-stone-400 text-[10px] uppercase tracking-widest leading-relaxed">
                                Enter your email to receive an exclusive <br /> recovery link.
                            </p>
                        </div>

                        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 md:p-10 shadow-2xl">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="group relative border-b border-white/20 focus-within:border-white transition-all duration-500">
                                    <label className="block text-[9px] uppercase tracking-[0.2em] text-white/70 font-bold mb-2 group-focus-within:text-white">Email Address</label>
                                    <input
                                        required
                                        type="email"
                                        className="w-full bg-transparent py-3 text-white outline-none text-sm font-light"
                                        placeholder="your@email.com"
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            if (errors.email) setErrors({}); // Clear errors while typing
                                        }}
                                    />
                                    {/* Zod Error Display */}
                                    <AnimatePresence>
                                        {errors.email && (
                                            <motion.span
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-[9px] text-red-400 absolute -bottom-6 left-0 tracking-widest uppercase italic font-bold"
                                            >
                                                {errors.email}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <button
                                    disabled={loading}
                                    className="w-full bg-[#c5a358] text-[#052c22] font-bold py-4 flex items-center justify-center gap-3 transition-all hover:bg-[#ffca4d]"
                                >
                                    {loading ? <Loader2 className="animate-spin" size={18} /> : (
                                        <><span className="text-[11px] uppercase tracking-[0.3em]">Send Link</span><ArrowRight size={14} /></>
                                    )}
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="bg-white/[0.03] border border-white/10 p-10 text-center space-y-6">
                        <div className="flex justify-center"><MailCheck size={48} className="text-[#c5a358]" /></div>
                        <h2 className="font-serif text-2xl text-stone-100">Check Your Inbox</h2>
                        <p className="text-stone-400 text-xs tracking-wide">If an account is associated with this email, you will receive instructions shortly.</p>
                        <Link href="/login" className="block text-[10px] uppercase text-[#c5a358] font-bold tracking-widest pt-4">Back to Login</Link>
                    </div>
                )}
            </motion.div>
        </main>
    );
}