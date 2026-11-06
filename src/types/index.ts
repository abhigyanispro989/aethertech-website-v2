export interface Division {
  id: string;
  name: string;
  tagline: string;
  illustration: string;
  badge: string;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
}

export interface Founder {
  id: string;
  name: string;
  role: string;
  skills: { name: string; icon: string }[];
  portrait: string;
  bio: string;
  socials?: { github?: string; linkedin?: string; twitter?: string };
}

export interface Product {
  id: string;
  name: string;
  status: 'IN DEVELOPMENT' | 'ALPHA' | 'PLANNED';
  tagline: string;
  description: string;
  pillars: string[];
  metrics: { label: string; value: string }[];
}

export interface NewsItem {
  id: string;
  title: string;
  category: 'ANNOUNCEMENT' | 'ENGINEERING' | 'DISPATCH';
  date: string;
  readTime: string;
  summary: string;
  content: string;
}

export interface InnovationPillar {
  id: string;
  domain: 'AI' | 'Software' | 'Robotics' | 'IoT';
  title: string;
  subtitle: string;
  specs: string[];
  status: string;
}
