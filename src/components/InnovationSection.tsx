import React, { useState } from 'react';
import { Sparkles, Layers, Bot, Radio, ArrowRight, Activity, ShieldCheck } from 'lucide-react';
import { INNOVATION_PILLARS } from '../data/content';

export const InnovationSection: React.FC = () => {
  const [activeDomain, setActiveDomain] = useState<'All' | 'AI' | 'Software' | 'Robotics' | 'IoT'>('All');

  const filteredPillars = activeDomain === 'All'
    ? INNOVATION_PILLARS
    : INNOVATION_PILLARS.filter((p) => p.domain === activeDomain);

  const getDomainIcon = (domain: string) => {
    switch (domain) {
      case 'AI':
        return <Sparkles className="w-4 h-4 text-cyan-400" />;
      case 'Software':
        return <Layers className="w-4 h-4 text-blue-400" />;
      case 'Robotics':
        return <Bot className="w-4 h-4 text-purple-400" />;
      case 'IoT':
        return <Radio className="w-4 h-4 text-emerald-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <section id="innovation" className="py-24 relative overflow-hidden bg-[#020510] border-t border-cyan-500/15">
      <div className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 scroll-reveal">
          <div>
            <span className="text-xs font-mono tracking-widest text-cyan-400 font-semibold uppercase mb-3 block">
              RESEARCH & VENTURES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
              Pioneering Initiatives
            </h2>
          </div>

          {/* Interactive Domain Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#061129] border border-cyan-500/20 rounded-xl">
            {(['All', 'AI', 'Software', 'Robotics', 'IoT'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveDomain(tab)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeDomain === tab
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                    : 'text-slate-400 hover:text-white border border-transparent'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Initiatives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPillars.map((item, idx) => {
            const delays = ['delay-100', 'delay-200', 'delay-300', 'delay-400'];
            return (
              <div
                key={item.id}
                className={`group p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#06122d]/80 via-[#07173b]/60 to-[#03091c]/80 border border-cyan-500/25 hover:border-cyan-400/70 shadow-[0_0_15px_rgba(0,195,255,0.12)] hover:shadow-[0_0_25px_rgba(0,240,255,0.25)] transition-all duration-300 flex flex-col justify-between scroll-reveal ${delays[idx % 4]}`}
              >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-500/30">
                      {getDomainIcon(item.domain)}
                    </div>
                    <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
                      {item.domain} RESEARCH
                    </span>
                  </div>

                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
                    {item.status}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors font-['Space_Grotesk'] mb-3">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {item.subtitle}
                </p>
              </div>

              {/* Technical Specifications */}
              <div className="pt-4 border-t border-cyan-500/15 flex flex-wrap gap-2">
                {item.specs.map((spec, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono px-2.5 py-1 rounded-md bg-[#040c21] border border-cyan-500/20 text-cyan-200"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
        </div>

      </div>
    </section>
  );
};
