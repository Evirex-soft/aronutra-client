"use client";

import Link from "next/link";
import React from "react";
import { FaShoppingBag } from "react-icons/fa";

export default function Continue() {
  const clickContinue = () => {
    // Add toast notification here if needed
  };

  return (
    <Link href="/" passHref>
    <button
      onClick={clickContinue}
      className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-400 text-gray-800 px-6 py-3 rounded-lg font-medium text-sm sm:text-base transition-all duration-300  hover:scale-105 active:scale-95"
    >
      <FaShoppingBag className="w-4 h-4" />
      Continue Shopping
    </button>
    </Link>
  );
}
