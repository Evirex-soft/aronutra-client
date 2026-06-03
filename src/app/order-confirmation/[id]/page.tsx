import Link from "next/link";
import { ShieldCheck } from "lucide-react";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function OrderSuccessPage({ params }: PageProps) {
    const { id } = await params;
    return (
        <div className="min-h-screen bg-[#052c22] flex items-center justify-center text-white">
            <div className="text-center">
                <div className="w-20 h-20 bg-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShieldCheck size={40} className="text-[#052c22]" />
                </div>
                <h1 className="text-4xl font-medium mb-2">Order Confirmed!</h1>
                <p className="text-white/60 mb-8">Your order will arrive soon.</p>
                <p className="text-sm font-mono text-[#d4af37]">Ref ID: {id}</p>
                <Link href="/" className="mt-10 inline-block border-b border-[#d4af37] pb-1 uppercase text-[10px] font-bold tracking-widest">
                    Return to Home
                </Link>
            </div>
        </div>
    );
}