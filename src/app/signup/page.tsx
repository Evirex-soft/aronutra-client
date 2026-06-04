"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { signupSchema, type SignupInput } from "@/utils/validations";

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } }
};

export default function SignupPage() {
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<keyof SignupInput, string>>>({});

    const searchParams = useSearchParams();
    const router = useRouter();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const [formData, setFormData] = useState<SignupInput>({
        name: "",
        email: "",
        password: "",
        phone: ""
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

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setServerError("");
        setErrors({});

        const result = signupSchema.safeParse(formData);
        if (!result.success) {
            const fieldErrors: any = {};
            result.error.issues.forEach((err) => {
                fieldErrors[err.path[0]] = err.message;
            });
            setErrors(fieldErrors);
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Something went wrong");

            // Use the callbackUrl 
            await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                callbackUrl: callbackUrl,
            });
        } catch (err: any) {
            setServerError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#052c22] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 selection:bg-[#c5a358]/30">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -right-[10%] w-[500px] h-[500px] bg-[#c5a358]/5 rounded-full blur-[120px]" />
                <div className="absolute -bottom-[10%] -left-[10%] w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px]" />
            </div>

            <motion.div initial="initial" animate="animate" variants={staggerContainer} className="w-full max-w-[400px] z-10">
                <motion.div variants={fadeInUp} className="text-center mb-10 space-y-4">
                    <div className="flex justify-center mb-2">
                        <span className="h-px w-8 bg-[#c5a358]/40 self-center"></span>
                        <span className="mx-4 font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-[#c5a358]">Membership</span>
                        <span className="h-px w-8 bg-[#c5a358]/40 self-center"></span>
                    </div>
                    <h1 className="font-serif italic text-4xl md:text-5xl text-stone-100 font-light tracking-tight">The Collective</h1>
                    <p className="text-stone-400 text-xs font-light tracking-widest uppercase">Begin your wellness journey</p>
                </motion.div>

                <motion.div variants={fadeInUp} className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 md:p-10 shadow-2xl">
                    <form onSubmit={handleSignup} className="space-y-5">
                        <AnimatePresence mode="wait">
                            {serverError && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] py-2 px-4 text-center uppercase tracking-widest mb-4">
                                    {serverError}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="space-y-4">
                            {[
                                { label: "Full Name", type: "text", field: "name", placeholder: "Enter your full name" },
                                { label: "Email", type: "email", field: "email", placeholder: "Enter your email" },
                                { label: "Phone", type: "tel", field: "phone", placeholder: "Enter your phone number" },
                                { label: "Password", type: "password", field: "password", placeholder: "Create a password" },
                            ].map((input) => (
                                <div key={input.field} className="group relative border-b border-white/20 focus-within:border-white transition-all duration-500">
                                    <label className="block text-[9px] uppercase tracking-[0.2em] text-white/70 font-bold mb-2 group-focus-within:text-white transition-colors">
                                        {input.label}
                                    </label>

                                    <div className="relative">
                                        <input
                                            // Check if it's the password field to toggle type
                                            type={input.field === "password" ? (showPassword ? "text" : "password") : input.type}
                                            placeholder={input.placeholder}
                                            className={`w-full bg-transparent py-3 text-white placeholder:text-white/30 outline-none text-sm font-light tracking-wide ${input.field === "password" ? 'pr-10' : ''}`}
                                            onChange={(e) => setFormData({ ...formData, [input.field]: e.target.value })}
                                            value={(formData as any)[input.field]}
                                        />

                                        {/* 7. The Eye Toggle Button */}
                                        {input.field === "password" && (
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-0 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors p-1"
                                            >
                                                {showPassword ? <EyeOff size={14} strokeWidth={1.5} /> : <Eye size={14} strokeWidth={1.5} />}
                                            </button>
                                        )}
                                    </div>

                                    <AnimatePresence>
                                        {errors[input.field as keyof SignupInput] && (
                                            <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-[9px] text-red-400/80 mt-1 block tracking-wider uppercase">
                                                {errors[input.field as keyof SignupInput]}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>

                                    <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-white transition-all duration-500 group-focus-within:w-full" />
                                </div>
                            ))}
                        </div>

                        <motion.button
                            disabled={loading}
                            whileHover={{ backgroundColor: "#ffca4d" }}
                            className="w-full bg-primary/90 text-[#052c22] font-bold py-4 mt-6 flex items-center justify-center gap-3 transition-all relative overflow-hidden group disabled:opacity-50"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={18} />
                            ) : (
                                <>
                                    <span className="text-[11px] uppercase tracking-[0.3em] relative z-10">Create Account</span>
                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </motion.button>
                    </form>

                    <div className="relative flex items-center py-8">
                        <div className="flex-grow border-t border-white/5"></div>
                        <span className="flex-shrink mx-4 text-[8px] uppercase tracking-[0.5em] text-white font-medium">Or join with</span>
                        <div className="flex-grow border-t border-white/5"></div>
                    </div>

                    <button
                        onClick={() => signIn("google", { callbackUrl: callbackUrl })}
                        className="w-full border border-white/50 text-stone-300 py-3 flex items-center justify-center gap-3 hover:bg-white/5 transition-all text-[10px] font-bold uppercase tracking-[0.2em]"
                    >
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-3.5 h-3.5" alt="google" />
                        Google
                    </button>
                </motion.div>

                <motion.p variants={fadeInUp} className="text-center mt-8">
                    <span className="text-white text-[10px] uppercase tracking-[0.2em]">Already registered?</span>{" "}
                    <Link
                        // Passing callbackUrl forward to login page
                        href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}
                        className="text-[#c5a358] hover:text-white text-[10px] uppercase tracking-[0.2em] font-bold ml-2 transition-colors underline underline-offset-4 decoration-[#c5a358]/30"
                    >
                        Sign In
                    </Link>
                </motion.p>
            </motion.div>
        </div>
    );
}