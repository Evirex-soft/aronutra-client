"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex-1 md:flex-none px-6 py-2.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2"
        >
            <LogOut size={14} />
            Logout
        </button>
    );
}