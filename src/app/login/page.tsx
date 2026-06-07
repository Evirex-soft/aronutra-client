"use client";

import { Suspense } from "react";
import LoginForm from "./LoginForm";
import LoginFormSkeleton from "./LoginFormSkeleton";


export default function LoginPage() {
    return (
        <div className="min-h-screen bg-[#052c22] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-12 selection:bg-[#c5a358]/30">
            {/* Background Decorative Element */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -right-[10%] w-[500px] h-[500px] bg-[#c5a358]/5 rounded-full blur-[120px]" />
                <div className="absolute -bottom-[10%] -left-[10%] w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px]" />
            </div>

            <Suspense fallback={<LoginFormSkeleton />}>
                <LoginForm />
            </Suspense>
        </div>
    );
}