import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getPaginatedOrders } from "@/lib/services/order";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Package, Clock } from "lucide-react";
import OrderActions from "@/components/OrderActions";

export default async function AllOrdersPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) redirect("/login");

    const userId = (session.user as any).id;

    const { page } = await searchParams;
    const currentPage = Number(page) || 1;
    const ITEMS_PER_PAGE = 5;

    // Fetch orders
    const { orders, total } = await getPaginatedOrders(
        userId,
        currentPage,
        ITEMS_PER_PAGE
    );


    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

    const getStatusStyles = (status: string) => {
        switch (status.toLowerCase()) {
            case 'delivered': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
            case 'shipped': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
            case 'cancelled': return 'text-red-400 bg-red-400/10 border-red-400/20';
            case 'refund requested': return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
            case 'refunded': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
            default: return 'text-[#d4af37] bg-[#d4af37]/10 border-[#d4af37]/20';
        }
    };

    return (
        <div className="min-h-screen bg-[#052c22] text-white selection:bg-[#d4af37] pb-20 pt-32">
            <div className="max-w-4xl mx-auto px-6">
                {/* Minimal Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <Link href="/profile" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-[#d4af37] transition-colors mb-6">
                            <ChevronLeft size={14} /> Back to Profile
                        </Link>
                        <h1 className="text-3xl md:text-5xl font-serif uppercase italic tracking-tight">Your Orders</h1>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-1">Authenticated Account</p>
                        <p className="text-sm font-mono text-[#d4af37]">{session.user.email}</p>
                    </div>
                </div>

                {/* Orders List */}
                <div className="space-y-6">
                    {orders.length > 0 ? (
                        orders.map((order: any) => (
                            <div
                                key={order._id}
                                className="group bg-white/[0.02] border border-white/10 hover:border-white/20 rounded-3xl overflow-hidden transition-all duration-500 hover:bg-white/[0.03]"
                            >
                                {/* Content to Details */}
                                <Link href={`/orders/${order.orderId}`} className="block p-5 md:p-6">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="flex items-center gap-5">
                                            <div className="relative h-16 w-16 hidden sm:block">
                                                <div className="absolute inset-0 bg-[#d4af37]/10 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform" />
                                                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/10">
                                                    <Package size={20} className="text-[#d4af37]" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <p className="font-mono text-xs uppercase tracking-tighter text-white/90">#{order.orderId}</p>
                                                    <span className={`text-[8px] uppercase tracking-widest px-2 py-0.5 rounded-full border font-bold ${getStatusStyles(order.status)}`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                                <p className="text-[10px] uppercase tracking-widest text-white/30 flex items-center gap-2">
                                                    <Clock size={10} /> {new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between md:justify-end gap-8">
                                            <div className="hidden lg:flex -space-x-3">
                                                {order.items.slice(0, 3).map((item: any, i: number) => (
                                                    <img
                                                        key={`${item.productId}-${item.selectedVariantId || "default"}`}
                                                        src={item.image}
                                                        className="w-8 h-8 rounded-full border-2 border-[#052c22] object-cover"
                                                        alt={item.name}
                                                    />
                                                ))}
                                                {order.items.length > 3 && (
                                                    <div className="w-8 h-8 rounded-full border-2 border-[#052c22] bg-white/10 flex items-center justify-center text-[8px]">+{order.items.length - 3}</div>
                                                )}
                                            </div>

                                            <div className="text-left md:text-right">
                                                <p className="text-xl font-medium italic text-[#d4af37]">₹{order.totalAmount.toLocaleString()}</p>
                                                <p className="text-[9px] uppercase tracking-[0.2em] text-white/40">{order.items.length} Items</p>
                                            </div>
                                            <ChevronRight size={18} className="text-white/10 group-hover:text-[#d4af37] group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </div>
                                </Link>

                                {/*  Action Buttons  */}
                                <div className="px-6 py-4 bg-white/[0.01] border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                                    <div className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-white/10"></span>
                                        <span className="text-[9px] uppercase tracking-[0.3em] text-white/20 font-medium">
                                            Manage Order
                                        </span>
                                    </div>

                                    {/* We pass the plain object */}
                                    <OrderActions order={JSON.parse(JSON.stringify(order))} />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 border border-dashed border-white/10 rounded-[40px]">
                            <p className="text-white/30 font-serif italic">No orders found yet.</p>
                        </div>
                    )}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="mt-12 flex items-center justify-center gap-4">
                        <Link
                            href={`/orders?page=${currentPage - 1}`}
                            className={`p-3 rounded-full border border-white/10 transition-colors ${currentPage === 1 ? 'pointer-events-none opacity-20' : 'hover:border-[#d4af37] hover:text-[#d4af37]'}`}
                        >
                            <ChevronLeft size={16} />
                        </Link>

                        <div className="flex gap-2">
                            {[...Array(totalPages)].map((_, i) => (
                                <Link
                                    key={i}
                                    href={`/orders?page=${i + 1}`}
                                    className={`w-10 h-10 flex items-center justify-center rounded-full text-[10px] font-mono transition-all ${currentPage === i + 1 ? 'bg-[#d4af37] text-[#052c22] font-bold' : 'hover:bg-white/5 text-white/40'}`}
                                >
                                    {String(i + 1).padStart(2, '0')}
                                </Link>
                            ))}
                        </div>

                        <Link
                            href={`/orders?page=${currentPage + 1}`}
                            className={`p-3 rounded-full border border-white/10 transition-colors ${currentPage === totalPages ? 'pointer-events-none opacity-20' : 'hover:border-[#d4af37] hover:text-[#d4af37]'}`}
                        >
                            <ChevronRight size={16} />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}