"use client";

import { useState, useEffect, Suspense } from "react"; // Added Suspense
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { loginSchema, type LoginInput } from "@/utils/validations";

// Animation Variants 
const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } }
};

// 1. Move the logic into a separate internal component
export default function LoginForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [serverError, setServerError] = useState("");
    const [errors, setErrors] = useState<Partial<Record<keyof LoginInput, string>>>({});

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (serverError || Object.keys(errors).length > 0) {
            const timer = setTimeout(() => {
                setServerError("");
                setErrors({});
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [serverError, errors]);

    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setServerError("");
        setErrors({});

        const result = loginSchema.safeParse(formData);
        if (!result.success) {
            type LoginField = keyof LoginInput;
            const fieldErrors: Partial<Record<LoginField, string>> = {};
            result.error.issues.forEach((err) => {
                const field = err.path[0] as LoginField;
                if (field) fieldErrors[field] = err.message;
            });
            setErrors(fieldErrors);
            setLoading(false);
            return;
        }

        const res = await signIn("credentials", {
            email: formData.email,
            password: formData.password,
            redirect: false,
        });

        if (res?.error) {
            setServerError("Invalid credentials. Please try again.");
            setLoading(false);
        } else {
            router.replace(callbackUrl);
            router.refresh();
        }
    };

    const handleSocialLogin = (provider: string) => {
        signIn(provider, { callbackUrl });
    };

    return (
        <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="w-full max-w-[400px] z-10"
        >
            {/* Header Section */}
            <motion.div variants={fadeInUp} className="text-center mb-10 space-y-4">
                <div className="flex justify-center mb-2">
                    <span className="h-px w-8 bg-[#c5a358]/40 self-center"></span>
                    <span className="mx-4 font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-[#c5a358]">
                        Welcome Back
                    </span>
                    <span className="h-px w-8 bg-[#c5a358]/40 self-center"></span>
                </div>
                <h1 className="font-serif italic text-4xl md:text-5xl text-stone-100 font-light tracking-tight">
                    Member Login
                </h1>
                <p className="text-stone-400 text-xs font-light tracking-widest uppercase">
                    Access your curated experience
                </p>
            </motion.div>

            {/* Form Card */}
            <motion.div
                variants={fadeInUp}
                className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 md:p-10 shadow-2xl"
            >
                <form onSubmit={handleLogin} className="space-y-6">
                    <AnimatePresence mode="wait">
                        {serverError && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] py-2 px-4 text-center uppercase tracking-widest mb-4"
                            >
                                {serverError}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="space-y-5">
                        <div className="group relative border-b border-white/20 focus-within:border-white transition-all duration-500">
                            <label className="block text-[9px] uppercase tracking-[0.2em] text-white/70 font-bold mb-2 group-focus-within:text-white transition-colors">
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-transparent py-3 text-white placeholder:text-white/30 outline-none text-sm font-light tracking-wide"
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                            {errors.email && (
                                <span className="text-[9px] text-red-400/80 absolute -bottom-5 left-0 tracking-wider uppercase">
                                    {errors.email}
                                </span>
                            )}
                            <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-white transition-all duration-500 group-focus-within:w-full" />
                        </div>

                        <div className="group relative border-b border-white/20 focus-within:border-white transition-all duration-500">
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-[9px] uppercase tracking-[0.2em] text-white/70 font-bold group-focus-within:text-white transition-colors">
                                    Password
                                </label>
                                <Link href="/forgot-password" className="text-[9px] uppercase tracking-[0.1em] text-[#c5a358]/60 hover:text-[#c5a358] transition-colors">
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="w-full bg-transparent py-3 pr-10 text-white placeholder:text-white/30 outline-none text-sm font-light tracking-wide"
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    value={formData.password}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors p-1"
                                >
                                    {showPassword ? <EyeOff size={16} strokeWidth={1.5} /> : <Eye size={16} strokeWidth={1.5} />}
                                </button>
                            </div>
                            {errors.password && (
                                <span className="text-[9px] text-red-400/80 absolute -bottom-5 left-0 tracking-wider uppercase">
                                    {errors.password}
                                </span>
                            )}
                            <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-white transition-all duration-500 group-focus-within:w-full" />
                        </div>
                    </div>

                    <motion.button
                        disabled={loading}
                        whileHover={{ backgroundColor: "#ffca4d" }}
                        className="w-full bg-[#c5a358] text-[#052c22] font-bold py-4 mt-4 flex items-center justify-center gap-3 transition-all relative overflow-hidden group"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin" size={18} />
                        ) : (
                            <>
                                <span className="text-[11px] uppercase tracking-[0.3em] relative z-10">Sign In</span>
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </motion.button>
                </form>

                <div className="relative flex items-center py-8">
                    <div className="flex-grow border-t border-white/5"></div>
                    <span className="flex-shrink mx-4 text-[8px] uppercase tracking-[0.5em] text-white/40 font-medium">Identity</span>
                    <div className="flex-grow border-t border-white/5"></div>
                </div>

                <button
                    onClick={() => handleSocialLogin("google")}
                    className="w-full border border-white/20 text-stone-300 py-3 flex items-center justify-center gap-3 hover:bg-white/5 hover:border-white/40 transition-all text-[10px] font-bold uppercase tracking-[0.2em]"
                >
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-3.5 h-3.5" alt="google" />
                    Google
                </button>
            </motion.div>

            <motion.p variants={fadeInUp} className="text-center mt-8">
                <span className="text-white/50 text-[10px] uppercase tracking-[0.2em]">New to the collective?</span>{" "}
                <Link
                    href="/signup"
                    className="text-[#c5a358] hover:text-white text-[10px] uppercase tracking-[0.2em] font-bold ml-2 transition-colors underline underline-offset-4 decoration-[#c5a358]/30"
                >
                    Create Account
                </Link>
            </motion.p>
        </motion.div>
    );
}


