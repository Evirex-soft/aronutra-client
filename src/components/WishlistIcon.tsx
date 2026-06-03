"use client";

import React from "react";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { useWishlist } from "@/app/contexts/WishlistContext";

type WishlistIconProps = {
    isTransparent?: boolean;
}

export default function WishlistIcon({ isTransparent = false }: WishlistIconProps) {
  const { wishlist } = useWishlist();
  const wishlistCount = wishlist.length;

  return (
    <Link 
      href="/wishlist" 
      className="relative group p-2"
    >
      <FaHeart 
        className={`w-5 h-5 transition-colors duration-300 ${
          isTransparent 
            ? "text-white/90 group-hover:text-orange-300" 
            : "text-white/90 group-hover:text-orange-300"
        }`} 
      />
      {wishlistCount > 0 && (
        <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 bg-[#FF8C42] text-white text-xs font-bold rounded-full transform translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform">
          {wishlistCount > 99 ? '99+' : wishlistCount}
        </span>
      )}
    </Link>
  );
}
