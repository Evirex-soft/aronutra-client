"use client";

import React, { useState, useEffect } from "react";
import { X, Tag, Loader, Copy, Check } from "lucide-react";

interface Coupon {
  id: string;
  code: string;
  title: string;
  description: string;
  discount: number;
  discountType: 'percentage' | 'fixed';
  minimumAmount: number;
  maxDiscount?: number;
  expiryDate: string;
  isActive: boolean;
}

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyCoupon: (coupon: Coupon) => void;
  appliedCoupon?: Coupon | null;
  cartTotal: number;
}

export default function CouponModal({
  isOpen,
  onClose,
  onApplyCoupon,
  appliedCoupon,
  cartTotal
}: CouponModalProps) {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(false);
  const [manualApplyLoading, setManualApplyLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [manualCode, setManualCode] = useState("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Fetch coupons from backend
  const fetchCoupons = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/coupons', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch coupons');
      }

      const data = await response.json();
      console.log("coupon data:", data);
      setCoupons(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load coupons');

    } finally {
      setLoading(false);
    }
  };

  // Apply manual coupon code
  const handleApplyManualCode = async () => {
    if (!manualCode.trim()) return;

    setManualApplyLoading(true);
    setError(null);

    setLoading(true);
    try {
      const response = await fetch('/api/coupons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: manualCode.trim().toUpperCase(),
          total:cartTotal
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error('Invalid coupon code');
      }

      onApplyCoupon(data.coupon);
      setManualCode("");
      onClose();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to apply coupon');
    } finally {
      setLoading(false);
    }
  };

  // Copy coupon code
  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy code');
    }
  };

  // Calculate discount amount
  const calculateDiscount = (coupon: Coupon) => {
    if (coupon.discountType === 'fixed') {
      return coupon.discount;
    } else {
      const percentageDiscount = (cartTotal * coupon.discount) / 100;
      return coupon.maxDiscount
        ? Math.min(percentageDiscount, coupon.maxDiscount)
        : percentageDiscount;
    }
  };

  // Check if coupon is applicable
  const isCouponApplicable = (coupon: Coupon) => {
    return cartTotal >= coupon.minimumAmount && coupon.isActive;
  };

  useEffect(() => {
    if (isOpen) {
      fetchCoupons();
      
      // scroll prevention
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Restore scroll position
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

    return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[85vh] overflow-hidden flex flex-col my-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Fixed at top */}
        <div className="flex items-center justify-between p-4 border-b bg-white rounded-t-xl flex-shrink-0">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Tag className="text-pink-600 w-5 h-5" />
            Available Coupons
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Manual Code Entry */}
          <div className="p-4 border-b bg-gray-50">
            <h3 className="font-medium text-gray-700 mb-2">Have a coupon code?</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value.toUpperCase())}
                placeholder="Enter coupon code"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                onKeyPress={(e) => e.key === 'Enter' && handleApplyManualCode()}
              />
              <button
                onClick={handleApplyManualCode}
                disabled={!manualCode.trim() || manualApplyLoading}
                className="px-4 py-2 bg-pink-600 text-white text-sm font-medium rounded-md hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[60px]"
              >
                {manualApplyLoading ? <Loader className="animate-spin w-4 h-4" /> : 'Apply'}
              </button>
            </div>
          </div>

          {/* Coupons List */}
          <div className="p-4">
            {loading && !coupons.length ? (
              <div className="text-center py-8">
                <Loader className="animate-spin w-6 h-6 mx-auto mb-2 text-pink-600" />
                <p className="text-gray-600">Loading coupons...</p>
              </div>
            ) : error && !coupons.length ? (
              <div className="text-center py-8">
                <p className="text-red-600 mb-2">Failed to load coupons</p>
                <button
                  onClick={fetchCoupons}
                  className="text-pink-600 text-sm hover:underline"
                >
                  Try again
                </button>
              </div>
            ) : coupons.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">No coupons available</p>
              </div>
            ) : (
              <div className="space-y-3">
                {coupons.map((coupon) => {
                  const isApplicable = isCouponApplicable(coupon);
                  const isApplied = appliedCoupon?.code === coupon.code;
                  const discount = calculateDiscount(coupon);

                  return (
                    <div
                      key={coupon.id}
                      className={`border rounded-lg p-3 transition-all ${
                        isApplied
                          ? 'border-green-500 bg-green-50 shadow-md'
                          : isApplicable
                          ? 'border-gray-200 hover:border-pink-300 hover:shadow-sm'
                          : 'border-gray-200 opacity-60'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1 pr-2">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-pink-600 text-sm bg-pink-100 px-2 py-1 rounded">
                              {coupon.code}
                            </span>
                            <button
                              onClick={() => handleCopyCode(coupon.code)}
                              className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100 transition-colors"
                              title="Copy code"
                            >
                              {copiedCode === coupon.code ? (
                                <Check className="w-3 h-3 text-green-600" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                          <h4 className="font-semibold text-sm text-gray-800 mb-1">
                            {coupon.title}
                          </h4>
                          <p className="text-xs text-gray-600 mb-1">
                            {coupon.description}
                          </p>
                          <p className="text-xs text-gray-500">
                            Save ₹{discount.toFixed(0)} • Min order: ₹{coupon.minimumAmount}
                          </p>
                        </div>

                        <div className="flex-shrink-0">
                          {isApplied ? (
                            <span className="text-green-600 text-xs font-medium bg-green-100 px-2 py-1 rounded">
                              Applied
                            </span>
                          ) : (
                            <button
                              onClick={() => {
                                onApplyCoupon(coupon);
                                onClose();
                              }}
                              disabled={!isApplicable}
                              className={`text-xs font-medium px-3 py-1 rounded transition-colors ${
                                isApplicable
                                  ? 'bg-pink-600 text-white hover:bg-pink-700 active:bg-pink-800'
                                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              }`}
                            >
                              {isApplicable ? 'Apply' : 'Not Eligible'}
                            </button>
                          )}
                        </div>
                      </div>

                      {!isApplicable && cartTotal < coupon.minimumAmount && (
                        <p className="text-xs text-red-500 mt-2">
                          Add ₹{(coupon.minimumAmount - cartTotal).toFixed(0)} more to apply this coupon
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}