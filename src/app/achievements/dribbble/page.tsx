import AchievementStory, { AchievementStoryData } from '@/components/AchievementStory';

const dribbbleData: AchievementStoryData = {
  title: 'Featured Shot on Dribbble',
  platform: 'Dribbble',
  date: 'June 2024',
  category: 'Design Community',
  coverImage: '/images/pimg8.jpg',
  accentColor: '#EA4C89',
  excerpt: 'Design work featured on Dribbble, the leading platform where millions of designers gain inspiration, feedback, community, and career opportunities.',
  externalLink: 'https://dribbble.com',
  story: {
    challenge: 'Dribbble is known for its incredibly high visual standards and discerning community. The challenge was to create work that would not only meet these standards but also spark meaningful conversations and inspire other designers in the community.',
    approach: 'I focused on creating work that balanced aesthetic appeal with functional thinking. Each shot was carefully composed, showing enough detail to be appreciated at small sizes while revealing deeper layers of thought upon closer inspection. I engaged authentically with the community, providing thoughtful feedback on others\' work and fostering genuine connections.',
    outcome: 'The featured shot became one of the most liked and saved designs in my category that month. It led to invitations to join exclusive design teams, opportunities to mentor emerging designers, and helped establish my voice within the design community. Most valuably, it connected me with like-minded creatives who became collaborators and friends.'
  },
  timeline: [
    {
      phase: 'Concept Exploration',
      description: 'Explored multiple visual directions, seeking something that would resonate with the Dribbble community.',
      duration: '3 days'
    },
    {
      phase: 'Design Execution',
      description: 'Crafted the design with obsessive attention to typography, color, spacing, and overall composition.',
      duration: '1 week'
    },
    {
      phase: 'Presentation',
      description: 'Created the perfect shot composition, ensuring the work would shine in Dribbble\'s grid.',
      duration: '2 days'
    },
    {
      phase: 'Community Building',
      description: 'Engaged with comments, shared process insights, and built relationships with fellow designers.',
      duration: 'Ongoing'
    },
    {
      phase: 'Feature Recognition',
      description: 'Shot was featured by Dribbble, gaining visibility across their platform and newsletter.',
      duration: 'June 2024'
    }
  ],
  metrics: [
    {
      label: 'Likes',
      value: '12.5K+',
      description: 'Community appreciation'
    },
    {
      label: 'Saves',
      value: '3.9K+',
      description: 'Designers bookmarked for inspiration'
    },
    {
      label: 'New Connections',
      value: '890+',
      description: 'Designers who followed after feature'
    }
  ],
  gallery: [
    {
      image: '/images/pimg1.jpg',
      caption: 'Featured shot showcasing modern UI design with bold typography'
    },
    {
      image: '/images/pimg2.jpg',
      caption: 'Detail view revealing thoughtful color palette and component design'
    },
    {
      image: '/images/pimg3.jpg',
      caption: 'Mobile adaptation demonstrating responsive design thinking'
    }
  ],
  testimonial: {
    quote: 'Beautiful execution with clear design thinking. The attention to detail and thoughtful composition make this a standout piece that inspires the entire community.',
    author: 'Dribbble Team',
    role: 'Community & Curation'
  },
  tags: ['Dribbble', 'UI Design', 'Community', 'Featured Shot', 'Visual Design']
};

export default function DribbbleAchievementPage() {
  return <AchievementStory data={dribbbleData} />;
}
