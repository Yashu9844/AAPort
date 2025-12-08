import AchievementStory, { AchievementStoryData } from '@/components/AchievementStory';

const framerData: AchievementStoryData = {
  title: 'Featured on Framer',
  platform: 'Framer Gallery',
  date: 'December 2024',
  category: 'Design Recognition',
  coverImage: '/images/pimg1.jpg',
  accentColor: '#8B5CF6',
  excerpt: 'My portfolio website was featured on the prestigious Framer Gallery, showcasing exceptional website design and innovative interactions on the Framer platform.',
  externalLink: 'https://framer.com/gallery',
  story: {
    challenge: 'Creating a portfolio that stands out in a sea of talented designers required pushing the boundaries of what\'s possible with web design. The challenge was to create something that felt both cutting-edge and intuitive, with interactions that enhanced rather than distracted from the content.',
    approach: 'I focused on crafting micro-interactions that responded naturally to user input, implementing smooth scroll animations using GSAP, and creating a cohesive visual language that balanced minimalism with impact. Every element was designed with purpose, from the typography hierarchy to the subtle hover states.',
    outcome: 'The portfolio caught the attention of the Framer Gallery curators, resulting in a feature that brought thousands of visitors and countless opportunities. The recognition validated my approach to thoughtful, user-centric design and opened doors to exciting collaborations.'
  },
  timeline: [
    {
      phase: 'Concept & Research',
      description: 'Studied Awwwards-winning designs, analyzed user behavior patterns, and sketched initial concepts that would set my portfolio apart.',
      duration: '2 weeks'
    },
    {
      phase: 'Design & Prototyping',
      description: 'Created high-fidelity mockups in Figma, prototyped key interactions, and iterated based on feedback from design communities.',
      duration: '3 weeks'
    },
    {
      phase: 'Development',
      description: 'Built the portfolio using Next.js and Framer Motion, implementing custom animations and ensuring perfect performance across all devices.',
      duration: '4 weeks'
    },
    {
      phase: 'Refinement & Launch',
      description: 'Conducted extensive testing, optimized loading times, and refined every detail before submission to the Framer Gallery.',
      duration: '2 weeks'
    },
    {
      phase: 'Feature & Recognition',
      description: 'Portfolio was selected for the Framer Gallery, resulting in significant traffic and industry recognition.',
      duration: 'Ongoing'
    }
  ],
  metrics: [
    {
      label: 'Gallery Visits',
      value: '15K+',
      description: 'Unique visitors from the Framer Gallery feature'
    },
    {
      label: 'Design Score',
      value: '9.2/10',
      description: 'Community rating on design quality'
    },
    {
      label: 'Engagement Rate',
      value: '68%',
      description: 'Users exploring multiple pages'
    }
  ],
  gallery: [
    {
      image: '/images/pimg2.jpg',
      caption: 'Hero section with dynamic typography and smooth scroll animations'
    },
    {
      image: '/images/pimg3.jpg',
      caption: 'Project showcase featuring hover interactions and parallax effects'
    },
    {
      image: '/images/pimg4.jpg',
      caption: 'Mobile-responsive design maintaining fluid interactions across devices'
    }
  ],
  testimonial: {
    quote: 'This portfolio demonstrates exceptional attention to detail and a mastery of modern web design principles. The interactions feel natural and the overall experience is truly memorable.',
    author: 'Framer Gallery Team',
    role: 'Design Curation'
  },
  tags: ['Framer', 'Web Design', 'Interaction Design', 'Animation', 'UI/UX']
};

export default function FramerAchievementPage() {
  return <AchievementStory data={framerData} />;
}
