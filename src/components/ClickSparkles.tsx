"use client";
import React, { useEffect, useRef, useState } from "react";

// A lightweight click sparkle effect that renders ephemeral particles
// across the whole page. Drop <ClickSparkles /> once in your root layout.
export default function ClickSparkles() {
  type Particle = {
    id: number;
    x: number; // viewport X
    y: number; // viewport Y
    dx: number; // travel X
    dy: number; // travel Y
    size: number;
    hue: number;
    rot: number;
    dur: number; // ms
    delay: number; // ms
  };

  const [particles, setParticles] = useState<Particle[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    const handlePointer = (e: PointerEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      const count = 8; // denser ring
      const newOnes: Particle[] = [];
      const baseRadius = 70; // base circle
      const radiusJitter = 22; // +/- px randomness at the end
      for (let i = 0; i < count; i++) {
        const angleBase = (Math.PI * 2 * i) / count; // evenly spaced
        const angle = angleBase + (Math.random() - 0.5) * 0.12; // small angular jitter (~±7deg)
        const distance = baseRadius + (Math.random() - 0.5)  * radiusJitter; // jitter radius
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;
        const size = 1.2+ Math.random() * 4; // large but fits tighter ring
        const hue = 0; // white, not tinted
        const rot = 0;
        const dur = 320 + Math.random() * 200; // slight duration variance
        const delay = Math.random() * 70; // subtle stagger
        newOnes.push({ id: idRef.current++, x, y, dx, dy, size, hue, rot, dur, delay });
      }
      setParticles((prev) => [...prev, ...newOnes]);

      // cleanup after animation completes
      const maxDur = Math.max(...newOnes.map((p) => p.dur));
      window.setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !newOnes.some((n) => n.id === p.id)));
      }, maxDur + 60);
    };

    window.addEventListener("pointerdown", handlePointer, { passive: true });
    return () => window.removeEventListener("pointerdown", handlePointer);
  }, []);

  return (
    <div className="click-sparkles" aria-hidden>
      {particles.map((p) => (
        <span
          key={p.id}
          className="sparkle"
          style={{
            left: p.x,
            top: p.y,
            // custom properties
            "--dx": `${p.dx}px`, "--dy": `${p.dy}px`,"--size": `${p.size}px`,
            "--h": `${p.hue}`,
            "--rot": `${p.rot}deg`,
            "--dur": `${p.dur}ms`,
            "--delay": `${p.delay}ms`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
