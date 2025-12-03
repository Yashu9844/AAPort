import AchievementStory, { AchievementStoryData } from '@/components/AchievementStory';

const logoLoungeData: AchievementStoryData = {
  title: 'Published in LogoLounge 15',
  platform: 'LogoLounge Book 15',
  date: 'September 2024',
  category: 'Identity Design',
  coverImage: '/images/pimg4.jpg',
  accentColor: '#FF6B35',
  excerpt: 'Three of my logo designs were selected for publication in LogoLounge Book 15, an annual compilation showcasing the best identity work from designers worldwide.',
  externalLink: 'https://www.logolounge.com',
  story: {
    challenge: 'LogoLounge receives tens of thousands of submissions annually from professional designers globally, with only 2,000 logos making it into the published book. The challenge was to create identity work that was not only visually distinctive but also conceptually strong and strategically sound.',
    approach: 'For each logo, I started with deep research into the brand\'s essence, target audience, and competitive landscape. I explored multiple conceptual directions before refining the strongest ideas. The focus was on creating marks that were simple yet memorable, versatile across applications, and rich in meaning beneath their surface simplicity.',
    outcome: 'Having three logos published in a single edition was a significant achievement that validated my approach to identity design. The recognition opened doors to work with Fortune 500 companies and established my reputation in the branding community. The book itself became a valuable portfolio piece for client presentations.'
  },
  timeline: [
    {
      phase: 'Client Engagements',
      description: 'Worked with diverse clients on brand identity projects, each with unique challenges and opportunities.',
      duration: '6 months'
    },
    {
      phase: 'Concept Development',
      description: 'Created hundreds of sketches and concepts for each project, exploring multiple visual and conceptual directions.',
      duration: 'Per project'
    },
    {
      phase: 'Refinement Process',
      description: 'Refined selected concepts through multiple iterations, testing at various sizes and contexts.',
      duration: 'Per project'
    },
    {
      phase: 'Submission Selection',
      description: 'Carefully selected strongest work from portfolio to submit to LogoLounge jury for consideration.',
      duration: '1 week'
    },
    {
      phase: 'Publication',
      description: 'Three logos were selected and published in LogoLounge Book 15, distributed globally.',
      duration: 'September 2024'
    }
  ],
  metrics: [
    {
      label: 'Logos Published',
      value: '3',
      description: 'Selected from thousands of submissions'
    },
    {
      label: 'Selection Rate',
      value: 'Top 2%',
      description: 'Of all global submissions'
    },
    {
      label: 'Client Growth',
      value: '240%',
      description: 'Increase in branding inquiries'
    }
  ],
  gallery: [
    {
      image: '/images/pimg5.jpg',
      caption: 'Tech startup logo featuring geometric abstraction and modern typography'
    },
    {
      image: '/images/pimg6.jpg',
      caption: 'Sustainable brand mark using organic shapes and environmental symbolism'
    },
    {
      image: '/images/pimg7.jpg',
      caption: 'Minimalist financial services logo emphasizing trust and stability'
    }
  ],
  testimonial: {
    quote: 'These logos demonstrate exceptional conceptual thinking and execution. The designer shows a rare ability to distill complex brand essences into elegant, memorable marks.',
    author: 'Bill Gardner',
    role: 'LogoLounge Founder & Curator'
  },
  tags: ['LogoLounge', 'Identity Design', 'Branding', 'Logo Design', 'Publication']
};

export default function LogoLoungeAchievementPage() {
  return <AchievementStory data={logoLoungeData} />;
}
