"use client";

import React, { useEffect, useRef } from "react";
import { Compass, ShieldCheck, Heart, Award } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    icon: <Compass className="w-5 h-5 text-primary" strokeWidth={1.5} />,
    title: "Purely Harvested",
    description: "Collected from trusted natural floral regions",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-primary" strokeWidth={1.5} />,
    title: "Raw & Unprocessed",
    description: "Preserving natural nutrients and enzymes",
  },
  {
    icon: <Heart className="w-5 h-5 text-primary" strokeWidth={1.5} />,
    title: "Functional Wellness",
    description: "Crafted for healthy daily living",
  },
  {
    icon: <Award className="w-5 h-5 text-primary" strokeWidth={1.5} />,
    title: "Premium Quality",
    description: "Authentic taste with trusted sourcing",
  },
];

const FeatureStrip: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".feature-item",
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="bg-white border-y border-stone-200/50 py-12 px-6 sm:px-10 lg:px-16"
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8">
        {features.map((feat, i) => (
          <div 
            key={i} 
            className="feature-item flex items-start gap-4 transition-all duration-300 hover:translate-y-[-2px] group"
          >
            <div className="p-3 bg-stone-50 rounded-full border border-stone-100 group-hover:bg-primary/5 group-hover:border-primary/20 transition-all duration-300">
              {feat.icon}
            </div>
            <div className="space-y-1 text-left">
              <h4 className="font-serif text-[15px] font-bold text-stone-900 leading-none">
                {feat.title}
              </h4>
              <p className="font-sans text-stone-500 text-[12.5px] leading-snug">
                {feat.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureStrip;
