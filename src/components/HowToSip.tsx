"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Step = {
  title: string;
  description: string;
  image: string;
  alt: string;
};

const HowItWorks: React.FC = () => {
  const component = useRef<HTMLDivElement | null>(null);
  const slider = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const steps: Step[] = [
    {
      title: "Start Naturally",
      description: "Begin your day with intention. Add a gold spoonful of raw honey to warm water or herbal tea to awaken your body's natural enzymes.",
      image: "/images/ritual.png",
      alt: "Natural Morning Ritual",
    },
    {
      title: "Nourish Daily",
      description: "Infuse your lifestyle with nature. Incorporate our unique varieties into breakfast bowls and healthy recipes for organic energy.",
      image: "/images/nourish.png",
      alt: "Daily Wellness Nutrition",
    },
    {
      title: "Feel the Difference",
      description: "Experience the long-term shift. Authentic taste leads to mindful wellness and a deeper connection to nature's purest cycles.",
      image: "/images/diff.png",
      alt: "Mindful Wellness Lifestyle",
    },
  ];

  useEffect(() => {
    if (!slider.current) return;

    let ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".panel");

      // Main Horizontal Scroll
      const scrollTween = gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: slider.current,
          pin: true,
          scrub: 1.2,
          end: () => "+=" + slider.current!.offsetWidth * 2,
          onUpdate: (self) => {
            // Update the bottom progress bar
            if (progressRef.current) {
              gsap.set(progressRef.current, { scaleX: self.progress });
            }
          }
        },
      });

      // Individual Panel Animations
      panels.forEach((panel) => {
        const text = panel.querySelector(".text-reveal");
        const image = panel.querySelector(".image-parallax");
        const bgNum = panel.querySelector(".bg-number");

        // Image Parallax Effect
        gsap.fromTo(image,
          { x: 100 },
          {
            x: -100,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: "left right",
              end: "right left",
              scrub: true
            }
          }
        );

        // Text & Background Number Entrance
        gsap.fromTo([text, bgNum],
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: "left 60%",
            },
          }
        );
      });
    }, component);

    return () => ctx.revert();
  }, []);

  return (
    <section id="how-it-works" ref={component} className="bg-[#052c22] overflow-hidden">
      <div ref={slider} className="relative h-screen flex items-center">

        {/* Horizontal Moving Wrapper */}
        <div className="w-[300vw] h-full flex flex-nowrap">
          {steps.map((step, index) => (
            <div
              key={index}
              className="panel w-screen h-full flex items-center justify-center px-6 lg:px-20 relative"
            >
              {/* Background Step Indicator */}
              <div className="bg-number absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[30vw] text-white/[0.03] font-black pointer-events-none select-none z-0">
                0{index + 1}
              </div>

              <div className="w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center relative z-10">

                {/* Image Side - Floating Frame Aesthetic */}
                <div className="lg:col-span-6 flex justify-center lg:justify-end order-2 lg:order-1">
                  <div className="image-parallax relative w-full max-w-md aspect-[3/4] group">
                    {/* Decorative Frame */}
                    <div className="absolute -inset-4 border border-[#d4af37]/20 rounded-sm -z-10 group-hover:scale-105 transition-transform duration-700" />

                    <div className="relative w-full h-full overflow-hidden rounded-sm shadow-2xl bg-[#0a3a2d]">
                      <img
                        src={step.image}
                        alt={step.alt}
                        className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#052c22]/40 via-transparent to-transparent" />
                    </div>
                  </div>
                </div>

                {/* Text Side - Editorial Style */}
                <div className="text-reveal lg:col-span-6 flex flex-col items-center text-center lg:items-start lg:text-left space-y-8 order-1 lg:order-2">
                  <div className="space-y-4">
                    <span className="font-sans text-[10px] font-black tracking-[0.5em] text-[#d4af37] uppercase">
                      The AroNutra Ritual • Step 0{index + 1}
                    </span>
                    <h3 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-none tracking-tighter">
                      {step.title}
                    </h3>
                  </div>

                  <p className="font-sans text-base md:text-lg text-stone-400 leading-relaxed max-w-sm font-light">
                    {step.description}
                  </p>

                  <div className="pt-4">
                    <div className="w-12 h-[1px] bg-[#d4af37]/40" />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Progress Navigation (Bottom Center) */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-white/10 z-30">
          <div
            ref={progressRef}
            className="h-full bg-[#d4af37] origin-left scale-x-0"
          />
          <div className="flex justify-between mt-4">
            <span className="text-[9px] font-bold text-[#d4af37] uppercase tracking-widest">Ritual Start</span>
            <span className="text-[9px] font-bold text-[#d4af37] uppercase tracking-widest">Wellness</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;