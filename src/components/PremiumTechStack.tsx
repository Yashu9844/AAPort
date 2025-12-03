'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Categorized tech stack with proficiency levels
const techCategories = [
  {
    category: 'Frontend',
    items: [
      { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', proficiency: 95 },
      { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', proficiency: 92 },
      { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', proficiency: 90 },
      { name: 'TailwindCSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', proficiency: 95 },
      { name: 'Vue.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg', proficiency: 80 },
      { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', proficiency: 95 },
    ]
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', proficiency: 90 },
      { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', proficiency: 88 },
      { name: 'Express', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', proficiency: 85 },
      { name: 'Laravel', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg', proficiency: 82 },
      { name: 'Django', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg', proficiency: 78 },
      { name: 'GraphQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg', proficiency: 85 },
    ]
  },
  {
    category: 'Database & Cloud',
    items: [
      { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', proficiency: 88 },
      { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', proficiency: 85 },
      { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', proficiency: 82 },
      { name: 'Redis', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', proficiency: 80 },
      { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', proficiency: 85 },
      { name: 'Firebase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', proficiency: 88 },
    ]
  },
  {
    category: 'DevOps & Tools',
    items: [
      { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', proficiency: 85 },
      { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', proficiency: 92 },
    ]
  }
];

interface TechItemProps {
  tech: { name: string; logo: string; proficiency: number };
  index: number;
}

const TechItem = ({ tech, index }: TechItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXVal = e.clientX - rect.left;
    const mouseYVal = e.clientY - rect.top;
    const xPct = (mouseXVal / width) - 0.5;
    const yPct = (mouseYVal / height) - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full aspect-square bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] hover:border-white/20 transition-all duration-500 cursor-pointer overflow-hidden"
      >
        {/* Gradient glow on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Proficiency bar */}
        <motion.div 
          className="absolute top-0 left-0 h-[2px] bg-white/30"
          initial={{ width: 0 }}
          whileInView={{ width: `${tech.proficiency}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 + index * 0.05, ease: 'easeOut' }}
        />
        
        {/* Content */}
        <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 gap-3 sm:gap-4">
          {/* Icon */}
          <motion.div
            className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center"
            animate={{
              scale: isHovered ? 1.15 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 bg-white/10 rounded-full blur-xl"
              animate={{
                opacity: isHovered ? 0.6 : 0,
                scale: isHovered ? 1.5 : 1,
              }}
              transition={{ duration: 0.4 }}
            />
            
            <img
              src={tech.logo}
              alt={tech.name}
              className="w-full h-full object-contain filter brightness-0 invert opacity-40 group-hover:opacity-100 transition-all duration-500 relative z-10"
            />
          </motion.div>

          {/* Name */}
          <motion.div 
            className="text-center"
            animate={{
              y: isHovered ? -2 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-white/80 group-hover:text-white text-xs sm:text-sm font-light tracking-wider uppercase transition-colors duration-500">
              {tech.name}
            </h3>
            {/* Proficiency percentage - shows on hover */}
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                height: isHovered ? 'auto' : 0,
              }}
              className="text-white/40 text-[10px] mt-1 font-light"
            >
              {tech.proficiency}%
            </motion.p>
          </motion.div>
        </div>

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/0 group-hover:border-white/20 transition-all duration-500" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/0 group-hover:border-white/20 transition-all duration-500" />
      </motion.div>
    </motion.div>
  );
};

const PremiumTechStack = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [isArrowHovered, setIsArrowHovered] = useState(false);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useGSAP(() => {
    if (!headingRef.current) return;

    const words = headingRef.current.querySelectorAll('.tech-word');
    
    gsap.fromTo(
      words,
      { opacity: 0.3, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none none',
        }
      }
    );
  });

  return (
    <section 
      id="tech-stack"
      ref={sectionRef}
      className="relative w-full bg-black py-16 sm:py-20 md:py-28 lg:py-32 overflow-hidden"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent opacity-50" />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)',
        }}
      />

      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        
        {/* Section Header */}
        <div className="mb-16 sm:mb-20 md:mb-24 lg:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6 sm:mb-8"
          >
            <div className="w-12 sm:w-16 h-[1px] bg-white/30" />
            <span className="text-[10px] sm:text-xs text-white/50 tracking-[0.3em] uppercase font-light">
              Technologies
            </span>
          </motion.div>

          <h2 
            ref={headingRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-accent text-white font-black leading-[0.95] tracking-[-0.02em] mb-6 sm:mb-8"
            onMouseEnter={() => setIsArrowHovered(true)}
            onMouseLeave={() => setIsArrowHovered(false)}
          >
            <span className="tech-word inline-block mr-4 sm:mr-6">Tech</span>
            <span className="tech-word inline-block mr-4 sm:mr-6">Stack</span>
            <motion.span 
              className="tech-word inline-block text-white/30"
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

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/60 font-light leading-relaxed max-w-3xl"
          >
            A curated collection of modern technologies I leverage to build
            <span className="text-white/90"> scalable</span>,
            <span className="text-white/90"> performant</span>, and
            <span className="text-white/90"> beautiful</span> digital experiences.
          </motion.p>
        </div>

        {/* Tech Grid by Category */}
        <div className="space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">
          {techCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: categoryIndex * 0.1 }}
            >
              {/* Category Title */}
              <div className="mb-8 sm:mb-10 md:mb-12">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-[1px] bg-gradient-to-r from-white/20 via-white/10 to-transparent mb-4 sm:mb-6"
                />
                <h3 className="text-xl sm:text-2xl md:text-3xl font-primary text-white/90 tracking-wide">
                  {category.category}
                </h3>
              </div>

              {/* Tech Items Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                {category.items.map((tech, index) => (
                  <TechItem key={tech.name} tech={tech} index={index} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 sm:mt-20 md:mt-24 lg:mt-28 text-center"
        >
          <div className="inline-flex flex-col items-center gap-4 sm:gap-6">
            <p className="text-white/40 text-sm sm:text-base font-light tracking-wide">
              Want to collaborate on something amazing?
            </p>
            <a
              href="#contact"
              className="group relative bg-transparent text-white px-8 sm:px-10 py-4 sm:py-5 border border-white/20 hover:border-white transition-all duration-500 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">
                Let's Connect
                <svg 
                  className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PremiumTechStack;
