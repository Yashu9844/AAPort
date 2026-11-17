"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { motion } from "framer-motion";

const ArrowUpRight = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

const featuredItems = [
  {
    title: "1st Place – Web Dev",
    description:
      "Secured 1st place in a Web Development competition among 30+ teams, demonstrating outstanding skills in building responsive, full‑stack web applications under time constraints.",
    image: "/images/pimg1.jpg",
    bg: "bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500",
    link: "#",
  },
  {
    title: "1st Place – ML NOVA",
    description:
      "Won 1st place at ML NOVA (150+ participants) by building an NLP‑powered AI agent with memory and a voice assistant for real‑time interaction during the college tech fest.",
    image: "/images/pimg2.jpg",
    bg: "bg-gradient-to-br from-green-500 via-teal-500 to-cyan-500",
    link: "#",
  },
  {
    title: "500+ Problems Solved",
    description:
      "Solved 500+ coding problems including 400+ on LeetCode, demonstrating deep proficiency in data structures, algorithms, and competitive programming.",
    image: "/images/pimg3.jpg",
    bg: "bg-[#1a1a1a]",
    link: "https://leetcode.com/u/mr_alpha",
  },
  {
    title: "Team Lead @ FalconX",
    description:
      "Leading a 4‑member team at FalconX Technologies building a distributed satellite telemetry and tracking platform with GPU‑accelerated processing for 70+ simultaneous satellites.",
    image: "/images/pimg4.jpg",
    bg: "bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600",
    link: "#",
  },
  {
    title: "1st Place – Vertex 2.0",
    description:
      "Won 1st place at the Vertex 2.0 Hackathon, designing and shipping a working product end‑to‑end within the hackathon window.",
    image: "/images/pimg9.jpg",
    bg: "bg-gradient-to-br from-amber-500 via-orange-500 to-red-500",
    link: "#",
  },
  {
    title: "3rd Place – Hackathon",
    description:
      "Achieved 3rd place in an 8‑hour national hackathon with 150+ participants and 35+ teams, showcasing rapid prototyping and strong collaborative problem‑solving.",
    image: "/images/pimg5.jpg",
    bg: "bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500",
    link: "#",
  },
  {
    title: "2nd Place – DSA",
    description:
      "Secured 2nd place in a DSA competition with 50 participants, demonstrating strong algorithmic problem‑solving skills in timed, competitive conditions.",
    image: "/images/pimg6.jpg",
    bg: "bg-orange-500",
    link: "#",
  },
  {
    title: "SaveMe.life",
    description:
      "Engineered the Clinic Management module serving 2,000+ daily consultations at RoborosX, reducing load times by 45% and shipping 3 major product upgrades.",
    image: "/images/pimg7.jpg",
    bg: "bg-blue-600",
    link: "#",
  },
  {
    title: "300+ Students Mentored",
    description:
      "Led 5+ workshops and mentored 300+ students at the Software Development Club, contributing to event websites and payment integration modules.",
    image: "/images/pimg8.jpg",
    bg: "bg-pink-500",
    link: "#",
  },
];

export default function FeaturedPage() {
  const swiperRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const loopWidthRef = useRef(0);
  const dragRef = useRef<{ startX: number; startOffset: number } | null>(null);
  const [isArrowHovered, setIsArrowHovered] = useState(false);

  // Seamless marquee: animate relative to the current x and wrap into [-loopWidth, 0],
  // so the loop can resume from wherever a touch-drag left it.
  const startLoop = () => {
    const el = swiperRef.current;
    const width = loopWidthRef.current;
    if (!el || !width) return;
    tweenRef.current?.kill();
    const wrap = gsap.utils.wrap(-width, 0);
    tweenRef.current = gsap.to(el, {
      x: `-=${width}`,
      duration: 40,
      ease: "none",
      repeat: -1,
      modifiers: { x: gsap.utils.unitize((x: string) => wrap(parseFloat(x))) },
    });
  };

  useEffect(() => {
    // Wait for DOM to fully render
    const timer = setTimeout(() => {
      const cards = swiperRef.current?.children;
      if (!cards || cards.length === 0) return;

      const cardWidth = (cards[0] as HTMLElement).offsetWidth + 16; // card width + gap
      loopWidthRef.current = cardWidth * featuredItems.length;
      startLoop();
    }, 100);

    return () => {
      clearTimeout(timer);
      tweenRef.current?.kill();
      tweenRef.current = null;
    };
  }, []);

  const handleEnter = () => tweenRef.current?.pause();
  const handleLeave = () => tweenRef.current?.resume();

  // Touch drag (phones/tablets): pause the loop, follow the finger, then resume from there
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!swiperRef.current) return;
    tweenRef.current?.pause();
    dragRef.current = {
      startX: e.touches[0].clientX,
      startOffset: gsap.getProperty(swiperRef.current, "x") as number,
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const drag = dragRef.current;
    const width = loopWidthRef.current;
    if (!drag || !swiperRef.current || !width) return;
    const x = drag.startOffset + e.touches[0].clientX - drag.startX;
    gsap.set(swiperRef.current, { x: gsap.utils.wrap(-width, 0, x) });
  };

  const handleTouchEnd = () => {
    if (!dragRef.current) return;
    dragRef.current = null;
    startLoop();
  };

  return (
    <main className="bg-black text-white w-full pb-12 md:pb-16">
      <div className="px-3 sm:px-4 md:px-5 lg:px-6">
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-primary text-white font-normal leading-[0.95] tracking-[-0.01em] mb-12 md:mb-16 flex items-center gap-3 sm:gap-4"
          onMouseEnter={() => setIsArrowHovered(true)}
          onMouseLeave={() => setIsArrowHovered(false)}
        >
          <span>Achievements</span>
          <motion.span 
            className="text-white/30"
            animate={{
              x: isArrowHovered ? 8 : 0,
              y: isArrowHovered ? 8 : 0,
              rotate: isArrowHovered ? 45 : 0,
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            ↘
          </motion.span>
        </h1>

        <div
          className="relative overflow-hidden touch-pan-y"
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Gradient mask on right edge only */}
          <div className="absolute right-0 top-0 bottom-0 w-32  from-black to-transparent z-10 pointer-events-none"></div>
          
          <div ref={swiperRef} className="flex gap-4 select-none">
            {/* Render cards twice for seamless loop */}
            {[...featuredItems, ...featuredItems].map((item, idx) => (
              <Link
                key={idx}
                href={item.link}
                className="group cursor-pointer flex-shrink-0 w-[80vw] sm:w-[360px] md:w-[420px] block"
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
              >
                <div
                  className={`${item.bg} flex items-center justify-center h-[320px] sm:h-[380px] md:h-[460px] mb-5 overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={500}
                    height={460}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl md:text-3xl font-primary mb-3 relative transition-all duration-300">
                    {item.title}
                    <ArrowUpRight className="w-5 h-5 absolute -right-7 top-1 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" />
                  </h2>
                </div>
                <p className="text-base md:text-lg text-gray-400 leading-relaxed font-light antialiased">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}