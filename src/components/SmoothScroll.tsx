"use client";

import { useEffect } from "react";

const SmoothScroll = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let currentScroll = 0;
    let targetScroll = 0;
    let velocity = 0;
    let isScrolling = false;
    let lastTime = Date.now();
    
    const lerp = 0.15; // Smoothing factor (higher = more responsive)
    const friction = 0.92; // Friction for momentum (lower = more buttery momentum)
    const maxVelocity = 80; // Max scroll speed

    const updateScroll = () => {
      const now = Date.now();
      const deltaTime = Math.min(now - lastTime, 16) / 16; // Cap at ~60fps
      lastTime = now;

      // Calculate difference
      const diff = targetScroll - currentScroll;

      // Apply velocity and lerp
      velocity = diff * lerp + velocity * friction;
      velocity = Math.min(Math.max(velocity, -maxVelocity), maxVelocity);

      currentScroll += velocity * deltaTime * 60;

      // Apply scroll
      window.scrollTo(0, currentScroll);

      // Continue animating if there's still movement
      if (Math.abs(diff) > 0.5 || Math.abs(velocity) > 0.1) {
        requestAnimationFrame(updateScroll);
      } else {
        isScrolling = false;
        currentScroll = targetScroll;
        velocity = 0;
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      targetScroll += e.deltaY * 2.2; // Amplify scroll speed
      
      // Clamp to document bounds
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

      if (!isScrolling) {
        isScrolling = true;
        lastTime = Date.now();
        requestAnimationFrame(updateScroll);
      }
    };

    // Set initial scroll
    targetScroll = window.scrollY;
    currentScroll = window.scrollY;

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
    };
  }, []);

  return null;
};

export default SmoothScroll;
