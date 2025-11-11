"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";
import lottie from "lottie-web";

// A full-screen preloader with a mouse-following progress pill and
// a zigzag reveal that animates upward after loading.
// Duration is fixed to 3s for now (configurable via props.durationMs).
export default function Preloader({ durationMs = 3000 }: { durationMs?: number }) {
  const [progress, setProgress] = useState(0);
  const [reveal, setReveal] = useState(false);
  const [done, setDone] = useState(false);
<<<<<<< Updated upstream
  const [stage, setStage] = useState(0); // 0 idle, 1 bottom cut, 2 middle cut, 3 top cut
=======
  const [stage, setStage] = useState(0); // 0 idle, 1 blob animation
  const [isClient, setIsClient] = useState(false);
  const blobContainerRef = useRef<HTMLDivElement>(null);
>>>>>>> Stashed changes

  // Mouse-follow physics
  const mx = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const my = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0);
  const x = useSpring(mx, { stiffness: 900, damping: 35, mass: 0.4 });
  const y = useSpring(my, { stiffness: 900, damping: 35, mass: 0.4 });
  // Liquid "energy" from cursor movement to drive blob wobble
  const ampRef = useRef(0);
  const phaseRef = useRef(0);
  const tiltRef = useRef(0); // horizontal slip in px
  const lastRef = useRef<{x:number;y:number}|null>(null);
  const [waveAmp, setWaveAmp] = useState(0);
  const [tilt, setTilt] = useState(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      const last = lastRef.current;
      if (last) {
        const dx = e.clientX - last.x;
        const dy = e.clientY - last.y;
        const spd = Math.hypot(dx, dy);
        ampRef.current = Math.min(16, ampRef.current + spd * 0.22);
        // accumulate horizontal slip based on dx
        tiltRef.current = Math.max(-10, Math.min(10, tiltRef.current + dx * 0.06));
      }
      lastRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  // Smoothly move to click position instead of instant teleport
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      animate(mx, e.clientX, { duration: 0.28, ease: [0.22, 1, 0.36, 1] });
      animate(my, e.clientY, { duration: 0.28, ease: [0.22, 1, 0.36, 1] });
      ampRef.current = Math.min(16, ampRef.current + 6);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [mx, my]);

  // Decay the liquid energy smoothly
  useEffect(() => {
    let raf = 0;
    const loop = () => {
      ampRef.current *= 0.9; // friction (slightly slower decay for pronounced effect)
      phaseRef.current += 0.18; // running phase for subtle ripples even when idle
      tiltRef.current *= 0.88; // slip easing
      setWaveAmp(ampRef.current);
      setTilt(tiltRef.current);
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
        // stage-driven unmount will handle done()
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [durationMs]);

  // When reveal starts, trigger blob animation
  useEffect(() => {
    if (!reveal || !blobContainerRef.current) return;
    
    // Blob animation data
    const animationData = {
      v: "5.7.4",
      fr: 60,
      ip: 0,
      op: 60,
      w: 1920,
      h: 1080,
      nm: "Blob Wipe",
      ddd: 0,
      assets: [],
      layers: [
        {
          ddd: 0,
          ind: 1,
          ty: 1,
          nm: "White Blob",
          sr: 1,
          ks: {
            o: { a: 0, k: 100 },
            r: { a: 0, k: 0 },
            p: { a: 0, k: [960, 540, 0] },
            a: { a: 0, k: [960, 540, 0] },
            s: {
              a: 1,
              k: [
                { i: { x: [0.22, 0.22, 0.667], y: [1, 1, 1] }, o: { x: [0.167, 0.167, 0.167], y: [0, 0, 0] }, t: 0, s: [0, 0, 100] },
                { t: 30, s: [150, 150, 100] }
              ]
            }
          },
          ao: 0,
          sw: 1920,
          sh: 1080,
          sc: "#ffffff",
          ip: 0,
          op: 60,
          st: 0,
          bm: 0
        }
      ]
    };
    
    const anim = lottie.loadAnimation({
      container: blobContainerRef.current,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    });
    
    anim.addEventListener('complete', () => {
      setDone(true);
    });
    
    return () => {
      anim.destroy();
    };
  }, [reveal]);

  // Unmount is now handled by blob animation complete event

  // Disable page scroll while loader is active; restore slightly earlier (when reveal starts)
  useEffect(() => {
    if (reveal) return; // unlocking happens via cleanup when reveal flips to true

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
      // Don't force scroll - let the page maintain natural position
      if (y > 0) {
        window.scrollTo(0, y);
      }
    };
  }, [reveal]);

  if (done) return null;

  // Triangular slices: keep full black until 100%, then remove 3 left-leaning slices bottom→top
  return (
    <motion.div
      initial={false}
      className="fixed inset-0 z-[9999] bg-transparent overflow-hidden"
    >
      {/* Black overlay */}
      <motion.div
        className="absolute inset-0 z-0 bg-black"
        animate={reveal ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.01 }}
      />
      
      {/* Blob animation that reveals content */}
      {reveal && (
        <div 
          ref={blobContainerRef}
          className="absolute inset-0 z-10 pointer-events-none"
        />
      )}

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
        className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2"
        animate={reveal ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
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
                const segs = 8; // more waves
                const step = H / segs;
                const tiltUnits = tilt * 0.12; // convert px-ish to viewbox units
                let d = `M 0 0 H ${headX} `;
                for (let i = 0; i < segs; i++) {
                  const y0 = i * step;
                  const y1 = (i + 1) * step;
                  const dir = i % 2 === 0 ? 1 : -1;
                  const wobble = 1 + 0.35 * Math.sin(phaseRef.current + i * 0.9);
                  const amp = a * wobble;
                  const c1x = headX + dir * amp + tiltUnits;
                  const c1y = y0 + step / 3;
                  const c2x = headX - dir * amp + tiltUnits;
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
