"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { AnimatePresence, motion } from "framer-motion";
import { lockScroll } from "@/lib/lenis";

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

type Achievement = {
  title: string;
  description: string;
  image: string;
  highlights: string[];
  link?: { label: string; href: string };
};

const featuredItems: Achievement[] = [
  {
    title: "1st Place – Web Dev",
    description:
      "Secured 1st place in a Web Development competition among 30+ teams, demonstrating outstanding skills in building responsive, full‑stack web applications under time constraints.",
    image: "/achievements/web-dev.webp",
    highlights: ["Out of 30+ competing teams", "Judged on the depth of UI/UX and feature set", "A responsive full‑stack app built inside the time limit"],
  },
  {
    title: "1st Place – ML NOVA",
    description:
      "Won 1st place at ML NOVA (150+ participants) by building an NLP‑powered AI agent with memory and a voice assistant for real‑time interaction during the college tech fest.",
    image: "/achievements/ml-nova.webp",
    highlights: ["150+ participants at the college tech fest", "NLP‑powered AI agent with conversational memory", "Voice assistant for real‑time spoken interaction"],
  },
  {
    title: "500+ Problems Solved",
    description:
      "Solved 500+ coding problems including 400+ on LeetCode, demonstrating deep proficiency in data structures, algorithms, and competitive programming.",
    image: "/achievements/problems-500.webp",
    highlights: ["400+ of them on LeetCode", "Daily practice from 2023 onwards", "Data structures, algorithms and competitive programming"],
    link: { label: "LeetCode profile", href: "https://leetcode.com/u/mr_alpha" },
  },
  {
    title: "FalconX × ISRO",
    description:
      "Leading a 4‑member team at FalconX Technologies, building a distributed satellite telemetry and tracking platform for ISRO programs with GPU‑accelerated processing for 70+ simultaneous satellites.",
    image: "/achievements/falconx-isro.webp",
    highlights: ["Software Lead for DATS since June 2026", "4‑member engineering team", "GPU‑accelerated telemetry for 70+ satellites", "Event‑driven RabbitMQ backbone for subsystem health"],
  },
  {
    title: "1st Place – Vertex 2.0",
    description:
      "Won 1st place at the Vertex 2.0 Hackathon, designing and shipping a working product end‑to‑end within the hackathon window.",
    image: "/achievements/vertex.webp",
    highlights: ["Idea to working product within the event", "Designed, built and demoed end‑to‑end"],
  },
  {
    title: "3rd Place – Hackathon",
    description:
      "Achieved 3rd place in an 8‑hour national hackathon with 150+ participants and 35+ teams, showcasing rapid prototyping and strong collaborative problem‑solving.",
    image: "/achievements/hackathon-3rd.webp",
    highlights: ["8‑hour national hackathon", "150+ participants across 35+ teams", "Rapid prototyping under a hard deadline"],
  },
  {
    title: "2nd Place – DSA",
    description:
      "Secured 2nd place in a DSA competition with 50 participants, demonstrating strong algorithmic problem‑solving skills in timed, competitive conditions.",
    image: "/achievements/dsa-2nd.webp",
    highlights: ["50 participants", "Timed algorithmic problem solving"],
  },
  {
    title: "SaveMe.life",
    description:
      "Engineered the Clinic Management module serving 2,000+ daily consultations at RoborosX, reducing load times by 45% and shipping 3 major product upgrades.",
    image: "/achievements/saveme.webp",
    highlights: ["Clinic Management backend for SaveMe.life v2", "2,000+ consultations a day", "System load time cut by 45%", "Built while still a student"],
  },
  {
    title: "300+ Students Mentored",
    description:
      "Led 5+ workshops and mentored 300+ students at the Software Development Club, contributing to event websites and payment integration modules.",
    image: "/achievements/mentoring.webp",
    highlights: ["300+ students mentored in web fundamentals", "5+ workshops led", "College event website with payment integration"],
  },
];

