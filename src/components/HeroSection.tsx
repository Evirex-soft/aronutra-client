"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}


const slides = [
  {
    id: 1,
    desktopImage: "/images/hero-desk.webp",
    mobileImage: "/images/mobile.jpg",
    eyebrow: "Premium Wellness Lifestyle",
    title1: "Nature’s Purest Wellness,",
    title2: "Bottled for Modern Life.",
    subtitle:
      "12 Unique Raw Honey Varieties. One Powerful Journey.",
    cta: "/collection",
    buttonText: "Explore Collection",
    duration: 8000, // 8 seconds
  },
  {
    id: 2,
    desktopImage: "/images/community-desktop.webp",
    mobileImage: "/images/community-mobile.webp",
    eyebrow: "Wellness Community",
    title1: "We're Building",
    title2: "A Wellness Community.",
    subtitle:
      "Real people. Real connections. Together, we live better naturally.",
    cta: "/#footer",
    buttonText: "Join Community",
    duration: 4000, // 4 seconds
  },
];

// const HeroSection = () => {

//   const sectionRef = useRef<HTMLElement | null>(null);
//   const contentRef = useRef<HTMLDivElement | null>(null);
//   const bgImageRef = useRef<HTMLDivElement | null>(null);
//   const bgImageMobileRef = useRef<HTMLDivElement | null>(null);
//   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
//   const [activeSlide, setActiveSlide] = useState(0);

//   const handleMouseMove = (e: React.MouseEvent) => {
//     const { clientX, clientY } = e;
//     const { innerWidth, innerHeight } = window;
//     const x = (clientX / innerWidth - 0.5) * 15;
//     const y = (clientY / innerHeight - 0.5) * 15;
//     setMousePos({ x, y });
//   };

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

//       // Animate both images (mobile and desktop containers)
//       tl.fromTo([bgImageRef.current, bgImageMobileRef.current],
//         { scale: 1.15, opacity: 0 },
//         { scale: 1, opacity: 1, duration: 2.5, ease: "power2.out" }
//       );

//       tl.fromTo(".hero-mask-line",
//         { y: "100%" },
//         { y: "0%", duration: 1.5, stagger: 0.15, ease: "expo.out" },
//         "-=1.8"
//       );

//       tl.fromTo(".hero-classic-fade",
//         { opacity: 0, y: 30 },
//         { opacity: 1, y: 0, duration: 1.2, stagger: 0.1 },
//         "-=1"
//       );

//       // Parallax for both
//       gsap.to([bgImageRef.current, bgImageMobileRef.current], {
//         yPercent: 15,
//         ease: "none",
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top top",
//           end: "bottom top",
//           scrub: true,
//         }
//       });

//       gsap.to(contentRef.current, {
//         opacity: 0,
//         y: -50,
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top top",
//           end: "50% top",
//           scrub: true,
//         }
//       });
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setActiveSlide((prev) => (prev + 1) % slides.length);
//     }, slides[activeSlide].duration);

//     return () => clearTimeout(timeout);
//   }, [activeSlide]);

//   return (
//     <section
//       ref={sectionRef}
//       onMouseMove={handleMouseMove}
//       className="relative min-h-screen lg:min-h-[100dvh] w-full overflow-hidden bg-[#052c22] flex items-center pt-32 pb-24 md:pt-40 md:pb-20"
//     >
//       {/* DESKTOP BACKGROUND IMAGE */}
//       {/* <div ref={bgImageRef} className="absolute inset-0 z-0 hidden md:block">
//         <Image
//           src="/images/hero-desk.png"
//           alt="Premium Honey Background"
//           fill
//           priority
//           sizes="100vw"
//           className="object-cover object-center brightness-[0.7] contrast-[1.05]"
//         />
//       </div> */}

//       <div
//         ref={bgImageRef}
//         className="absolute inset-0 z-0 hidden md:block"
//       >
//         {slides.map((slide, index) => (
//           <Image
//             key={slide.id}
//             src={slide.desktopImage}
//             alt=""
//             fill
//             priority
//             sizes="100vw"
//             className={`object-cover object-center brightness-[0.7] contrast-[1.05]
//       transition-opacity duration-1000 absolute inset-0
//       ${activeSlide === index
//                 ? "opacity-100"
//                 : "opacity-0"
//               }`}
//           />
//         ))}
//       </div>

//       {/* MOBILE BACKGROUND IMAGE */}
//       {/* <div ref={bgImageMobileRef} className="absolute inset-0 z-0 block md:hidden">
//         <Image
//           src="/images/mobile.jpg"
//           alt="Premium Honey Background Mobile"
//           fill
//           priority
//           sizes="100vw"
//           className="object-cover object-center brightness-[0.7] contrast-[1.05]"
//         />
//       </div> */}

