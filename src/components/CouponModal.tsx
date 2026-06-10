"use client";

import React, { useState, useEffect } from "react";
import { X, Tag, Loader, Copy, Check, Ticket, ChevronRight } from "lucide-react";

interface Coupon {
  _id: string;
  code: string;
  type: "PERCENTAGE" | "FIXED_AMOUNT" | "FREE_SHIPPING";
  value: number;
  minOrder: number;
  maxDiscount?: number;
  expiresAt?: string;
  active: boolean;
}

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyCoupon: (coupon: any) => void;
  appliedCoupon?: any;
  cartTotal: number;
}

export default function CouponModal({
  isOpen,
  onClose,
  onApplyCoupon,
  appliedCoupon,
  cartTotal,
}: CouponModalProps) {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(false);
  const [manualCode, setManualCode] = useState("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchCoupons();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/coupons");
      const data = await response.json();
      if (Array.isArray(data)) setCoupons(data);
    } catch (err) {
      console.error("Failed to fetch coupons", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#052c22]/90 backdrop-blur-md" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative bg-[#FDFCF8] w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl">

        {/* Gold Header */}
        <div className="bg-[#052c22] p-6 text-[#d4af37] flex justify-between items-center border-b border-[#d4af37]/20">
          <div>
            <h2 className="text-xl font-serif tracking-tight">Privilege Codes</h2>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37]/60">Select your exclusive offer</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Manual Input Area */}
        <div className="p-6 bg-stone-50 border-b border-stone-200">
          <div className="relative group">
            <input
              type="text"
              placeholder="ENTER CUSTOM CODE"
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value.toUpperCase())}
              className="w-full bg-white border-2 border-stone-200 rounded-2xl px-5 py-4 text-sm font-bold tracking-widest focus:outline-none focus:border-[#d4af37] transition-all"
            />
            <button
              onClick={() => { /* Implement same logic as apply button */ }}
              className="absolute right-2 top-2 bottom-2 bg-[#052c22] text-[#d4af37] px-6 rounded-xl text-[10px] font-black uppercase tracking-tighter hover:bg-[#0a3d30]"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Scrollable List */}
        <div className="max-h-[400px] overflow-y-auto p-6 space-y-4 custom-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader className="animate-spin text-[#d4af37] mb-4" />
              <span className="text-[10px] uppercase tracking-widest text-stone-400">Consulting Treasury...</span>
            </div>
          ) : coupons.length === 0 ? (
            <div className="text-center py-12 text-stone-400 text-xs uppercase tracking-widest">No active offers currently available</div>
          ) : (
            coupons.map((coupon) => {
              const isEligible = cartTotal >= coupon.minOrder;
              const isApplied = appliedCoupon?.code === coupon.code;

              return (
                <div
                  key={coupon._id}
                  className={`group relative border-2 rounded-2xl p-5 transition-all duration-300 ${isApplied ? 'border-[#d4af37] bg-[#d4af37]/5' : 'border-stone-100 bg-white hover:border-stone-200'
                    }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <div className="bg-[#052c22] text-[#d4af37] p-2 rounded-lg">
                        <Ticket size={16} />
                      </div>
                      <div>
                        <span className="text-sm font-black tracking-widest text-[#052c22]">{coupon.code}</span>
                        <button onClick={() => handleCopyCode(coupon.code)} className="ml-2 text-stone-400 hover:text-[#d4af37]">
                          {copiedCode === coupon.code ? <Check size={12} /> : <Copy size={12} />}
                        </button>
                      </div>
                    </div>
                    {isApplied && (
                      <span className="text-[9px] font-black uppercase bg-[#052c22] text-[#d4af37] px-2 py-1 rounded">Applied</span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <p className="text-lg font-medium text-[#052c22]">
                      {coupon.type === "PERCENTAGE" ? `${coupon.value}% Off` : `₹${coupon.value} Off`}
                    </p>
                    <p className="text-[11px] text-stone-500 font-medium">
                      On orders above ₹{coupon.minOrder.toLocaleString()}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-dashed border-stone-200 flex items-center justify-between">
                    {!isEligible ? (
                      <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest">
                        Add ₹{(coupon.minOrder - cartTotal).toLocaleString()} more
                      </p>
                    ) : (
                      <p className="text-[9px] text-green-600 font-bold uppercase tracking-widest">Valid for your bag</p>
                    )}

                    <button
                      disabled={!isEligible || isApplied}
                      onClick={() => onApplyCoupon(coupon)}
                      className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${isEligible && !isApplied ? 'text-[#052c22] hover:text-[#d4af37]' : 'text-stone-300'
                        }`}
                    >
                      {isApplied ? 'Applied' : 'Claim Offer'} <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-stone-50 text-center">
          <p className="text-[9px] text-stone-400 uppercase tracking-[0.3em]">Exclusively for Himalayan Wellness members</p>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #d4af3744; border-radius: 10px; }
      `}</style>
    </div>
  );
}