"use client";

import { useState } from "react";
import { X, RotateCcw, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function OrderActions({ order }: { order: any }) {
    const [isOpen, setIsOpen] = useState(false);
    const [actionType, setActionType] = useState<"CANCEL" | "REFUND" | null>(null);
    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const canCancel = order.status === "Placed";
    const canRefund = order.status === "Delivered";

    if (!canCancel && !canRefund) return null;

    const handleSubmit = async () => {
        if (!reason.trim()) return toast.error("Please provide a reason");
        setLoading(true);
        try {
            const res = await fetch(`/api/orders/${order._id}/action`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: actionType, reason }),
            });
            if (res.ok) {
                toast.success(actionType === "CANCEL" ? "Order Cancelled Successfully" : "Refund Request Submitted");
                setIsOpen(false);
                router.refresh();
            }
        } catch (err) {
            toast.error("Operation failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex items-center gap-3">
                {canCancel && (
                    <button
                        onClick={() => { setActionType("CANCEL"); setIsOpen(true); }}
                        className="group flex items-center gap-2 px-5 py-2 rounded-full border border-red-400/20 text-red-400 text-[9px] font-black uppercase tracking-[0.2em] hover:bg-red-400 hover:text-white transition-all duration-500"
                    >
                        <X size={12} className="group-hover:rotate-90 transition-transform duration-500" />
                        Cancel Order
                    </button>
                )}

                {canRefund && (
                    <button
                        onClick={() => { setActionType("REFUND"); setIsOpen(true); }}
                        className="group flex items-center gap-2 px-5 py-2 rounded-full border border-[#d4af37]/30 text-[#d4af37] text-[9px] font-black uppercase tracking-[0.2em] hover:bg-[#d4af37] hover:text-[#052c22] transition-all duration-500"
                    >
                        <RotateCcw size={12} className="group-hover:-rotate-180 transition-transform duration-500" />
                        Request Refund
                    </button>
                )}
            </div>

            {/* Premium Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-[#052c22]/80 backdrop-blur-md" onClick={() => setIsOpen(false)} />

                    <div className="relative bg-[#FDFCF8] w-full max-w-md rounded-[40px] overflow-hidden shadow-2xl border border-white/10">
                        {/* Modal Header */}
                        <div className="bg-[#052c22] p-8 text-[#d4af37]">

                            <h3 className="text-2xl font-serif italic">
                                {actionType === "CANCEL" ? "Cancellation Request" : "Refund Application"}
                            </h3>
                        </div>

                        <div className="p-8">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-4">
                                Statement of Reason
                            </label>
                            <textarea
                                className="w-full bg-stone-100 border-none rounded-3xl p-5 text-sm text-[#052c22] placeholder:text-stone-400 focus:ring-2 focus:ring-[#d4af37] h-32 mb-8 transition-all"
                                placeholder="Kindly share the reason for this action..."
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            />

                            <div className="flex flex-col gap-3">
                                <button
                                    disabled={loading}
                                    onClick={handleSubmit}
                                    className="w-full bg-[#052c22] text-[#d4af37] py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-[#0a3d30] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                                >
                                    {loading ? <Loader2 className="animate-spin" size={14} /> : "Confirm Submission"}
                                </button>

                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-full py-4 text-[9px] font-bold uppercase tracking-[0.2em] text-stone-400 hover:text-red-500 transition-colors"
                                >
                                    Discard Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}