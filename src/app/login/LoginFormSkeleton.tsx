import { motion } from "framer-motion";

export default function LoginFormSkeleton() {
    return (
        <div className="w-full max-w-[400px] z-10">
            {/* Header Skeleton */}
            <div className="text-center mb-10 space-y-4">
                <div className="flex justify-center items-center mb-2">
                    <div className="h-px w-8 bg-[#c5a358]/20" />
                    <div className="mx-4 w-24 h-2 bg-[#c5a358]/20 rounded-full" />
                    <div className="h-px w-8 bg-[#c5a358]/20" />
                </div>
                <div className="h-10 w-48 bg-white/5 mx-auto rounded-lg animate-pulse" />
                <div className="h-3 w-32 bg-white/5 mx-auto rounded-full animate-pulse" />
            </div>

            {/* Card Skeleton */}
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 md:p-10 shadow-2xl space-y-8">
                {/* Email Field Skeleton */}
                <div className="space-y-3">
                    <div className="h-2 w-20 bg-white/10 rounded-full" />
                    <div className="h-10 w-full bg-white/5 border-b border-white/10" />
                </div>

                {/* Password Field Skeleton */}
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <div className="h-2 w-16 bg-white/10 rounded-full" />
                        <div className="h-2 w-24 bg-[#c5a358]/10 rounded-full" />
                    </div>
                    <div className="h-10 w-full bg-white/5 border-b border-white/10" />
                </div>

                {/* Button Skeleton */}
                <div className="relative overflow-hidden h-14 w-full bg-white/5 mt-4">
                    {/* Shimmer Effect */}
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                    />
                </div>

                {/* Divider */}
                <div className="flex items-center gap-4">
                    <div className="h-px flex-grow bg-white/5" />
                    <div className="h-2 w-12 bg-white/5 rounded-full" />
                    <div className="h-px flex-grow bg-white/5" />
                </div>

                {/* Social Button Skeleton */}
                <div className="h-12 w-full border border-white/10 rounded-sm bg-white/5" />
            </div>

            {/* Footer Skeleton */}
            <div className="mt-8 flex justify-center gap-2">
                <div className="h-2 w-32 bg-white/5 rounded-full" />
                <div className="h-2 w-16 bg-[#c5a358]/20 rounded-full" />
            </div>
        </div>
    );
}