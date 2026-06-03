"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Is AroNutra honey 100% raw?",
    answer: "Absolutely. Our honey is never heated beyond the natural temperature of the hive. This cold-processing method ensures that every jar of AroNutra remains a 'living food,' keeping all natural enzymes, pollens, and antioxidants fully intact.",
  },
  {
    question: "Do you use any artificial additives?",
    answer: "No. Purity is our cornerstone. We do not use preservatives, artificial flavors, or fine-filtration. What you taste is the authentic profile of the specific floral region the bees visited.",
  },
  {
    question: "Which variety is recommended for daily use?",
    answer: "For a versatile daily ritual, we recommend our Multi-Flora or Acacia varieties. They offer a gentle sweetness that pairs perfectly with warm water or herbal teas to support a healthy lifestyle.",
  },
  {
    question: "How should I store my honey collection?",
    answer: "Raw honey is best stored in a cool, dry place away from direct sunlight. Crystallization is a natural sign of purity; if it occurs, simply place the jar in warm water to return it to a liquid state.",
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-32 lg:py-56 px-6 lg:px-20 bg-[#052c22] text-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">

          {/* LEFT SIDE: THE BRAND STATEMENT */}
          <div className="lg:col-span-5 space-y-10 lg:sticky lg:top-32">
            <div className="space-y-4">
              <span className="text-[#d4af37] font-sans text-[10px] font-black uppercase tracking-[0.6em]">
                Concierge
              </span>
              <h2 className="font-serif text-5xl md:text-7xl leading-[1] tracking-tighter">
                Common <br />
                <span className="italic font-light text-stone-400">Inquiries.</span>
              </h2>
            </div>

            <p className="font-sans text-stone-400 text-base leading-relaxed max-w-sm font-light">
              Everything you need to know about our sourcing, raw processes, and the <span className="text-white">Premium Wellness Lifestyle</span> we curate at AroNutra.
            </p>

            <div className="pt-10 hidden lg:block">
              <div className="w-16 h-[1px] bg-[#d4af37]" />
            </div>
          </div>

          {/* RIGHT SIDE: THE MINIMALIST ACCORDION */}
          <div className="lg:col-span-7 border-t border-white/10">
            {faqs.map((faq, i) => {
              const isActive = openIndex === i;
              return (
                <div
                  key={i}
                  className={`border-b border-white/10 transition-all duration-700 ${isActive ? 'bg-white/[0.02]' : ''}`}
                >
                  <button
                    onClick={() => setOpenIndex(isActive ? null : i)}
                    className="w-full flex items-center justify-between py-10 lg:py-14 text-left group"
                  >
                    <div className="flex items-baseline gap-8">
                      <span className="font-sans text-[10px] font-bold text-[#d4af37] opacity-40 group-hover:opacity-100 transition-opacity">
                        0{i + 1}
                      </span>
                      <h3 className={`font-serif text-2xl md:text-3xl lg:text-4xl leading-none tracking-tight transition-colors duration-500 ${isActive ? 'text-white' : 'text-white/40 group-hover:text-white'}`}>
                        {faq.question}
                      </h3>
                    </div>

                    {/* Minimalist Gold Toggle */}
                    <div className="relative w-6 h-6 flex items-center justify-center">
                      <div className={`absolute w-full h-[1px] bg-[#d4af37] transition-transform duration-500 ${isActive ? 'rotate-180' : ''}`} />
                      <div className={`absolute h-full w-[1px] bg-[#d4af37] transition-transform duration-500 ${isActive ? 'rotate-90 opacity-0' : 'rotate-0'}`} />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pl-16 lg:pl-20 pb-12">
                          <p className="font-sans text-stone-400 text-base md:text-lg leading-relaxed font-light max-w-2xl">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>

        {/* BOTTOM SECTION: SEO KEYWORDS & CONTACT */}
        <div className="mt-32 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex gap-10">
            <div className="text-center md:text-left">
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 mb-2">Heritage</p>
              <p className="text-[11px] font-bold text-white/60">Kerala Wellness Brand</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 mb-2">Standard</p>
              <p className="text-[11px] font-bold text-white/60">Raw Honey India</p>
            </div>
          </div>

          <a
            href="/#footer"
            className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-white hover:text-[#d4af37] transition-colors"
          >
            <span>Still have questions?</span>
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#d4af37]">
              →
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;