'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const ArrowUpRight = (props:any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

const Page2 = () => {
  const [isArrowHovered, setIsArrowHovered] = useState(false);
  
  const projects = [
    {
      type: 'SNAPSHOT',
      title: 'Robinhood Onboarding',
      subtitle: 'Brand Experience Design',
      image: '/images/pimg1.jpg',
      link: '/case-study-1',
    },
    {
      type: 'SNAPSHOT',
      title: 'E-Commerce Platform',
      subtitle: 'Full Stack Development',
      image: '/images/pimg5.jpg',
      link: '/case-study-2',
    },
    {
      type: 'SNAPSHOT',
      title: 'Healthcare Dashboard',
      subtitle: 'UI/UX Design & Development',
      image: '/images/pimg9.jpg',
      link: '/case-study-3',
    },
    {
      type: 'CASE STUDY',
      title: 'Mixpanel Rebrand',
      subtitle: 'Brand Design',
      image: '/images/pimg13.jpg',
      link: '/case-study-2',
    },
  ];

  return (
    <div className="relative min-h-screen bg-black w-full text-white">
      {/* Section Header */}
      <div className="px-3 sm:px-4 md:px-5 lg:px-6 pb-12 sm:pb-16">
        <h2
          className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-primary text-white font-normal leading-[0.95] tracking-[-0.01em] flex items-center gap-3 sm:gap-4'
          onMouseEnter={() => setIsArrowHovered(true)}
          onMouseLeave={() => setIsArrowHovered(false)}
        >
          <span>Experience</span>
          <motion.span 
            className="text-white/30"
            animate={{
              x: isArrowHovered ? 8 : 0,
              y: isArrowHovered ? 8 : 0,
              rotate: isArrowHovered ? 45 : 0,
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            ↘
          </motion.span>
        </h2>
      </div>
      
      <div className="px-3 sm:px-4 md:px-5 lg:px-6 pb-16 sm:pb-20 md:pb-24 lg:pb-28 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {projects.map((project, index) => (
          <a key={index} href={project.link} className="group cursor-pointer block">
            {/* Header */}
            <div className="mb-4">
              <p className="uppercase text-xs tracking-widest text-gray-400 mb-2">
                {index === 0 ? '📸' : '📄'} {project.type}
              </p>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl md:text-2xl font-medium transition-all duration-300 relative">
                  {project.title}
                  <ArrowUpRight
                    className="w-6 h-6 absolute -right-6 top-1 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                  />
                </h2>
              </div>
              <p className="text-gray-400 text-sm">{project.subtitle}</p>
            </div>

            {/* Image */}
            <div className="overflow-hidden w-full aspect-[4/5] sm:aspect-[3/4] md:aspect-auto">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full md:h-[580px] lg:h-[620px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Page2;