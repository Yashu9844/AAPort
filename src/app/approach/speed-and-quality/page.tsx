'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function SpeedAndQuality() {
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
                Question 02
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-primary text-white font-normal leading-[1.1] tracking-[-0.01em] mb-8">
              How do you balance speed and quality?
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
                src="/images/pimg3.jpg"
                alt="Speed and quality balance"
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
                  Speed and quality aren't opposites—they're multipliers. The key is <span className="text-white">knowing what to optimize</span> and when.
                </p>
                
                <p className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed font-light">
                  At SaveMe.life, improving load times by <span className="text-white">45%</span> wasn't about cutting corners. It was about smarter caching, lazy loading, and database optimization. Quality code <em>is</em> fast code—clean architecture naturally performs better.
                </p>

                <p className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed font-light">
                  My eCommerce platform maintains <span className="text-white">99% uptime</span> because I invest in quality from day one: comprehensive testing, error handling, and monitoring. Speed comes from building on solid foundations, not from rushing.
                </p>

                <div className="border-l-2 border-white/20 pl-6 my-8">
                  <p className="text-xl text-white/80 leading-relaxed font-light italic">
                    "The fastest way to build something is to build it right the first time."
                  </p>
                </div>

                <p className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed font-light">
                  I use modern tools and frameworks not because they're trendy, but because they let me move fast <em>without</em> sacrificing quality. TypeScript catches bugs before deployment. Next.js gives me SSR out of the box. Good tools = faster quality.
                </p>

                <div className="border-t border-white/10 pt-8 mt-8">
                  <p className="text-base text-white/60 leading-relaxed font-light">
                    In my three major product upgrades at RoborosX, we never compromised quality for deadlines. The result? Systems that scaled, users that stayed, and tech debt that stayed minimal.
                  </p>
                </div>
              </div>
            </div>

            {/* Key Principles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-white/10">
              <div className="bg-white/[0.02] border border-white/10 p-6">
                <p className="text-sm text-white/40 uppercase tracking-wider mb-3">Principle 01</p>
                <h3 className="text-xl text-white font-normal mb-2">Write for Humans First</h3>
                <p className="text-sm text-white/60">Clean code is fast to debug, fast to extend, fast to maintain.</p>
              </div>
              <div className="bg-white/[0.02] border border-white/10 p-6">
                <p className="text-sm text-white/40 uppercase tracking-wider mb-3">Principle 02</p>
                <h3 className="text-xl text-white font-normal mb-2">Automate Everything</h3>
                <p className="text-sm text-white/60">Testing, deployment, monitoring—speed through automation.</p>
              </div>
              <div className="bg-white/[0.02] border border-white/10 p-6">
                <p className="text-sm text-white/40 uppercase tracking-wider mb-3">Principle 03</p>
                <h3 className="text-xl text-white font-normal mb-2">Measure What Matters</h3>
                <p className="text-sm text-white/60">Performance metrics guide optimization, not assumptions.</p>
              </div>
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
