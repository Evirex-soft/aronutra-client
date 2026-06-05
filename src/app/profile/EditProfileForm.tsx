"use client";

import { useState, useEffect } from "react";
import { Edit2, X, Loader2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { updatePersonalSchema, updateAddressSchema } from "@/utils/validations";
import { toast } from "react-toastify";

export default function EditProfileForm({ user, type }: { user: any, type: 'personal' | 'address' }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const router = useRouter();

    // Close modal on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        // Select schema based on type
        const schema = type === 'personal' ? updatePersonalSchema : updateAddressSchema;

        try {
            // Validate data
            const validatedData = schema.parse(data);

            const response = await fetch("/api/user/update", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type,
                    ...validatedData
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Failed to update profile");
            }

            toast.success("Profile updated successfully!");
            setIsOpen(false);
            router.refresh();


        } catch (err: any) {
            if (err instanceof z.ZodError) {
                const formattedErrors: Record<string, string> = {};

                err.issues.forEach((issue) => {
                    const field = issue.path[0];

                    if (field) {
                        formattedErrors[field.toString()] = issue.message;
                    }
                });

                setErrors(formattedErrors);
            } else {
                toast.error(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="group flex items-center gap-2 px-3 py-1.5 border border-white/10 rounded-full hover:bg-white/5 transition-all duration-300"
            >
                <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-white/40 group-hover:text-[#d4af37]">Edit</span>
                <Edit2 size={10} className="text-[#d4af37]" />
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-[#052c22]/95 backdrop-blur-md"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Modal Content */}
                    <div className="relative bg-[#0a3d30] border border-white/10 w-full max-w-lg rounded-[40px] p-8 md:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.5)] overflow-hidden">

                        {/* Elegant Decorative Corner */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/5 blur-[60px] pointer-events-none" />

                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-8 right-8 text-white/30 hover:text-white hover:rotate-90 transition-all duration-300"
                        >
                            <X size={24} strokeWidth={1.5} />
                        </button>

                        <header className="mb-10">
                            <p className="text-[#d4af37] text-[10px] uppercase tracking-[0.4em] font-bold mb-2">Account Settings</p>
                            <h3 className="text-3xl md:text-4xl font-serif italic text-white leading-tight">
                                Update {type === 'personal' ? 'Profile Details' : 'Shipping Address'}
                            </h3>
                        </header>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="space-y-6">
                                {type === 'personal' ? (
                                    <>
                                        <div className="group border-b border-white/10 focus-within:border-[#d4af37] transition-colors pb-2">
                                            <label className="block text-[9px] uppercase tracking-[0.3em] text-white/30 mb-2 ml-1">Full Name</label>
                                            <input
                                                autoFocus
                                                name="name"
                                                defaultValue={user?.name}
                                                placeholder="Enter your name"
                                                className="w-full bg-transparent px-1 py-1 text-base md:text-lg focus:outline-none placeholder:text-white/10 font-light"
                                            />
                                            {errors.name && <p className="text-[10px] text-red-400 mt-2 flex items-center gap-1 tracking-wider uppercase"><AlertCircle size={10} /> {errors.name}</p>}
                                        </div>
                                        <div className="group border-b border-white/10 focus-within:border-[#d4af37] transition-colors pb-2">
                                            <label className="block text-[9px] uppercase tracking-[0.3em] text-white/30 mb-2 ml-1">Phone Number</label>
                                            <input
                                                name="phone"
                                                defaultValue={user?.phone}
                                                placeholder="+91 — — — — —"
                                                className="w-full bg-transparent px-1 py-1 text-base md:text-lg focus:outline-none placeholder:text-white/10 font-light"
                                            />
                                            {errors.phone && <p className="text-[10px] text-red-400 mt-2 flex items-center gap-1 tracking-wider uppercase"><AlertCircle size={10} /> {errors.phone}</p>}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="group border-b border-white/10 focus-within:border-[#d4af37] transition-colors pb-2">
                                            <label className="block text-[9px] uppercase tracking-[0.3em] text-white/30 mb-2 ml-1">Street Address</label>
                                            <input
                                                autoFocus
                                                name="street"
                                                defaultValue={user?.address?.street}
                                                className="w-full bg-transparent px-1 py-1 text-base focus:outline-none font-light"
                                            />
                                            {errors.street && <p className="text-[10px] text-red-400 mt-2 tracking-wider uppercase italic">{errors.street}</p>}
                                        </div>
                                        <div className="grid grid-cols-2 gap-8">
                                            <div className="group border-b border-white/10 focus-within:border-[#d4af37] transition-colors pb-2">
                                                <label className="block text-[9px] uppercase tracking-[0.3em] text-white/30 mb-2 ml-1">City</label>
                                                <input name="city" defaultValue={user?.address?.city} className="w-full bg-transparent px-1 py-1 text-base focus:outline-none font-light" />
                                                {errors.city && <p className="text-[10px] text-red-400 mt-2 tracking-wider uppercase italic">{errors.city}</p>}
                                            </div>
                                            <div className="group border-b border-white/10 focus-within:border-[#d4af37] transition-colors pb-2">
                                                <label className="block text-[9px] uppercase tracking-[0.3em] text-white/30 mb-2 ml-1">Pincode</label>
                                                <input name="pinCode" defaultValue={user?.address?.pinCode} className="w-full bg-transparent px-1 py-1 text-base focus:outline-none font-light" />
                                                {errors.pinCode && <p className="text-[10px] text-red-400 mt-2 tracking-wider uppercase italic">{errors.pinCode}</p>}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="pt-4">
                                <button
                                    disabled={loading}
                                    className="w-full py-5 bg-white text-[#052c22] rounded-full text-[11px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-[#d4af37] hover:text-white transition-all duration-500 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed group"
                                >
                                    {loading ? (
                                        <Loader2 size={16} className="animate-spin" />
                                    ) : (
                                        <>
                                            Save Changes
                                            <div className="w-1.5 h-1.5 bg-[#052c22] group-hover:bg-white rounded-full transition-colors" />
                                        </>
                                    )}
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}