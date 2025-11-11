"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const ArrowUpRight = (props: any) => (
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
      "JonHowell.com was featured on the Framer Gallery, a collection of the best website design on the Framer platform",
    image: "/featured/framer.png",
    bg: "bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500",
  },
  {
    title: "SiteInspire",
    description:
      "JonHowell.com was featured on Siteinspire, a long-standing showcase of exceptional web and interactive design.",
    image: "/featured/siteinspire.png",
    bg: "bg-white",
  },
  {
    title: "A1 Gallery",
    description:
      "JonHowell.com was featured on A1.gallery, a curated collection showcasing the best websites on the web.",
    image: "/featured/a1.png",
    bg: "bg-[#1a1a1a]",
  },
  {
    title: "LogoLounge 15",
    description:
      "Three logos Jon designed were selected for LogoLounge Book 15, showcasing identity work from around the world",
    image: "/featured/logolounge.png",
    bg: "bg-orange-500",
  },
  {
    title: "Awwwards",
    description:
      "JonHowell.com received recognition on Awwwards, the awards that recognize talent and effort of web designers.",
    image: "/featured/framer.png",
    bg: "bg-gradient-to-br from-green-500 via-teal-500 to-cyan-500",
  },
  {
    title: "CSS Design Awards",
    description:
      "Featured on CSS Design Awards, honoring web designers, developers and agencies for their outstanding work.",
    image: "/featured/siteinspire.png",
    bg: "bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500",
  },
  {
    title: "Behance",
    description:
      "Featured project on Behance, the world's largest creative network for showcasing and discovering creative work.",
    image: "/featured/a1.png",
    bg: "bg-blue-600",
  },
  {
    title: "Dribbble",
    description:
      "Featured shot on Dribbble, where designers gain inspiration, feedback, community, and jobs worldwide.",
    image: "/featured/logolounge.png",
    bg: "bg-pink-500",
  },
];

export default function FeaturedPage() {
  const swiperRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!swiperRef.current) return;

    // Wait for DOM to fully render
    const timer = setTimeout(() => {
      if (!swiperRef.current) return;
      
      const cards = swiperRef.current.children;
      if (cards.length === 0) return;
      
      const cardWidth = (cards[0] as HTMLElement).offsetWidth + 24; // card width + gap
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
  const handleLeave = () => (tweenRef.current as any)?.resume?.() ?? tweenRef.current?.play();

  return (
    <main className=" bg-black text-white pt-8 pb-16 w-full flex justify-center">
      <div className="w-[95%]">
        {/* Horizontal line above Featured */}
        <div className="w-full h-[1px] bg-gray-800 mb-8"></div>
        
        <h1 className="text-4xl font-primary mb-8 flex items-center gap-2">
          Featured <span className="text-gray-500">↘</span>
        </h1>

        <div className="relative overflow-hidden" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
          {/* Gradient mask on right edge only */}
          <div className="absolute right-0 top-0 bottom-0 w-32  from-black to-transparent z-10 pointer-events-none"></div>
          
          <div ref={swiperRef} className="flex gap-6">
            {/* Render cards twice for seamless loop */}
            {[...featuredItems, ...featuredItems].map((item, idx) => (
              <div
                key={idx}
                className="group cursor-pointer flex-shrink-0 w-[300px] md:w-[350px]"
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
              >
                <div
                  className={`${item.bg} flex items-center justify-center h-80 mb-4 overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={320}
                    className="object-contain p-8"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-primary mb-2 relative transition-all duration-300">
                    {item.title}
                    <ArrowUpRight className="w-4 h-4 absolute -right-6 top-1 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" />
                  </h2>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed font-light antialiased">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}