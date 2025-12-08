'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Link from 'next/link';
import { ExternalLink, Calendar, Award, TrendingUp } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface AchievementStoryData {
  title: string;
  platform: string;
  date: string;
  category: string;
  coverImage: string;
  accentColor: string;
  excerpt: string;
  externalLink?: string;
  story: {
    challenge: string;
    approach: string;
    outcome: string;
  };
  timeline: Array<{
    phase: string;
    description: string;
    duration: string;
  }>;
  metrics: Array<{
    label: string;
    value: string;
    description: string;
  }>;
  gallery: Array<{
    image: string;
    caption: string;
  }>;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  tags: string[];
}

interface AchievementStoryProps {
  data: AchievementStoryData;
}

const AchievementStory = ({ data }: AchievementStoryProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const [isArrowHovered, setIsArrowHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.85]);

  useGSAP(() => {
    if (!storyRef.current) return;

    const paragraphs = storyRef.current.querySelectorAll('.story-paragraph');
    
    paragraphs.forEach((paragraph) => {
      const text = paragraph.textContent || '';
      const words = text.split(' ');
      paragraph.innerHTML = words
        .map((word) => `<span class="story-word" style="opacity: 0.3;">${word}</span>`)
        .join(' ');
    });

    const words = storyRef.current.querySelectorAll('.story-word');
    gsap.to(words, {
      opacity: 1,
      stagger: 0.008,
      scrollTrigger: {
        trigger: storyRef.current,
        start: 'top 70%',
        end: 'bottom 80%',
        scrub: 1,
        markers: false,
      },
    });
  });

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white">
      
      {/* Back Button - Fixed */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="fixed top-6 md:top-8 left-6 md:left-8 z-50"
      >
        <Link
          href="/#featured"
          className="group flex items-center gap-3 bg-black/30 backdrop-blur-md border border-white/10 px-4 py-3 hover:border-white/30 transition-all duration-300"
        >
          <svg
            className="w-5 h-5 text-white/70 group-hover:text-white transition-colors"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M19 12H5M5 12l7 7M5 12l7-7" strokeLinecap="square" strokeLinejoin="miter" />
          </svg>
          <span className="text-sm text-white/70 group-hover:text-white transition-colors tracking-wide uppercase text-[11px]">Back</span>
        </Link>
      </motion.div>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ opacity, scale }}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={data.coverImage}
            alt={data.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-[1920px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-5xl"
          >
            {/* Badge */}
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="w-12 sm:w-16 h-[1px] bg-white/40" />
              <span className="text-[10px] sm:text-xs text-white/70 tracking-[0.3em] uppercase font-light">
                {data.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-accent text-white font-black leading-[0.9] tracking-[-0.02em] mb-4 sm:mb-6">
              {data.title}
            </h1>

            {/* Platform */}
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white/40 font-accent font-black mb-6 sm:mb-8">
              {data.platform}
            </p>

            {/* Excerpt */}
            <p className="text-lg sm:text-xl md:text-2xl text-white/80 font-light leading-relaxed max-w-3xl mb-8 sm:mb-10">
              {data.excerpt}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10">
              <div className="flex items-center gap-2 text-white/60">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{data.date}</span>
              </div>
              {data.externalLink && (
                <a
                  href={data.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
                >
                  <span className="text-sm">View Live</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {data.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 border border-white/10 text-xs sm:text-sm text-white/70 font-light tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] text-white/40 tracking-widest uppercase">Scroll</span>
            <div className="w-[1px] h-16 bg-gradient-to-b from-white/40 to-transparent" />
          </div>
        </motion.div>
      </motion.section>

      {/* Main Content */}
      <section className="relative z-20 bg-black">
        <div className="max-w-[1920px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 sm:py-20 md:py-24 lg:py-32">
          
          {/* Story Section */}
          <div ref={storyRef} className="mb-24 sm:mb-32 md:mb-40">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
              <div className="lg:col-span-3">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl sm:text-4xl md:text-5xl font-accent font-bold text-white mb-6 flex items-center gap-3"
                  onMouseEnter={() => setIsArrowHovered(true)}
                  onMouseLeave={() => setIsArrowHovered(false)}
                >
                  The Story
                  <motion.span
                    className="text-white/30"
                    animate={{
                      x: isArrowHovered ? 4 : 0,
                      y: isArrowHovered ? 4 : 0,
                      rotate: isArrowHovered ? 45 : 0,
                    }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    ↘
                  </motion.span>
                </motion.h2>
              </div>

              <div className="lg:col-span-9 space-y-8 sm:space-y-10 md:space-y-12">
                <div>
                  <h3 className="text-sm text-white/50 tracking-widest uppercase mb-4">The Challenge</h3>
                  <p className="story-paragraph text-lg sm:text-xl md:text-2xl text-white/90 font-light leading-relaxed">
                    {data.story.challenge}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm text-white/50 tracking-widest uppercase mb-4">The Approach</h3>
                  <p className="story-paragraph text-lg sm:text-xl md:text-2xl text-white/90 font-light leading-relaxed">
                    {data.story.approach}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm text-white/50 tracking-widest uppercase mb-4">The Outcome</h3>
                  <p className="story-paragraph text-lg sm:text-xl md:text-2xl text-white/90 font-light leading-relaxed">
                    {data.story.outcome}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-24 sm:mb-32 md:mb-40" />

          {/* Metrics Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="mb-24 sm:mb-32 md:mb-40"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-accent font-bold text-white mb-12 sm:mb-16">
              Impact & Results
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
              {data.metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative bg-white/[0.02] border border-white/[0.05] p-6 sm:p-8 hover:border-white/20 transition-all duration-500"
                >
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-white/30 to-transparent" />
                  
                  <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-white/30 mb-4 group-hover:text-white/50 transition-colors" />
                  
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2 sm:mb-3">
                    {metric.value}
                  </div>
                  
                  <div className="text-base sm:text-lg text-white/60 font-light mb-2">
                    {metric.label}
                  </div>
                  
                  <p className="text-sm text-white/40 font-light leading-relaxed">
                    {metric.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Separator */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-24 sm:mb-32 md:mb-40" />

          {/* Timeline Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="mb-24 sm:mb-32 md:mb-40"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-accent font-bold text-white mb-12 sm:mb-16">
              Journey Timeline
            </h2>

            <div className="space-y-8 sm:space-y-10 md:space-y-12">
              {data.timeline.map((item, index) => (
                <motion.div
                  key={item.phase}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative pl-8 sm:pl-12 border-l-2 border-white/10"
                >
                  <div className="absolute left-0 top-0 w-4 h-4 bg-white/20 border-2 border-white/40 rounded-full transform -translate-x-[9px]" />
                  
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
                    <h3 className="text-xl sm:text-2xl font-primary text-white">{item.phase}</h3>
                    <span className="text-sm text-white/40 font-light whitespace-nowrap">{item.duration}</span>
                  </div>
                  
                  <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Separator */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-24 sm:mb-32 md:mb-40" />

          {/* Gallery Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7 }}
            className="mb-24 sm:mb-32 md:mb-40"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-accent font-bold text-white mb-12 sm:mb-16">
              Visual Journey
            </h2>

            <div className="space-y-6 sm:space-y-8 md:space-y-10">
              {data.gallery.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className="group relative overflow-hidden"
                >
                  <img
                    src={item.image}
                    alt={item.caption}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <p className="text-sm sm:text-base text-white/50 font-light mt-3 sm:mt-4">
                    {item.caption}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Testimonial (if exists) */}
          {data.testimonial && (
            <>
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-24 sm:mb-32 md:mb-40" />
              
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="max-w-4xl mx-auto text-center mb-24 sm:mb-32 md:mb-40"
              >
                <Award className="w-12 h-12 sm:w-16 sm:h-16 text-white/20 mx-auto mb-8 sm:mb-10" />
                
                <blockquote className="text-2xl sm:text-3xl md:text-4xl font-light text-white/90 leading-relaxed mb-8 sm:mb-10">
                  "{data.testimonial.quote}"
                </blockquote>
                
                <div>
                  <div className="text-lg sm:text-xl text-white font-primary mb-1">
                    {data.testimonial.author}
                  </div>
                  <div className="text-sm sm:text-base text-white/50 font-light">
                    {data.testimonial.role}
                  </div>
                </div>
              </motion.div>
            </>
          )}

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <p className="text-white/40 text-sm sm:text-base mb-6 sm:mb-8">
              Interested in similar results for your project?
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 bg-transparent text-white px-8 sm:px-10 py-4 sm:py-5 border border-white/20 hover:border-white transition-all duration-500"
            >
              <span className="text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">
                Let's Work Together
              </span>
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AchievementStory;
