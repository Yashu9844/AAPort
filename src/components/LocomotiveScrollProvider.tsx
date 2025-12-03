"use client";

import { useEffect, useRef } from "react";
let LocomotiveScroll: any;

if (typeof window !== "undefined") {
  LocomotiveScroll = require("locomotive-scroll").default;
}

const LocomotiveScrollProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const scrollRef = useRef<LocomotiveScroll | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && LocomotiveScroll) {
      try {
        // Initialize Locomotive Scroll with smooth scrolling only
        // No parallax or speed attributes to avoid breaking animations
        scrollRef.current = new LocomotiveScroll({
          el: document.querySelector("[data-scroll-container]") as HTMLElement,
          smooth: true,
          multiplier: 1,
          lerp: 0.12, // Smooth easing for scroll
          class: "is-reveal",
          smartphone: {
            smooth: true,
            multiplier: 1,
            lerp: 0.12,
          },
          tablet: {
            smooth: true,
            multiplier: 1,
            lerp: 0.12,
          },
        });

        // Update on window resize
        const handleResize = () => {
          scrollRef.current?.update();
        };
        window.addEventListener("resize", handleResize);

        return () => {
          window.removeEventListener("resize", handleResize);
          scrollRef.current?.destroy();
        };
      } catch (error) {
        console.error("Failed to initialize Locomotive Scroll:", error);
      }
    }
  }, []);

  return (
    <div data-scroll-container className="scroll-container">
      {children}
    </div>
  );
};

export default LocomotiveScrollProvider;
