'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { blogPosts } from '@/data/blog';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BlogPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(blogPosts.map(post => post.category)))];

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Respect reduced motion: content stays fully visible without the intro animations
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Hero section animations
      gsap.fromTo(
        '.hero-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.2
        }
      );

      gsap.fromTo(
        '.hero-title',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          delay: 0.4
        }
      );

      gsap.fromTo(
        '.hero-subtitle',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          delay: 0.6
        }
      );

      // Blog card animations
      gsap.utils.toArray<HTMLElement>('.blog-card').forEach((card) => {
        gsap.fromTo(
          card,
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
              trigger: card,
              start: 'top 85%',
              end: 'top 60%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Category filters animation
      gsap.fromTo(
        '.category-filter',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power2.out',
          delay: 0.8
        }
      );
    });

    return () => ctx.revert();
  }, [filteredPosts]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <div ref={heroRef} className="pt-32 pb-20 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Back Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 mb-8 font-kh-teka text-sm"
          >
            ← Home
          </Link>

          {/* Category Label */}
          <div className="flex items-center gap-4 mb-8">
            <div className="hero-line h-px w-8 bg-white/50 origin-left"></div>
            <p className="text-xs tracking-widest text-gray-500 uppercase font-kh-teka">
              ✍️ Writing
            </p>
          </div>

          {/* Title */}
          <h1 className="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-none font-kh-teka">
            Thoughts &<br />Insights
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle text-xl sm:text-2xl text-gray-400 font-light max-w-3xl font-kh-teka">
            Reflections on engineering, design, and building products that matter—one post at a time.
          </p>
        </div>
      </div>

      {/* Category Filters */}
      <div className="px-6 sm:px-8 md:px-12 lg:px-16 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`category-filter px-6 py-2.5 text-sm font-medium transition-all duration-300 border font-kh-teka ${
                  selectedCategory === category
                    ? 'bg-white text-black border-white'
                    : 'bg-transparent text-white border-white/30 hover:border-white/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div ref={gridRef} className="px-6 sm:px-8 md:px-12 lg:px-16 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-12 md:space-y-16">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="blog-card group cursor-pointer"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-12 border-b border-white/10">
                    {/* Image */}
                    <div className="lg:col-span-7 relative overflow-hidden bg-zinc-900 aspect-[16/10]">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-5 space-y-4">
                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-xs text-gray-500 uppercase tracking-wider font-kh-teka">
                        <span className="px-3 py-1 border border-white/20 bg-white/5">
                          {post.category}
                        </span>
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>

                      {/* Title */}
                      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight group-hover:text-white/80 transition-colors duration-300 font-kh-teka">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-lg text-gray-400 leading-relaxed font-light font-kh-teka">
                        {post.excerpt}
                      </p>

                      {/* Read More */}
                      <div className="flex items-center gap-2 text-white/70 group-hover:text-white transition-colors duration-300 pt-4">
                        <span className="text-sm font-medium tracking-wider uppercase font-kh-teka">
                          Read Article
                        </span>
                        <svg 
                          className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-gray-400 font-kh-teka">
                No articles found in this category.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
