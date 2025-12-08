'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function FutureOfWeb() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Back Button */}
      <Link
        href="/#approach"
        className="fixed top-6 md:top-8 left-6 md:left-8 z-50 group flex items-center gap-3 bg-black/30 backdrop-blur-md border border-white/10 px-4 py-3 hover:border-white/30 transition-all duration-300"
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

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 py-20 sm:py-24">
        <div className="w-full max-w-5xl">
          
          {/* Question Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 sm:mb-20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 sm:w-16 h-[1px] bg-white/30" />
              <span className="text-[10px] sm:text-xs text-white/50 tracking-[0.3em] uppercase font-light">
                Question 04
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-primary text-white font-normal leading-[1.1] tracking-[-0.01em] mb-8">
              Where do you see web development heading?
            </h1>
          </motion.div>

          {/* Answer Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-12"
          >
            {/* Image */}
            <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden">
              <Image
                src="/images/pimg14.jpg"
                alt="Future of web development"
                fill
                className="object-cover"
              />
            </div>

            {/* Answer Text */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-3">
                <p className="text-sm text-white/40 uppercase tracking-wider">The Answer</p>
              </div>
              
              <div className="lg:col-span-9 space-y-6">
                <p className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed font-light">
                  <span className="text-white">AI integration isn't the future—it's already here.</span> But not in the way most people think.
                </p>
                
                <p className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed font-light">
                  My Agentic AI project with <span className="text-white">RAG and five AI workflows</span> showed me that AI's real power isn't replacing developers—it's augmenting what we build. Smart autocomplete, intelligent error detection, personalized UX that adapts to user behavior in real-time.
                </p>

                <p className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed font-light">
                  We're moving toward a web that's <span className="text-white">faster, smarter, and more personalized</span>. Edge computing is bringing server-side logic closer to users. React Server Components are blurring the line between frontend and backend. The JAMstack is evolving into something more dynamic.
                </p>

                <div className="border-t border-white/10 pt-8 mt-8 pb-8 mb-8">
                  <h3 className="text-2xl text-white font-normal mb-6">Key Trends I'm Watching:</h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <span className="text-white/40">01</span>
                      <div>
                        <h4 className="text-white font-normal mb-1">AI-Native Interfaces</h4>
                        <p className="text-white/60 text-sm">Interfaces that learn and adapt to individual users</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-white/40">02</span>
                      <div>
                        <h4 className="text-white font-normal mb-1">Performance as Default</h4>
                        <p className="text-white/60 text-sm">Core Web Vitals becoming non-negotiable standards</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-white/40">03</span>
                      <div>
                        <h4 className="text-white font-normal mb-1">Type-Safe Everything</h4>
                        <p className="text-white/60 text-sm">TypeScript adoption reaching critical mass</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-white/40">04</span>
                      <div>
                        <h4 className="text-white font-normal mb-1">Full-Stack Renaissance</h4>
                        <p className="text-white/60 text-sm">Frameworks that truly unify frontend and backend</p>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed font-light">
                  But here's what won't change: <span className="text-white">fundamentals matter</span>. No matter how advanced our tools get, understanding data structures, algorithms, and core CS concepts (my 400+ LeetCode problems) will always be valuable. The best developers will be those who can bridge AI capabilities with solid engineering principles.
                </p>

                <div className="border-t border-white/10 pt-8 mt-8">
                  <p className="text-base text-white/60 leading-relaxed font-light">
                    The future of web development isn't about choosing between speed or features, between AI or traditional code, between frontend or backend. It's about synthesis—bringing the best of everything together to build experiences that feel magical but work reliably.
                  </p>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="bg-white/[0.02] border border-white/10 p-8 md:p-12 mt-12">
              <p className="text-2xl md:text-3xl text-white/90 leading-relaxed font-light italic">
                "The developers who thrive won't be the ones with the most AI prompts—they'll be the ones who understand systems deeply enough to know when to use AI, and when to write the code themselves."
              </p>
            </div>

          </motion.div>
        </div>
      </div>

      {/* Grid Background */}
      <div 
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
}
