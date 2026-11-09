import React from 'react';
import { ArrowRight, CirclePlay } from 'lucide-react';
import { HeroArtwork3D } from './HeroArtwork3D';

interface HeroSectionProps {
  onExploreTechnology: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreTechnology }) => (
  <section id="hero" className="hero-section relative flex items-center overflow-hidden">
    <div className="hero-stars" aria-hidden="true" />
    <div className="hero-glow hero-glow-one" aria-hidden="true" />
    <div className="hero-glow hero-glow-two" aria-hidden="true" />
    <div className="hero-inner relative z-10 mx-auto w-full">
      <div className="hero-copy">
        <p className="hero-kicker">Dream Bigger. Build Smarter. Innovate Beyond Limits.</p>
        <h1><span>Aether</span><em>Tech</em><small>The Future, <i>Together.</i></small></h1>
        <p className="hero-description">A next-gen technology ecosystem for everyone —<br className="desktop-break" /> where <strong>innovation</strong> meets <strong>imagination.</strong></p>
        <div className="hero-actions">
          <button onClick={onExploreTechnology} className="neon-button">Explore Our Ecosystem <ArrowRight size={18} /></button>
          <a href="#about" className="neon-outline">Learn More <CirclePlay size={21} /></a>
        </div>
      </div>
      <div className="hero-artwork"><HeroArtwork3D /></div>
    </div>
    <a className="scroll-cue" href="#divisions" aria-label="Scroll to Our Ecosystem"><span /><ArrowRight size={17} /></a>
  </section>
);
