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
    title: "Framer",
    description:
      "My portfolio was featured on the Framer Gallery, a collection of the best website design on the Framer platform",
    image: "/images/pimg1.jpg",
    bg: "bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500",
    link: "/achievements/framer",
  },
  {
    title: "SiteInspire",
    description:
      "Featured on Siteinspire, a long-standing showcase of exceptional web and interactive design.",
    image: "/images/pimg2.jpg",
    bg: "bg-white",
    link: "/achievements/siteinspire",
  },
  {
    title: "A1 Gallery",
    description:
      "Featured on A1.gallery, a curated collection showcasing the best websites on the web.",
    image: "/images/pimg3.jpg",
    bg: "bg-[#1a1a1a]",
    link: "/achievements/a1gallery",
  },
  {
    title: "LogoLounge 15",
    description:
      "My designs were selected for LogoLounge Book 15, showcasing identity work from around the world",
    image: "/images/pimg4.jpg",
    bg: "bg-orange-500",
    link: "/achievements/logolounge",
  },
  {
    title: "Awwwards",
    description:
      "Received recognition on Awwwards, the awards that recognize talent and effort of web designers.",
    image: "/images/pimg5.jpg",
    bg: "bg-gradient-to-br from-green-500 via-teal-500 to-cyan-500",
    link: "/achievements/awwwards",
  },
  {
    title: "CSS Design Awards",
    description:
      "Featured on CSS Design Awards, honoring web designers, developers and agencies for their outstanding work.",
    image: "/images/pimg6.jpg",
    bg: "bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500",
    link: "/achievements/cssdesignawards",
  },
  {
    title: "Behance",
    description:
      "Featured project on Behance, the world's largest creative network for showcasing and discovering creative work.",
    image: "/images/pimg7.jpg",
    bg: "bg-blue-600",
    link: "/achievements/behance",
  },
  {
    title: "Dribbble",
    description:
      "Featured shot on Dribbble, where designers gain inspiration, feedback, community, and jobs worldwide.",
    image: "/images/pimg8.jpg",
    bg: "bg-pink-500",
    link: "/achievements/dribbble",
  },
];

export default function FeaturedPage() {
  const swiperRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [isArrowHovered, setIsArrowHovered] = useState(false);

  useEffect(() => {
    if (!swiperRef.current) return;

    // Wait for DOM to fully render
    const timer = setTimeout(() => {
      if (!swiperRef.current) return;
      
      const cards = swiperRef.current.children;
      if (cards.length === 0) return;
      
      const cardWidth = (cards[0] as HTMLElement).offsetWidth + 16; // card width + gap
      const totalWidth = cardWidth * featuredItems.length;

      // Infinite scroll animation
      tweenRef.current = gsap.to(swiperRef.current, {
        x: -totalWidth,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      tweenRef.current?.kill();
      tweenRef.current = null;
    };
  }, []);

  const handleEnter = () => tweenRef.current?.pause();
  const handleLeave = () => {
    const tween = tweenRef.current as gsap.core.Tween & { resume?: () => void };
    tween?.resume?.() ?? tween?.play();
  };

  return (
    <main className="bg-black text-white w-full pb-12 md:pb-16">
      <div className="px-3 sm:px-4 md:px-5 lg:px-6">
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-primary text-white font-normal leading-[0.95] tracking-[-0.01em] mb-12 md:mb-16 flex items-center gap-3 sm:gap-4"
          onMouseEnter={() => setIsArrowHovered(true)}
          onMouseLeave={() => setIsArrowHovered(false)}
        >
          <span>Featured</span>
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

        <div className="relative overflow-hidden" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
          {/* Gradient mask on right edge only */}
          <div className="absolute right-0 top-0 bottom-0 w-32  from-black to-transparent z-10 pointer-events-none"></div>
          
          <div ref={swiperRef} className="flex gap-4">
            {/* Render cards twice for seamless loop */}
            {[...featuredItems, ...featuredItems].map((item, idx) => (
              <Link
                key={idx}
                href={item.link}
                className="group cursor-pointer flex-shrink-0 w-[360px] md:w-[420px] block"
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
              >
                <div
                  className={`${item.bg} flex items-center justify-center h-[420px] md:h-[460px] mb-5 overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]`}
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