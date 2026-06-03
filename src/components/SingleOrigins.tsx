"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MoveRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SingleOrigins: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        ".so-reveal",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Cards Animation
      gsap.fromTo(
        ".so-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.3,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".so-grid",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="single-origins"
      ref={sectionRef}
      className="py-32 lg:py-52 px-6 lg:px-20 bg-[#052c22] relative overflow-hidden"
    >
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white/[0.02] -skew-x-12 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* Header Block: Precision Alignment */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-24 space-y-6">
          <span className="so-reveal font-sans text-[10px] font-black uppercase tracking-[0.5em] text-[#d4af37]">
            The Curated Collection
          </span>
          <h2 className="so-reveal text-4xl sm:text-6xl lg:text-7xl font-serif text-white leading-[1] tracking-tighter">
            Discover <span className="italic font-light text-stone-300">Single Origin</span> Honey
          </h2>
          <p className="so-reveal font-sans text-stone-300/80 text-base md:text-lg leading-relaxed font-light max-w-2xl">
            Experience the unique floral identity of honey sourced from one distinct botanical origin.
            A journey through flavor, texture, and ancient wellness traditions.
          </p>
        </div>

        {/* Showcase Grid */}
        <div className="so-grid grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

          {/* Card 1: Wayanadan Forest Honey */}
          <div className="so-card group bg-white p-6 sm:p-12 flex flex-col md:flex-row gap-10 items-center rounded-sm transition-all duration-700 hover:shadow-[0_40px_80px_rgba(0,0,0,0.4)]">
            <div className="relative w-full md:w-[45%] aspect-[4/5] bg-stone-100 overflow-hidden flex-shrink-0">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                style={{ backgroundImage: `url('/images/wayanad.png')` }}
              />
              <div className="absolute inset-0 bg-[#052c22]/10 mix-blend-multiply" />
            </div>

            <div className="flex flex-col text-left justify-center h-full space-y-6">
              <div className="space-y-4">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#d4af37] font-sans">
                  Kerala Forest • Wild Sourced
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#052c22] leading-none tracking-tight">
                  Wayanadan <br /> Forest Honey
                </h3>
                <p className="font-sans text-[14px] text-stone-500 leading-relaxed font-light">
                  Harvested deep within the untouched forest reserves of Wayanad. Features robust woody complexity and organic dark floral pollen richness.
                </p>
              </div>
              <Link
                href="/products/wayanadan-forest-honey"
                className="inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-[#052c22] transition-all pt-6 border-t border-stone-100 group-hover:text-[#d4af37]"
              >
                Explore Sourcing
                <div className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center transition-all group-hover:border-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-white">
                  <MoveRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </div>
          </div>

          {/* Card 2: Eucalyptus Honey */}
          <div className="so-card group bg-white p-6 sm:p-12 flex flex-col md:flex-row gap-10 items-center rounded-sm transition-all duration-700 hover:shadow-[0_40px_80px_rgba(0,0,0,0.4)]">
            <div className="relative w-full md:w-[45%] aspect-[4/5] bg-stone-100 overflow-hidden flex-shrink-0">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                style={{ backgroundImage: `url('/images/eucal.png')` }}
              />
              <div className="absolute inset-0 bg-[#052c22]/10 mix-blend-multiply" />
            </div>

            <div className="flex flex-col text-left justify-center h-full space-y-6">
              <div className="space-y-4">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#d4af37] font-sans">
                  Nilgiris Hills • Aromatic
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#052c22] leading-none tracking-tight">
                  Eucalyptus <br /> Honey
                </h3>
                <p className="font-sans text-[14px] text-stone-500 leading-relaxed font-light">
                  Sourced from pristine highland eucalyptus groves in Ooty. Distinctly aromatic with herbal undertones, perfect as a soothing evening tonic.
                </p>
              </div>
              <Link
                href="/products/eucalyptus-honey"
                className="inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-[#052c22] transition-all pt-6 border-t border-stone-100 group-hover:text-[#d4af37]"
              >
                Explore Sourcing
                <div className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center transition-all group-hover:border-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-white">
                  <MoveRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SingleOrigins;