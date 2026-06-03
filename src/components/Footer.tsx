"use client";

import React, { useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    // Simulate API registration
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubscribed(true);
    setIsSubmitting(false);
    setEmail("");
  };

  return (
    <motion.footer
      id="footer"
      className="py-24 px-6 sm:px-10 lg:px-16 bg-white border-t border-stone-200"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-8 lg:gap-x-12">

          {/* Company Info */}
          <motion.div className="md:col-span-4 space-y-6 flex flex-col items-center text-center md:items-start md:text-left" variants={itemVariants}>
            <h2 className="font-serif text-3xl text-stone-900 leading-none">
              AroNutra
              <span className="block font-sans font-semibold text-[#9A7E27] text-[10px] mt-2.5 tracking-[0.25em] uppercase">
                Wellness Private Limited
              </span>
            </h2>
            <p className="font-sans text-[#9A7E27] text-[12px] font-bold tracking-widest uppercase">
              Pure • Natural • Functional Nutrition
            </p>
            <p className="font-sans text-stone-500 text-[13.5px] leading-relaxed max-w-sm">
              Rooted in nature, crafted for everyday wellness. Discover the pure essence of authentic Indian floral ecosystems.
            </p>
            <div className="flex gap-4 pt-2">
              {[FaInstagram, FaFacebookF, FaLinkedinIn].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  className="w-10 h-10 border border-stone-200 rounded-full flex items-center justify-center text-stone-500 hover:text-primary hover:border-primary transition-all duration-300 bg-transparent hover:bg-stone-50"
                  whileHover={{ y: -2 }}
                >
                  <Icon size={14} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div className="md:col-span-3 space-y-6 text-center md:text-left" variants={itemVariants}>
            <h3 className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-stone-900">
              Get in Touch
            </h3>
            <div className="space-y-4">
              <div>
                <p className="font-serif text-stone-400 italic mb-1.5 text-[14px]">Visit Us</p>
                <p className="font-sans text-[13.5px] text-stone-850 leading-relaxed">
                  Palavayal, Meppadi Road <br /> Kalpetta, Kerala – 673577
                </p>
              </div>
              <div>
                <p className="font-serif text-stone-400 italic mb-1.5 text-[14px]">Email</p>
                <a href="mailto:info@aronutra.com" className="font-sans text-[13.5px] text-stone-850 hover:text-primary transition-colors">
                  info@aronutra.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div className="md:col-span-2 space-y-6 text-center md:text-left" variants={itemVariants}>
            <h3 className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-stone-900">
              Quick Links
            </h3>
            <div className="flex flex-col items-center md:items-start gap-3">
              {[
                { name: 'Home', href: '/' },
                { name: 'Collection', href: '/#products' },
                { name: 'About', href: '/#about' },
                { name: 'Contact', href: '/#footer' },
                { name: 'Privacy Policy', href: '/privacy-policy' },
                { name: 'Terms & Conditions', href: '/terms-and-conditions' },
                { name: 'Refund Policy', href: '/refund-policy' },
                { name: 'Cookies Policy', href: '/cookies' }
              ].map((link, i) => (
                <Link key={i} href={link.href} className="font-sans text-[13.5px] text-stone-500 hover:text-primary transition-colors">
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div className="md:col-span-3 space-y-6 text-center md:text-left" variants={itemVariants}>
            <h3 className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-stone-900">
              The Journal
            </h3>
            <p className="font-sans text-stone-500 text-[13.5px] leading-relaxed">
              Subscribe to receive stories of origin, wellness recipes, and private collection releases.
            </p>

            <AnimatePresence mode="wait">
              {isSubscribed ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3 bg-stone-50 border border-[#d4af37]/20 rounded-lg text-primary-dark text-[11px] font-bold tracking-wide uppercase text-center md:text-left"
                >
                  ✓ Welcome to the Circle
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3 pt-2">
                  <div className="relative border-b border-stone-200 focus-within:border-stone-900 transition-colors py-1.5 flex items-center gap-2">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-[13.5px] text-stone-900 placeholder-stone-400 font-sans"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="text-[11px] font-bold uppercase tracking-[0.1em] text-stone-900 hover:text-primary transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? "..." : "Join"}
                    </button>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>

        {/* Faint luxury watermark */}
        <div
          className="
    pointer-events-auto
    select-none
    text-center
    mt-20
    font-serif
    text-[clamp(3.5rem,10vw,12rem)]
    font-extrabold
    tracking-[-0.05em]
    leading-none
    text-stone-900/5
    hover:text-[#1f4d3a]
    transition-colors
    duration-700
    cursor-default
  "
        >
          ARONUTRA
        </div>

        {/* Copyright */}
        <motion.div className="mt-16 pt-8 border-t border-stone-100 flex flex-col md:flex-row items-center justify-between gap-4 text-center" variants={itemVariants}>
          <p className="font-sans text-[11px] tracking-[0.1em] text-stone-400 uppercase">
            © {new Date().getFullYear()} AroNutra. All rights reserved.
          </p>
          <p className="font-sans text-[11px] tracking-[0.1em] text-stone-400 uppercase">
            Designed with Intention
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;