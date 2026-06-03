"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    // Make lenis globally available via any casting to avoid type collisions
    (window as any).lenis = lenis;

    // Synchronize ScrollTrigger with Lenis scroll
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // Synchronize GSAP ticker with Lenis RAF
    const updatePhysics = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updatePhysics);
    gsap.ticker.lagSmoothing(0);

    // Intercept all anchor link clicks to scroll smoothly with Lenis
    const handleAnchorClicks = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (target) {
        let href = target.getAttribute("href");
        if (href) {
          // If we are on the homepage, treat "/#target" as "#target"
          const isHomePage = window.location.pathname === "/";
          if (isHomePage && href.startsWith("/#")) {
            href = href.substring(1);
          }

          if (href.startsWith("#") && href.length > 1) {
            e.preventDefault();
            const targetElement = document.querySelector(href) as HTMLElement | null;
            if (targetElement) {
              lenis.scrollTo(targetElement, { offset: -60, duration: 1.4 });
            }
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClicks);

    return () => {
      lenis.destroy();
      (window as any).lenis = undefined;
      gsap.ticker.remove(updatePhysics);
      document.removeEventListener("click", handleAnchorClicks);
    };
  }, []);

  return null;
}
