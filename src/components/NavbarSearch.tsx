"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Search, X, Loader2, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
    _id: string;
    slug: string;
    name: string;
    category: string;
    price: number;
    img: string;
}

export default function NavbarSearch({ isScrolled, isMenuOpen }: { isScrolled: boolean, isMenuOpen: boolean }) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);

    const debouncedQuery = useDebounce(query, 400);
    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const clearSearch = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setQuery("");
        setProducts([]);
        setTimeout(() => inputRef.current?.focus(), 10);
    };

    const closeSearch = () => {
        setIsOpen(false);
        setQuery("");
        setProducts([]);
    };

    useEffect(() => {
        if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
    }, [isOpen]);

    useEffect(() => {
        const fetchProducts = async () => {
            if (!debouncedQuery || debouncedQuery.length < 2) {
                setProducts([]);
                return;
            }
            try {
                setLoading(true);
                const res = await axios.get(`/api/search?q=${encodeURIComponent(debouncedQuery)}`);
                setProducts(res.data.products || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [debouncedQuery]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                closeSearch();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        router.push(`/search?q=${encodeURIComponent(query)}`);
        closeSearch();
    };

    const activeColor = !isScrolled || isMenuOpen ? "text-white" : "text-[#052c22]";

    return (
        <div ref={searchRef} className="relative flex items-center h-full"
            style={{ overflow: "visible" }}
        >
            <div className="relative">
                {/* INPUT SECTION - Z-index must be HIGHER than the dropdown */}
                <div className="flex items-center relative z-[110]">
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: typeof window !== 'undefined' && window.innerWidth < 768 ? 160 : 260, opacity: 1 }}
                                exit={{ width: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <form onSubmit={handleSubmit} className="relative mr-1">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Search..."
                                        className="w-full bg-white text-[#052c22] text-[12px] font-medium px-4 pr-10 py-2 rounded-full border border-gray-200 outline-none shadow-sm"
                                    />
                                    {query && (
                                        <button
                                            type="button"
                                            onClick={clearSearch}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <X size={14} />
                                        </button>
                                    )}
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button
                        onClick={() => (isOpen && !query ? closeSearch() : setIsOpen(true))}
                        className={`transition-all duration-300 ${activeColor} hover:text-primary p-2`}
                    >
                        {isOpen && !query ? <X size={20} /> : <Search size={20} />}
                    </button>
                </div>


                {/* RESULTS DROPDOWN - Z-index must be LOWER than the input section */}
                <AnimatePresence>
                    {isOpen && query.length >= 2 && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="
            absolute
            top-full
            mt-2
            left-0
            w-[400px]
            bg-white
            rounded-2xl
            shadow-lg
            z-[9999]
          "
                        >
                            {loading ? (
                                <div className="p-10 flex flex-col items-center justify-center gap-3">
                                    <Loader2 className="animate-spin text-primary" size={20} />
                                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Searching...</span>
                                </div>
                            ) : products.length > 0 ? (
                                <div className="flex flex-col">

                                    {/* Header */}
                                    <div className="flex items-center justify-between px-4 py-3 border-b">
                                        <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-500">
                                            {products.length} Results
                                        </span>

                                        <button
                                            onClick={clearSearch}
                                            className="flex items-center gap-1 text-red-500 hover:text-red-600 transition-colors"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>

                                    <div className="max-h-[350px] overflow-y-auto custom-scrollbar">
                                        {products.map((product) => (
                                            <Link
                                                key={product._id}
                                                href={`/products/${product.slug}`}
                                                onClick={closeSearch}
                                                className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors group border-b border-gray-50 last:border-0"
                                            >
                                                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                                    <Image
                                                        src={product.img}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-[12px] font-bold text-[#052c22] truncate uppercase">
                                                        {product.name}
                                                    </h4>
                                                    <p className="text-[10px] text-gray-400 uppercase">
                                                        {product.category}
                                                    </p>
                                                </div>

                                                <span className="text-[12px] font-black text-primary">
                                                    ₹{product.price}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>

                                    <button
                                        onClick={handleSubmit}
                                        className="w-full p-4 bg-gray-50 text-[10px] uppercase font-bold tracking-[0.2em] text-[#052c22] hover:bg-primary hover:text-white transition-all"
                                    >
                                        View All Results
                                    </button>
                                </div>

                            ) : (
                                <div className="p-10 text-center flex flex-col items-center">
                                    <p className="text-[13px] font-bold text-[#052c22]">No results found</p>
                                    <button
                                        onClick={clearSearch}
                                        className="mt-4 flex items-center gap-2 text-[10px] uppercase font-black text-primary hover:opacity-70 transition-opacity"
                                    >
                                        <RotateCcw size={12} /> Clear Search
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}