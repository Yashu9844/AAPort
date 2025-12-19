'use client'

import React, { useState, useEffect } from 'react'
import ProjectCard from './ProjectCard'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [isArrowHovered, setIsArrowHovered] = useState(false)
  
  const projects = [
    { 
      image: '/portfolio-images-work/figma-working/phonecasehome.png',
      title: 'Custom Phone Case – E‑commerce SaaS',
      category: 'Full Stack Web Application',
      year: '2024',
      description: 'A production-grade custom phone case storefront with a live editor, dynamic pricing, and secure Stripe checkout built for real orders.',
      fullDescription: [
        'Problem → Shoppers want truly personal accessories, but most stores offer fixed designs and clunky flows.',
        'Solution → A fluid on-canvas customizer that renders instantly, validates print-safe areas, and prices variants in real time.',
        'Execution → Next.js App Router with server components for fast TTFB, Prisma + PostgreSQL for reliable product/variant data, Stripe for PCI-compliant payments, and UploadThing for asset handling.',
        'Outcome → Sub-2s interactive loads on 4G, near‑zero drop‑offs at checkout, and an editor flow that feels premium and predictable across devices.'
      ],
      informationParagraphs: [
        'This product exists to make personalization effortless. Instead of forcing users through rigid configurators, the editor responds immediately—drag, resize, and preview within the exact device frame. Every UI choice was measured against clarity, speed, and predictability.',
        'What differentiates it is the balance between experience and operational correctness: variant rules, pricing, and inventory are enforced at the data layer, while the UI remains lightweight and tactile. Image uploads are validated for resolution and aspect to protect print quality.',
        'Engineering decisions favored maintainability and scale: typed schemas from database to UI, transactional checkout with Stripe webhooks, and cache-aware reads for catalog views. The result is a storefront that stays fast under load and is simple to evolve.'
      ],
      tech: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Stripe', 'UploadThing', 'TailwindCSS', 'Zod'],
      role: 'Full Stack Developer',
      duration: '3 months',
      github: 'https://github.com/Yashu9844/NEXT_CASE',
      live: 'https://next-case-seven.vercel.app/',
      credits: [
        { role: 'Product & Engineering', name: 'Yashavanth R Siddesh' }
      ],
      mediaSections: [
        {
          items: [
            { type: 'image', url: '/portfolio-images-work/figma-working/phonecasehome.png' }
          ],
          layout: 'single'
        },
        {
          items: [
            { type: 'image', url: '/portfolio-images-work/figma-working/phonecase1.png' },
            { type: 'image', url: '/portfolio-images-work/figma-working/phonecase2.png' }
          ],
          layout: 'grid-2'
        }
      ],
      relatedProjects: [1, 2]
    },
    { 
      image: '/portfolio-images-work/figma-working/airbnbgifhome.gif',
      title: 'Airbnb‑style Stays – Booking Platform',
      category: 'Full Stack Web Application',
      year: '2024',
      description: 'Search, host, and book stays with real authentication, geo search, Cloudinary media, and protected reservations built on Next.js 14.',
      fullDescription: [
        'Core capabilities → Host onboarding, listing creation with Cloudinary uploads, wishlists, and one‑click reservations with availability checks.',
        'Architecture → Next.js App Router with server components, Prisma on MongoDB, typed forms, and cache‑aware data fetching for snappy grids.',
        'Trust & safety → OAuth via Google/Facebook, session‑aware APIs, and server‑side validation for listings and bookings.',
        'Maps & search → Country + map selection with Leaflet, URL‑driven filters, and sharable deep links.',
        'Result → Fast first interaction, consistent booking flow on mobile, and a UI that feels considered and premium.'
      ],
      informationParagraphs: [
        'This platform is a focused take on short‑stay bookings: remove friction for guests while giving hosts a reliable way to publish high‑quality listings. Every interaction—searching, filtering, saving—stays immediate and deliberate.',
        'Operational concerns are handled at the data layer: price, capacity, and availability are validated server‑side. Media is delivered via Cloudinary with the right sizes for each breakpoint to keep pages crisp and quick.',
        'The stack is intentionally boring and scalable: Next.js 14, Prisma + MongoDB, NextAuth, and Tailwind. Forms are typed end‑to‑end and APIs are locked behind session checks to protect critical paths.'
      ],
      tech: ['Next.js', 'TypeScript', 'Prisma', 'MongoDB', 'NextAuth', 'Cloudinary', 'TailwindCSS', 'Leaflet', 'React Hook Form', 'Zustand'],
      role: 'Full Stack Developer',
      duration: '2 months',
      github: 'https://github.com/Yashu9844/AIRBNB_NEXT',
      live: 'https://next-pro-3.vercel.app/',
      credits: [
        { role: 'Product & Engineering', name: 'Yashavanth R Siddesh' }
      ],
      mediaSections: [
        {
          items: [
            { type: 'image', url: '/portfolio-images-work/figma-working/airbnbgifhome.gif' }
          ],
          layout: 'single'
        },
        {
          items: [
            { type: 'image', url: '/portfolio-images-work/figma-working/airbnb1.png' },
            { type: 'image', url: '/portfolio-images-work/figma-working/airbnb2.png' },
            { type: 'image', url: '/portfolio-images-work/figma-working/airnbnb3.png' }
          ],
          layout: 'grid-3'
        },
        {
          items: [
            { type: 'image', url: '/portfolio-images-work/figma-working/airbnb4.png' },
            { type: 'image', url: '/portfolio-images-work/figma-working/next-pro-3.vercel.app_.png' }
          ],
          layout: 'grid-2'
        }
      ],
      relatedProjects: [0, 2]
    },
    { 
      image: '/portfolio-images-work/figma-working/empowerhome.png' ,
      title: 'Task Management App',
      category: 'Mobile & Web',
      year: '2024',
      description: 'Collaborative task management application with real-time updates and team collaboration features.',
      fullDescription: [
        'Created a full-featured task management system with real-time collaboration using Firebase.',
        'Implemented drag-and-drop kanban boards, notifications, and team chat functionality.',
        'Built responsive mobile and web applications with shared codebase.'
      ],
      tech: ['React', 'Firebase', 'Node.js', 'MongoDB'],
      role: 'Lead Developer',
      duration: '4 months',
      informationParagraphs: [
        'This task management system was designed to streamline team collaboration and project tracking.',
        'Built with modern technologies to ensure scalability and reliability.'
      ],
      credits: [
        { role: 'Lead Developer', name: 'Zubair Mallik' },
        { role: 'UI Design', name: 'Design Team' }
      ],
      mediaSections: [
        {
          items: [
            { type: 'image', url:'/portfolio-images-work/figma-working/empowerhub2.png'  },
            { type: 'image', url: '/portfolio-images-work/figma-working/empowerhub3.png' }
          ],
          layout: 'grid-2'
        }
      ],
      relatedProjects: [0, 1]
    },
    { 
      image: '/portfolio-images-work/figma-working/empowerhome.png' ,
      title: 'Mobile App',
      category: 'Mobile Development',
      year: '2024',
      description: 'Native mobile application with smooth UX.',
      fullDescription: [
        'Built a cross-platform mobile application using React Native.',
        'Implemented offline-first architecture with local data persistence.',
        'Created custom native modules for platform-specific features.'
      ],
      informationParagraphs: [
        'This mobile app delivers native performance with JavaScript flexibility.',
        'Used Redux for state management and integrated push notifications.'
      ],
      tech: ['React Native', 'TypeScript', 'Redux', 'Firebase'],
      role: 'Mobile Developer',
      duration: '4 months',
      github: 'https://github.com/username/mobile-app',
      live: 'https://apps.apple.com',
      credits: [
        { role: 'Lead Developer', name: 'Zubair Mallik' },
        { role: 'UI Design', name: 'Design Team' }
      ]
    },
    { 
      image: '/images/pimg5.jpg',
      title: 'API Dashboard',
      category: 'SaaS Product',
      year: '2023',
      description: 'Analytics dashboard for API monitoring with real-time metrics and performance tracking.',
      fullDescription: [
        'Developed a comprehensive API monitoring dashboard with real-time metrics visualization.',
        'Integrated GraphQL for efficient data querying and Redis for caching layer.',
        'Created custom charts and graphs for performance analytics.'
      ],
      tech: ['Vue.js', 'GraphQL', 'PostgreSQL', 'Redis'],
      role: 'Frontend Lead',
      duration: '2 months'
    },
    { 
      image: '/images/pimg6.jpg',
      title: 'Social Platform',
      category: 'Web Application',
      year: '2023',
      description: 'Social networking platform with real-time features.',
      fullDescription: [
        'Developed a social platform with real-time messaging and notifications.',
        'Implemented WebSocket connections for instant updates.',
        'Built scalable backend architecture handling thousands of concurrent users.'
      ],
      informationParagraphs: [
        'This platform connects users worldwide with real-time communication.',
        'Focused on scalability and performance optimization.'
      ],
      tech: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
      role: 'Full Stack Developer',
      duration: '5 months',
      github: 'https://github.com/username/social',
      live: 'https://example.com',
      credits: [
        { role: 'Full Stack', name: 'Zubair Mallik' },
        { role: 'Backend', name: 'Dev Team' }
      ]
    },
    { 
      image: '/images/pimg7.jpg',
      title: 'AI Assistant',
      category: 'AI/ML',
      year: '2023',
      description: 'AI-powered assistant with natural language processing.',
      fullDescription: [
        'Built an AI assistant using OpenAI API for natural conversations.',
        'Implemented context-aware responses and memory management.',
        'Created intuitive chat interface with typing indicators and animations.'
      ],
      informationParagraphs: [
        'This AI assistant provides intelligent responses using cutting-edge NLP.',
        'Integrated with various APIs to provide comprehensive assistance.'
      ],
      tech: ['Python', 'OpenAI', 'FastAPI', 'React'],
      role: 'AI Developer',
      duration: '3 months',
      github: 'https://github.com/username/ai-assistant',
      live: 'https://example.com',
      credits: [
        { role: 'AI Development', name: 'Zubair Mallik' },
        { role: 'ML Training', name: 'Data Team' }
      ]
    },
    { 
      image: '/images/pimg8.jpg',
      title: 'Blockchain DApp',
      category: 'Web3',
      year: '2024',
      description: 'Decentralized application on Ethereum blockchain.',
      fullDescription: [
        'Developed a decentralized application with smart contracts.',
        'Implemented Web3 wallet integration and transaction handling.',
        'Built secure and transparent blockchain interactions.'
      ],
      informationParagraphs: [
        'This DApp leverages blockchain technology for transparency.',
        'Smart contracts ensure trustless and secure operations.'
      ],
      tech: ['Solidity', 'Ethers.js', 'React', 'Hardhat'],
      role: 'Blockchain Developer',
      duration: '4 months',
      github: 'https://github.com/username/dapp',
      live: 'https://example.com',
      credits: [
        { role: 'Smart Contract Dev', name: 'Zubair Mallik' },
        { role: 'Security Audit', name: 'Audit Team' }
      ]
    }
  ]

  // ESC key to close modal & prevent body scroll
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null)
    }
    
    if (selectedProject !== null) {
      window.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [selectedProject])

  gsap.registerPlugin(ScrollTrigger)
  useGSAP(function () {
    const animation = gsap.fromTo('.hero', 
      {
        height: '100px',
        opacity: 0.3
      },
      {
        height: 'auto',
        opacity: 1,
        stagger: {
          amount: 0.5,
        },
        scrollTrigger: {
          trigger: '.lol',
          markers: false,
          start: 'top 80%',
          end: 'top -100%',
          scrub: 1
        }
      }
    )

    // Listen for programmatic scroll and instantly expand all cards
    const handleProgrammaticScroll = () => {
      const scrollTarget = (window as any).__scrollTarget;
      if (scrollTarget && ['testimonials', 'featured', 'approach', 'tech-stack'].includes(scrollTarget)) {
        // Instantly expand all cards
        gsap.set('.hero', { height: 'auto', opacity: 1 });
      }
    };

    window.addEventListener('beforeScroll', handleProgrammaticScroll);
    return () => window.removeEventListener('beforeScroll', handleProgrammaticScroll);
  })



  const selectedProj = selectedProject !== null ? projects[selectedProject] : null

  return (
    <>
    <div className='px-3 sm:px-4 md:px-5 lg:px-6 mb-16 sm:mb-20 md:mb-24 lg:mb-28'>
      <div className='pt-16 sm:pt-20 md:pt-24 lg:pt-28'>
        <h2 
          className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-primary text-white font-normal leading-[0.95] tracking-[-0.01em] mb-12 md:mb-16 lg:mb-20 flex items-center gap-3 sm:gap-4'
          onMouseEnter={() => setIsArrowHovered(true)}
          onMouseLeave={() => setIsArrowHovered(false)}
        >
          <span>Projects</span>
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
      <div className='lol'>
        {projects.map(function (elem, idx) {
          return (
            <div 
              key={idx} 
              className='hero w-full h-[70vh] sm:h-[75vh] md:h-[80vh] lg:h-[600px] flex lg:flex-row flex-col gap-4 md:gap-6 mb-4 md:mb-6'
            >
              <motion.div 
                layoutId={`project-${idx * 2}`}
                onClick={() => setSelectedProject(idx * 2)}
                className='w-full lg:w-1/2 h-full overflow-hidden cursor-pointer group relative'
              >
                <img src={projects[idx * 2]?.image || elem.image} alt='' className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="text-white text-sm tracking-widest uppercase flex items-center gap-3">
                      <span>View Project</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
              </motion.div>
              {projects[idx * 2 + 1] && (
                <motion.div 
                  layoutId={`project-${idx * 2 + 1}`}
                  onClick={() => setSelectedProject(idx * 2 + 1)}
                  className='w-full lg:w-1/2 h-full overflow-hidden cursor-pointer group relative'
                >
                  <img src={projects[idx * 2 + 1].image} alt='' className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="text-white text-sm tracking-widest uppercase flex items-center gap-3">
                      <span>View Project</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )
        }).filter((_, idx) => idx < 3)}
      </div>
      
      {/* Explore Work Button */}
      <div className="flex justify-center mt-12 md:mt-16 lg:mt-20">
        <Link href="/projects">
          <button className="group relative bg-transparent text-white px-8 sm:px-10 py-4 sm:py-5 border-2 border-white transition-all duration-500 hover:bg-white hover:text-black hover:cursor-pointer overflow-hidden">
            <span className="relative z-10 flex items-center gap-3">
              <span className="text-sm sm:text-base font-medium tracking-[0.2em] uppercase">Explore More Work</span>
              <svg className="w-5 h-5 transform group-hover:rotate-45 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </Link>
      </div>
    </div>

    {/* Project Detail Modal */}
    <AnimatePresence>
      {selectedProj && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 bg-black z-[9999] overflow-y-scroll'
          onClick={() => setSelectedProject(null)}
          onWheel={(e) => e.stopPropagation()}
        >
          <div className='min-h-screen px-6 sm:px-8 md:px-12 lg:px-16 py-32'>
            <div className='max-w-[1920px] mx-auto' onClick={(e) => e.stopPropagation()}>
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className='fixed top-8 right-8 z-50 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors'
              >
                <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                </svg>
              </button>

              {/* Split Layout */}
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16'>
                {/* Left - Images */}
                <motion.div
                  layoutId={`project-${selectedProject}`}
                  className='space-y-4'
                >
                  <motion.img
                    src={selectedProj.image}
                    alt={selectedProj.title}
                    className='w-full '
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  />
                </motion.div>

                {/* Right - Details */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className='space-y-12'
                >
                  {/* Title & Links */}
                  <div>
                    <p className='text-xs tracking-widest text-gray-500 mb-4 uppercase'>{selectedProj.category}</p>
                    <div className='flex items-start justify-between gap-4 mb-4'>
                      <h2 className='text-4xl sm:text-5xl md:text-6xl font-bold text-white'>{selectedProj.title}</h2>
                      <div className='flex gap-3 flex-shrink-0'>
                        {selectedProj.github && (
                          <a href={selectedProj.github} target='_blank' rel='noopener noreferrer' className='w-10 h-10 bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors'>
                            <svg className='w-5 h-5 text-white' fill='currentColor' viewBox='0 0 24 24'>
                              <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'/>
                            </svg>
                          </a>
                        )}
                        {selectedProj.live && (
                          <a href={selectedProj.live} target='_blank' rel='noopener noreferrer' className='w-10 h-10 bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors'>
                            <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                    <div className='flex items-center gap-4 text-sm text-gray-400'>
                      <span>{selectedProj.year}</span>
                      <span>•</span>
                      <span>{selectedProj.role}</span>
                      <span>•</span>
                      <span>{selectedProj.duration}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className='space-y-5'>
                    {selectedProj.fullDescription.map((para, i) => (
                      <p key={i} className='text-lg leading-relaxed text-white font-normal'>{para}</p>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Full Width Sections */}
              <div className='mt-16 space-y-16'>
                <div className='w-full border-t border-white/10'></div>

                {/* Information Section */}
                {selectedProj.informationParagraphs && (
                  <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12'>
                    <div className='lg:col-span-2'>
                      <h2 className='text-lg font-normal text-white'>Information</h2>
                    </div>
                    <div className='lg:col-span-10'>
                      <div className='space-y-5'>
                        {selectedProj.informationParagraphs.map((para, i) => (
                          <p key={i} className='text-lg leading-relaxed text-white font-normal'>{para}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className='w-full border-t border-white/10'></div>

                {/* Technologies */}
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12'>
                  <div className='lg:col-span-2'>
                    <h2 className='text-lg font-normal text-white'>Technologies</h2>
                  </div>
                  <div className='lg:col-span-10'>
                    <div className='flex flex-wrap gap-2'>
                      {selectedProj.tech.map((t, i) => (
                        <span key={i} className='px-4 py-2 bg-white/10 border border-white/20  text-sm text-white font-light'>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className='w-full border-t border-white/10 mt-16'></div>

              {/* Media Sections */}
              {selectedProj.mediaSections && selectedProj.mediaSections.length > 0 && (
                <div className='space-y-1'>
                  {selectedProj.mediaSections.map((section, idx) => {
                    const getGridClass = () => {
                      switch (section.layout) {
                        case 'grid-2':
                          return 'grid grid-cols-1 md:grid-cols-2 gap-1';
                        case 'grid-3':
                          return 'grid grid-cols-1 md:grid-cols-3 gap-1';
                        case 'continuous':
                          return 'space-y-1';
                        default:
                          return 'space-y-1';
                      }
                    };

                    return (
                      <div key={idx} className={getGridClass()}>
                        {section.items.map((item, itemIdx) => (
                          <div key={itemIdx} className='w-full overflow-hidden'>
                            {item.type === 'video' ? (
                              <video autoPlay loop muted playsInline className='w-full h-full object-cover'>
                                <source src={item.url} type='video/mp4' />
                              </video>
                            ) : (
                              <img src={item.url} alt='Project media' className='w-full h-full object-cover' />
                            )}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Credits */}
              {selectedProj.credits && (
                <div>
                  <div className='w-full border-t border-white/10 my-16'></div>
                  <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12'>
                    <div className='lg:col-span-2'>
                      <h2 className='text-lg font-normal text-white'>Credits</h2>
                    </div>
                    <div className='lg:col-span-10'>
                      <div className='space-y-2'>
                        {selectedProj.credits.map((credit, i) => (
                          <p key={i} className='text-lg text-white font-normal'>
                            {credit.role} → {credit.name}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Related Projects */}
              {selectedProj.relatedProjects && selectedProj.relatedProjects.length > 0 && (
                <div className='mt-16'>
                  <div className='w-full border-t border-white/10 mb-10'></div>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {selectedProj.relatedProjects.map((projIdx) => {
                      const proj = projects[projIdx];
                      return (
                        <div
                          key={projIdx}
                          onClick={() => {
                            setSelectedProject(projIdx);
                            const modalElement = document.querySelector('.fixed.inset-0.overflow-y-scroll');
                            if (modalElement) {
                              modalElement.scrollTop = 0;
                            }
                          }}
                          className='group cursor-pointer'
                        >
                          <div className='mb-3'>
                            <p className='text-xs tracking-widest text-gray-500 mb-1.5 uppercase'>📄 PROJECT</p>
                            <h3 className='text-xl font-normal text-white group-hover:text-gray-400 transition-colors'>
                              {proj.title} <span className='inline-block group-hover:translate-x-1 transition-transform'>↗</span>
                            </h3>
                          </div>
                          <div className='overflow-hidden aspect-video'>
                            <img
                              src={proj.image}
                              alt={proj.title}
                              className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}

export default Projects
