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
            I&apos;m Yashavanth R Siddesh, a software engineer from Bengaluru. I wrote my first real program in December 2022, the month I started my B.Tech at MVJ College of Engineering, and I haven&apos;t stopped shipping since.
          </p>

          <p className="about-paragraph md:text-[20px] md:leading-[26px]">
            2023 was the grind: data structures every single day until 500+ problems were behind me, 400+ of them on LeetCode. Then came the proving ground: 1st in Web Development out of 30+ teams, 1st at ML NOVA out of 150+ participants, and 1st at the Vertex 2.0 Hackathon. In 2024 alone I pushed 724 public contributions to GitHub.
          </p>

          <p className="about-paragraph md:text-[20px] md:leading-[26px]">
            While still a student I took my first engineering job at RoborosX. I designed the clinic backend behind SaveMe.life, now handling 2,000+ consultations a day, built live GPS tracking for school buses over MQTT and RabbitMQ, and cut load times by 45%. Lectures by day, production systems by night.
          </p>

          <p className="about-paragraph md:text-[20px] md:leading-[26px]">
            In December 2025 I joined FalconX Technologies, which builds software for ISRO programs, and went straight into the deep end: a distributed system tracking 30,000+ space objects in real time. I earned my place there, and in June 2026, before I had even graduated, I was made Software Lead for DATS, our ground-station telemetry platform: a team of four, 70+ satellites, from RF signal to operator dashboard.
          </p>

          <p className="about-paragraph md:text-[20px] md:leading-[26px]">
            Nights and weekends go to agentic AI. CrewForge gives every AI teammate its own cloud computer, a desktop it can browse, code and click around in while you watch.
          </p>

          <p className="about-paragraph md:text-[20px] md:leading-[26px]">
            None of it was luck. It was four years of showing up every day. I build systems that scale, and I&apos;m only getting started.
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
