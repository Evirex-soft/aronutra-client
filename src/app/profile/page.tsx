import {
    Package,
    User as UserIcon,
    MapPin,
    Settings,
    ChevronRight,
    CreditCard,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUserProfile } from "@/lib/services/user";
import { getOrdersByUserId } from "@/lib/services/order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";
import EditProfileForm from "./EditProfileForm";
import OrderActions from "@/components/OrderActions";

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) redirect("/login");

    const email = session.user.email;
    const userId = (session.user as any).id;

    // We fetch only 3 orders for the dashboard view
    const [user, orders] = await Promise.all([
        getUserProfile(email),
        getOrdersByUserId(userId, 3),
    ]);

    return (
        <div className="min-h-screen bg-[#052c22] text-white selection:bg-[#d4af37] selection:text-[#052c22] pb-20">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-24 md:pt-32">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-white/5 pb-12">
                    <div className="flex items-center gap-6">
                        <div className="relative group">
                            {/* Parent Container - Fixed size, forced circle, hides image corners */}
                            <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-linear-to-br from-[#d4af37] to-[#aa8d2e] flex items-center justify-center border-4 border-white/10 shadow-2xl overflow-hidden relative">
                                {user?.image ? (
                                    <img
                                        src={user.image}
                                        alt={user.name}
                                        className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-110"
                                        referrerPolicy="no-referrer"
                                    />
                                ) : (
                                    <span className="text-[#052c22] text-3xl md:text-4xl font-serif italic">
                                        {user?.name?.charAt(0) || "U"}
                                    </span>
                                )}
                            </div>

                            {/* Settings Icon - Positioned relative to the group */}
                            <div className="absolute -bottom-1 -right-1 p-2 bg-[#052c22] border border-white/20 rounded-full text-[#d4af37] shadow-xl z-10">
                                <Settings size={14} className="animate-spin-slow" />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <p className="text-[#d4af37] uppercase tracking-[0.4em] text-[9px] md:text-[10px] font-bold">User Profile</p>
                                <span className="h-[1px] w-12 bg-[#d4af37]/30"></span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-serif italic tracking-tight leading-none">
                                {user?.name?.split(' ')[0] || "Guest"}
                                <span className="text-white/20 block md:inline md:ml-4 not-italic font-light uppercase text-2xl md:text-4xl tracking-tighter">Dashboard</span>
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <LogoutButton />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-12">

                    {/* LEFT COLUMN: INFO */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Personal Details */}
                        <section className="group">
                            <div className="flex items-center justify-between mb-4 px-2">
                                <div className="flex items-center gap-3">
                                    <UserIcon size={16} className="text-[#d4af37]" />
                                    <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Personal Details</h2>
                                </div>
                                <EditProfileForm user={user} type="personal" />
                            </div>
                            <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8 group-hover:bg-white/[0.05] transition-colors duration-500">
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-[9px] text-white/20 uppercase tracking-[0.2em] mb-1">Registered Email</p>
                                        <p className="text-sm font-medium tracking-wide text-white/90">{user?.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] text-white/20 uppercase tracking-[0.2em] mb-1">Contact Number</p>
                                        <p className="text-sm font-medium tracking-wide text-white/90">{user?.phone || ""}</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Shipping Address */}
                        <section className="group">
                            <div className="flex items-center justify-between mb-4 px-2">
                                <div className="flex items-center gap-3">
                                    <MapPin size={16} className="text-[#d4af37]" />
                                    <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Default Address</h2>
                                </div>
                                <EditProfileForm user={user} type="address" />
                            </div>
                            <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8 group-hover:bg-white/[0.05] transition-colors duration-500">
                                {user?.address ? (
                                    <div className="text-sm text-white/70 leading-relaxed font-light italic">
                                        <p className="text-white font-medium not-italic mb-1">{user?.name}</p>
                                        {user.address.street}<br />
                                        {user.address.city}, {user.address.state}<br />
                                        {user.address.pinCode}
                                    </div>
                                ) : (
                                    <p className="text-xs text-white/20 italic font-light py-2">
                                        No delivery address on file.
                                    </p>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* RIGHT COLUMN: ORDERS */}
                    <div className="lg:col-span-8">
                        <div className="bg-white/[0.03] border border-white/10 rounded-[40px] overflow-hidden flex flex-col h-full">
                            <div className="p-8 md:p-10">
                                <div className="flex items-center justify-between mb-10">
                                    <div className="flex items-center gap-3">
                                        <Package size={20} className="text-[#d4af37]" />
                                        <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/70">Recent Orders</h2>
                                    </div>
                                    {/* <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[9px] uppercase tracking-widest text-white/40">
                                        Showing 3 of {orders.length > 3 ? 'many' : orders.length}
                                    </div> */}
                                </div>

                                {orders.length > 0 ? (
                                    <div className="space-y-4">
                                        {orders.slice(0, 3).map((order: any) => (
                                            <div
                                                key={order._id}
                                                className="block group bg-white/[0.02] hover:bg-white/5 border border-white/5 rounded-2xl p-5 transition-all duration-300"
                                            >
                                                <Link href={`/orders/${order.orderId}`} className="flex items-center justify-between">
                                                    <div className="flex items-center gap-5">
                                                        <div className="w-12 h-12 rounded-full bg-[#052c22] flex items-center justify-center text-[#d4af37] border border-[#d4af37]/20 group-hover:border-[#d4af37]/60 transition-colors">
                                                            <CreditCard size={18} />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-bold font-mono text-white/90 mb-1 tracking-tighter">#{order.orderId}</p>
                                                            <div className="flex items-center gap-3 text-[10px] text-white/40 uppercase tracking-widest font-medium">
                                                                <span>{new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</span>
                                                                <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                                                                <span>{order.items?.length || 0} Items</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right flex items-center gap-6">
                                                        <div className="hidden sm:block">
                                                            <p className="text-sm font-semibold text-[#d4af37]">₹{order.totalAmount.toLocaleString()}</p>
                                                            <p className="text-[9px] text-emerald-400 uppercase font-black tracking-[0.1em] mt-0.5">Success</p>
                                                        </div>
                                                        <ChevronRight size={18} className="text-white/10 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                                    </div>
                                                </Link>
                                                {/* Order Action*/}
                                                <OrderActions order={order} />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-24 border border-dashed border-white/10 rounded-[32px] mx-2">
                                        <p className="text-white/20 text-[10px] uppercase tracking-[0.4em] mb-8 italic">Your order history is empty</p>
                                        <Link href="/collection" className="px-10 py-4 bg-[#d4af37] text-[#052c22] text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-white transition-all transform hover:scale-105">
                                            Purchase Now
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* View All Button - Fixed at bottom of card */}
                            {orders.length > 0 && (
                                <Link
                                    href="/orders"
                                    className="mt-auto group flex items-center justify-center gap-3 py-6 bg-white/[0.02] border-t border-white/5 hover:bg-white/[0.04] transition-colors"
                                >
                                    <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/40 group-hover:text-[#d4af37] transition-colors">
                                        View Full Transaction History
                                    </span>
                                    <ArrowRight size={14} className="text-white/20 group-hover:text-[#d4af37] group-hover:translate-x-2 transition-all" />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}