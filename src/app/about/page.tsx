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
      gsap.utils.toArray<HTMLElement>('.process-phase').forEach((phase) => {
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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="pt-32 pb-16 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-widest text-gray-500 mb-6 uppercase font-kh-teka">
            About
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-none font-kh-teka">
            Yashavanth R Siddesh
          </h1>
          <p className="text-xl text-gray-400 font-light font-kh-teka">
            Software Engineer &amp; Team Lead, Bengaluru
          </p>
        </div>
      </div>

      {/* Journey */}
      <div className="px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <MediaSection imageSrc="/about/journey.webp" alt="Timeline from first code in 2022 to Software Lead in 2026" />
        </div>
      </div>

      <div className="px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <TextSection
            paragraphs={[
              "I'm Yashavanth R Siddesh, a software engineer from Bengaluru. I lead a team building satellite telemetry software, and I build AI agents that work on their own computers.",
              "None of that was the plan in December 2022, when I started my B.Tech in Computer Science at MVJ College of Engineering and wrote my first real program. I didn't know what an API was. What I did have was a stubborn habit: open the laptop every day and build something, even when it was small, even when it was broken.",
            ]}
          />
        </div>
      </div>

      {/* The grind */}
      <div className="px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <SectionSeparator />
          <InformationSection
            title="The grind"
            paragraphs={[
              "2023 was about fundamentals. Data structures and algorithms every single day until 500+ problems were behind me, 400+ of them on LeetCode. Then I pointed that habit at real products: blogs, chat apps, e-commerce stores, clones of the apps I used, each one a little harder than the last.",
              "2024 is when it compounded. I pushed 724 public contributions to GitHub that year and started winning: 1st in Web Development out of 30+ teams, 1st at ML NOVA out of 150+ participants with an NLP voice agent that had memory, and 1st at the Vertex 2.0 Hackathon. The heatmap below isn't a claim, it's the receipt.",
            ]}
          />
          <div className="mt-12">
            <MediaSection imageSrc="/about/github-activity.webp" alt="GitHub contribution heatmap, 2023 to 2025" />
          </div>
        </div>
      </div>

      {/* RoborosX */}
      <div className="px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <SectionSeparator />
          <InformationSection
            title="First real job"
            paragraphs={[
              "While I was still a student, RoborosX trusted me with production. I designed the Clinic Management backend for SaveMe.life v2, which now handles 2,000+ consultations a day. I built live GPS tracking for a school-transport ERP, streaming every bus's location over MQTT and RabbitMQ, and I refactored queries, routing, and controllers until the system loaded 45% faster.",
              "Lectures by day, production systems by night. Healthcare taught me that performance isn't a vanity metric: a faster page is a doctor seeing one more patient, a booking that gets finished instead of abandoned.",
            ]}
          />
          <div className="mt-12">
            <MediaSection imageSrc="/about/roborosx.webp" alt="SaveMe.life: 2,000+ consultations a day, 45% faster load times" />
          </div>
        </div>
      </div>

      {/* FalconX */}
      <div className="px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <SectionSeparator />
          <InformationSection
            title="Into space tech"
            paragraphs={[
              "In December 2025 I joined FalconX Technologies, which builds software for ISRO programs, and went straight into the deep end: a distributed surveillance and space-object tracking system designed to follow 30,000+ objects in real time, plus a drone mission-planning backend on MAVLink, Redis, and Django Channels.",
              "I earned my place there. In June 2026, before I had even graduated, I was made Software Lead for DATS, our Digital Array Telemetry System. I now lead a team of four through the whole ground-station chain: CCSDS telemetry decoding, native C++ RF processing with Reed–Solomon and Viterbi, an event-driven RabbitMQ backbone, and GPU-accelerated processing for 70+ satellites.",
            ]}
          />
          <div className="mt-12 space-y-1">
            <MediaSection imageSrc="/about/falconx.webp" alt="FalconX Electro Technologies: Software Lead for DATS since June 2026" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              <MediaSection imageSrc="/projects/covers/tracking.webp" alt="Space object tracking system" />
              <MediaSection imageSrc="/projects/covers/dats.webp" alt="DATS ground-station telemetry platform" />
            </div>
          </div>
        </div>
      </div>

      {/* SDC */}
      <div className="px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <SectionSeparator />
          <InformationSection
            title="Giving back"
            paragraphs={[
              "At the Software Development Club I mentored 300+ students through web fundamentals across 5+ workshops, and built the college event website with payment integration. Teaching forced me to understand things properly: you can't explain what you only half know.",
            ]}
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-1">
            <MediaSection imageSrc="/about/sdc-mentoring.webp" alt="300+ students mentored" />
            <MediaSection imageSrc="/about/sdc-workshops.webp" alt="5+ workshops led" />
          </div>
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
            title="Building after hours"
            paragraphs={[
              "Nights and weekends go to my own products. CrewForge is a multi-agent workspace where every AI teammate gets its own cloud computer, a full Linux desktop it can browse, code, and click around in while you watch, with durable agent loops on Trigger.dev and real billing on Clerk and Neon.",
              "I also ship for real clients. The Sri Sai Baba tool-rental app runs an actual shop's counter from a phone: inventory, rentals, returns, and payments, packaged as an Android app. And the custom phone-case store, with a live on-canvas editor and Stripe checkout, is live for anyone to try.",
            ]}
          />
        </div>
      </div>

      <div className="px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto space-y-1 my-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            <MediaSection imageSrc="/projects/covers/crewforge.webp" alt="CrewForge multi-agent AI workspace" />
            <MediaSection imageSrc="/projects/covers/toolrental.webp" alt="Sri Sai Baba tool rental app" />
            <MediaSection imageSrc="/portfolio-images-work/figma-working/phonecasehome.png" alt="Custom phone case store" />
          </div>
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <SectionSeparator />
          <InformationSection
            title="What I believe"
            paragraphs={[
              "Consistency beats talent that doesn't show up. Four years ago I couldn't write an API; today I lead a team shipping software for satellites. The difference was never one big leap, it was a thousand ordinary days of building.",
              "I care about systems that keep working when it matters: clean service boundaries, honest metrics, and interfaces that feel obvious. Make it work, make it fast, make it matter. I'm only getting started.",
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
                <p className="text-lg text-white font-normal font-kh-teka">Systems → Rust, C++, CUDA, RabbitMQ, Kafka, MQTT, gRPC, WebSockets</p>
                <p className="text-lg text-white font-normal font-kh-teka">Backend → Django, Node.js, Laravel, FastAPI, Go</p>
                <p className="text-lg text-white font-normal font-kh-teka">Frontend → Next.js, React, TypeScript, TailwindCSS</p>
                <p className="text-lg text-white font-normal font-kh-teka">Agentic AI → Vercel AI SDK, Trigger.dev, Daytona, LangChain, LangGraph, MCP</p>
                <p className="text-lg text-white font-normal font-kh-teka">Data &amp; Cloud → PostgreSQL, Redis, MongoDB, Neon, AWS, Azure, Docker</p>
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
