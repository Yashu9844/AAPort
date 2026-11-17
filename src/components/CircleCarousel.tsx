"use client";

import { motion, MotionValue, PanInfo, useScroll, useTransform } from "framer-motion";
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
  const [isMobile, setIsMobile] = useState(true); // Start as true to prevent hydration issues
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoSwipeRef = useRef<NodeJS.Timeout | null>(null);

  const { scrollYProgress } = useScroll({
    target: !isMobile ? gallery : undefined,
    offset: ["start end", "end start"],
  });

  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    const resize = () => {
      const width = window.innerWidth;
      const isMobileView = width < 1024; // Show mobile version on tablets too (< 1024px)
      setDimension({ width, height: window.innerHeight });
      setIsMobile(isMobileView);
    };

    window.addEventListener("resize", resize);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Auto-swipe effect
  useEffect(() => {
    if (!isMobile) return;

    const startAutoSwipe = () => {
      if (autoSwipeRef.current) clearInterval(autoSwipeRef.current);
      autoSwipeRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 4000); // Auto-swipe every 4 seconds
    };

    startAutoSwipe();

    return () => {
      if (autoSwipeRef.current) clearInterval(autoSwipeRef.current);
    };
  }, [isMobile]);

  // Handle drag end
  const handleDragEnd = (_event: unknown, info: PanInfo) => {
    if (!isMobile) return;
    
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    // Clear auto-swipe
    if (autoSwipeRef.current) clearInterval(autoSwipeRef.current);

    // Swipe threshold - if dragged more than 50px or velocity is high
    if (Math.abs(offset) > 50 || Math.abs(velocity) > 500) {
      if (offset > 0) {
        // Swipe right - previous
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      } else {
        // Swipe left - next
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }
    }

    // Restart auto-swipe after user interaction
    autoSwipeRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
  };

  const handleDragStart = () => {
    // Clear auto-swipe when user starts dragging
    if (autoSwipeRef.current) clearInterval(autoSwipeRef.current);
  };

  if (isMobile) {
    return (
      <main className="w-full bg-black text-white">
        <div className="px-4 sm:px-6 pt-10 sm:pt-12 mb-8">
          <h2 
            className="text-4xl sm:text-5xl font-primary text-white font-normal leading-[0.95] tracking-[-0.01em] flex items-center gap-3"
            onMouseEnter={() => setIsArrowHovered(true)}
            onMouseLeave={() => setIsArrowHovered(false)}
          >
            <span>Testimonials</span>
            <motion.span 
              className="text-white/30"
              animate={{
                x: isArrowHovered ? 6 : 0,
                y: isArrowHovered ? 6 : 0,
                rotate: isArrowHovered ? 45 : 0,
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              ↘
            </motion.span>
          </h2>
        </div>

        {/* Mobile Carousel */}
        <div className="relative w-full bg-black mb-12 overflow-hidden py-4">
          {/* Carousel container */}
          <div className="flex items-center justify-center px-4">
            <div 
              className="relative w-full flex items-center justify-center overflow-visible"
              style={{ height: "max(420px, 90vw)" }}
            >
              {images.map((src, i) => (
                <motion.div
                  key={i}
                  className="absolute cursor-grab active:cursor-grabbing"
                  style={{
                    zIndex: i === currentIndex ? 100 : 1,
                    width: "min(340px, 82vw)",
                  }}
                  animate={{
                    x: (i - currentIndex) * (typeof window !== 'undefined' ? window.innerWidth * 0.5 : 0),
                    opacity: i === currentIndex ? 1 : 0.2,
                    scale: i === currentIndex ? 1 : 0.85,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30,
                    mass: 0.8,
                  }}
                  drag={i === currentIndex ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.3}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                >
                  {/* Premium card container */}
                  <div className="relative group">
                    {/* Subtle border glow */}
                    <div className="absolute -inset-[1px] bg-gradient-to-br from-white/20 via-white/5 to-transparent rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Card content */}
                    <div className="relative bg-black border border-white/10 overflow-hidden aspect-square">
                      {/* Image with overlay */}
                      <div className="relative w-full h-full">
                        <img
                          src={src}
                          alt={`testimonial-${i}`}
                          className="w-full h-full object-cover select-none"
                          draggable={false}
                        />
                        {/* Subtle gradient overlay for depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60" />
                      </div>
                      
                      {/* Corner accent - top left */}
                      <div className="absolute top-0 left-0 w-12 h-12">
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/40 to-transparent" />
                        <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-white/40 to-transparent" />
                      </div>
                      
                      {/* Corner accent - bottom right */}
                      <div className="absolute bottom-0 right-0 w-12 h-12">
                        <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-white/40 to-transparent" />
                        <div className="absolute bottom-0 right-0 h-full w-[1px] bg-gradient-to-t from-white/40 to-transparent" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Premium dots indicator */}
          <div className="flex justify-center items-center gap-1.5 mt-8 pb-2">
            {images.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className="relative group"
                aria-label={`Go to testimonial ${i + 1}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {currentIndex === i ? (
                  // Active indicator
                  <div className="relative">
                    <div className="w-8 h-[2px] bg-white" />
                    <div className="absolute inset-0 w-8 h-[2px] bg-white blur-sm opacity-50" />
                  </div>
                ) : (
                  // Inactive indicator
                  <div className="w-2 h-[2px] bg-white/20 transition-all duration-300 group-hover:bg-white/40 group-hover:w-4" />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </main>
    );
  }

  // Desktop version - original scroll-driven column animation
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
