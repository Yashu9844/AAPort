'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '@/components/Footer';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SectionSeparator = () => (
  <div className="w-full border-t border-white/10 my-16"></div>
);

const MediaSection = ({ imageSrc, alt }: { imageSrc: string; alt: string }) => (
  <div className="w-full overflow-hidden">
    <img
      src={imageSrc}
      alt={alt}
      className="w-full h-full object-cover"
    />
  </div>
);

const TextSection = ({ paragraphs }: { paragraphs: string[] }) => (
  <div className="my-12">
    <div className="space-y-5">
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="text-lg leading-relaxed text-white font-normal font-kh-teka">
          {paragraph}
        </p>
      ))}
    </div>
  </div>
);

const InformationSection = ({ title, paragraphs }: { title: string; paragraphs: string[] }) => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
    <div className="lg:col-span-2">
      <h2 className="text-lg font-normal text-white font-kh-teka">
        {title}
      </h2>
    </div>
    <div className="lg:col-span-10">
      <div className="space-y-5">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="text-lg leading-relaxed text-white font-normal font-kh-teka">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  </div>
);

const ProcessSection = () => {
  const processRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const phases = [
    {
      number: '01',
      title: 'Discovery',
      description: 'Understanding the problem space, user needs, and business goals through research and analysis.',
      activities: ['User Research', 'Competitive Analysis', 'Requirements Gathering', 'Technical Feasibility']
    },
    {
      number: '02',
      title: 'Design',
      description: 'Crafting intuitive interfaces and system architecture that balance aesthetics with functionality.',
      activities: ['Wireframing', 'UI/UX Design', 'System Architecture', 'Database Schema']
    },
    {
      number: '03',
      title: 'Build',
      description: 'Transforming designs into robust, scalable code with clean engineering practices.',
      activities: ['Frontend Development', 'Backend APIs', 'Database Integration', 'Testing & QA']
    },
    {
      number: '04',
      title: 'Launch',
      description: 'Deploying to production, monitoring performance, and iterating based on real-world feedback.',
      activities: ['Deployment', 'Performance Monitoring', 'User Feedback', 'Continuous Optimization']
    }
  ];

  useEffect(() => {
    if (typeof window === 'undefined' || !processRef.current) return;

    const ctx = gsap.context(() => {
      // Animate timeline line
      gsap.fromTo(
        timelineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: processRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: 1,
          },
        }
      );

      // Animate each phase card
      gsap.utils.toArray('.process-phase').forEach((phase: any, index: number) => {
        gsap.fromTo(
          phase,
          { 
            opacity: 0, 
            y: 60,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: phase,
              start: 'top 85%',
              end: 'top 60%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Animate phase number
        gsap.fromTo(
          phase.querySelector('.phase-number'),
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            delay: 0.2,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: phase,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Stagger animate activities
        const activities = phase.querySelectorAll('.activity-item');
        gsap.fromTo(
          activities,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: phase,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, processRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={processRef} className="my-20">
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px w-8 bg-white/50"></div>
          <p className="text-xs tracking-widest text-gray-500 uppercase font-kh-teka">
            Process
          </p>
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 font-kh-teka">
          How I Work
        </h2>
        <p className="text-xl text-gray-400 font-light max-w-3xl font-kh-teka">
          Every project is unique, but my approach remains consistent—thorough, intentional, and focused on delivering value at every stage.
        </p>
      </div>

      {/* Timeline Line */}
      <div className="relative mb-20">
        <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 -translate-y-1/2"></div>
        <div 
          ref={timelineRef}
          className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-white/60 via-white/40 to-white/60 -translate-y-1/2 origin-left"
        ></div>
      </div>

      {/* Process Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {phases.map((phase, index) => (
          <div
            key={phase.number}
            className="process-phase relative group"
          >
            {/* Phase Card */}
            <div className="relative bg-white/[0.02] border border-white/10 p-8 transition-all duration-500 hover:bg-white/[0.04] hover:border-white/20">
              {/* Phase Number */}
              <div className="phase-number absolute -top-6 -left-6 w-16 h-16 bg-black border border-white/20 flex items-center justify-center">
                <span className="text-2xl font-bold text-white/80 font-kh-teka">{phase.number}</span>
              </div>

              {/* Content */}
              <div className="mt-4">
                <h3 className="text-3xl font-bold text-white mb-4 font-kh-teka group-hover:text-white/90 transition-colors">
                  {phase.title}
                </h3>
                <p className="text-lg text-gray-400 leading-relaxed mb-6 font-kh-teka">
                  {phase.description}
                </p>

                {/* Activities */}
                <div className="space-y-3">
                  {phase.activities.map((activity, actIndex) => (
                    <div
                      key={actIndex}
                      className="activity-item flex items-center gap-3 text-sm text-white/70 font-kh-teka"
                    >
                      <div className="w-1.5 h-1.5 bg-white/40 rounded-full flex-shrink-0"></div>
                      <span>{activity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hover Effect Line */}
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Connection Arrow (for desktop) */}
            {index < phases.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-6 text-white/20 -translate-y-1/2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Statement */}
      <div className="mt-16 pt-12 border-t border-white/10">
        <p className="text-lg text-white/80 leading-relaxed font-kh-teka max-w-4xl">
          This process isn't rigid—it adapts to the project's needs. Whether it's a rapid prototype or a large-scale system, the core principles remain: <span className="text-white font-medium">clarity in goals, precision in execution, and constant iteration toward excellence</span>.
        </p>
      </div>
    </div>
  );
};

export default function About2() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="pt-32 pb-16 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-widest text-gray-500 mb-6 uppercase font-kh-teka">
            📖 ABOUT
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-none font-kh-teka">
            Yashavanth R Siddesh
          </h1>
          <p className="text-xl text-gray-400 font-light font-kh-teka">
            Full Stack Developer · Bengaluru
          </p>
        </div>
      </div>

      {/* Hero Image */}
      <div className="px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <MediaSection imageSrc="/image1pro.png" alt="Yashavanth R Siddesh" />
        </div>
      </div>

      {/* Introduction Text */}
      <div className="px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <TextSection 
            paragraphs={[
              "I'm Yashavanth R Siddesh, a Full Stack Developer from Bengaluru. I focus on clean engineering, strong product thinking, and purposeful interfaces that solve meaningful problems. My work lives at the intersection of design and code—where technical precision meets human experience.",
              "I started coding a year and a half ago, but my journey has been anything but conventional. I didn't take the traditional computer science path. Instead, I learned by building—real projects with real users, real deadlines, and real consequences. Every line of code I write is a reflection of my belief that technology should empower people, not complicate their lives."
            ]}
          />
        </div>
      </div>

      {/* Project Image 1 */}
      <div className="px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto space-y-1">
          <MediaSection imageSrc="/image1pro.png" alt="RoborosX Project" />
        </div>
      </div>

      {/* Experience Section */}
      <div className="px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <TextSection 
            paragraphs={[
              "At RoborosX, I built the Clinic Management module for SaveMe.life—a live health system serving over 500 doctors and processing more than 1,000 monthly transactions. I improved load times by 45%, redesigned critical UI components, and contributed to three major product upgrades that increased appointment completion rates by 25%.",
              "Working in healthcare taught me something crucial: performance isn't just a technical metric—it's a user experience variable that can determine whether a doctor can see one more patient, or whether a booking gets completed before someone gives up. I obsessed over every millisecond, every interaction pattern, every edge case. That mindset shaped how I approach every project today."
            ]}
          />
        </div>
      </div>

      {/* Project Image 2 */}
      <div className="px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto space-y-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            <MediaSection imageSrc="/image1pro.png" alt="SDC Experience" />
            <MediaSection imageSrc="/image1pro.png" alt="Teaching Students" />
          </div>
        </div>
      </div>

      {/* SDC Experience */}
      <div className="px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <TextSection 
            paragraphs={[
              "At SDC (Student Developer Community), I worked with a six-member team and mentored over 300 students through the fundamentals of web development. We built internal tools that improved workflows by 40%, making operations smoother and more efficient.",
              "Teaching forced me to simplify complex concepts, and leading a team taught me how to balance technical excellence with empathy and clear communication. It's one thing to build something yourself—it's another to teach someone else how to build it."
            ]}
          />
        </div>
      </div>

      {/* How I Work Section */}
      <div className="px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <SectionSeparator />
          <ProcessSection />
        </div>
      </div>

      {/* Projects Section */}
      <div className="px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <SectionSeparator />
          <InformationSection
            title="Projects"
            paragraphs={[
              "The projects I've built reflect my hunger to tackle meaningful challenges. I designed and launched an Interactive Phone Case eCommerce Platform using Next.js, Stripe, Kinde Auth, and Cloudinary—a fully custom configurator that allowed users to submit over 50 unique designs. The platform maintains 99% uptime, with automated email workflows and seamless order processing.",
              "Then there's my Agentic AI for Career Guidance—a RAG-powered mentorship system featuring five AI-driven workflows and intelligent scheduling that boosted beta user engagement by 30%. This project pushed me into the world of machine learning, natural language processing, and conversational AI.",
              "With SaveMe.life, I didn't just contribute—I reshaped the product experience. Using Laravel and Blade, I built systems that now serve 500+ active doctors and handle thousands of appointments. I added modules that transformed how patients and doctors interact with the platform, improving appointment booking speed by 25%."
            ]}
          />
        </div>
      </div>

      {/* Project Grid */}
      <div className="px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto space-y-1 my-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            <MediaSection imageSrc="/image1pro.png" alt="Case eCommerce" />
            <MediaSection imageSrc="/image1pro.png" alt="Agentic AI" />
            <MediaSection imageSrc="/image1pro.png" alt="SaveMe.life" />
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <SectionSeparator />
          <InformationSection
            title="Achievements"
            paragraphs={[
              "I've competed in some of the most intense coding arenas, solving over 400 problems (300+ on LeetCode) and taking home wins that pushed my limits. I secured 1st place in Web Development for delivering the deepest UI/UX and feature set. I won 1st place in ML NOVA by building an NLP-powered voice agent with memory.",
              "I earned 2nd place in two major DSA challenges and grabbed 3rd place in an 8-hour AI Hackathon focused on disaster management. These victories weren't just badges—they were proof that I could deliver under pressure, think strategically, and execute flawlessly when it mattered most.",
              "Problem-solving is where I thrive. Whether it's optimizing a database query, refactoring a messy codebase, or designing an entire system from scratch, I approach every challenge with curiosity and rigor."
            ]}
          />
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <SectionSeparator />
          <InformationSection
            title="Philosophy"
            paragraphs={[
              "Today, I'm not just building projects—I'm building systems that scale, experiences that resonate, and solutions that last. Whether it's optimizing backend performance with Laravel and Blade, crafting responsive interfaces with Next.js and TailwindCSS, or architecting AI-powered workflows with Python and RAG pipelines, I approach every challenge with the same relentless focus: make it work, make it better, make it matter.",
              "I'm driven by the moments where technical precision meets human experience. I believe the best products feel invisible—they just work. And I'm here to keep building them, one line of code, one pixel, one user interaction at a time.",
              "I believe the best solutions are often the simplest ones—the ones that feel obvious in hindsight but require deep thinking to discover. That's what drives me: clarity, craft, and intention."
            ]}
          />
        </div>
      </div>

      {/* Credits Section */}
      <div className="px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <SectionSeparator />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-lg font-normal text-white font-kh-teka">
                Technologies
              </h2>
            </div>
            <div className="lg:col-span-10">
              <div className="space-y-2">
                <p className="text-lg text-white font-normal font-kh-teka">Frontend → Next.js, React, TailwindCSS</p>
                <p className="text-lg text-white font-normal font-kh-teka">Backend → Laravel, Node.js, Python</p>
                <p className="text-lg text-white font-normal font-kh-teka">Database → MySQL, PostgreSQL, MongoDB</p>
                <p className="text-lg text-white font-normal font-kh-teka">AI/ML → RAG, NLP, OpenAI APIs</p>
                <p className="text-lg text-white font-normal font-kh-teka">Tools → Git, Docker, Stripe, Cloudinary</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Home */}
      <div className="px-6 sm:px-8 md:px-12 lg:px-16 pb-16">
        <div className="max-w-7xl mx-auto">
          <SectionSeparator />
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 font-light tracking-wide border-b border-white/30 pb-0.5 font-kh-teka"
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