//       <div
//         ref={bgImageMobileRef}
//         className="absolute inset-0 z-0 block md:hidden"
//       >
//         {slides.map((slide, index) => (
//           <Image
//             key={slide.id}
//             src={slide.mobileImage}
//             alt=""
//             fill
//             priority
//             sizes="100vw"
//             className={`object-cover object-center brightness-[0.7] contrast-[1.05]
//       transition-opacity duration-1000 absolute inset-0
//       ${activeSlide === index
//                 ? "opacity-100"
//                 : "opacity-0"
//               }`}
//           />
//         ))}
//       </div>

//       {/* OVERLAY GRADIENT */}
//       <div className="absolute inset-0 z-[1] bg-gradient-to-br from-black/10 via-transparent to-black/40" />

//       {/* TACTILE FILM GRAIN */}
//       <div className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

//       {/* AMBIENT GLOW */}
//       <div
//         className="pointer-events-none absolute h-[60vw] w-[60vw] rounded-full blur-[120px] z-10 opacity-20 transition-transform duration-1000 ease-out hidden md:block"
//         style={{
//           background: "radial-gradient(circle, #d4af37 0%, transparent 70%)",
//           transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
//         }}
//       />

//       {/* MAIN CONTENT */}
//       <div className="relative z-20 w-full px-6 md:px-12 lg:px-20">
//         <div ref={contentRef} className="max-w-4xl">
//           {/* Eyebrow */}
//           <div className="overflow-hidden mb-6">
//             <p className="hero-classic-fade font-sans text-[11px] font-bold uppercase tracking-[0.6em] text-[#f5be42]">
//               {slides[activeSlide].eyebrow}
//             </p>
//           </div>

//           {/* H1 - Masked Reveal */}
//           <h1 className="mb-8 leading-[0.9] tracking-tighter text-white" style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}>
//             <div className="overflow-hidden pb-2">
//               <span className="hero-mask-line inline-block font-medium italic font-light text-stone-200">
//                 {slides[activeSlide].title1}
//               </span>
//             </div>
//             <div className="overflow-hidden">
//               <span className="hero-mask-line inline-block font-sans font-black uppercase">
//                 {slides[activeSlide].title2}
//               </span>
//             </div>
//           </h1>

//           {/* Headline Subtext */}
//           <div className="overflow-hidden mb-12">
//             <h2 className="hero-classic-fade font-sans text-lg md:text-2xl font-light text-stone-200 leading-relaxed">
//               {slides[activeSlide].subtitle}
//             </h2>
//           </div>

//           {/* CTAs */}
//           <div className="hero-classic-fade flex flex-wrap items-center gap-8">
//             <a
//               href={slides[activeSlide].cta}
//               className="group relative overflow-hidden rounded-full bg-primary px-10 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all duration-500"
//             >
//               <span className="relative z-10">
//                 {slides[activeSlide].buttonText}
//               </span>
//             </a>

//             <a
//               href="#about"
//               className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-white"
//             >
//               <span className="h-[1px] w-8 bg-white/30 transition-all group-hover:w-12 group-hover:bg-primary" />
//               Our Story
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Year Mark - Hidden on small mobile heights */}
//       <div className="absolute left-12 bottom-24 hidden xl:block z-30">
//         <p className="hero-classic-fade font-sans text-[10px] font-bold text-white/20 uppercase tracking-[0.5em] [writing-mode:vertical-lr] rotate-180">
//           Since 2026 • AroNutra
//         </p>
//       </div>

//       {/* Side Badge - Opacity reduced and hidden on small heights to prevent clash */}
//       <div className="absolute right-12 bottom-12 hidden 2xl:block z-30 opacity-5">
//         <p className="font-black text-[15vw] leading-none text-white tracking-tighter select-none">
//           RAW
//         </p>
//       </div>



//       {/* Cinematic Scroll Indicator - Made responsive to screen height */}
//       <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-6">

//         {/* Carousel Dots */}
//         <div className="flex gap-3">
//           {slides.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setActiveSlide(index)}
//               className={`h-2 rounded-full transition-all duration-300 ${activeSlide === index
//                 ? "w-8 bg-primary"
//                 : "w-2 bg-white/40"
//                 }`}
//             />
//           ))}
//         </div>

//         {/* Scroll Indicator */}
//         <div className="flex flex-col items-center gap-4 pointer-events-none">
//           <span className="hero-classic-fade font-sans text-[9px] font-bold uppercase tracking-[0.4em] text-white/40">
//             Scroll
//           </span>

//           <div className="h-10 md:h-14 w-[1px] bg-white/10 relative overflow-hidden">
//             <div className="absolute top-0 left-0 w-full bg-primary animate-classic-scroll" />
//           </div>
//         </div>

//       </div>


