import React from 'react';
import { ArrowRight, Sparkles, Terminal, Cpu } from 'lucide-react';
import { DIVISIONS } from '../data/content';
import { Division } from '../types';

interface DivisionsSectionProps {
  onSelectDivision: (divisionId: string) => void;
}

export const DivisionsSection: React.FC<DivisionsSectionProps> = ({ onSelectDivision }) => {
  return (
    <section id="divisions" className="py-24 relative overflow-hidden bg-[#030714]">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[350px] bg-blue-600/5 blur-[160px] pointer-events-none" />

      <div className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Space_Grotesk'] mb-4">
            Our Technology Divisions
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            Architecting the fundamental infrastructure of intelligence, software and autonomous machines.
          </p>
        </div>

        {/* Exactly Three Horizontal Cards in One Row (stacked on small screens) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {DIVISIONS.map((division, idx) => {
            const delays = ['delay-100', 'delay-200', 'delay-300'];
            return (
              <div
                key={division.id}
                onClick={() => onSelectDivision(division.id)}
                className={`group relative cursor-pointer rounded-2xl p-6 sm:p-7 flex flex-row items-center gap-6 bg-gradient-to-br from-[#07132e]/95 via-[#091b3f]/85 to-[#040b1f]/95 border border-cyan-500/35 hover:border-cyan-400 shadow-[0_0_20px_rgba(0,195,255,0.18)] hover:shadow-[0_0_35px_rgba(0,240,255,0.38)] transition-all duration-300 hover:-translate-y-2 scroll-reveal ${delays[idx]}`}
              >
              {/* Card Ambient Glow on Hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/5 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              {/* Large Illustration on the Left */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden shrink-0 border border-cyan-500/30 group-hover:border-cyan-400/80 shadow-[0_0_15px_rgba(0,195,255,0.25)] bg-[#03081a] flex items-center justify-center">
                <img
                  src={division.illustration}
                  alt={division.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050f26]/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Text on the Right */}
              <div className="flex flex-col justify-center text-left flex-1 min-w-0">
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors font-['Space_Grotesk'] mb-2">
                  {division.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3 mb-4">
                  {division.tagline}
                </p>

                {/* Cyan Learn More Link */}
                <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </section>
  );
};
