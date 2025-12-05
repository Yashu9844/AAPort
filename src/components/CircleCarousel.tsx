"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";

const images = [
  "/images/testimonial1.png",
  "/images/testimonial2.png",
  "/images/testimonial3.png",
  "/images/testimonial4.png",
  "/images/testimonial5.png",
  "/images/testimonial6.png",
  "/images/testimonial7.png",
  "/images/testimonial1.png",
  "/images/testimonial2.png",
  "/images/testimonial3.png",
  "/images/testimonial4.png",
  "/images/testimonial5.png",
];

const CircleCarousel = () => {
  const gallery = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [isArrowHovered, setIsArrowHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <main className="w-full bg-black text-white">
      <div className='p-2 sm:p-3 lg:p-4 mb-4'>
        <div className='pt-[6vh] sm:pt-[8vh] md:pt-[10vh] lg:pt-[12vh]'>
          <h2 
            className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-primary text-white font-normal leading-[0.95] tracking-[-0.01em] flex items-center gap-3 sm:gap-4'
            onMouseEnter={() => setIsArrowHovered(true)}
            onMouseLeave={() => setIsArrowHovered(false)}
          >
            <span>Testimonials</span>
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
          </h2>
        </div>
      </div>

      <div className="relative w-full">
        {/* Top gradient mask */}
        <div className="absolute top-0 left-0 right-0 h-32 sm:h-40 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
        
        <div
          ref={gallery}
          className="relative box-border flex h-[175vh] gap-[2vw] overflow-hidden bg-black p-[2vw]"
        >
          <Column images={[images[0], images[1], images[2]]} y={y} />
          <Column images={[images[3], images[4], images[5]]} y={y2} />
          <Column images={[images[6], images[7], images[8]]} y={y3} />
          <Column images={[images[9], images[10], images[11]]} y={y4} />
        </div>
        
        {/* Bottom gradient mask */}
        <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
      </div>
    </main>
  );
};

type ColumnProps = {
  images: string[];
  y: MotionValue<number>;
};

const Column = ({ images, y }: ColumnProps) => {
  return (
    <motion.div
      className="relative -top-[45%] flex h-full w-1/4 min-w-[250px] flex-col gap-[2vw] first:top-[-45%] [&:nth-child(2)]:top-[-95%] [&:nth-child(3)]:top-[-45%] [&:nth-child(4)]:top-[-75%]"
      style={{ y }}
    >
      {images.map((src, i) => (
        <div key={i} className="relative h-full w-full overflow-hidden">
          <img
            src={`${src}`}
            alt="image"
            className="pointer-events-none object-cover w-full h-full"
          />
        </div>
      ))}
    </motion.div>
  );
};

export default CircleCarousel;
