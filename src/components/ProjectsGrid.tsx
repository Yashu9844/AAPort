'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { lockScroll, getLenis } from '@/lib/lenis';
import { PROJECT_SECTIONS, getProjectSections } from '@/data/allProjects';

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

const PAGE_SIZE = 6;

// Page numbers to render, with '…' gaps when there are many pages.
function getPageItems(current: number, total: number): Array<number | '…'> {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const items: Array<number | '…'> = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) items.push('…');
  for (let p = start; p <= end; p++) items.push(p);
  if (end < total - 1) items.push('…');
  items.push(total);
  return items;
}

const controlClass = (active: boolean) =>
  `px-4 py-2 text-sm font-medium transition-all duration-300 border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
    active
      ? 'bg-white text-black border-white'
      : 'bg-transparent text-white border-white/30 hover:border-white/50'
  }`;

export default function ProjectsGrid({ projects, allProjects }: ProjectsGridProps) {
  const projectsList = allProjects || projects;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Sections with their projects; empty sections are hidden.
  const tabs = [
    { id: 'all', label: 'All', items: projects },
    ...PROJECT_SECTIONS.map(s => ({
      id: s.id as string,
      label: s.label as string,
      items: projects.filter(p => getProjectSections(p).includes(s.id)),
    })),
  ].filter(t => t.items.length > 0);

  // URL is the source of truth: ?section=agentic-ai&page=2
  const activeTab = tabs.find(t => t.id === searchParams.get('section')) ?? tabs[0];
  const sectionProjects = activeTab.items;
  const totalPages = Math.max(1, Math.ceil(sectionProjects.length / PAGE_SIZE));
  const requestedPage = Number.parseInt(searchParams.get('page') ?? '1', 10);
  const currentPage = Math.min(Math.max(Number.isNaN(requestedPage) ? 1 : requestedPage, 1), totalPages);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const pageProjects = sectionProjects.slice(pageStart, pageStart + PAGE_SIZE);
  const pageItems = getPageItems(currentPage, totalPages);

  const years = sectionProjects.map(p => Number(p.year));
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);

  const updateUrl = (section: string, page: number) => {
    const params = new URLSearchParams();
    if (section !== 'all') params.set('section', section);
    if (page > 1) params.set('page', String(page));
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const selectSection = (id: string) => {
    if (id !== activeTab.id) updateUrl(id, 1);
  };

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    updateUrl(activeTab.id, page);
    const el = listRef.current;
    if (!el) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(el, { offset: -120 });
    else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Prevent body scroll when modal is open & handle ESC key
  useEffect(() => {
    if (selectedProject === null) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleEsc);
    lockScroll(true);

    return () => {
      window.removeEventListener('keydown', handleEsc);
      lockScroll(false);
    };
  }, [selectedProject]);

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-16 px-6 sm:px-8 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Home Link - Above Projects */}
        <Link
          href="/"
          className="inline-block mb-8 text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 hover:text-white transition-colors font-light tracking-wide"
        >
          ← Home
        </Link>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-none">
            Projects
          </h1>
          <p className="text-xl text-gray-400 font-light">
            {sectionProjects.length} projects · {minYear}–{maxYear}
          </p>
        </div>

        {/* Section Tabs - single scrollable row */}
        <div
          role="group"
          aria-label="Project sections"
          className="mb-12 pb-8 border-b border-white/10 flex gap-3 overflow-x-auto whitespace-nowrap pt-1 px-1 -mx-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {tabs.map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => selectSection(tab.id)}
              aria-pressed={tab.id === activeTab.id}
              className={`shrink-0 ${controlClass(tab.id === activeTab.id)}`}
            >
              {tab.label} ({tab.items.length})
            </button>
          ))}
        </div>

        {/* Projects List - Awwwards Style */}
        <div ref={listRef} className="space-y-16 md:space-y-20">
          {pageProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layoutId={`project-${project.id}`}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer relative border-b border-white/10 pb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index, 5) * 0.1, duration: 0.6 }}
            >
              {/* Project Number & Meta */}
              <div className="flex items-start justify-between mb-6 gap-4">
                <div className="flex items-baseline gap-6">
                  <span className="text-sm text-gray-500 font-light">
                    {String(pageStart + index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex items-center gap-4 text-xs text-gray-400 tracking-wider uppercase">
                    <span>{project.category}</span>
                    <span className="text-white/30">•</span>
                    <span>{project.year}</span>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-2 text-xs text-gray-500">
                  {project.domains?.slice(0, 2).map((domain, i) => (
                    <span key={i} className="px-3 py-1 border border-white/10 bg-white/5">
                      {domain}
                    </span>
                  ))}
                </div>
              </div>

              {/* Main Content */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                {/* Image */}
                <div className="lg:col-span-8 relative overflow-hidden bg-black aspect-[16/10]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="text-white text-sm tracking-widest uppercase flex items-center gap-3">
                      <span>View Project</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="lg:col-span-4 space-y-4">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-white leading-tight group-hover:text-gray-300 transition-colors duration-300">
                    {project.title}
                  </h2>
                  <p className="text-base text-gray-400 leading-relaxed font-light">
                    {project.description}
                  </p>
                  
                  {/* Tech Stack - Small Pills */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tech.slice(0, 4).map((tech, i) => (
                      <span key={i} className="text-xs text-gray-500 px-2 py-1 border border-white/10 bg-white/5">
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="text-xs text-gray-500">+{project.tech.length - 4} more</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <nav aria-label="Projects pagination" className="mt-16 flex flex-col items-center gap-6">
          <p className="text-sm text-gray-400 font-light">
            Showing {pageStart + 1}–{pageStart + pageProjects.length} of {sectionProjects.length}
          </p>
          {totalPages > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`${controlClass(false)} disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-white/30`}
              >
                Previous
              </button>
              {pageItems.map((item, i) =>
                item === '…' ? (
                  <span key={`gap-${i}`} className="px-2 text-gray-500" aria-hidden="true">…</span>
                ) : (
                  <button
                    key={item}
                    type="button"
                    onClick={() => goToPage(item)}
                    aria-current={item === currentPage ? 'page' : undefined}
                    aria-label={`Page ${item}`}
                    className={`min-w-[44px] ${controlClass(item === currentPage)}`}
                  >
                    {item}
                  </button>
                )
              )}
              <button
                type="button"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`${controlClass(false)} disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-white/30`}
              >
                Next
              </button>
            </div>
          )}
        </nav>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-[9999] overflow-y-scroll"
              onClick={() => setSelectedProject(null)}
              data-lenis-prevent
            >
              <div className="min-h-screen px-6 sm:px-8 md:px-12 lg:px-16 py-32">
                <div className="max-w-[1920px] mx-auto" onClick={(e) => e.stopPropagation()}>
                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="fixed top-8 right-8 z-50 w-12 h-12 bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors border border-white/20"
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
                        className="w-full"
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
                              <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                              </a>
                            )}
                            {selectedProject.live && (
                              <a href={selectedProject.live} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors">
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
                            <span key={i} className="px-4 py-2 bg-white/10 border border-white/20 text-sm text-white font-light">
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
