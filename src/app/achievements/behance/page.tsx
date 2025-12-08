import AchievementStory, { AchievementStoryData } from '@/components/AchievementStory';

const behanceData: AchievementStoryData = {
  title: 'Featured on Behance',
  platform: 'Behance',
  date: 'July 2024',
  category: 'Creative Showcase',
  coverImage: '/images/pimg7.jpg',
  accentColor: '#1769FF',
  excerpt: 'Project featured on Behance, the world\'s largest creative network with over 150 million members, showcasing exceptional creative work to a global audience.',
  externalLink: 'https://www.behance.net',
  story: {
    challenge: 'Behance hosts millions of projects from talented creators worldwide. The challenge was to present my work in a way that would capture attention in the endless scroll, telling a compelling story through both the work itself and how it was documented and presented.',
    approach: 'I treated the Behance case study as a design project itself, creating a visual narrative that walked viewers through my entire design process. High-quality mockups, detailed process documentation, and thoughtful presentation design were combined to create an immersive case study that educated while it inspired.',
    outcome: 'The feature on Behance resulted in unprecedented engagement, with thousands of appreciations and hundreds of thoughtful comments from designers worldwide. It led to collaborations with creative studios in New York, London, and Tokyo, and solidified my presence in the global creative community.'
  },
  timeline: [
    {
      phase: 'Project Execution',
      description: 'Completed the actual design project with meticulous attention to every detail and deliverable.',
      duration: '8 weeks'
    },
    {
      phase: 'Documentation',
      description: 'Photographed and documented the entire process, from initial sketches to final implementation.',
      duration: '1 week'
    },
    {
      phase: 'Case Study Design',
      description: 'Designed a compelling Behance presentation that told the story effectively and beautifully.',
      duration: '2 weeks'
    },
    {
      phase: 'Community Engagement',
      description: 'Actively engaged with comments and feedback, building relationships within the creative community.',
      duration: 'Ongoing'
    },
    {
      phase: 'Behance Feature',
      description: 'Project was selected for Behance feature, gaining global exposure to creative professionals.',
      duration: 'July 2024'
    }
  ],
  metrics: [
    {
      label: 'Appreciations',
      value: '5.8K+',
      description: 'Community engagement on the project'
    },
    {
      label: 'Global Views',
      value: '180K+',
      description: 'Professionals who viewed the work'
    },
    {
      label: 'Collaboration Requests',
      value: '47',
      description: 'International opportunities received'
    }
  ],
  gallery: [
    {
      image: '/images/pimg8.jpg',
      caption: 'Hero image showcasing the final design with dramatic presentation'
    },
    {
      image: '/images/pimg1.jpg',
      caption: 'Process documentation showing ideation and iteration phases'
    },
    {
      image: '/images/pimg2.jpg',
      caption: 'Detailed mockups demonstrating application across various contexts'
    }
  ],
  testimonial: {
    quote: 'A masterclass in case study presentation. The work speaks for itself, but the storytelling elevates it to another level entirely.',
    author: 'Behance Curation Team',
    role: 'Adobe Creative Cloud'
  },
  tags: ['Behance', 'Case Study', 'Process Documentation', 'Creative Network', 'Featured']
};

export default function BehanceAchievementPage() {
  return <AchievementStory data={behanceData} />;
}
