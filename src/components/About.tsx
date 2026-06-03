"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".reveal-text",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-[#052c22] py-32 lg:py-48 px-6 lg:px-20 text-white selection:bg-white selection:text-[#052c22]"
    >
      <div className="max-w-[1400px] mx-auto">

        {/* HEADER: POSITIONING & BELIEF */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-24 md:mb-36">
          <div className="lg:col-span-8 space-y-8">
            <span className="reveal-text block font-sans text-[11px] font-black uppercase tracking-[0.6em] text-white/40">
              The Aronutra Philosophy
            </span>
            <h2 className="reveal-text font-serif text-5xl md:text-7xl lg:text-[85px] leading-[0.95] tracking-tighter">
              Nature’s Purest Wellness, <br />
              <span className="italic font-light opacity-60">Bottled for Modern Living.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:pt-32">
            <p className="reveal-text font-sans text-stone-300 text-lg leading-relaxed font-light">
              AroNutra is a <span className="text-white font-medium">Premium Wellness Brand from India</span>,
              bridging the gap between nature's diverse ecosystems and modern healthy lifestyles through a curated 12 unique 12 raw honey varieties.
            </p>
          </div>
        </div>

        {/* NARRATIVE GRID: THREE PILLARS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-24 items-start">

          {/* Pillar 1: Nature's Landscapes */}
          <div className="reveal-text space-y-8">
            <div className="h-[1px] w-full bg-white/10" />
            <h3 className="font-serif text-2xl italic">Inspired by Landscapes</h3>
            <p className="font-sans text-white/60 leading-relaxed font-light">
              Across forests, farms, and hills, bees create honey that reflects the environment around them.
              We carefully source from unique floral regions to preserve these signatures.
              <span className="text-white block mt-2 font-normal">This is nature in its purest form.</span>
            </p>
            <div className="text-[10px] font-bold uppercase tracking-widest text-primary/80">
              Pure Honey • Farm Sourced
            </div>
          </div>

          {/* Pillar 2: The Raw Movement */}
          <div className="reveal-text space-y-8">
            <div className="h-[1px] w-full bg-white/10" />
            <h3 className="font-serif text-2xl italic">The Raw Revolution</h3>
            <p className="font-sans text-white/60 leading-relaxed font-light">
              In a world of processed foods, thousands are rediscovering the authenticity of <span className="text-white">Raw Honey India</span>.
              We preserve the enzymes and nutrients already provided by nature, delivering a trust that is tasted in every drop.
            </p>
            <div className="text-[10px] font-bold uppercase tracking-widest text-primary/80">
              Healthy Lifestyle • Natural Health
            </div>
          </div>

          {/* Pillar 3: Wellness Movement */}
          <div className="reveal-text space-y-8">
            <div className="h-[1px] w-full bg-white/10" />
            <h3 className="font-serif text-2xl italic">A Wellness Ecosystem</h3>
            <p className="font-sans text-white/60 leading-relaxed font-light">
              Our vision goes beyond the jar. We are building a movement—from wellness nutrition to innovative drink mixes.
              Aronutra helps people embrace a <span className="text-white">Nature Inspired Wellness</span> journey that isn&apos;t a trend, but a way of life.
            </p>
            <div className="text-[10px] font-bold uppercase tracking-widest text-primary/80">
              Kerala Wellness Brand • Future Forward
            </div>
          </div>

        </div>

        {/* FOOTER CTA: MINIMALIST */}
        <div className="mt-32 pt-20 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="reveal-text max-w-sm">
            <p className="font-serif italic text-white/40 text-sm">
              “Wellness isn’t a trend. It’s a return to the Remarkable Craftsmanship of Nature itself.”
            </p>
          </div>
          <div className="reveal-text">
            <a
              href="/collection"
              className="inline-flex items-center gap-8 group"
            >
              <span className="font-sans text-[11px] font-black uppercase tracking-[0.4em]">Explore the 12 Varieties</span>
              <div className="h-14 w-14 rounded-full border border-white/20 flex items-center justify-center transition-all group-hover:bg-white group-hover:text-[#052c22]">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.75 11.25L11.25 3.75M11.25 3.75H5.625M11.25 3.75V9.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;