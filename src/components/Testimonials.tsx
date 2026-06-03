"use client";

import React, { useEffect, useRef } from "react";
import { Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  {
    quote: "“Authentic taste and premium quality unlike regular store honey. You can truly sense the floral origin in every drop.”",
    author: "Arjun R.",
    title: "Organic Enthusiast",
    location: "Mumbai",
  },
  {
    quote: "“The Wayanadan Forest Honey became a staple in my morning ritual. It’s rare to find honey this pure and potent.”",
    author: "Meera K.",
    title: "Yoga Practitioner",
    location: "Bangalore",
  },
  {
    quote: "“As a chef, I appreciate the depth of character in these single-origin jars. Beautiful packaging and truly natural flavor.”",
    author: "Vikram S.",
    title: "Culinary Artist",
    location: "Delhi",
  },
];

const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".test-reveal",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".test-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".test-grid",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 lg:py-52 px-6 lg:px-20 bg-white border-b border-stone-100"
    >
      <div className="max-w-[1440px] mx-auto">

        {/* Header: Clean & Centered */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-28 space-y-6">
          <span className="test-reveal font-sans text-[10px] font-black uppercase tracking-[0.5em] text-[#d4af37]">
            Trust & Experiences
          </span>
          <h2 className="test-reveal text-4xl sm:text-6xl lg:text-7xl font-serif text-[#052c22] leading-[1.05] tracking-tighter">
            Loved by <br />
            <span className="italic font-light text-stone-400 text-3xl sm:text-5xl lg:text-6xl">Wellness Enthusiasts</span>
          </h2>
        </div>

        {/* Testimonial Grid */}
        <div className="test-grid grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-100 border border-stone-100">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="test-card bg-white p-10 lg:p-14 flex flex-col justify-between transition-all duration-700 hover:z-10 hover:shadow-[0_40px_80px_rgba(5,44,34,0.06)] group"
            >
              <div className="space-y-8">
                {/* Minimal Stars */}
                <div className="flex gap-1.5">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={12} className="fill-[#d4af37] text-[#d4af37]" />
                  ))}
                </div>

                {/* Quote: Sophisticated Serif */}
                <blockquote className="font-serif text-[19px] lg:text-[22px] leading-relaxed text-[#052c22] font-medium italic">
                  {t.quote}
                </blockquote>
              </div>

              {/* Author Info */}
              <div className="mt-12 pt-8 border-t border-stone-50">
                <div className="flex flex-col gap-1">
                  <cite className="not-italic font-sans text-[11px] font-black uppercase tracking-[0.2em] text-[#052c22]">
                    {t.author}
                  </cite>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-[#d4af37] uppercase tracking-widest">
                      {t.title}
                    </span>
                    <span className="w-1 h-1 bg-stone-300 rounded-full" />
                    <span className="text-[10px] font-medium text-stone-400 uppercase tracking-widest">
                      {t.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Subtle Bottom Branding */}
        <div className="mt-24 text-center test-reveal">
          <p className="font-serif italic text-stone-300 text-xl md:text-2xl">
            Join the Wellness Movement.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;