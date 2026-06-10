"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Link from "next/link";
import { resetPasswordSchema, type ResetPasswordInput } from "@/utils/validations";

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

export default function ResetPasswordPage({ params }: { params: Promise<{ token: string }> }) {
    // Unwrapping params for Next.js 15
    const { token } = use(params);
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState<Partial<Record<keyof ResetPasswordInput, string>>>({});

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        // 1. Zod Validation
        const result = resetPasswordSchema.safeParse(formData);

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
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword
                }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Security updated successfully.");
                router.push("/login");
            } else {
                toast.error(data.error || "Reset link expired or invalid.");
            }
        } catch (err) {
            toast.error("A network error occurred.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <main className="min-h-screen bg-[#052c22] flex items-center justify-center p-6 selection:bg-[#d4af37] selection:text-[#052c22]">
            <motion.div initial="initial" animate="animate" className="w-full max-w-[400px]">

                {/* Header */}
                <motion.div variants={fadeInUp} className="text-center mb-10 space-y-4">
                    <div className="flex justify-center mb-2">
                        <span className="h-px w-8 bg-[#d4af37]/40 self-center"></span>
                        <span className="mx-4 font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-[#d4af37]">Security Update</span>
                        <span className="h-px w-8 bg-[#d4af37]/40 self-center"></span>
                    </div>
                    <h1 className="font-serif italic text-4xl text-stone-100 font-light tracking-tight">New Credentials</h1>
                    <p className="text-stone-400 text-[10px] uppercase tracking-widest font-light">Secure your membership account</p>
                </motion.div>

                {/* Form Card */}
                <motion.div variants={fadeInUp} className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 md:p-10 shadow-2xl">
                    <form onSubmit={handleReset} className="space-y-8">

                        {/* New Password */}
                        <div className="group relative border-b border-white/20 focus-within:border-white transition-all duration-500">
                            <label className="block text-[9px] uppercase tracking-[0.2em] text-white/70 font-bold mb-2">New Password</label>
                            <div className="relative">
                                <input
                                    required
                                    type={showPassword ? "text" : "password"}
                                    className="w-full bg-transparent py-3 pr-10 text-white outline-none text-sm font-light tracking-wide"
                                    placeholder="••••••••"
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                {errors.password && (
                                    <span className="text-[9px] text-red-400 absolute -bottom-5 left-0 uppercase tracking-tighter italic">
                                        {errors.password}
                                    </span>
                                )}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 text-white/40 hover:text-white p-1"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="group relative border-b border-white/20 focus-within:border-white transition-all duration-500">
                            <label className="block text-[9px] uppercase tracking-[0.2em] text-white/70 font-bold mb-2">Confirm Password</label>
                            <input
                                required
                                type="password"
                                className="w-full bg-transparent py-3 text-white outline-none text-sm font-light tracking-wide"
                                placeholder="••••••••"
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            />
                            {errors.confirmPassword && (
                                <span className="text-[9px] text-red-400 absolute -bottom-5 left-0 uppercase tracking-tighter italic">
                                    {errors.confirmPassword}
                                </span>
                            )}
                        </div>

                        <button
                            disabled={loading}
                            className="w-full bg-[#d4af37] text-[#052c22] font-bold py-4 mt-4 flex items-center justify-center gap-3 transition-all hover:bg-white"
                        >
                            {loading ? <Loader2 className="animate-spin" size={18} /> : (
                                <><span className="text-[11px] uppercase tracking-[0.3em]">Update Password</span><ArrowRight size={14} /></>
                            )}
                        </button>
                    </form>
                </motion.div>

                <p className="text-center mt-8">
                    <span className="text-white/30 text-[9px] uppercase tracking-[0.2em]">Safety first?</span>
                    <Link href="/login" className="text-[#d4af37] text-[9px] uppercase tracking-[0.2em] font-bold ml-2 underline underline-offset-4 decoration-[#d4af37]/30">Back to Login</Link>
                </p>
            </motion.div>
        </main>
    );
}