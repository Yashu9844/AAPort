'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


const About = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  gsap.registerPlugin(ScrollTrigger);
  useGSAP(() => {
    let initialized = false;

    const initAnimation = () => {
      if (initialized) return;
      initialized = true;

      const paragraphs = document.querySelectorAll('.about-paragraph');
      
      if (paragraphs.length === 0) return;

      // Split text into words and wrap each in a span
      paragraphs.forEach((paragraph) => {
        const text = paragraph.textContent || '';
        const words = text.split(' ');
        paragraph.innerHTML = words
          .map((word) => `<span class="about-word" style="opacity: 0.3;">${word}</span>`)
          .join(' ');
      });

      // Force a refresh before creating the animation
      ScrollTrigger.refresh();
      
      // Animate words to highlight as you scroll
      const words = document.querySelectorAll('.about-word');
      gsap.to(words, {
        opacity: 1,
        stagger: 0.005,
        scrollTrigger: {
          trigger: '#about-section',
          start: 'top 70%',
          end: 'bottom 80%',
          scrub: 0.5,
          markers: false,
        },
      });
    };

    // Create a scroll trigger that initializes the animation when near About section
    ScrollTrigger.create({
      trigger: '#about-section',
      start: 'top bottom',
      once: true,
      onEnter: initAnimation,
    });
  });

  return (
    <div id="about-section" className="w-full min-h-screen bg-black px-8 pb-16 md:pb-24 flex items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 w-full">
        
        <div className="flex items-start">
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-primary text-white font-normal leading-[0.95] tracking-[-0.01em] flex items-center gap-3 sm:gap-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span>About</span>
            <span 
              className="text-white/30 transition-transform duration-300 ease-out inline-block"
              style={{
                transform: isHovered ? 'translate(8px, 8px) rotate(45deg)' : 'translate(0, 0) rotate(0deg)'
              }}
            >
              ↘
            </span>
          </h1>
        </div>

        <div className="space-y-4 md:space-y-6 font-kh-teka" style={{ fontSize: '18px', lineHeight: '24px', color: 'rgb(229, 229, 229)' }}>
          <p className="about-paragraph md:text-[20px] md:leading-[26px]">
            I&apos;m Yashavanth R Siddesh, a Software Development Engineer and Team Lead from Bengaluru with 1.5+ years of experience building distributed, real-time systems and production agentic AI.
          </p>

          <p className="about-paragraph md:text-[20px] md:leading-[26px]">
            At FalconX Technologies, which delivers software for ISRO programs, I lead a 4-member team that owns the architecture of a distributed satellite telemetry and tracking platform: GPU-accelerated telemetry processing for 70+ simultaneous satellites, an event-driven RabbitMQ layer for subsystem health monitoring, and the service boundaries and API contracts for ingestion, monitoring, and archival.
          </p>

          <p className="about-paragraph md:text-[20px] md:leading-[26px]">
            At RoborosX, I designed the Clinic Management backend for SaveMe.life v2, handling 2,000+ daily consultations, built real-time GPS vehicle tracking over MQTT and RabbitMQ for a school-transport ERP, and cut system load time by 45%.
          </p>

          <p className="about-paragraph md:text-[20px] md:leading-[26px]">
            Outside work I build agentic AI. CrewForge is a multi-agent workspace where autonomous bots collaborate, hand off tasks, and act inside their own cloud sandboxes, running as durable agent loops on Trigger.dev.
          </p>

          <p className="about-paragraph md:text-[20px] md:leading-[26px]">
            I&apos;ve solved 500+ coding problems (400+ on LeetCode) and won 1st place in Web Development (30+ teams), ML NOVA (150+ participants), and the Vertex 2.0 Hackathon, plus 3rd in an 8-hour national hackathon. I&apos;m completing my B.Tech in Computer Science at MVJ College of Engineering (CGPA 8.7).
          </p>

          <p className="about-paragraph md:text-[20px] md:leading-[26px]">
            I build systems that scale, experiences that resonate, and solutions that last—with clarity, craft, and intention.
          </p>

          <div className="pt-4">
            <Link 
              href="/about"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 font-light tracking-wide border-b border-white/30 pb-0.5 text-base md:text-lg"
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
            >
              See More 
              <span 
                className="transition-transform duration-300 inline-block"
                style={{
                  transform: isButtonHovered ? 'translateX(4px)' : 'translateX(0)'
                }}
              >
                →
              </span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
