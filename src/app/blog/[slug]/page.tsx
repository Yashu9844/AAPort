'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Mock blog data - In production, fetch from CMS/API
const blogPostsData: { [key: string]: any } = {
  'building-scalable-systems': {
    title: 'Building Scalable Systems: Lessons from SaveMe.life',
    date: 'November 2024',
    readTime: '8 min read',
    category: 'Engineering',
    image: '/images/pimg1.jpg',
    content: `
      <p>When I joined RoborosX to work on SaveMe.life, I walked into a live healthcare platform serving 500+ doctors. The system was functional, but performance was becoming a bottleneck. Pages took too long to load, user interactions felt sluggish, and we were approaching a critical scale threshold.</p>

      <h2>The Challenge</h2>
      <p>The platform was processing over 1,000 monthly transactions, managing appointments, patient records, and real-time availability updates. Every millisecond mattered—not just for user experience, but for actual healthcare delivery.</p>

      <p>A slow booking system meant frustrated patients. A lagging doctor dashboard meant wasted consultation time. These weren't just technical metrics—they were human problems with real consequences.</p>

      <h2>The Approach</h2>
      <p>I started by profiling everything. Database queries, API response times, frontend render cycles. The patterns became clear: N+1 queries were killing us, unoptimized images were bloating pages, and we were re-rendering entire components when only small pieces of state changed.</p>

      <h3>Database Optimization</h3>
      <p>We refactored our Laravel queries to use eager loading, reducing database hits by 60%. Critical queries went from 200ms to under 50ms. We added proper indexing on frequently accessed columns and implemented Redis caching for session data.</p>

      <h3>Frontend Performance</h3>
      <p>On the frontend, I implemented code splitting and lazy loading. Components now loaded only when needed. Images were compressed and served through a CDN with proper sizing. The initial page load dropped from 3.2s to 1.4s—a 45% improvement.</p>

      <h3>API Architecture</h3>
      <p>We redesigned our API responses to include only necessary data. Instead of sending entire user objects, we sent lightweight DTOs. We batched related requests and implemented request debouncing on the frontend.</p>

      <h2>The Results</h2>
      <p>Load times improved by 45%. Appointment completion rates increased by 25%. Doctors could see more patients. Patients experienced fewer booking failures.</p>

      <p>But more importantly, I learned that performance optimization isn't about chasing benchmarks—it's about understanding the human impact of every technical decision.</p>

      <h2>Key Takeaways</h2>
      <ul>
        <li><strong>Measure everything:</strong> You can't optimize what you don't measure. Use profiling tools aggressively.</li>
        <li><strong>Start with the database:</strong> Most performance issues trace back to inefficient queries.</li>
        <li><strong>Think in terms of user experience:</strong> A 100ms improvement in critical paths matters more than a 1s improvement in edge cases.</li>
        <li><strong>Optimize incrementally:</strong> Small, consistent improvements compound over time.</li>
      </ul>

      <h2>Looking Forward</h2>
      <p>These optimizations weren't one-time fixes—they became part of our development culture. We now profile every major feature before shipping. We have automated performance budgets in our CI pipeline. And we constantly ask: "How does this affect the user?"</p>

      <p>Performance isn't a feature you add at the end. It's a mindset you build into every line of code from day one.</p>
    `
  },
  'learning-in-public': {
    title: 'The Art of Learning in Public: My Journey from Zero to Full Stack',
    date: 'October 2024',
    readTime: '6 min read',
    category: 'Career',
    image: '/images/pimg3.jpg',
    content: `
      <p>Eighteen months ago, I wrote my first line of code. Today, I architect production systems serving thousands of users. This isn't a story about being naturally gifted—it's a story about learning in public, building relentlessly, and refusing to wait for permission.</p>

      <h2>The Beginning</h2>
      <p>I didn't take the traditional computer science path. No four-year degree. No formal education in algorithms. Just a burning curiosity and a laptop.</p>

      <p>I started with the basics—HTML, CSS, JavaScript. But I didn't just follow tutorials. I built things. Small things at first. A personal website. A calculator. A to-do app. Each project taught me something new about how the web works.</p>

      <h2>Learning by Building</h2>
      <p>The breakthrough came when I stopped learning to learn and started learning to build. Instead of completing course after course, I picked ambitious projects that scared me.</p>

      <p>An e-commerce platform? I didn't know how to handle payments. So I learned Stripe integration. A healthcare system? I didn't know Laravel. So I spent weeks mastering it while building SaveMe.life.</p>

      <p>Every project became a forcing function for learning. When you have real users depending on you, you learn fast.</p>

      <h2>The Power of Constraints</h2>
      <p>Working at RoborosX taught me that constraints breed creativity. Limited time? You learn to prioritize ruthlessly. Limited resources? You learn to optimize relentlessly.</p>

      <p>When I had 500+ doctors relying on the platform I was building, there was no room for excuses. The code had to work. The performance had to be there. The edge cases had to be handled.</p>

      <h2>Teaching as Learning</h2>
      <p>At SDC, I mentored 300+ students through web development fundamentals. Teaching forced me to understand concepts at a deeper level. You can't explain something clearly unless you truly understand it.</p>

      <p>Every question a student asked made me think harder. Every bug we debugged together made me a better developer. Teaching isn't just giving knowledge—it's solidifying your own understanding.</p>

      <h2>What Actually Matters</h2>
      <p>After 18 months of intense building, I've learned what actually matters:</p>

      <ul>
        <li><strong>Ship real projects:</strong> Tutorials don't teach you how to handle production issues.</li>
        <li><strong>Work with real users:</strong> User feedback teaches you more than any course.</li>
        <li><strong>Read other people's code:</strong> Open source repos are masterclasses in software design.</li>
        <li><strong>Build in public:</strong> Share your journey. Your struggles will help others.</li>
        <li><strong>Solve real problems:</strong> Don't build for your portfolio—build to solve problems.</li>
      </ul>

      <h2>The Path Forward</h2>
      <p>I'm not done learning. I'll never be done learning. But I've learned to trust the process: build, ship, learn, iterate.</p>

      <p>If you're just starting out, don't wait until you "feel ready." You'll never feel ready. Start building. Start shipping. Start learning in public. The journey will teach you everything you need to know.</p>
    `
  },
  'rag-ai-agents': {
    title: 'RAG & AI Agents: Building My Career Guidance System',
    date: 'September 2024',
    readTime: '10 min read',
    category: 'AI/ML',
    image: '/images/pimg5.jpg',
    content: `
      <p>Building an AI-powered career guidance system wasn't just a technical challenge—it was an experiment in making AI actually useful. Here's how I architected a RAG-based mentorship platform that boosted beta user engagement by 30%.</p>

      <h2>The Problem Space</h2>
      <p>Career guidance is deeply personal. Generic advice doesn't cut it. Students need context-aware recommendations based on their background, goals, and current market conditions.</p>

      <p>Traditional career platforms either provide one-size-fits-all advice or require expensive human counselors. I wanted to build something that combined AI intelligence with personalized context.</p>

      <h2>Why RAG?</h2>
      <p>Retrieval Augmented Generation (RAG) solved a critical problem: keeping AI responses grounded in accurate, up-to-date information without fine-tuning massive models.</p>

      <p>Instead of relying solely on GPT's training data, RAG retrieves relevant information from a curated knowledge base, then generates responses based on that context. This means more accurate, more relevant, and more trustworthy advice.</p>

      <h2>Architecture Overview</h2>
      <p>The system consists of five AI-driven workflows:</p>

      <h3>1. Resume Analysis Agent</h3>
      <p>Extracts skills, experience, and educational background. Uses NLP to identify strengths and gaps.</p>

      <h3>2. Career Path Recommender</h3>
      <p>Matches user profiles with industry trends and job market data. Suggests realistic career trajectories based on similar success stories.</p>

      <h3>3. Skill Gap Analyzer</h3>
      <p>Compares current skills with target roles. Generates personalized learning paths with resource recommendations.</p>

      <h3>4. Interview Preparation Coach</h3>
      <p>Provides role-specific interview questions. Evaluates responses and gives constructive feedback.</p>

      <h3>5. Scheduling Intelligence</h3>
      <p>Coordinates follow-up sessions based on user progress. Adapts to learning pace and availability.</p>

      <h2>Technical Implementation</h2>
      <p>I used LangChain for workflow orchestration, Pinecone for vector storage, and OpenAI's GPT-4 for generation. The knowledge base includes:</p>

      <ul>
        <li>10,000+ job descriptions across 50+ roles</li>
        <li>500+ career transition case studies</li>
        <li>1,000+ technical interview questions with rubrics</li>
        <li>Real-time job market data from multiple sources</li>
      </ul>

      <h2>The Results</h2>
      <p>Beta users spent 30% more time engaging with recommendations compared to traditional career platforms. Response accuracy (measured through user feedback) was consistently above 85%.</p>

      <p>But the real win was qualitative: users felt like they were getting personalized mentorship, not generic advice.</p>

      <h2>Lessons Learned</h2>
      <ul>
        <li><strong>RAG isn't magic:</strong> Garbage in, garbage out. Quality of your knowledge base matters more than model size.</li>
        <li><strong>Context windows matter:</strong> Balancing context length with response quality is an art.</li>
        <li><strong>User trust is fragile:</strong> One wrong recommendation can break user confidence. Always provide sources.</li>
        <li><strong>Evaluation is hard:</strong> Standard metrics don't capture usefulness. Talk to your users.</li>
      </ul>

      <h2>What's Next</h2>
      <p>I'm working on adding memory persistence so the system can remember previous conversations and provide better long-term guidance. I'm also experimenting with fine-tuning smaller models for specific tasks to reduce latency and costs.</p>

      <p>AI-powered tools won't replace human mentorship, but they can democratize access to quality career guidance. That's worth building.</p>
    `
  },
  'performance-optimization': {
    title: 'Performance Optimization: Making Every Millisecond Count',
    date: 'August 2024',
    readTime: '7 min read',
    category: 'Performance',
    image: '/images/pimg7.jpg',
    content: `
      <p>Why do I obsess over performance? Because every millisecond you save is a user who doesn't give up. Every second you shave off load time is a conversion you preserve. Performance isn't vanity—it's user experience.</p>

      <h2>The 45% Story</h2>
      <p>When I reduced SaveMe.life's load times by 45%, something interesting happened. Appointment completion rates went up by 25%. Not because we changed the UI or added features—just because the system was faster.</p>

      <p>Users don't consciously notice good performance, but they definitely notice bad performance. And bad performance bleeds engagement.</p>

      <h2>Where Performance Lives</h2>
      <p>Performance optimization isn't one thing—it's everything. It's in your database queries, your API architecture, your frontend code, your caching strategy, your CDN setup, your image compression.</p>

      <h3>Database: The Usual Suspect</h3>
      <p>Most performance problems start here. N+1 queries, missing indexes, inefficient joins—these are killers at scale.</p>

      <p>I learned to think in terms of query plans. Before writing any database interaction, I ask: how many queries will this trigger? Can I eager load relationships? Can I use indexes effectively?</p>

      <h3>API Design: Less is More</h3>
      <p>Over-fetching data is a silent performance killer. Your API might be fast, but if you're sending 10KB when 1KB would do, you're wasting bandwidth and parse time.</p>

      <p>I started designing APIs with specific use cases in mind. Different endpoints for different views. GraphQL for flexible querying. DTOs to shape exactly the data needed.</p>

      <h3>Frontend: Every Byte Counts</h3>
      <p>Code splitting. Tree shaking. Lazy loading. Image optimization. These aren't buzzwords—they're essential practices.</p>

      <p>I routinely audit bundle sizes. If a library adds 50KB for a feature users rarely need, I look for alternatives. Lighthouse scores aren't just metrics—they're user experience proxies.</p>

      <h2>Performance Budgets</h2>
      <p>I enforce performance budgets in CI. If a pull request bloats bundle size beyond our threshold, it fails. If it slows down critical metrics, it doesn't ship.</p>

      <p>This isn't about being rigid—it's about making performance a first-class concern, not an afterthought.</p>

      <h2>Real-World Impact</h2>
      <p>At SaveMe.life, better performance meant doctors could see more patients per day. At my e-commerce platform, faster load times directly correlated with higher conversion rates.</p>

      <p>Performance isn't abstract. It's revenue. It's user satisfaction. It's competitive advantage.</p>

      <h2>The Mindset</h2>
      <p>Performance optimization isn't something you do at the end of a project. It's a mindset you build into every decision:</p>

      <ul>
        <li>Before adding a library: Do I really need this?</li>
        <li>Before writing a query: Can I reduce database hits?</li>
        <li>Before rendering: Can I avoid re-renders?</li>
        <li>Before shipping: Have I profiled this?</li>
      </ul>

      <h2>Tools I Use</h2>
      <ul>
        <li><strong>Lighthouse:</strong> For frontend audits</li>
        <li><strong>Laravel Debugbar:</strong> For backend profiling</li>
        <li><strong>Chrome DevTools:</strong> For network analysis</li>
        <li><strong>Webpack Bundle Analyzer:</strong> For bundle optimization</li>
      </ul>

      <p>Performance optimization is never done. There's always something to improve, always another millisecond to save. And every optimization compounds—making your product faster, your users happier, and your competitive position stronger.</p>
    `
  },
  'leetcode-journey': {
    title: 'Solving 300+ LeetCode Problems: What I Actually Learned',
    date: 'July 2024',
    readTime: '5 min read',
    category: 'DSA',
    image: '/images/pimg9.jpg',
    content: `
      <p>I've solved over 300 LeetCode problems. But this isn't a story about grinding for FAANG interviews—it's about how consistent problem-solving fundamentally changed how I think about code.</p>

      <h2>Why I Started</h2>
      <p>I didn't start LeetCode to get good at interviews. I started because I kept hitting walls in production code—situations where I knew there had to be a better solution, but I didn't know enough data structures or algorithms to find it.</p>

      <p>LeetCode became my training ground for systematic problem-solving.</p>

      <h2>What I Actually Learned</h2>
      <h3>1. Pattern Recognition</h3>
      <p>After solving enough problems, you start seeing patterns. Two pointers. Sliding window. Dynamic programming. These aren't just interview tricks—they're mental models for solving real problems.</p>

      <p>When I encounter a production bug now, I instinctively think: "Is this a graph problem? Could I use a hash map here? Would memoization help?"</p>

      <h3>2. Time-Space Tradeoffs</h3>
      <p>Every algorithm is a tradeoff. Faster? Use more memory. Less memory? Sacrifice speed. Understanding these tradeoffs viscerally changed how I write production code.</p>

      <p>I now consciously think about performance implications of every data structure choice. Arrays vs Sets? Maps vs nested loops? These decisions matter at scale.</p>

      <h3>3. Edge Case Thinking</h3>
      <p>LeetCode problems force you to think about edge cases: empty inputs, single elements, maximum constraints. This mindset carries over to production.</p>

      <p>I now write more defensive code by default. I think about null checks, boundary conditions, and failure modes before they become bugs.</p>

      <h3>4. Code Clarity</h3>
      <p>Explaining solutions in LeetCode discussions taught me to write clearer code. If you can't explain your solution simply, you don't understand it well enough.</p>

      <p>This has made me a better code reviewer and a clearer communicator with teammates.</p>

      <h2>Beyond the Interview</h2>
      <p>Yes, LeetCode helped me win competitive programming contests. But the real value was in how it trained my brain to approach problems systematically:</p>

      <ul>
        <li><strong>Understand the problem:</strong> What are the constraints? What's the goal?</li>
        <li><strong>Consider approaches:</strong> What data structures fit? What algorithms apply?</li>
        <li><strong>Optimize iteratively:</strong> Start with brute force, then optimize.</li>
        <li><strong>Test edge cases:</strong> Where could this break?</li>
      </ul>

      <h2>The Competitive Edge</h2>
      <p>Solving DSA problems gave me wins beyond interviews:</p>

      <ul>
        <li>1st place in Web Development competition</li>
        <li>1st place in ML NOVA hackathon</li>
        <li>2nd place in two DSA challenges</li>
        <li>3rd place in 8-hour AI Hackathon</li>
      </ul>

      <p>Each win reinforced the same lesson: systematic problem-solving beats raw talent.</p>

      <h2>How to Approach LeetCode</h2>
      <p>Don't just grind blindly. Here's what worked for me:</p>

      <ul>
        <li><strong>Focus on patterns, not problems:</strong> Learn the underlying concepts.</li>
        <li><strong>Revisit hard problems:</strong> If you don't get it, come back after a week.</li>
        <li><strong>Explain your solutions:</strong> Write them down, explain to others.</li>
        <li><strong>Track your progress:</strong> Consistency beats intensity.</li>
        <li><strong>Apply to real code:</strong> Use what you learn in your projects.</li>
      </ul>

      <h2>The Bottom Line</h2>
      <p>LeetCode isn't about memorizing solutions. It's about training your brain to see problems as puzzles with systematic approaches. That mindset—more than any specific algorithm—is what makes you a better engineer.</p>
    `
  }
};

export default function BlogPost() {
  const params = useParams();
  const slug = params?.slug as string;
  const post = blogPostsData[slug];
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

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
            <span>{post.date}</span>
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
