'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function WhatDrivesMe() {
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
                Question 01
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-primary text-white font-normal leading-[1.1] tracking-[-0.01em] mb-8">
              What drives your development approach?
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
                src="/images/pimg1.jpg"
                alt="Development approach"
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
                  Impact. Real, measurable impact drives everything I build. At <span className="text-white">RoborosX</span>, I developed the Clinic Management module for SaveMe.life, directly serving <span className="text-white">500+ doctors</span> and thousands of patients daily.
                </p>
                
                <p className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed font-light">
                  But impact isn't just about scale—it's about the details. That <span className="text-white">45% improvement in load times</span> meant doctors could see more patients. The <span className="text-white">25% faster appointment booking</span> meant less friction for people seeking healthcare.
                </p>

                <p className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed font-light">
                  I'm driven by the challenge of making complex systems feel simple. Whether it's mentoring <span className="text-white">300+ students at SDC</span> or building an eCommerce platform with <span className="text-white">99% uptime</span>, I focus on creating solutions that just <em>work</em>—intuitively, reliably, and at scale.
                </p>

                <div className="border-t border-white/10 pt-8 mt-8">
                  <p className="text-base text-white/60 leading-relaxed font-light">
                    Every project is a chance to solve real problems for real people. That's what gets me up in the morning, and that's what pushes me to keep learning, optimizing, and building better.
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-white/10">
              <div>
                <p className="text-3xl sm:text-4xl font-bold text-white mb-2">500+</p>
                <p className="text-sm text-white/60">Doctors Served</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-bold text-white mb-2">45%</p>
                <p className="text-sm text-white/60">Faster Load Times</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-bold text-white mb-2">300+</p>
                <p className="text-sm text-white/60">Students Mentored</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-bold text-white mb-2">99%</p>
                <p className="text-sm text-white/60">Uptime Achieved</p>
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
