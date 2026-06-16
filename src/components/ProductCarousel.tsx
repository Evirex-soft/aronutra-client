"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}



export default function CollectionDiscovery() {
  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.fromTo(
          ".hero-reveal",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 1.4,
            ease: "expo.out",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top 80%",
              toggleActions: "play none none none"
            },
          }
        );
      }
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="discovery" className="py-24 md:py-40 px-6 lg:px-20 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto">

        {/* Editorial Layout Wrapper */}
        <div ref={heroRef} className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

          {/* Image Side: Focused on the signature packaging */}
          <div className="lg:col-span-7 hero-reveal order-2 lg:order-1">
            <div className="relative group cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-[#052c22]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
              <img
                src="/images/packet.webp"
                alt="Signature Collection Packaging"
                className="w-full h-auto object-contain transition-transform duration-[2s] ease-out group-hover:scale-105"
              />

              {/* Floating Decorative Detail */}
              <div className="absolute top-10 right-10 hidden md:block">
                <span className="text-[10px] font-bold text-stone-300 uppercase tracking-[0.8em] [writing-mode:vertical-lr]">
                  Limited Batch Extraction
                </span>
              </div>
            </div>
          </div>

          {/* Text Side: The Invitation */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <span className="hero-reveal block text-[10px] font-black uppercase tracking-[0.5em] text-[#d4af37]">
                Luxury Wellness
              </span>
              <h2 className="hero-reveal font-serif text-4xl md:text-6xl lg:text-7xl text-[#052c22] leading-[1] tracking-tighter">
                Discover the <span className="italic font-light text-stone-400">Signature 12 Flavours</span>
              </h2>
            </div>

            <div className="hero-reveal space-y-6">
              <p className="font-sans text-base md:text-lg text-stone-500 max-w-md leading-relaxed font-light">
                Experience India&apos;s finest collection of 12 handcrafted raw honey varieties.
                Each expression captures a unique floral ecosystem, preserved in its most
                authentic, potent state for the modern connoisseur.
              </p>

              <div className="h-[1px] w-20 bg-[#d4af37]/40 mx-auto lg:mx-0" />
            </div>

            <div className="hero-reveal pt-6">
              <Link
                href="/collection"
                className="group relative inline-flex items-center justify-center px-12 py-5 overflow-hidden bg-[#052c22] transition-all duration-500"
              >
                <div className="absolute inset-0 w-0 bg-[#d4af37] transition-all duration-500 ease-out group-hover:w-full" />
                <span className="relative z-10 text-white text-[10px] font-black uppercase tracking-[0.4em] group-hover:text-white transition-colors duration-500">
                  Enter The Collection
                </span>
              </Link>
            </div>


          </div>
        </div>
      </div>
    </section>
  );
}