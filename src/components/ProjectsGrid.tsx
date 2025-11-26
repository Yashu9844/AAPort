'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  image: string;
  description: string;
  fullDescription?: string[];
  informationParagraphs?: string[];
  tech: string[];
  domains?: string[];
  link: string;
  role?: string;
  duration?: string;
  github?: string;
  live?: string;
  credits?: Array<{ role: string; name: string }>;
  mediaSections?: Array<{
    items: Array<{ type: 'image' | 'video'; url: string }>;
    layout: 'grid-2' | 'grid-3' | 'single' | 'continuous';
  }>;
  relatedProjects?: number[];
}

interface ProjectsGridProps {
  projects: Project[];
  allProjects?: Project[]; // All projects for related projects section
}

export default function ProjectsGrid({ projects, allProjects }: ProjectsGridProps) {
  const projectsList = allProjects || projects;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedDomains, setSelectedDomains] = useState<Set<string>>(new Set());

  // Get all unique domains from projects
  const allDomains = Array.from(
    new Set(projects.flatMap(p => p.domains || []))
  ).sort();

  // Filter projects based on selected domains
  const filteredProjects = selectedDomains.size === 0 
    ? projects 
    : projects.filter(project => {
        const projectDomains = project.domains || [];
        return projectDomains.some(domain => selectedDomains.has(domain));
      });

  const toggleDomain = (domain: string) => {
    const newDomains = new Set(selectedDomains);
    if (newDomains.has(domain)) {
      newDomains.delete(domain);
    } else {
      newDomains.add(domain);
    }
    setSelectedDomains(newDomains);
  };

  const clearFilters = () => {
    setSelectedDomains(new Set());
  };

  const noProjectsFound = selectedDomains.size > 0 && filteredProjects.length === 0;

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-16 px-6 sm:px-8 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Home Link - Above Projects */}
        <a
          href="/"
          className="inline-block mb-8 text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 hover:text-white transition-colors font-light tracking-wide"
        >
          ← Home
        </a>

        {/* Header with Filters on Same Line */}
        <div className="mb-12 flex items-start justify-between gap-12">
          <div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-none">
              Projects
            </h1>
            <p className="text-xl text-gray-400 font-light">
              Selected works from 2023-2024
            </p>
          </div>
          
          {/* Filters */}
          <div className="hidden lg:block pt-2">
            <p className="text-sm uppercase tracking-wider text-gray-500 mb-4">Filter by domain</p>
            <div className="flex flex-wrap gap-3 justify-end items-center min-h-[44px]">
              {allDomains.map(domain => (
                <button
                  key={domain}
                  onClick={() => toggleDomain(domain)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                    selectedDomains.has(domain)
                      ? 'bg-white text-black border-white'
                      : 'bg-transparent text-white border-white/30 hover:border-white/50'
                  }`}
                >
                  {domain}
                </button>
              ))}
              {/* Reserve space for Clear button to avoid layout shift */}
              <button
                onClick={clearFilters}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                  selectedDomains.size > 0 
                    ? 'border-white/30 hover:border-white/50 text-white/70 hover:text-white' 
                    : 'border-transparent text-transparent cursor-default'
                }`}
                disabled={selectedDomains.size === 0}
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Filters */}
        <div className="lg:hidden mb-12 pb-8 border-b border-white/10">
          <p className="text-sm uppercase tracking-wider text-gray-500 mb-4">Filter by domain</p>
          <div className="flex flex-wrap gap-3 items-center min-h-[44px]">
            {allDomains.map(domain => (
              <button
                key={domain}
                onClick={() => toggleDomain(domain)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                  selectedDomains.has(domain)
                    ? 'bg-white text-black border-white'
                    : 'bg-transparent text-white border-white/30 hover:border-white/50'
                }`}
              >
                {domain}
              </button>
            ))}
            {/* Reserve space for Clear button to avoid layout shift */}
            <button
              onClick={clearFilters}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                selectedDomains.size > 0 
                  ? 'border-white/30 hover:border-white/50 text-white/70 hover:text-white' 
                  : 'border-transparent text-transparent cursor-default'
              }`}
              disabled={selectedDomains.size === 0}
            >
              Clear
            </button>
          </div>
        </div>

        {/* No Projects Found Message */}
        {noProjectsFound && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-400">No projects found for the selected domains.</p>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layoutId={`project-${project.id}`}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer relative aspect-[4/5] overflow-hidden rounded-lg"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button className="px-8 sm:px-12 py-3 sm:py-4 border border-white text-white text-lg sm:text-2xl font-light rounded-full hover:bg-white hover:text-black transition-all duration-300">
                  View Project
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-[9999] overflow-y-scroll"
              onClick={() => setSelectedProject(null)}
              onWheel={(e) => e.stopPropagation()}
            >
              <div className="min-h-screen px-6 sm:px-8 md:px-12 lg:px-16 py-32">
                <div className="max-w-[1920px] mx-auto" onClick={(e) => e.stopPropagation()}>
                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="fixed top-8 right-8 z-50 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  {/* Split Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    {/* Left - Images */}
                    <motion.div
                      layoutId={`project-${selectedProject.id}`}
                      className="space-y-4"
                    >
                      <motion.img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="w-full rounded-lg"
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
                      className="space-y-12"
                    >
                      {/* Title & Links */}
                      <div>
                        <p className="text-xs tracking-widest text-gray-500 mb-4 uppercase">{selectedProject.category}</p>
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">{selectedProject.title}</h2>
                          <div className="flex gap-3 flex-shrink-0">
                            {selectedProject.github && (
                              <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                              </a>
                            )}
                            {selectedProject.live && (
                              <a href={selectedProject.live} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>{selectedProject.year}</span>
                          <span>•</span>
                          <span>{selectedProject.role || 'Full Stack Developer'}</span>
                          {selectedProject.duration && (
                            <>
                              <span>•</span>
                              <span>{selectedProject.duration}</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      {selectedProject.fullDescription ? (
                        <div className="space-y-5">
                          {selectedProject.fullDescription.map((para, i) => (
                            <p key={i} className="text-lg leading-relaxed text-white font-normal">{para}</p>
                          ))}
                        </div>
                      ) : (
                        <p className="text-lg text-gray-300 leading-relaxed">{selectedProject.description}</p>
                      )}
                    </motion.div>
                  </div>

                  {/* Full Width Sections */}
                  <div className="mt-16 space-y-16">
                    <div className="w-full border-t border-white/10"></div>

                    {/* Information Section */}
                    {selectedProject.informationParagraphs && (
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
                        <div className="lg:col-span-2">
                          <h2 className="text-lg font-normal text-white">Information</h2>
                        </div>
                        <div className="lg:col-span-10">
                          <div className="space-y-5">
                            {selectedProject.informationParagraphs.map((para, i) => (
                              <p key={i} className="text-lg leading-relaxed text-white font-normal">{para}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="w-full border-t border-white/10"></div>

                    {/* Technologies */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
                      <div className="lg:col-span-2">
                        <h2 className="text-lg font-normal text-white">Technologies</h2>
                      </div>
                      <div className="lg:col-span-10">
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.tech.map((t, i) => (
                            <span key={i} className="px-4 py-2 bg-white/10 border border-white/20 rounded text-sm text-white font-light">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full border-t border-white/10 mt-16"></div>

                  {/* Media Sections */}
                  {selectedProject.mediaSections && selectedProject.mediaSections.length > 0 && (
                    <div className="space-y-1 mt-16">
                      {selectedProject.mediaSections.map((section, idx) => {
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
                              <div key={itemIdx} className="w-full overflow-hidden">
                                {item.type === 'video' ? (
                                  <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                                    <source src={item.url} type="video/mp4" />
                                  </video>
                                ) : (
                                  <img src={item.url} alt="Project media" className="w-full h-full object-cover" />
                                )}
                              </div>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Credits */}
                  {selectedProject.credits && (
                    <div>
                      <div className="w-full border-t border-white/10 my-16"></div>
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
                        <div className="lg:col-span-2">
                          <h2 className="text-lg font-normal text-white">Credits</h2>
                        </div>
                        <div className="lg:col-span-10">
                          <div className="space-y-2">
                            {selectedProject.credits.map((credit, i) => (
                              <p key={i} className="text-lg text-white font-normal">
                                {credit.role} → {credit.name}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Related Projects */}
                  {selectedProject.relatedProjects && selectedProject.relatedProjects.length > 0 && (
                    <div className="mt-16">
                      <div className="w-full border-t border-white/10 mb-10"></div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {selectedProject.relatedProjects.map((projId) => {
                          const relatedProj = projectsList.find(p => p.id === projId);
                          if (!relatedProj) return null;
                          return (
                            <div
                              key={projId}
                              onClick={() => {
                                setSelectedProject(relatedProj);
                                const modalElement = document.querySelector('.fixed.inset-0.overflow-y-scroll');
                                if (modalElement) {
                                  modalElement.scrollTop = 0;
                                }
                              }}
                              className="group cursor-pointer"
                            >
                              <div className="mb-3">
                                <p className="text-xs tracking-widest text-gray-500 mb-1.5 uppercase">📄 PROJECT</p>
                                <h3 className="text-xl font-normal text-white group-hover:text-gray-400 transition-colors">
                                  {relatedProj.title} <span className="inline-block group-hover:translate-x-1 transition-transform">↗</span>
                                </h3>
                              </div>
                              <div className="overflow-hidden aspect-video">
                                <img
                                  src={relatedProj.image}
                                  alt={relatedProj.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
      </div>
    </div>
  );
}
