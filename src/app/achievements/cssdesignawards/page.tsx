import AchievementStory, { AchievementStoryData } from '@/components/AchievementStory';

const cssDesignAwardsData: AchievementStoryData = {
  title: 'CSS Design Awards Winner',
  platform: 'CSS Design Awards',
  date: 'August 2024',
  category: 'Technical Excellence',
  coverImage: '/images/pimg6.jpg',
  accentColor: '#FF4500',
  excerpt: 'Won CSS Design Awards recognition for outstanding achievement in web design and development, honoring innovation in UI/UX and front-end development.',
  externalLink: 'https://www.cssdesignawards.com',
  story: {
    challenge: 'CSS Design Awards judges sites on four key criteria: design, creativity, user experience, and code quality. The challenge was to excel across all these dimensions while creating something that felt fresh and innovative in a crowded field of submissions.',
    approach: 'I approached the project with a mobile-first mindset, ensuring the experience was flawless on every device. Advanced CSS techniques like CSS Grid, custom properties, and animation were leveraged to create fluid, performant interactions. The codebase was meticulously organized and commented, treating it as a learning resource for others.',
    outcome: 'Winning the CSS Design Awards validated my technical approach and showcased my ability to merge design and development seamlessly. The recognition led to invitations to contribute to design systems for major tech companies and opportunities to speak at front-end development conferences.'
  },
  timeline: [
    {
      phase: 'Technical Architecture',
      description: 'Designed a scalable, maintainable architecture using modern CSS methodologies and best practices.',
      duration: '1 week'
    },
    {
      phase: 'Component Development',
      description: 'Built reusable, accessible components with progressive enhancement principles.',
      duration: '3 weeks'
    },
    {
      phase: 'Animation & Interaction',
      description: 'Crafted smooth, performant animations using CSS transforms and GPU-accelerated properties.',
      duration: '2 weeks'
    },
    {
      phase: 'Cross-browser Testing',
      description: 'Ensured perfect rendering and functionality across all modern browsers and devices.',
      duration: '1 week'
    },
    {
      phase: 'Award Recognition',
      description: 'Project won CSS Design Awards for excellence in design and code quality.',
      duration: 'August 2024'
    }
  ],
  metrics: [
    {
      label: 'Code Quality',
      value: '9.5/10',
      description: 'Judge rating for technical execution'
    },
    {
      label: 'Accessibility Score',
      value: '100',
      description: 'Perfect Lighthouse accessibility rating'
    },
    {
      label: 'Framework Adoption',
      value: '3.2K',
      description: 'Developers inspired by the approach'
    }
  ],
  gallery: [
    {
      image: '/images/pimg7.jpg',
      caption: 'Advanced CSS Grid layout system with fluid, responsive behavior'
    },
    {
      image: '/images/pimg8.jpg',
      caption: 'Custom CSS animations using modern properties and transforms'
    },
    {
      image: '/images/pimg1.jpg',
      caption: 'Dark mode implementation using CSS custom properties'
    }
  ],
  testimonial: {
    quote: 'Exceptional technical execution paired with thoughtful design. The code quality is exemplary and serves as a model for modern front-end development.',
    author: 'CSS Design Awards Jury',
    role: 'Technical Review Panel'
  },
  tags: ['CSS Design Awards', 'Front-end', 'Modern CSS', 'Accessibility', 'Performance']
};

export default function CSSDesignAwardsAchievementPage() {
  return <AchievementStory data={cssDesignAwardsData} />;
}
