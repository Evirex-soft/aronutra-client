"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const bgImageRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Subtle movement for classic feel
    const x = (clientX / innerWidth - 0.5) * 15;
    const y = (clientY / innerHeight - 0.5) * 15;
    setMousePos({ x, y });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // 1. Initial Scale & Fade for Background (Ken Burns effect)
      tl.fromTo(bgImageRef.current,
        { scale: 1.15, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2.5, ease: "power2.out" }
      );

      // 2. Editorial Masked Reveal for H1
      tl.fromTo(".hero-mask-line",
        { y: "100%" },
        { y: "0%", duration: 1.5, stagger: 0.15, ease: "expo.out" },
        "-=1.8"
      );

      // 3. Smooth Fade for Subtext and Buttons
      tl.fromTo(".hero-classic-fade",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.1 },
        "-=1"
      );

      // 4. Parallax Scroll Effect
      gsap.to(bgImageRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      // 5. Fade content out on scroll
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -50,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "50% top",
          scrub: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full overflow-hidden bg-[#052c22] flex items-center"
    >
      {/* BACKGROUND IMAGE - Ken Burns & Parallax */}
      <div ref={bgImageRef} className="absolute inset-0 z-0">
        <Image
          src="/images/hero.png"
          alt="Premium Honey Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.7] contrast-[1.05]"
        />

        {/* <div className="absolute inset-0 bg-gradient-to-b from-[#052c22]/60 via-transparent to-[#052c22]/80" /> */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(5,44,34,0.4)_100%)]" />
      </div>

      {/* TACTILE FILM GRAIN */}
      <div className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* AMBIENT GLOW */}
      <div
        className="pointer-events-none absolute h-[60vw] w-[60vw] rounded-full blur-[120px] z-10 opacity-20 transition-transform duration-1000 ease-out"
        style={{
          background: "radial-gradient(circle, #d4af37 0%, transparent 70%)",
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
        }}
      />

      {/* MAIN CONTENT */}
      <div className="relative z-20 w-full px-6 md:px-12 lg:px-20">
        <div ref={contentRef} className="max-w-4xl">
          {/* Eyebrow */}
          <div className="overflow-hidden mb-6">
            <p className="hero-classic-fade font-sans text-[11px] font-bold uppercase tracking-[0.6em] text-primary">
              Premium Wellness Lifestyle
            </p>
          </div>

          {/* H1 - Masked Reveal */}
          <h1 className="mb-8 leading-[0.9] tracking-tighter text-white" style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}>
            <div className="overflow-hidden pb-2">
              <span className="hero-mask-line inline-block font-serif italic font-light text-stone-200">
                Nature’s Purest Wellness,
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="hero-mask-line inline-block font-sans font-black uppercase">
                Bottled for Modern Life.
              </span>
            </div>
          </h1>

          {/* Headline Subtext */}
          <div className="overflow-hidden mb-12">
            <h2 className="hero-classic-fade font-sans text-lg md:text-2xl font-light text-stone-200 leading-relaxed">
              12 Unique Raw Honey Varieties. <span className="text-primary font-serif italic tracking-normal">One Powerful Journey.</span>
            </h2>
          </div>

          {/* CTAs */}
          <div className="hero-classic-fade flex flex-wrap items-center gap-8">
            <a
              href="#products"
              className="group relative overflow-hidden rounded-full bg-primary px-10 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all duration-500"
            >
              <span className="relative z-10 group-hover:text-[#052c22] transition-colors duration-500">Explore Collection</span>
              <div className="absolute inset-0 z-0 scale-x-0 bg-white transition-transform duration-500 origin-right group-hover:scale-x-100 group-hover:origin-left" />
            </a>

            <a
              href="#about"
              className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-white"
            >
              <span className="h-[1px] w-8 bg-white/30 transition-all group-hover:w-12 group-hover:bg-primary" />
              Our Story
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Year Mark */}
      <div className="absolute left-12 bottom-24 hidden xl:block z-30">
        <p className="hero-classic-fade font-sans text-[10px] font-bold text-white/20 uppercase tracking-[0.5em] [writing-mode:vertical-lr] rotate-180">
          Since 2026 • AroNutra
        </p>
      </div>

      {/* Side Badge */}
      <div className="absolute right-12 bottom-12 hidden lg:block z-30 opacity-5">
        <p className="font-black text-[15vw] leading-none text-white tracking-tighter select-none">
          RAW
        </p>
      </div>

      {/* Cinematic Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4">
        <span className="hero-classic-fade font-sans text-[9px] font-bold uppercase tracking-[0.4em] text-white/40">Scroll</span>
        <div className="h-14 w-[1px] bg-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full bg-primary animate-classic-scroll" />
        </div>
      </div>

      {/* Performance Optimized Keyframes */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes classic-scroll {
          0% { height: 0%; top: 0%; }
          50% { height: 100%; top: 0%; }
          100% { height: 0%; top: 100%; }
        }
        .animate-classic-scroll {
          animation: classic-scroll 2.5s infinite cubic-bezier(0.7, 0, 0.3, 1);
        }
      `}} />
    </section>
  );
};

export default HeroSection;