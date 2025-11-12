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
      
      if (paragraphs.length === 0) {
        console.error('About paragraphs not found!');
        return;
      }

      console.log('Initializing About word highlight animation');
      
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
      onEnter: () => {
        console.log('Near About section, initializing animation');
        initAnimation();
      },
    });
  });

  return (
    <div id="about-section" className="w-full min-h-screen bg-black px-8 py-16 md:py-24 flex items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 w-full">
        
        <div className="flex items-start">
          <h1 
            className="text-5xl md:text-4xl font-kh-teka tracking-wide text-neutral-200 leading-tight flex items-center gap-3"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            About 
            <span 
              className="text-gray-500 transition-transform duration-300 ease-out inline-block"
              style={{
                transform: isHovered ? 'translate(4px, 4px) rotate(45deg)' : 'translate(0, 0) rotate(0deg)'
              }}
            >
              ↘
            </span>
          </h1>
        </div>

        <div className="space-y-4 md:space-y-6 font-kh-teka" style={{ fontSize: '18px', lineHeight: '24px', color: 'rgb(229, 229, 229)' }}>
          <p className="about-paragraph md:text-[20px] md:leading-[26px]">
            I&apos;m Yashavanth R Siddesh, a Full Stack Developer from Bengaluru. I focus on clean engineering, strong product thinking, and purposeful interfaces that solve meaningful problems.
          </p>

          <p className="about-paragraph md:text-[20px] md:leading-[26px]">
            At RoborosX, I built the Clinic Management module for SaveMe.life, serving 500+ doctors. I improved load times by 45% and contributed to three major product upgrades. At SDC, I mentored 300+ students and built tools that improved workflows by 40%.
          </p>

          <p className="about-paragraph md:text-[20px] md:leading-[26px]">
            My key projects: an Interactive Phone Case eCommerce Platform (Next.js, Stripe, Cloudinary) with 99% uptime; an Agentic AI for Career Guidance with RAG and five AI workflows; and SaveMe.life (Laravel), improving appointment speed by 25%.
          </p>

          <p className="about-paragraph md:text-[20px] md:leading-[26px]">
            I&apos;ve solved 400+ coding problems (300+ LeetCode) and won multiple competitions: 1st in Web Development, 1st in ML NOVA, and 3rd in an 8-hour AI Hackathon.
          </p>

          <p className="about-paragraph md:text-[20px] md:leading-[26px]">
            I build systems that scale, experiences that resonate, and solutions that last—with clarity, craft, and intention.
          </p>
                    <p className="about-paragraph md:text-[20px] md:leading-[26px]">
            At RoborosX, I built the Clinic Management module for SaveMe.life, serving 500+ doctors. I improved load times by 45% and contributed to three major product upgrades. At SDC, I mentored 300+ students and built tools that improved workflows by 40%.
          </p>
        <p className="about-paragraph md:text-[20px] md:leading-[26px]">
            My key projects: an Interactive Phone Case eCommerce Platform (Next.js, Stripe, Cloudinary) with 99% uptime; an Agentic AI for Career Guidance with RAG and five AI workflows; and SaveMe.life (Laravel), improving appointment speed by 25%.
          </p>

          <div className="pt-4">
            <Link 
              href="/about2"
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
