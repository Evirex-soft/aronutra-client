"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductGallery({
    images,
    name,
}: {
    images: string[];
    name: string;
}) {
    const [selectedImage, setSelectedImage] = useState(images?.[0]);
    const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    // Sync state when images prop changes
    useEffect(() => {
        setSelectedImage(images?.[0]);
    }, [images]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        // Calculate mouse position in percentage (0 to 100)
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        setZoomPos({ x, y });
    };

    return (
        <div className="w-full max-w-2xl mx-auto space-y-4">
            {/* Main Image Viewport */}
            <div
                className="relative aspect-[4/3] w-full rounded-3xl bg-white overflow-hidden shadow-xl border cursor-crosshair"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onMouseMove={handleMouseMove}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedImage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full"
                        style={{
                            // When hovered, scale the image and shift origin to mouse position
                            transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                            transform: isHovered ? "scale(2)" : "scale(1)",
                            transition: isHovered ? "none" : "transform 0.5s ease-out",
                        }}
                    >
                        <Image
                            src={selectedImage}
                            alt={name}
                            fill
                            priority
                            className="object-contain p-8"
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Hint overlay */}
                {!isHovered && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/5 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase tracking-widest text-muted-foreground pointer-events-none">
                        Hover to Zoom
                    </div>
                )}
            </div>

            {/* Thumbnails */}
            {images?.length > 1 && (
                <div className="flex gap-3 overflow-x-auto py-2 scrollbar-hide">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(image)}
                            className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-200 shrink-0 ${selectedImage === image
                                    ? "border-primary scale-105 shadow-md"
                                    : "border-transparent bg-muted/50 hover:bg-muted"
                                }`}
                        >
                            <Image
                                src={image}
                                alt={`${name}-${index}`}
                                fill
                                className={`object-cover p-1 transition-opacity ${selectedImage === image ? "opacity-100" : "opacity-50"
                                    }`}
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}