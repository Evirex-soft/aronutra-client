"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FinalCTA: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-content > *",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-32 px-6 lg:px-12 bg-white relative overflow-hidden flex items-center justify-center border-b border-stone-200/40"
    >
      {/* Background Soft Gradients */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[60vw] w-[60vw] rounded-full pointer-events-none z-0 opacity-40 select-none"
        style={{
          background: "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 60%)",
          filter: "blur(100px)",
        }}
      />

      <div className="cta-content max-w-2xl text-center space-y-8 relative z-10">
        <span className="font-sans text-[10px] font-bold uppercase tracking-[0.28em] text-[#9A7E27]">
          Mindful Living
        </span>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-stone-900 leading-[1.1]">
          Bring Nature Into Your<br />Everyday Wellness
        </h2>
        <p className="font-sans text-stone-500 text-[14.5px] leading-relaxed max-w-lg mx-auto">
          Explore premium raw honey crafted from India’s finest floral landscapes.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4 font-sans">
          <a
            href="/collection"
            className="
              rounded-full
              px-9 py-4
              text-[12px]
              font-bold
              uppercase
              tracking-[0.15em]
              transition-all
              duration-300
              hover:scale-[1.04]
              hover-shimmer
              bg-gradient-to-r from-primary to-primary-dark
              text-white
              cursor-pointer
            "
            style={{
              boxShadow: "0 12px 30px rgba(212,175,55,0.25)",
            }}
          >
            Shop Collection
          </a>

          <a
            href="#footer"
            className="
              rounded-full
              border
              px-9 py-4
              text-[12px]
              font-bold
              uppercase
              tracking-[0.15em]
              transition-all
              duration-300
              hover:bg-stone-900
              hover:text-white
              border-stone-300
              text-stone-900
              cursor-pointer
            "
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
