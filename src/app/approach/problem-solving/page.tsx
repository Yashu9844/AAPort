'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function ProblemSolving() {
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
                Question 03
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-primary text-white font-normal leading-[1.1] tracking-[-0.01em] mb-8">
              What's your problem-solving philosophy?
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
                src="/images/pimg10.jpg"
                alt="Problem solving"
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
                  Break it down. <span className="text-white">Every complex problem is just a collection of simple ones.</span>
                </p>
                
                <p className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed font-light">
                  I've solved <span className="text-white">400+ coding problems</span> (300+ on LeetCode), and the pattern is always the same: understand the constraints, identify the edge cases, find the core pattern, then optimize. This mindset transfers directly to real-world engineering.
                </p>

                <p className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed font-light">
                  My competition wins—<span className="text-white">1st place in Web Development, 1st in ML NOVA, 3rd in an 8-hour AI Hackathon</span>—came from staying calm under pressure and methodically working through the problem space.
                </p>

                <div className="bg-white/[0.02] border-l-4 border-white/20 p-6 my-8">
                  <p className="text-lg text-white/80 leading-relaxed font-light">
                    <span className="font-normal text-white">My 4-Step Framework:</span><br />
                    1. Understand the "why" before the "how"<br />
                    2. Map out dependencies and constraints<br />
                    3. Start with the simplest solution that could work<br />
                    4. Iterate and optimize based on real data
                  </p>
                </div>

                <p className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed font-light">
                  At SDC, mentoring <span className="text-white">300+ students</span> taught me that the best solutions are the ones others can understand and maintain. Clever code isn't valuable—<em>clear</em> code is.
                </p>

                <div className="border-t border-white/10 pt-8 mt-8">
                  <p className="text-base text-white/60 leading-relaxed font-light">
                    When I built the Agentic AI for Career Guidance with RAG and five AI workflows, I didn't start with AI. I started by understanding the user's journey, mapping their pain points, and only then choosing the technical approach. Tech is the tool, not the solution.
                  </p>
                </div>
              </div>
            </div>

            {/* Problem-Solving Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-white/10">
              <div className="bg-white/[0.02] border border-white/10 p-6">
                <p className="text-4xl font-bold text-white mb-2">400+</p>
                <p className="text-sm text-white/60">Problems Solved</p>
              </div>
              <div className="bg-white/[0.02] border border-white/10 p-6">
                <p className="text-4xl font-bold text-white mb-2">300+</p>
                <p className="text-sm text-white/60">LeetCode</p>
              </div>
              <div className="bg-white/[0.02] border border-white/10 p-6">
                <p className="text-4xl font-bold text-white mb-2">3</p>
                <p className="text-sm text-white/60">Competition Wins</p>
              </div>
              <div className="bg-white/[0.02] border border-white/10 p-6">
                <p className="text-4xl font-bold text-white mb-2">8hr</p>
                <p className="text-sm text-white/60">Fastest Hackathon</p>
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
