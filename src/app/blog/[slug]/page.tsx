'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import { getBlogPost } from '@/data/blog';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BlogPost() {
  const params = useParams();
  const slug = params?.slug as string;
  const post = getBlogPost(slug);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Respect reduced motion: content stays fully visible without the intro animations
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Fade in title
      gsap.fromTo(
        '.post-title',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          delay: 0.2
        }
      );

      // Fade in meta
      gsap.fromTo(
        '.post-meta',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.4
        }
      );

      // Fade in image
      gsap.fromTo(
        '.post-image',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          delay: 0.6
        }
      );

      // Fade in content
      gsap.fromTo(
        '.post-content',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          delay: 0.8
        }
      );
    });

    return () => ctx.revert();
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Navigation />
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 font-kh-teka">Post Not Found</h1>
          <Link href="/blog" className="text-white/70 hover:text-white transition-colors font-kh-teka">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Article Container */}
      <article className="pt-32 pb-20 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 mb-12 font-kh-teka text-sm"
          >
            ← Back to Blog
          </Link>

          {/* Category & Meta */}
          <div className="post-meta flex items-center gap-4 mb-6 text-xs text-gray-500 uppercase tracking-wider font-kh-teka">
            <span className="px-3 py-1 border border-white/20 bg-white/5">
              {post.category}
            </span>
            <span>{post.longDate}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>

          {/* Title */}
          <h1 className="post-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-12 leading-tight font-kh-teka">
            {post.title}
          </h1>

          {/* Featured Image */}
          <div className="post-image mb-16 overflow-hidden bg-zinc-900 aspect-[16/9]">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Content */}
          <div 
            ref={contentRef}
            className="post-content prose prose-invert prose-lg max-w-none font-kh-teka"
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={{
              color: 'rgb(229, 229, 229)',
              lineHeight: '1.8'
            }}
          />

          {/* Divider */}
          <div className="border-t border-white/10 my-16"></div>

          {/* Back to Blog */}
          <div className="flex justify-between items-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 font-kh-teka"
            >
              ← Back to All Articles
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 font-kh-teka"
            >
              Home
            </Link>
          </div>
        </div>
      </article>

      {/* Styles for prose content */}
      <style jsx global>{`
        .prose h2 {
          font-size: 2rem;
          font-weight: 700;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          color: white;
          font-family: 'KH Teka', sans-serif;
        }
        .prose h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: white;
          font-family: 'KH Teka', sans-serif;
        }
        .prose p {
          margin-bottom: 1.5rem;
          color: rgb(229, 229, 229);
          font-family: 'KH Teka', sans-serif;
        }
        .prose ul {
          margin: 1.5rem 0;
          padding-left: 1.5rem;
          list-style: disc;
        }
        .prose li {
          margin-bottom: 0.75rem;
          color: rgb(229, 229, 229);
          font-family: 'KH Teka', sans-serif;
        }
        .prose strong {
          color: white;
          font-weight: 600;
        }
        .prose a {
          color: white;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .prose a:hover {
          color: rgb(156, 163, 175);
        }
      `}</style>
    </div>
  );
}
