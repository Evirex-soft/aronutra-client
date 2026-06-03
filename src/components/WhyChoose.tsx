"use client";

import React, { useEffect, useRef } from "react";
import {
  Sparkles,
  ShieldCheck,
  Flower,
  Leaf,
  Award,
  Activity,
  Users,
  MapPin
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: "12 Unique Varieties",
    description: "An extraordinary collection of 12 raw honey varieties, each reflecting a specific floral signature.",
  },
  {
    icon: <Flower className="w-5 h-5" />,
    title: "Floral Sourcing",
    description: "Carefully selected sources where bees forage in untouched landscapes and forest ecosystems.",
  },
  {
    icon: <Leaf className="w-5 h-5" />,
    title: "Nature-Inspired",
    description: "Authentic products crafted around nature's finest ingredients for intentional living.",
  },
  {
    icon: <Award className="w-5 h-5" />,
    title: "Premium Standards",
    description: "Unwavering commitment to quality, ensuring every jar meets international purity benchmarks.",
  },
  {
    icon: <Activity className="w-5 h-5" />,
    title: "Wellness Innovation",
    description: "A research-driven approach to creating a complete wellness nutrition ecosystem.",
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Trusted by Families",
    description: "The preferred choice for health-conscious individuals seeking transparency and trust.",
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    title: "Kerala's Heritage",
    description: "Deeply inspired by the rich natural heritage and medicinal biodiversity of Kerala.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "Growing Ecosystem",
    description: "A mission-led movement providing natural solutions for a modern, healthier lifestyle.",
  },
];

const WhyChoose: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".wc-reveal",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".wc-item",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.08,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".wc-grid",
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
      className="py-32 lg:py-52 px-6 lg:px-20 bg-[#052c22] text-white overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto">

        {/* Header Block */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-24 space-y-6">
          <span className="wc-reveal font-sans text-[10px] font-black uppercase tracking-[0.5em] text-[#d4af37]">
            Purity & Integrity
          </span>
          <h2 className="wc-reveal text-4xl sm:text-6xl lg:text-7xl font-serif leading-[1] tracking-tighter">
            Why Choose <br />
            <span className="italic font-light text-stone-300">AroNutra?</span>
          </h2>
        </div>

        {/* Feature Grid: 2 columns mobile, 4 columns desktop */}
        <div className="wc-grid grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16 md:gap-x-12 md:gap-y-24">
          {features.map((f, i) => (
            <div
              key={i}
              className="wc-item flex flex-col items-center lg:items-start text-center lg:text-left group"
            >
              {/* Minimalist Icon with Gold Ring */}
              <div className="mb-8 relative">
                <div className="absolute inset-0 scale-150 bg-[#d4af37]/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10 w-12 h-12 flex items-center justify-center border border-white/10 rounded-full group-hover:border-[#d4af37] transition-colors duration-500 text-[#d4af37]">
                  {f.icon}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-serif text-xl sm:text-2xl text-white tracking-tight leading-tight group-hover:text-[#d4af37] transition-colors">
                  {f.title}
                </h3>
                <p className="font-sans text-[13px] sm:text-[14px] text-stone-400 leading-relaxed font-light">
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Subtle Decorative Footer */}
        <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="wc-reveal">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
              Premium Wellness Ecosystem
            </p>
          </div>
          <div className="wc-reveal flex gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-[#d4af37] rounded-full opacity-40" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;