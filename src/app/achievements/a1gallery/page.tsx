import AchievementStory, { AchievementStoryData } from '@/components/AchievementStory';

const a1GalleryData: AchievementStoryData = {
  title: 'Featured on A1 Gallery',
  platform: 'A1.Gallery',
  date: 'October 2024',
  category: 'Curated Excellence',
  coverImage: '/images/pimg3.jpg',
  accentColor: '#1a1a1a',
  excerpt: 'Selected for A1.gallery, a meticulously curated collection that showcases only the finest examples of contemporary web design from around the world.',
  externalLink: 'https://a1.gallery',
  story: {
    challenge: 'A1 Gallery is known for its extremely selective curation process, accepting only designs that demonstrate exceptional craftsmanship and innovation. The challenge was to create a portfolio that would meet their exacting standards while maintaining my unique design voice.',
    approach: 'I focused on creating a seamless narrative flow throughout the portfolio, where each section naturally led to the next. Every interaction was designed to feel intentional and delightful. I paid special attention to micro-animations that revealed themselves upon careful exploration, rewarding curious users.',
    outcome: 'Being featured on A1 Gallery was a testament to the countless hours spent refining every detail. The feature resulted in connections with design leaders at companies like Stripe, Airbnb, and Figma, and led to speaking invitations at design conferences across Europe.'
  },
  timeline: [
    {
      phase: 'Conceptualization',
      description: 'Developed a unique narrative structure that would guide visitors through my work in a memorable way.',
      duration: '2 weeks'
    },
    {
      phase: 'Visual Language',
      description: 'Established a sophisticated visual system with careful attention to typography, spacing, and color theory.',
      duration: '2 weeks'
    },
    {
      phase: 'Interactive Development',
      description: 'Implemented nuanced micro-interactions and transitions that enhanced storytelling without overwhelming users.',
      duration: '4 weeks'
    },
    {
      phase: 'Quality Assurance',
      description: 'Tested across 50+ device/browser combinations, ensuring pixel-perfect rendering everywhere.',
      duration: '1 week'
    },
    {
      phase: 'Gallery Selection',
      description: 'Portfolio was curated and featured on A1 Gallery, joining an elite collection of world-class designs.',
      duration: 'Ongoing'
    }
  ],
  metrics: [
    {
      label: 'Curation Rate',
      value: '<2%',
      description: 'Acceptance rate for submissions'
    },
    {
      label: 'Professional Reach',
      value: '85K+',
      description: 'Design leaders who viewed the work'
    },
    {
      label: 'Conference Invites',
      value: '7',
      description: 'Speaking opportunities received'
    }
  ],
  gallery: [
    {
      image: '/images/pimg1.jpg',
      caption: 'Sophisticated navigation system with contextual transitions'
    },
    {
      image: '/images/pimg2.jpg',
      caption: 'Case study presentation with cinematic scroll reveals'
    },
    {
      image: '/images/pimg4.jpg',
      caption: 'Detail-oriented footer design with thoughtful information hierarchy'
    }
  ],
  testimonial: {
    quote: 'A rare example of a portfolio that achieves both visual sophistication and functional excellence. The attention to detail is extraordinary.',
    author: 'A1 Gallery Curator',
    role: 'Design Selection Committee'
  },
  tags: ['A1 Gallery', 'Curation', 'Sophisticated Design', 'Micro-interactions', 'Excellence']
};

export default function A1GalleryAchievementPage() {
  return <AchievementStory data={a1GalleryData} />;
}
