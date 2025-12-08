import AchievementStory, { AchievementStoryData } from '@/components/AchievementStory';

const siteInspireData: AchievementStoryData = {
  title: 'Featured on SiteInspire',
  platform: 'SiteInspire Gallery',
  date: 'November 2024',
  category: 'Web Excellence',
  coverImage: '/images/pimg2.jpg',
  accentColor: '#FFFFFF',
  excerpt: 'Recognition on SiteInspire, a long-standing showcase of exceptional web and interactive design that has been curating the best of the web since 2008.',
  externalLink: 'https://www.siteinspire.com',
  story: {
    challenge: 'Standing out among thousands of submissions to one of the web\'s most respected design galleries required creating something that was both visually stunning and functionally exceptional. The site needed to demonstrate technical prowess while maintaining an elegant simplicity.',
    approach: 'I designed with a "less is more" philosophy, letting bold typography and generous whitespace create impact. Each interaction was carefully considered to enhance user experience. Performance optimization was paramount, ensuring lightning-fast load times without sacrificing visual richness.',
    outcome: 'The feature on SiteInspire brought credibility and recognition from peers in the industry. It became a conversation starter in interviews and led to several high-profile client inquiries. Most importantly, it validated the belief that thoughtful, purposeful design resonates with people.'
  },
  timeline: [
    {
      phase: 'Visual Direction',
      description: 'Established a minimal yet bold visual language with strong typography and a monochromatic color scheme.',
      duration: '1 week'
    },
    {
      phase: 'Content Strategy',
      description: 'Crafted compelling copy and organized content hierarchy to guide users through my work seamlessly.',
      duration: '2 weeks'
    },
    {
      phase: 'Development & Animation',
      description: 'Implemented smooth transitions, scroll-based reveals, and subtle micro-interactions that delight users.',
      duration: '3 weeks'
    },
    {
      phase: 'Performance Optimization',
      description: 'Achieved 99+ Lighthouse scores through image optimization, code splitting, and lazy loading strategies.',
      duration: '1 week'
    },
    {
      phase: 'SiteInspire Feature',
      description: 'Selected for the SiteInspire gallery, gaining exposure to design professionals worldwide.',
      duration: 'Ongoing'
    }
  ],
  metrics: [
    {
      label: 'Page Speed',
      value: '99',
      description: 'Lighthouse performance score'
    },
    {
      label: 'Design Votes',
      value: '2.8K+',
      description: 'Community appreciation'
    },
    {
      label: 'Industry Reach',
      value: '50K+',
      description: 'Impressions from design professionals'
    }
  ],
  gallery: [
    {
      image: '/images/pimg1.jpg',
      caption: 'Clean, typography-focused homepage with bold visual hierarchy'
    },
    {
      image: '/images/pimg3.jpg',
      caption: 'Case study layout demonstrating storytelling through design'
    },
    {
      image: '/images/pimg4.jpg',
      caption: 'Responsive grid system adapting fluidly across breakpoints'
    }
  ],
  testimonial: {
    quote: 'A masterclass in restraint and elegance. Every pixel serves a purpose, and the overall experience is both sophisticated and accessible.',
    author: 'SiteInspire Curation Team',
    role: 'Editorial'
  },
  tags: ['SiteInspire', 'Minimal Design', 'Typography', 'Performance', 'Responsive']
};

export default function SiteInspireAchievementPage() {
  return <AchievementStory data={siteInspireData} />;
}
