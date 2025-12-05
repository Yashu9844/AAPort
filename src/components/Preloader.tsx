"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

// A full-screen preloader with a premium thin-line progress bar.
// Features a minimal percentage counter and circular reveal animation.
// Duration is configurable via props.durationMs (default: 1500ms).
export default function Preloader({ durationMs = 1500 }: { durationMs?: number }) {
  const [progress, setProgress] = useState(0);
  const [reveal, setReveal] = useState(false);
  const [done, setDone] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const overlayRef = useRef<HTMLDivElement | null>(null);

  // Detect client-side hydration complete
  useEffect(() => {
    setIsClient(true);












  }, []);

  // Progress timer (fixed duration)
  useEffect(() => {


    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const elapsed = t - start;
      const p = Math.min(1, elapsed / durationMs);
      setProgress(Math.round(p * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setReveal(true);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [durationMs]);

  // Circular mask reveal transition
  useEffect(() => {
    if (!reveal || typeof window === "undefined") return;

    const delay = setTimeout(() => {
      const overlay = overlayRef.current;
      if (!overlay) return;

      const tl = gsap.timeline({
        onComplete: () => {
          setDone(true);
        }
      });

      tl.set(overlay, {
        clipPath: "circle(0% at 50% 50%)",
        opacity: 1,
      })
      .to(overlay, {
        clipPath: "circle(150% at 50% 50%)",
        duration: 1.2,
        ease: "power4.inOut",
      })
      .to(overlay, {
        opacity: 0,
        duration: 0.3,
      }, "-=0.2");

      return () => {
        tl.kill();
      };
    }, 200);

    return () => clearTimeout(delay);
  }, [reveal]);

  // Disable page scroll while loader is active
  useEffect(() => {
    if (reveal) return;

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
  }, [reveal]);

  if (done) return null;


  return (
    <>
      {/* Circular mask reveal overlay */}
      <div
        ref={overlayRef}
        id="transitionOverlay"
        className="fixed inset-0 z-[10000] pointer-events-none bg-white"
        style={{
          clipPath: "circle(100% at 50% 50%)",
          opacity: 0,
          willChange: "clip-path, opacity",
        }}
      />

      <motion.div
        initial={false}
        className="fixed inset-0 z-[9999] bg-black overflow-hidden"
      >

      {/* Premium thin-line progress bar */}
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
            <motion.div
              className="absolute left-0 top-0 h-full bg-white"
              style={{
                width: `${progress}%`,
                boxShadow: '0 0 12px rgba(255, 255, 255, 0.4)'
              }}
              transition={{ duration: 0.1, ease: 'linear' }}
            />
          </div>

          {/* Label */}
          <div className="text-white/50 text-xs sm:text-sm tracking-[0.3em] uppercase font-light font-kh-teka">
            Loading Experience
          </div>
        </motion.div>
      </div>
      </motion.div>
    </>
  );
}