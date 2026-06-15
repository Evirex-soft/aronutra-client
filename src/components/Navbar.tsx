"use client";

import React, { useState, useEffect, useRef } from "react";
import { Heart, ShoppingBag, User, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useCart } from "@/app/contexts/CartContext";
import { useWishlist } from "@/app/contexts/WishlistContext";
import { useSession, signOut } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import NavbarSearch from "./NavbarSearch";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Collection", href: "/collection" },
  { name: "Origins", href: "/#single-origins" },
  { name: "About", href: "/about" },
  { name: "Wellness", href: "/#how-it-works" },
  { name: "Contact", href: "/#footer" },
];

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { getCartCount } = useCart();
  const { wishlist } = useWishlist();
  const { data: session } = useSession();

  const cartCount = getCartCount();
  const wishlistCount = wishlist.length;

  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const highlighterRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const lerpVars = useRef({
    currentX: 0,
    targetX: 0,
    currentHighlighterX: 0,
    targetHighlighterX: 0,
    currentHighlighterWidth: 0,
    targetHighlighterWidth: 0,
    lerpFactor: 0.025,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    gsap.set(overlayRef.current, { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" });
    gsap.set(contentRef.current, { opacity: 0, y: 20 });
    gsap.set(imageRef.current, { scale: 0.8, opacity: 0 });
    gsap.set(".menu-link-item", { y: 30, opacity: 0 });

    let animationFrameId: number;
    const animate = () => {
      if (window.innerWidth >= 1024) {
        const v = lerpVars.current;
        v.currentX += (v.targetX - v.currentX) * v.lerpFactor;
        v.currentHighlighterX += (v.targetHighlighterX - v.currentHighlighterX) * v.lerpFactor;
        v.currentHighlighterWidth += (v.targetHighlighterWidth - v.currentHighlighterWidth) * v.lerpFactor;

        if (wrapperRef.current) gsap.set(wrapperRef.current, { x: v.currentX });
        if (highlighterRef.current) {
          gsap.set(highlighterRef.current, { x: v.currentHighlighterX, width: v.currentHighlighterWidth });
        }
      } else {
        if (wrapperRef.current) gsap.set(wrapperRef.current, { x: 0 });
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.innerWidth < 1024 || !isMenuOpen) return;
    const viewportWidth = window.innerWidth;
    const wrapperWidth = wrapperRef.current?.offsetWidth || 0;
    if (wrapperWidth <= viewportWidth) return;
    const maxMoveRight = viewportWidth - wrapperWidth - 100;
    const sensitivityRange = viewportWidth * 0.7;
    const startX = (viewportWidth - sensitivityRange) / 2;
    let mousePercentage = (e.clientX - startX) / sensitivityRange;
    mousePercentage = Math.max(0, Math.min(1, mousePercentage));
    lerpVars.current.targetX = mousePercentage * maxMoveRight;
  };

  const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.innerWidth < 1024) return;
    const linkRect = e.currentTarget.getBoundingClientRect();
    const wrapperRect = wrapperRef.current?.getBoundingClientRect();
    if (wrapperRect) {
      lerpVars.current.targetHighlighterX = linkRect.left - wrapperRect.left;
      lerpVars.current.targetHighlighterWidth = linkRect.width;
    }
  };

  const toggleMenu = () => {
    const isOpening = !isMenuOpen;
    setIsMenuOpen(isOpening);
    if (isOpening) {
      gsap.to(overlayRef.current, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1, ease: "expo.inOut" });
      gsap.to(contentRef.current, { opacity: 1, y: 0, duration: 0.8, delay: 0.3 });
      gsap.to(imageRef.current, { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out", delay: 0.2 });
      gsap.to(".menu-link-item", { y: 0, opacity: 1, duration: 0.7, stagger: 0.05, ease: "power3.out", delay: 0.4 });
    } else {
      gsap.to(overlayRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 0.7,
        ease: "expo.inOut",
        onComplete: () => {
          gsap.set(overlayRef.current, { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" });
          lerpVars.current.targetX = 0;
        }
      });
    }
  };

  const closeMenu = () => {
    if (!isMenuOpen) return;
    setIsMenuOpen(false);
    gsap.to(overlayRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      duration: 0.7,
      ease: "expo.inOut",
      onComplete: () => {
        gsap.set(overlayRef.current, { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" });
        lerpVars.current.targetX = 0;
      }
    });
  };

  const isOnDarkBackground = !isScrolled || isMenuOpen;
  const activeColor = isOnDarkBackground ? "text-white" : "text-[#052c22]";
  const logoFilter = isOnDarkBackground ? "brightness-100" : "brightness-0";

  const capsuleBase = "transition-all duration-700 ease-in-out flex items-center shadow-[0_20px_40px_-15px_rgba(0, 0, 0, 0.1)]";
  const capsuleActive = "h-14 bg-white/80 backdrop-blur-xl rounded-full px-3 md:px-8";
  const capsuleInactive = "h-20 bg-transparent px-0";

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-200 pointer-events-none transition-all duration-700 ${isScrolled && !isMenuOpen ? "pt-4" : "pt-0"}`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12">
          {/* LEFT CAPSULE: Logo */}
          <div className={`pointer-events-auto min-w-0 ${capsuleBase} ${isScrolled && !isMenuOpen ? capsuleActive : capsuleInactive} gap-2 md:gap-8`}>
            <Link href="/" className="relative z-210 shrink-0">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={200}
                height={70}
                className={`transition-all duration-500 object-contain ${isScrolled && !isMenuOpen ? "w-24 md:w-32" : "w-32 md:w-44"} ${logoFilter}`}
              />
            </Link>
          </div>

          {/* RIGHT CAPSULE: Actions & Menu */}
          <div className={`pointer-events-auto ${capsuleBase} ${isScrolled && !isMenuOpen ? capsuleActive : capsuleInactive} gap-4 md:gap-8`}>
            {/* Search component */}
            <NavbarSearch isScrolled={isScrolled} isMenuOpen={isMenuOpen} />

            <div className={`flex gap-4 md:gap-6 items-center transition-all duration-500 ${isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              <Link href="/wishlist" className={`relative transition-colors ${activeColor} hover:text-primary`}>
                <Heart size={isScrolled && !isMenuOpen ? 18 : 20} strokeWidth={2} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-[8px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full">{wishlistCount}</span>
                )}
              </Link>
              <Link href="/cart" className={`relative transition-colors ${activeColor} hover:text-primary`}>
                <ShoppingBag size={isScrolled && !isMenuOpen ? 18 : 20} strokeWidth={2} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-[8px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full">{cartCount}</span>
                )}
              </Link>
            </div>

            <div className={`h-4 w-px bg-current opacity-20 transition-all duration-500 max-md:hidden ${isMenuOpen ? 'opacity-0' : 'opacity-20'}`} />

            <div className={`max-md:hidden flex items-center transition-all duration-500 ${isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              <Link
                href={session ? "/profile" : "/login"}
                className={`flex items-center gap-2 group transition-colors ${activeColor} hover:text-[#c5a358]`}
              >
                <User size={isScrolled && !isMenuOpen ? 18 : 20} strokeWidth={1.5} />
                <span className={`hidden lg:block text-[10px] uppercase font-bold tracking-[0.2em] transition-all duration-500 ${isScrolled && !isMenuOpen ? "max-w-0 overflow-hidden opacity-0" : "max-w-32 opacity-100"}`}>
                  {session ? `Hi, ${session.user?.name}` : "Sign In"}
                </span>
              </Link>
            </div>

            <button onClick={toggleMenu} className={`flex items-center gap-2 md:gap-3 uppercase text-[10px] font-bold tracking-[0.2em] transition-colors ${activeColor}`}>
              <span className={`hidden md:block transition-all duration-500 ${isScrolled && !isMenuOpen ? "max-w-0 opacity-0 overflow-hidden" : "max-w-20 opacity-100"}`}>
                {isMenuOpen ? "Close" : "Menu"}
              </span>
              <div className="flex flex-col gap-1 w-4">
                <span className={`h-[1.5px] w-full bg-current transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
                <span className={`h-[1.5px] w-full bg-current transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[0.5px]' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Menu Overlay */}
      <div
        ref={overlayRef}
        onMouseMove={handleMouseMove}
        className={`fixed inset-0 z-[190] flex flex-col overflow-y-auto lg:overflow-hidden h-[100dvh] bg-white/10 backdrop-blur-2xl border-l border-white/30 transition-all duration-300 ${isMenuOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"
          }`}
        style={{
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          visibility: isMenuOpen ? "visible" : "hidden"
        }}
        data-open={isMenuOpen}
      >
        <div className="absolute inset-0 bg-[#052c22]/60 -z-10" />
        <div className="absolute inset-0 bg-linear-to-br from-white/[0.08] via-transparent to-transparent pointer-events-none" />

        {/* METADATA ROW */}
        <div
          ref={contentRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-4 p-8 md:p-12 pt-24 md:pt-32 text-white/40 uppercase text-[9px] font-bold tracking-[0.25em] relative z-10"
        >
          {/* Col 1: Brand Info (Left) */}
          <div className="order-1">
            <p className="text-primary text-[11px] mb-2 font-black">AroNutra®</p>
            <p className="leading-relaxed normal-case tracking-normal text-[11px] text-white/60 max-w-[200px]">
              Meppadi Road, Palavayal, Chembothara, Kalpetta, Kerala 673577
            </p>
          </div>

          {/* Col 2: Member Info (Right on Mobile, Center on Desktop) */}
          <div className="order-2 flex flex-col items-end md:items-center text-right md:text-center">
            <AnimatePresence>
              {session ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <p className="text-[#c5a358] text-[11px] font-black">
                    Welcome Back
                  </p>

                  <Link href="/profile" onClick={closeMenu} className="block group">
                    <span className="text-white text-base font-serif italic normal-case tracking-normal hover:text-primary transition-colors">
                      {session.user?.name || "My Account"}
                    </span>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1 group-hover:text-primary transition-colors">
                      View Profile
                    </p>
                  </Link>

                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all mt-2 ml-auto md:mx-auto"
                  >
                    <LogOut size={12} />
                    <span>LogOut</span>
                  </button>
                </motion.div>
              ) : (
                <div className="space-y-2">
                  <p className="text-primary text-[11px] font-black">Member</p>
                  <Link href="/login" onClick={closeMenu} className="text-white text-base font-serif italic normal-case tracking-normal">Sign In</Link>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Col 3: Social/Connect */}
          <div className="hidden md:block order-3 col-span-2 md:col-span-1 text-left md:text-right border-t border-white/5 pt-6 md:border-0 md:pt-0">
            <p className="text-primary text-[11px] mb-2 font-black">Connect</p>
            <div className="flex flex-row md:flex-col gap-4 md:gap-2">
              <a href="https://www.instagram.com/aronutra_wellness"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors">
                Instagram
              </a>
              <a href="https://www.facebook.com/share/1J8Sfkg5bw/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors">
                Facebook
              </a>
              <a
                href="tel:+917306288233"
                className="normal-case tracking-normal text-white/60 hover:text-white transition-colors"
              >
                +91 73062 88233
              </a>
            </div>
          </div>
        </div>

        {/* Navigation Links (Main sliding section) */}
        <div className="flex-1 flex items-center lg:items-end justify-center lg:justify-start relative z-20 pb-12 lg:pb-20">
          <div ref={wrapperRef} className="flex flex-col lg:flex-row items-center lg:items-center gap-6 lg:gap-16 px-8 md:px-12 w-full lg:w-max">
            {navLinks.map((link) => (
              <div key={link.name} className="menu-link-item w-full lg:w-auto text-center lg:text-left">
                <Link
                  href={link.href}
                  onMouseEnter={handleLinkHover}
                  onClick={closeMenu}
                  className="block h-auto lg:h-20 overflow-hidden group"
                >
                  <div className="relative flex flex-col transition-transform duration-500 ease-out lg:group-hover:-translate-y-1/2">
                    <span className="text-4xl md:text-5xl lg:text-[5.5vw] font-black leading-tight lg:leading-20 uppercase text-white tracking-tighter drop-shadow-md">
                      {link.name}
                    </span>
                    <span className="hidden lg:block text-[5.5vw] font-black leading-20 uppercase text-primary tracking-tighter">
                      {link.name}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
            {/* Highlighter */}
            <div
              ref={highlighterRef}
              className="absolute -bottom-2 left-0 h-1 bg-primary pointer-events-none rounded-full hidden lg:block"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;




