"use client";

import { useCart } from "@/app/contexts/CartContext";
import { useEffect } from "react";

export default function OrderSuccessClientLogic() {
    const { clearCart } = useCart();

    useEffect(() => {
        clearCart();
    }, [clearCart]);

    return null;
}