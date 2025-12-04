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
    let isProgrammaticScroll = false;
    
    const lerp = 0.15;
    const friction = 0.92;
    const maxVelocity = 80;

    const updateScroll = () => {
      const now = Date.now();
      const deltaTime = Math.min(now - lastTime, 16) / 16;
      lastTime = now;

      // Check if actual scroll position changed (programmatic scroll)
      if (Math.abs(window.scrollY - currentScroll) > 50 && !isProgrammaticScroll) {
        // Snap to new position immediately
        currentScroll = window.scrollY;
        targetScroll = window.scrollY;
        velocity = 0;
        return;
      }

      const diff = targetScroll - currentScroll;

      velocity = diff * lerp + velocity * friction;
      velocity = Math.min(Math.max(velocity, -maxVelocity), maxVelocity);

      currentScroll += velocity * deltaTime * 60;

      window.scrollTo(0, currentScroll);

      if (Math.abs(diff) > 0.5 || Math.abs(velocity) > 0.1) {
        requestAnimationFrame(updateScroll);
      } else {
        isScrolling = false;
        currentScroll = targetScroll;
        velocity = 0;
        isProgrammaticScroll = false;
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      isProgrammaticScroll = false;
      
      targetScroll += e.deltaY * 2.2;
      
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

      if (!isScrolling) {
        isScrolling = true;
        lastTime = Date.now();
        requestAnimationFrame(updateScroll);
      }
    };

    // Listen for programmatic scrolls (from navigation)
    const onScroll = () => {
      if (Math.abs(window.scrollY - currentScroll) > 100) {
        isProgrammaticScroll = true;
        currentScroll = window.scrollY;
        targetScroll = window.scrollY;
        velocity = 0;
      }
    };

    targetScroll = window.scrollY;
    currentScroll = window.scrollY;

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
};

export default SmoothScroll;
