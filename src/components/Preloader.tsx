"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// A full-screen preloader with a mouse-following progress pill and
// a zigzag reveal that animates upward after loading.
// Duration is fixed to 3s for now (configurable via props.durationMs).
export default function Preloader({ durationMs = 3000 }: { durationMs?: number }) {
  const [progress, setProgress] = useState(0);
  const [reveal, setReveal] = useState(false);
  const [done, setDone] = useState(false);

  // Mouse-follow physics
  const mx = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const my = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0);
  const x = useSpring(mx, { stiffness: 900, damping: 35, mass: 0.4 });
  const y = useSpring(my, { stiffness: 900, damping: 35, mass: 0.4 });
  // Liquid "energy" from cursor movement to drive blob wobble
  const ampRef = useRef(0);
  const phaseRef = useRef(0);
  const lastRef = useRef<{x:number;y:number}|null>(null);
  const [waveAmp, setWaveAmp] = useState(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      const last = lastRef.current;
      if (last) {
        const dx = e.clientX - last.x;
        const dy = e.clientY - last.y;
        const spd = Math.hypot(dx, dy);
        ampRef.current = Math.min(16, ampRef.current + spd * 0.15);
      }
      lastRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  // Decay the liquid energy smoothly
  useEffect(() => {
    let raf = 0;
    const loop = () => {
      ampRef.current *= 0.9; // friction (slightly slower decay for pronounced effect)
      phaseRef.current += 0.18; // running phase for subtle ripples even when idle
      setWaveAmp(ampRef.current);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
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
        // Give the reveal animation time, then unmount
        setTimeout(() => setDone(true), 900);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [durationMs]);

  // Disable page scroll while preloader is mounted
  useEffect(() => {
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
  }, []);

  if (done) return null;

  // Build a zigzag polygon with equal points for start/end clipPath
  // Start: full screen; End: squeezed to top (0%) with the same x zigzag.
  const zig = (yPct: number) =>
    `polygon(0% 0%, 100% 0%, 100% ${yPct}%, 85% ${yPct - 2}%, 70% ${yPct}%, 55% ${yPct - 2}%, 40% ${yPct}%, 25% ${yPct - 2}%, 10% ${yPct}%, 0% ${yPct - 2}%, 0% ${yPct}%)`;

  const startClip = zig(100);
  const endClip = zig(0);

  return (
    <motion.div
      initial={false}
      animate={{ clipPath: reveal ? endClip : startClip }}
      transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
      className="fixed inset-0 z-[9999] bg-black"
      style={{ willChange: "clip-path" }}
    >
      {/* SVG filter for gooey effect */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Progress pill following mouse */}
      <motion.div
        style={{ x, y }}
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
      >
        <div className="relative isolate rounded-full border border-white/80 bg-black/90 text-white shadow-[0_4px_18px_rgba(0,0,0,0.4)] px-4 sm:px-6 md:px-8 lg:px-9 py-2 sm:py-2.5 md:py-3 text-[10px] sm:text-xs md:text-sm tracking-wide select-none min-w-[140px] sm:min-w-[200px] md:min-w-[260px] flex items-center justify-center">
          {/* Gooey fill bar */}
          <div className="absolute inset-[3px] rounded-[999px] overflow-hidden" style={{ filter: 'url(#goo)' }} aria-hidden>
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 24" preserveAspectRatio="none">
              {(() => {
                const H = 24; // svg height units
                const headX = Math.max(0.001, Math.min(100, progress));
                const baseA = 2;
                const a = Math.min(12, baseA + waveAmp * 1.2); // stronger response with cap
                const segs = 6; // more waves
                const step = H / segs;
                let d = `M 0 0 H ${headX} `;
                for (let i = 0; i < segs; i++) {
                  const y0 = i * step;
                  const y1 = (i + 1) * step;
                  const dir = i % 2 === 0 ? 1 : -1;
                  const wobble = 1 + 0.35 * Math.sin(phaseRef.current + i * 0.9);
                  const amp = a * wobble;
                  const c1x = headX + dir * amp;
                  const c1y = y0 + step / 3;
                  const c2x = headX - dir * amp;
                  const c2y = y1 - step / 3;
                  d += `C ${c1x} ${c1y}, ${c2x} ${c2y}, ${headX} ${y1} `;
                }
                d += `H 0 Z`;
                return <path d={d} fill="#ffffff" />;
              })()}
            </svg>
          </div>
          {/* Single text blended with fill: white on dark, turns black over white fill */}
          <span className="relative z-10 font-extrabold text-white mix-blend-difference w-full text-center">{progress}% LOADED</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
