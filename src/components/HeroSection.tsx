import React from 'react';
import { ArrowRight, Sparkles, Layers, Bot } from 'lucide-react';
import { HeroArtwork3D } from './HeroArtwork3D';

interface HeroSectionProps {
  onExploreTechnology: () => void;
  onFilterCategory?: (category: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreTechnology,
  onFilterCategory,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-[960px] lg:min-h-[1024px] pt-28 pb-20 flex items-center overflow-hidden"
    >
      {/* Background Deep Space Cosmic Atmosphere seamlessly blended */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/src/assets/images/hero_space_nebula_1793976835270.jpg"
          alt="Space Nebula Field"
          className="w-full h-full object-cover opacity-25 filter brightness-85 contrast-125"
          referrerPolicy="no-referrer"
        />
        {/* Gradients blending with 3D Canvas */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030714] via-[#030714]/80 to-[#030714]" />
        <div className="absolute top-1/4 left-10 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[700px] h-[700px] bg-blue-600/15 rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[900px] h-[250px] bg-purple-700/10 rounded-full blur-[160px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          
          {/* LEFT SIDE: Heading, Supporting Text, 3 Pills & Outlined Glowing Button */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-start text-left">
            
            {/* Subtle Brand Kicker */}
            <div className="scroll-reveal delay-100 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-xs font-mono text-cyan-300 mb-6 backdrop-blur-md shadow-[0_0_12px_rgba(0,240,255,0.25)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>AETHERTECH // NEXT-GEN INTELLIGENCE</span>
            </div>

            {/* Main Heading */}
            <h1 className="scroll-reveal delay-200 text-5xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6 font-['Space_Grotesk']">
              <span>Innovation</span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,240,255,0.5)]">
                Beyond Limits.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="scroll-reveal delay-300 text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-xl mb-8">
              Building intelligent technology, powerful software and future-ready innovations for everyone.
            </p>

            {/* Three Compact Blue Pills: Artificial Intelligence, Software, Robotics */}
            <div className="scroll-reveal delay-400 flex flex-wrap items-center gap-3 mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#071738]/90 border border-cyan-500/40 text-xs sm:text-sm font-medium text-cyan-200 shadow-[0_0_15px_rgba(0,195,255,0.2)] hover:border-cyan-400 hover:bg-[#09204e] hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Artificial Intelligence</span>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#071738]/90 border border-cyan-500/40 text-xs sm:text-sm font-medium text-cyan-200 shadow-[0_0_15px_rgba(0,195,255,0.2)] hover:border-cyan-400 hover:bg-[#09204e] hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>Software</span>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#071738]/90 border border-cyan-500/40 text-xs sm:text-sm font-medium text-cyan-200 shadow-[0_0_15px_rgba(0,195,255,0.2)] hover:border-cyan-400 hover:bg-[#09204e] hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all">
                <Bot className="w-3.5 h-3.5 text-cyan-400" />
                <span>Robotics</span>
              </div>
            </div>

            {/* Glowing Outlined Button: Explore Our Technology → */}
            <div className="scroll-reveal delay-500">
              <button
                onClick={onExploreTechnology}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl text-base font-bold text-white bg-[#061433]/90 border-2 border-cyan-400 hover:border-cyan-300 shadow-[0_0_25px_rgba(0,240,255,0.5)] hover:shadow-[0_0_40px_rgba(0,240,255,0.8)] transition-all duration-300 active:scale-95 cursor-pointer"
              >
                <span className="tracking-wide">Explore Our Technology</span>
                <ArrowRight className="w-5 h-5 text-cyan-300 group-hover:translate-x-1.5 transition-transform" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/25 via-blue-500/25 to-purple-500/25 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>

          {/* RIGHT SIDE: LIVE THREE.JS 3D SCENE BLENDED WITH HERO */}
          <div className="lg:col-span-6 xl:col-span-7 relative flex items-center justify-center">
            <HeroArtwork3D />
          </div>

        </div>
      </div>
    </section>
  );
};