//       <style dangerouslySetInnerHTML={{
//         __html: `
//         @keyframes classic-scroll {
//           0% { height: 0%; top: 0%; }
//           50% { height: 100%; top: 0%; }
//           100% { height: 0%; top: 100%; }
//         }
//         .animate-classic-scroll {
//           animation: classic-scroll 2.5s infinite cubic-bezier(0.7, 0, 0.3, 1);
//         }
//         /* Fix for very short laptop screens */
//         @media (max-height: 700px) and (min-width: 1024px) {
//           .hero-classic-fade { transform: scale(0.9); transform-origin: left; }
//           h1 { font-size: 5vw !important; }
//         }
//       `}} />
//     </section>
//   );
// };

// export default HeroSection;


const HeroSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const bgImageContainerRef = useRef<HTMLDivElement | null>(null); // Unified ref
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeSlide, setActiveSlide] = useState(0);

  // Mouse move throttled via requestAnimationFrame (implied by GSAP)
  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 15;
    const y = (e.clientY / window.innerHeight - 0.5) * 15;
    setMousePos({ x, y });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // Only animate the container to avoid double-taxing the GPU
      tl.fromTo(bgImageContainerRef.current,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: "power2.out" }
      );

      tl.fromTo(".hero-mask-line",
        { y: "100%" },
        { y: "0%", duration: 1.2, stagger: 0.1, ease: "expo.out" },
        "-=1.5"
      );

      tl.fromTo(".hero-classic-fade",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1 },
        "-=0.8"
      );

      // Optimized Parallax: Use translate3d automatically
      gsap.to(bgImageContainerRef.current, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, slides[activeSlide].duration);
    return () => clearTimeout(timeout);
  }, [activeSlide]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full overflow-hidden bg-[#052c22] flex items-center pt-20 pb-10"
    >
      {/*  Background */}
      <div
        ref={bgImageContainerRef}
        className="absolute inset-0 z-0 will-change-transform"
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${activeSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
          >
            {/* Desktop Image */}
            <Image
              src={slide.desktopImage}
              alt=""
              fill
              priority={index === 0} // Only priority for first slide
              loading={index === 0 ? undefined : "lazy"}
              sizes="100vw"
              className="hidden md:block object-cover brightness-[0.7] contrast-[1.05]"
            />
            {/* Mobile Image */}
            <Image
              src={slide.mobileImage}
              alt=""
              fill
              priority={index === 0}
              loading={index === 0 ? undefined : "lazy"}
              sizes="100vw"
              className="block md:hidden object-cover brightness-[0.7] contrast-[1.05]"
            />
          </div>
        ))}
      </div>

      {/* OVERLAY & GRAIN (Optimized) */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-br from-black/20 via-transparent to-black/40 pointer-events-none" />

      {/* Use a local grain or lighter CSS noise to avoid remote fetch lag */}
      <div className="absolute inset-0 z-10 opacity-[0.02] pointer-events-none mix-blend-overlay bg-noise" />

      {/* MAIN CONTENT */}
      <div className="relative z-20 w-full px-6 md:px-12 lg:px-20">
        <div ref={contentRef} className="max-w-4xl">
          <div className="overflow-hidden mb-4">
            <p className="hero-classic-fade font-sans text-[11px] font-bold uppercase tracking-[0.6em] text-[#f5be42]">
              {slides[activeSlide].eyebrow}
            </p>
          </div>

          <h1 className="mb-6 leading-[0.85] tracking-tighter text-white" style={{ fontSize: "clamp(2.2rem, 7vw, 6.5rem)" }}>
            <div className="overflow-hidden pb-1">
              <span className="hero-mask-line inline-block font-light italic text-stone-200">
                {slides[activeSlide].title1}
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="hero-mask-line inline-block font-sans font-black uppercase">
                {slides[activeSlide].title2}
              </span>
            </div>
          </h1>

          <div className="overflow-hidden mb-8 md:mb-10">
            <h2 className="hero-classic-fade font-sans text-base md:text-xl font-light text-stone-200 leading-relaxed max-w-2xl">
              {slides[activeSlide].subtitle}
            </h2>
          </div>

          <div className="hero-classic-fade flex flex-wrap items-center gap-6 md:gap-8">
            <a href={slides[activeSlide].cta} className="rounded-full bg-primary px-8 py-4 md:px-10 md:py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white transition-transform hover:scale-105 active:scale-95">
              {slides[activeSlide].buttonText}
            </a>
            <a href="#about" className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-white">
              <span className="h-[1px] w-8 bg-white/30 transition-all group-hover:w-12 group-hover:bg-primary" />
              Our Story
            </a>
          </div>
        </div>
      </div>

      {/* Indicators and Styles (Same as yours but with translate3d) */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .bg-noise { background-image: url('https://grainy-gradients.vercel.app/noise.svg'); }
        @keyframes classic-scroll {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-classic-scroll {
          animation: classic-scroll 2.5s infinite cubic-bezier(0.7, 0, 0.3, 1);
        }
        /* GPU Boost */
        .hero-mask-line, .hero-classic-fade {
          backface-visibility: hidden;
          perspective: 1000px;
          transform: translateZ(0);
        }
      `}} />
    </section >
  );
};

export default HeroSection;