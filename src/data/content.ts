import { Division, Founder, Product, NewsItem, InnovationPillar } from '../types';

export const DIVISIONS: Division[] = [
  {
    id: 'aether-ai',
    name: 'AetherAI',
    tagline: 'Smart AI solutions for a smarter tomorrow.',
    illustration: '/src/assets/images/division_aetherai_1793976852150.jpg',
    badge: 'Neural Intelligence',
    description: 'Pioneering multimodal neural architectures, autonomous synthetic reasoning agents, and next-generation cognitive models engineered for real-world complexity.',
    features: [
      'Self-Optimizing Neural Weights',
      'Real-Time Cognitive Context Engines',
      'Low-Latency Inference Protocols',
      'Privacy-First Decentralized Processing'
    ],
    specs: [
      { label: 'Latency Benchmark', value: '< 18ms' },
      { label: 'Context Window', value: '2.5M Tokens' },
      { label: 'Model Modalities', value: 'Audio, Vision, Code' }
    ]
  },
  {
    id: 'aether-soft',
    name: 'AetherSoft',
    tagline: 'Powerful software for everyone.',
    illustration: '/src/assets/images/division_aethersoft_1793976853892.jpg',
    badge: 'Core Architecture',
    description: 'High-performance cloud-native platforms, distributed developer frameworks, and ultra-resilient operating primitives engineered for seamless universal scale.',
    features: [
      'Zero-Overhead Micro-Runtimes',
      'Cross-Platform Adaptive UI Engine',
      'Quantum-Resilient Encryption Layer',
      'Fault-Tolerant Distributed Mesh'
    ],
    specs: [
      { label: 'Availability SLA', value: '99.999%' },
      { label: 'Binary Footprint', value: '< 4.2 MB' },
      { label: 'Ecosystem Support', value: 'Universal Web & OS' }
    ]
  },
  {
    id: 'aether-labs',
    name: 'AetherLabs',
    tagline: 'Robotics and IoT innovations for a better future.',
    illustration: '/src/assets/images/division_aetherlabs_1793976852760.jpg',
    badge: 'Robotics & Hardware',
    description: 'Next-generation cybernetic actuators, intelligent spatial perception arrays, and responsive robotic systems bridging physical kinetics with computational cognition.',
    features: [
      'Micro-Precision Hydraulic Actuators',
      'Sub-Millimeter Spatial Lidar Fusion',
      'Autonomous Swarm Kinematics',
      'Ultra-Low Power IoT Telemetry'
    ],
    specs: [
      { label: 'Actuator Precision', value: '±0.02 mm' },
      { label: 'Sensor Sampling', value: '2,400 Hz' },
      { label: 'Energy Efficiency', value: '3.8x Industry Baseline' }
    ]
  }
];

export const INITIAL_FOUNDERS: Founder[] = [
  {
    id: 'founder-1',
    name: 'Abhigyan Singh',
    role: 'Full-Stack Development',
    skills: [
      { name: 'Architecture', icon: 'Layers' },
      { name: 'Cloud Systems', icon: 'Server' }
    ],
    portrait: '/src/assets/images/founder_fullstack_1793976832932.jpg',
    bio: 'Leads full-stack architecture, distributed systems, and core platform scalability across the AetherTech ecosystem.',
    socials: { github: 'https://github.com/abhigyanispro989' }
  },
  {
    id: 'founder-2',
    name: 'Mayank Kumar Jaiswal',
    role: 'AI Research & Innovation',
    skills: [
      { name: 'Neural Models', icon: 'Cpu' },
      { name: 'Transformers', icon: 'Sparkles' }
    ],
    portrait: '/src/assets/images/founder_mayank_ai_1793978000016.jpg',
    bio: 'Spearheads multimodal intelligence, transformer pipelines, and self-adaptive deep learning breakthroughs.',
    socials: { twitter: 'https://twitter.com' }
  },
  {
    id: 'founder-3',
    name: 'Sankalp Kishor',
    role: 'UI/UX & Android',
    skills: [
      { name: 'Design Systems', icon: 'Palette' },
      { name: 'Mobile Engine', icon: 'Smartphone' }
    ],
    portrait: '/src/assets/images/founder_uiux_android_1793976833129.jpg',
    bio: 'Crafts ultra-futuristic ergonomic user experiences, responsive design foundations, and native Android performance.',
    socials: { linkedin: 'https://linkedin.com' }
  },
  {
    id: 'founder-4',
    name: 'Ansh Kumar',
    role: 'Testing & Product Growth',
    skills: [
      { name: 'QA Automation', icon: 'CheckCircle' },
      { name: 'Scale Analytics', icon: 'TrendingUp' }
    ],
    portrait: '/src/assets/images/founder_ansh_qa_1793977999411.jpg',
    bio: 'Drives rigorous zero-defect automated testing pipelines, product telemetry, and global user adoption.',
    socials: { github: 'https://github.com' }
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'learnova-ai',
    name: 'Learnova AI',
    status: 'IN DEVELOPMENT',
    tagline: 'Next-Generation Adaptive Intelligence for Accelerated Mastery',
    description: 'Learnova AI is AetherTech’s flagship educational intelligence product. Designed from first principles to dynamically personalize conceptual comprehension, code authoring, and complex systems learning in real-time.',
    pillars: [
      'Autonomous Socratic Dialogue Engine',
      'Dynamic Cross-Disciplinary Knowledge Mesh',
      'Real-Time Code Synthesizer & Visualizer',
      'Predictive Cognitive Friction Reduction'
    ],
    metrics: [
      { label: 'Target Launch', value: 'Q3 2026' },
      { label: 'Pilot Cohort', value: '4,500+ Engineers' },
      { label: 'Comprehension Boost', value: '3.4x Faster' }
    ]
  }
];

