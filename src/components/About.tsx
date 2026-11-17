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
            I&apos;m Yashavanth R Siddesh, a Full Stack Developer from Bengaluru with a passion for building production-grade systems that serve real users at scale.
          </p>

          <p className="about-paragraph md:text-[20px] md:leading-[26px]">
            At FalconX Technologies, I contribute to software systems delivered for ISRO programs—building React and Django modules for mission-critical workflows, working with Redis, RabbitMQ, and MQTT for high-frequency telemetry, and owning end-to-end development of a drone mission planning platform with live telemetry visualization.
          </p>

          <p className="about-paragraph md:text-[20px] md:leading-[26px]">
            At RoborosX, I engineered the Clinic Management module for SaveMe.life v2 supporting 2,000+ daily consultations, cut system load times by 45%, and delivered 3 major product upgrades with API versioning that lowered maintenance overhead by 20%.
          </p>

          <p className="about-paragraph md:text-[20px] md:leading-[26px]">
            As a Tech Team Member at the Software Development Club, I mentored 300+ students across 5+ workshops, built the college event website with payment integration, and performed knowledge transfer to incoming team members.
          </p>

          <p className="about-paragraph md:text-[20px] md:leading-[26px]">
            I&apos;ve solved 500+ coding problems including 400+ on LeetCode, and won multiple competitions: 1st in Web Development (30+ teams), 1st in ML NOVA (150+ participants), and 3rd in an 8-hour national hackathon (35+ teams).
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
