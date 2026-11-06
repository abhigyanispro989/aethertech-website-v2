import React, { useState } from 'react';
import { Layers, Server, Cpu, Sparkles, Palette, Smartphone, CheckCircle, TrendingUp, Edit3, ArrowRight } from 'lucide-react';
import { Founder } from '../types';

interface AboutSectionProps {
  founders: Founder[];
  onUpdateFounderName: (id: string, newName: string) => void;
  onOpenStoryModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  founders,
  onUpdateFounderName,
  onOpenStoryModal,
}) => {
  const [editingFounderId, setEditingFounderId] = useState<string | null>(null);
  const [tempName, setTempName] = useState('');

  // Icon mapping helper
  const getSkillIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers':
        return <Layers className="w-4 h-4" />;
      case 'Server':
        return <Server className="w-4 h-4" />;
      case 'Cpu':
        return <Cpu className="w-4 h-4" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4" />;
      case 'Palette':
        return <Palette className="w-4 h-4" />;
      case 'Smartphone':
        return <Smartphone className="w-4 h-4" />;
      case 'CheckCircle':
        return <CheckCircle className="w-4 h-4" />;
      case 'TrendingUp':
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  const handleStartEdit = (founder: Founder, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingFounderId(founder.id);
    setTempName(founder.name);
  };

  const handleSaveEdit = (id: string) => {
    if (tempName.trim()) {
      onUpdateFounderName(id, tempName.trim());
    }
    setEditingFounderId(null);
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#020510] border-t border-cyan-500/15">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-[600px] h-[300px] bg-cyan-600/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[300px] bg-purple-600/5 blur-[140px] pointer-events-none" />

      <div className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-14 items-center">
          
          {/* LEFT COLUMN: About Kicker, Who We Are?, Mission Statement & Our Story Button */}
          <div className="lg:col-span-5 flex flex-col items-start text-left scroll-reveal">
            <span className="text-xs font-mono tracking-widest text-cyan-400 font-semibold uppercase mb-3">
              ABOUT AETHERTECH
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Space_Grotesk'] mb-6">
              Who We Are?
            </h2>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-8">
              We are AetherTech — a team of four passionate founders on a mission to build useful, accessible and innovative technology for everyone.
            </p>

            <button
              onClick={onOpenStoryModal}
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-[#071738] border border-cyan-400/60 hover:border-cyan-300 shadow-[0_0_15px_rgba(0,195,255,0.3)] hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] transition-all"
            >
              <span>Our Story</span>
              <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>

          {/* RIGHT COLUMN: Exactly Four Founder Cards in One Horizontal Row */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
              {founders.map((founder, index) => {
                const delays = ['delay-100', 'delay-200', 'delay-300', 'delay-400'];
                return (
                  <div
                    key={founder.id}
                    className={`group relative flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#07132e]/90 to-[#040a1b]/95 border border-cyan-500/30 hover:border-cyan-300 shadow-[0_0_15px_rgba(0,195,255,0.12)] hover:shadow-[0_0_35px_rgba(0,240,255,0.45)] transition-all duration-300 hover:-translate-y-2.5 cursor-pointer scroll-reveal ${delays[index]}`}
                  >
                    {/* Background glow on card hover */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                    {/* Circular anime portrait with pulsing glow border and zoom effect */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 border-2 border-cyan-400/80 group-hover:border-cyan-300 group-hover:shadow-[0_0_25px_rgba(0,240,255,0.85)] group-hover:animate-pulse mb-4 bg-slate-950 overflow-hidden transition-all duration-300">
                      <img
                        src={founder.portrait}
                        alt={founder.name}
                        className="w-full h-full object-cover rounded-full group-hover:scale-115 transition-transform duration-500 ease-out"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Founder Name (Editable on click) */}
                    <div className="w-full mb-1 flex items-center justify-center gap-1.5 relative z-10">
                      {editingFounderId === founder.id ? (
                        <input
                          type="text"
                          value={tempName}
                          onChange={(e) => setTempName(e.target.value)}
                          onBlur={() => handleSaveEdit(founder.id)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveEdit(founder.id);
                            if (e.key === 'Escape') setEditingFounderId(null);
                          }}
                          autoFocus
                          className="w-full text-center text-sm font-bold bg-slate-900 border border-cyan-400 rounded px-1.5 py-0.5 text-white focus:outline-none"
                        />
                      ) : (
                        <div className="flex items-center justify-center gap-1.5 group/name">
                          <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors font-['Space_Grotesk'] truncate">
                            {founder.name}
                          </h3>
                          <button
                            onClick={(e) => handleStartEdit(founder, e)}
                            title="Click to edit founder name"
                            className="opacity-0 group-hover/name:opacity-100 hover:text-cyan-400 text-slate-400 transition-opacity p-0.5"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Role */}
                    <p className="text-xs text-slate-300 font-medium mb-3 min-h-[32px] flex items-center justify-center relative z-10">
                      {founder.role}
                    </p>

                    {/* Two skill icons: Illuminated on hover */}
                    <div className="flex items-center justify-center gap-2 mt-auto pt-3 border-t border-cyan-500/20 w-full relative z-10">
                      {founder.skills.map((skill, idx) => (
                        <div
                          key={idx}
                          title={skill.name}
                          className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:text-white group-hover:bg-cyan-500/30 group-hover:border-cyan-300 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.7)] transition-all duration-300 cursor-help"
                        >
                          {getSkillIcon(skill.icon)}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
