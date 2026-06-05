"use client";

import Lottie from "lottie-react";
import animationData from "../../../../public/animations/order.json";
import { motion } from "framer-motion";

export default function OrderSuccessAnimation() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 select-none pointer-events-none mb-2"
        >
            <Lottie
                animationData={animationData}
                loop={true}
                className="w-full h-full"
            />
        </motion.div>
    );
}