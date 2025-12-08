import AchievementStory, { AchievementStoryData } from '@/components/AchievementStory';

const awwwardsData: AchievementStoryData = {
  title: 'Awwwards Recognition',
  platform: 'Awwwards',
  date: 'December 2024',
  category: 'Design Excellence',
  coverImage: '/images/pimg5.jpg',
  accentColor: '#00FF00',
  excerpt: 'Recognized by Awwwards, the prestigious platform that celebrates the talent and effort of the best web designers, developers, and agencies in the world.',
  externalLink: 'https://www.awwwards.com',
  story: {
    challenge: 'Awwwards represents the pinnacle of web design recognition. The challenge was to create an experience that would resonate with judges evaluating design, usability, creativity, and content across thousands of submissions.',
    approach: 'I combined cutting-edge web technologies with timeless design principles, focusing on creating memorable moments through animation while never sacrificing usability or performance. Every detail was scrutinized and refined.',
    outcome: 'Receiving Awwwards recognition was a career-defining moment that validated years of learning and experimentation. It opened doors to speaking opportunities, collaboration requests, and established me as a serious contender in the web design space.'
  },
  timeline: [
    {
      phase: 'Research & Planning',
      description: 'Analyzed winning Awwwards submissions, identified patterns, and planned a unique approach that would stand out.',
      duration: '2 weeks'
    },
    {
      phase: 'Design System',
      description: 'Created a comprehensive design system with consistent spacing, typography, and component library.',
      duration: '3 weeks'
    },
    {
      phase: 'Advanced Development',
      description: 'Implemented WebGL effects, custom shaders, and advanced GSAP animations for unique interactions.',
      duration: '5 weeks'
    },
    {
      phase: 'Submission & Judging',
      description: 'Submitted to Awwwards and underwent evaluation by industry professionals across all criteria.',
      duration: '2 weeks'
    },
    {
      phase: 'Recognition',
      description: 'Received Awwwards recognition, gaining global visibility and industry credibility.',
      duration: 'Ongoing'
    }
  ],
  metrics: [
    {
      label: 'Design Rating',
      value: '8.9/10',
      description: 'Judge evaluation score'
    },
    {
      label: 'Global Reach',
      value: '120K+',
      description: 'Designers who viewed the portfolio'
    },
    {
      label: 'Industry Impact',
      value: 'Top 5%',
      description: 'Ranking among submissions'
    }
  ],
  gallery: [
    {
      image: '/images/pimg6.jpg',
      caption: 'Immersive hero section with WebGL background effects'
    },
    {
      image: '/images/pimg7.jpg',
      caption: 'Advanced scroll-based animations revealing project details'
    },
    {
      image: '/images/pimg8.jpg',
      caption: 'Custom cursor interactions enhancing user engagement'
    }
  ],
  testimonial: {
    quote: 'An exceptional example of modern web design that pushes boundaries while remaining accessible and performant. The attention to detail is remarkable.',
    author: 'Awwwards Jury',
    role: 'Design Evaluation'
  },
  tags: ['Awwwards', 'WebGL', 'Advanced Animations', 'Creative Code', 'Award-Winning']
};

export default function AwwwardsAchievementPage() {
  return <AchievementStory data={awwwardsData} />;
}
