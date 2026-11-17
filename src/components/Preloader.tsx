"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

// Session key set after the first full load. The inline script in the root layout
// reads it before paint and adds `skip-preloader` to <html>, so repeat visits
// within a session never see the loader (not even for a frame).
export const PRELOADER_SEEN_KEY = "preloader-seen";

// A full-screen preloader with a thin-line progress bar and circular reveal.
// Shown once per browser session. Duration is configurable via props.durationMs.
export default function Preloader({ durationMs = 600 }: { durationMs?: number }) {
  const [progress, setProgress] = useState(0);
  const [reveal, setReveal] = useState(false);
  const [done, setDone] = useState(false);

  const overlayRef = useRef<HTMLDivElement | null>(null);

  // Skip entirely on repeat visits or for users who prefer reduced motion
  useEffect(() => {
    const skip =
      document.documentElement.classList.contains("skip-preloader") ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (skip) {
      setDone(true);
      return;
    }
    try {
      sessionStorage.setItem(PRELOADER_SEEN_KEY, "1");
    } catch {}
  }, []);

  // Progress timer (fixed duration)
  useEffect(() => {
    if (done) return;

    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / durationMs);
      setProgress(Math.round(p * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setReveal(true);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [durationMs, done]);

  // Circular mask reveal transition
  useEffect(() => {
    if (!reveal || !overlayRef.current) return;

    const tl = gsap.timeline({ onComplete: () => setDone(true) });
    tl.set(overlayRef.current, { clipPath: "circle(0% at 50% 50%)", opacity: 1 })
      .to(overlayRef.current, { clipPath: "circle(150% at 50% 50%)", duration: 0.7, ease: "power4.inOut" })
      .to(overlayRef.current, { opacity: 0, duration: 0.2 }, "-=0.15");

    return () => {
      tl.kill();
    };
  }, [reveal]);

  // Disable page scroll while loader is active
  useEffect(() => {
    if (reveal || done) return;

    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevPosition = body.style.position;
    const prevTop = body.style.top;
    const prevWidth = body.style.width;

    const y = window.scrollY;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${y}px`;
    body.style.width = "100%";

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.position = prevPosition;
      body.style.top = prevTop;
      body.style.width = prevWidth;
      window.scrollTo(0, y);
    };
  }, [reveal, done]);

  if (done) return null;

  return (
    <div id="preloader">
      {/* Circular mask reveal overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[10000] pointer-events-none bg-white"
        style={{
          clipPath: "circle(100% at 50% 50%)",
          opacity: 0,
          willChange: "clip-path, opacity",
        }}
      />

      <div className="fixed inset-0 z-[9999] bg-black overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center">
          <motion.div
            className="flex flex-col items-center gap-8 sm:gap-10 md:gap-12"
            animate={reveal ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Percentage Counter */}
            <div className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter font-kh-teka">
              {progress}<span className="text-white/40">%</span>
            </div>

            {/* Thin Progress Line */}
            <div className="relative w-[240px] sm:w-[320px] md:w-[400px] lg:w-[480px] h-[2px] bg-white/10">
              <div
                className="absolute left-0 top-0 h-full bg-white"
                style={{ width: `${progress}%`, boxShadow: "0 0 12px rgba(255, 255, 255, 0.4)" }}
              />
            </div>

            {/* Label */}
            <div className="text-white/50 text-xs sm:text-sm tracking-[0.3em] uppercase font-light font-kh-teka">
              Loading Experience
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