export const INNOVATION_PILLARS: InnovationPillar[] = [
  {
    id: 'inn-1',
    domain: 'AI',
    title: 'Autonomous Swarm Cognitive Mesh',
    subtitle: 'Decentralized neural nodes coordinating complex real-world workflows without central bottlenecks.',
    specs: ['Sub-10ms Mesh Consensus', 'Self-Healing Routing', 'Zero Central Vector Store'],
    status: 'Prototype Validated'
  },
  {
    id: 'inn-2',
    domain: 'Software',
    title: 'AetherCore Micro-Engine',
    subtitle: 'Ultra-lean compiled runtime providing native cross-platform execution with zero telemetry overhead.',
    specs: ['Sub-4MB Memory Footprint', 'Hardware Accelerated', 'WebAssembly & Native'],
    status: 'In Active Alpha'
  },
  {
    id: 'inn-3',
    domain: 'Robotics',
    title: 'Kinetic Micro-Actuator Arrays',
    subtitle: 'Harmonic robotic joints delivering sub-millimeter dexterity with bio-mimetic compliance.',
    specs: ['±0.02mm Spatial Tolerance', 'Dynamic Torque Sensing', 'Whisper-Quiet Operation'],
    status: 'Lab Testing'
  },
  {
    id: 'inn-4',
    domain: 'IoT',
    title: 'AetherLink Ambient Telemetry',
    subtitle: 'Self-powered wireless telemetry nodes communicating over energy-scavenged radio waves.',
    specs: ['Zero Battery Replacement', '100% Kinetic / Solar Energy', 'End-to-End Quantum Security'],
    status: 'Field Deployment'
  }
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'AetherTech Unveils Core Foundation & Global Product Roadmap',
    category: 'ANNOUNCEMENT',
    date: 'March 2026',
    readTime: '3 min read',
    summary: 'The four founding members announce the unified technological thesis uniting AetherAI, AetherSoft, and AetherLabs.',
    content: 'Today marks the official reveal of AetherTech — a mission-driven technology enterprise dedicated to building accessible, high-performance technology for humanity. Across AI, software, and robotics, our integrated ecosystem eliminates fragmentation.'
  },
  {
    id: 'news-2',
    title: 'Learnova AI: Entering Stage 1 Private Closed Testing',
    category: 'ENGINEERING',
    date: 'February 2026',
    readTime: '4 min read',
    summary: 'Preliminary evaluation logs indicate a 340% increase in conceptual retention across 1,200 initial test developers.',
    content: 'Learnova AI has surpassed its initial synthetic benchmark thresholds. Early private testing validates the real-time cognitive model which adjusts conceptual granularity dynamically as the learner navigates codebases.'
  },
  {
    id: 'news-3',
    title: 'AetherLabs Demonstrates Sub-Millimeter Actuator Precision',
    category: 'DISPATCH',
    date: 'January 2026',
    readTime: '5 min read',
    summary: 'Hardware engineers at AetherLabs achieve ±0.02mm spatial repeatability with newly designed carbon-alloy joints.',
    content: 'In our latest robotics testing cycle, the AetherLabs Mark-IV kinetic arm sustained 50,000 consecutive precision manipulation cycles with zero thermal drift, proving viable for delicate micro-assembly and assistive hardware.'
  }
];