export default function FeaturedPage() {
  const swiperRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const loopWidthRef = useRef(0);
  const dragRef = useRef<{ startX: number; startOffset: number; moved: boolean } | null>(null);
  const draggedRef = useRef(false);
  const [isArrowHovered, setIsArrowHovered] = useState(false);
  const [selected, setSelected] = useState<Achievement | null>(null);

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

  // Detail view: pause the carousel, lock page scroll, close on ESC
  useEffect(() => {
    if (!selected) return;
    tweenRef.current?.pause();
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
      tweenRef.current?.resume();
    };
  }, [selected]);

  const handleEnter = () => tweenRef.current?.pause();
  const handleLeave = () => {
    if (!selected) tweenRef.current?.resume();
  };

  // Touch drag (phones/tablets): pause the loop, follow the finger, then resume from there
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!swiperRef.current) return;
    tweenRef.current?.pause();
    draggedRef.current = false;
    dragRef.current = {
      startX: e.touches[0].clientX,
      startOffset: gsap.getProperty(swiperRef.current, "x") as number,
      moved: false,
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const drag = dragRef.current;
    const width = loopWidthRef.current;
    if (!drag || !swiperRef.current || !width) return;
    const dx = e.touches[0].clientX - drag.startX;
    if (Math.abs(dx) > 8) drag.moved = true;
    gsap.set(swiperRef.current, { x: gsap.utils.wrap(-width, 0, drag.startOffset + dx) });
  };

  const handleTouchEnd = () => {
    if (!dragRef.current) return;
    // A swipe shouldn't also count as a tap on the card under the finger
    draggedRef.current = dragRef.current.moved;
    dragRef.current = null;
    startLoop();
  };

  const openCard = (item: Achievement) => {
    if (draggedRef.current) {
      draggedRef.current = false;
      return;
    }
    setSelected(item);
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
          <div ref={swiperRef} className="flex gap-4 select-none">
            {/* Render cards twice for seamless loop */}
            {[...featuredItems, ...featuredItems].map((item, idx) => (
              <div
                key={idx}
                role="button"
                tabIndex={idx < featuredItems.length ? 0 : -1}
                aria-hidden={idx >= featuredItems.length}
                aria-label={`${item.title}: view details`}
                onClick={() => openCard(item)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(item);
                  }
                }}
                className="group cursor-pointer flex-shrink-0 w-[80vw] sm:w-[360px] md:w-[420px] block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <div className="relative h-[320px] sm:h-[380px] md:h-[460px] mb-5 overflow-hidden bg-neutral-900">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 768px) 420px, (min-width: 640px) 360px, 80vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
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
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail view */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            data-lenis-prevent
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="achievement-title"
              className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-neutral-950 border border-white/10 grid grid-cols-1 md:grid-cols-2"
              initial={{ y: 30, scale: 0.97 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[9/10] md:aspect-auto md:min-h-[520px]">
                <Image src={selected.image} alt={selected.title} fill sizes="(min-width: 768px) 512px, 100vw" className="object-cover" />
              </div>
              <div className="p-6 sm:p-8 md:p-10 flex flex-col">
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                  className="self-end -mt-2 -mr-2 mb-4 h-10 w-10 flex items-center justify-center border border-white/20 text-white/70 hover:text-white hover:border-white/50 transition-colors"
                >
                  ✕
                </button>
                <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-3">Achievement</p>
                <h3 id="achievement-title" className="text-3xl sm:text-4xl font-primary leading-tight mb-5">
                  {selected.title}
                </h3>
                <p className="text-base sm:text-lg text-white/70 leading-relaxed font-light">{selected.description}</p>
                <ul className="mt-8 space-y-3 border-t border-white/10 pt-6">
                  {selected.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-white/85">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/60" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                {selected.link && (
                  <a
                    href={selected.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center gap-2 self-start border-b border-white/30 pb-0.5 text-white/80 hover:text-white transition-colors"
                  >
                    {selected.link.label}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
