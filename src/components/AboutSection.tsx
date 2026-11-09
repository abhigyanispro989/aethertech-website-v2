import React from 'react';
import { ArrowRight, Orbit } from 'lucide-react';

interface AboutSectionProps {
  onOpenStoryModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenStoryModal }) => (
  <section id="about" className="about-section relative overflow-hidden border-t border-cyan-400/25">
    <div className="about-earth" aria-hidden="true" />
    <div className="about-grid" aria-hidden="true" />
    <div className="about-inner">
      <div className="about-copy scroll-reveal">
        <span className="eyebrow">A VISION WITHOUT LIMITS</span>
        <h2>About <span>AetherTech</span></h2>
        <p>We are a passionate team of dreamers, builders and innovators, working to create technology that empowers everyone. From AI and software to research and beyond — AetherTech is here to build a smarter, brighter future.</p>
        <button onClick={onOpenStoryModal} className="neon-outline">
          Our Vision <ArrowRight size={18} />
        </button>
      </div>
      <div className="about-manifesto scroll-reveal delay-200">
        <Orbit aria-hidden="true" />
        <p>Be a part<br />of something</p>
        <strong>Extraordinary...</strong>
      </div>
    </div>
  </section>
);
