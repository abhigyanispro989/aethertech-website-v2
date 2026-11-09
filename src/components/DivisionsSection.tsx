import React from 'react';
import { ArrowRight, BrainCircuit, Code2, FlaskConical } from 'lucide-react';
import { DIVISIONS } from '../data/content';

interface DivisionsSectionProps {
  onSelectDivision: (divisionId: string) => void;
}

const icons = [BrainCircuit, Code2, FlaskConical];

export const DivisionsSection: React.FC<DivisionsSectionProps> = ({ onSelectDivision }) => (
  <section id="divisions" className="divisions-section relative overflow-hidden">
    <div className="section-heading">
      <span className="eyebrow">OUR ECOSYSTEM</span>
      <h2>Three Divisions. <em>One Vision.</em></h2>
    </div>
    <div className="division-grid">
      {DIVISIONS.map((division, index) => {
        const Icon = icons[index];
        return (
          <button key={division.id} onClick={() => onSelectDivision(division.id)} className={`division-card division-card-${index + 1} scroll-reveal delay-${(index + 1) * 100}`}>
            <span className="division-icon"><Icon size={58} strokeWidth={1.65} /></span>
            <span className="division-content">
              <strong>{division.name}</strong>
              <small>{index === 0 ? 'Artificial Intelligence' : index === 1 ? 'Software & Technology' : 'Research & Innovation'}</small>
              <span className="division-description">{index === 0 ? 'Explore the power of AI to develop intelligent tools and smarter experiences.' : index === 1 ? 'Build innovative software and digital solutions for a smarter tomorrow.' : "Experiment with new ideas and push the boundaries of what’s possible."}</span>
              <span className="division-link">Explore {index === 0 ? 'AI' : index === 1 ? 'Software' : 'Labs'} <ArrowRight size={16} /></span>
            </span>
          </button>
        );
      })}
    </div>
  </section>
);
