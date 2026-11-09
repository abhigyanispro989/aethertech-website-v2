import React, { useState } from 'react';
import { ChevronDown, ArrowRight, Menu, X, Sparkles, Layers, Bot } from 'lucide-react';
import { DIVISIONS, PRODUCTS } from '../data/content';

interface HeaderProps {
  onSelectDivision: (id: string) => void;
  onSelectProduct: (id: string) => void;
  onOpenStoryModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSelectDivision, onSelectProduct }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [divisionsDropdown, setDivisionsDropdown] = useState(false);

  const navigate = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#020713]/75 backdrop-blur-md">
      <div className="max-w-[1536px] mx-auto px-5 sm:px-8 lg:px-12 h-[76px] flex items-center justify-between gap-6">
        <a href="#hero" className="flex items-center gap-3 group shrink-0 text-white no-underline">
          <svg viewBox="0 0 100 100" className="w-12 h-12 drop-shadow-[0_0_12px_rgba(0,240,255,.8)]" aria-hidden="true">
            <polygon points="50,8 91,84 10,84" fill="none" stroke="#00eaff" strokeWidth="7" strokeLinejoin="round"/>
            <ellipse cx="50" cy="52" rx="45" ry="12" fill="none" stroke="#087fff" strokeWidth="4" transform="rotate(-27 50 52)"/>
          </svg>
          <span className="text-xl sm:text-2xl font-extrabold italic tracking-tight">Aether<span className="text-cyan-300">Tech</span></span>
        </a>
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-100" aria-label="Main navigation">
          <a className="header-link active" href="#hero">Home</a>
          <div className="relative" onMouseEnter={() => setDivisionsDropdown(true)} onMouseLeave={() => setDivisionsDropdown(false)}>
            <button className="header-link inline-flex items-center gap-1.5" onClick={() => setDivisionsDropdown(!divisionsDropdown)} aria-expanded={divisionsDropdown}>Our Ecosystem <ChevronDown size={15}/></button>
            {divisionsDropdown && <div className="absolute top-full left-0 mt-3 w-64 rounded-xl border border-cyan-400/30 bg-[#050e24]/95 p-2 shadow-2xl backdrop-blur-xl">
              {DIVISIONS.map((item) => <button key={item.id} onClick={() => { onSelectDivision(item.id); navigate('divisions'); setDivisionsDropdown(false); }} className="w-full rounded-lg p-3 text-left text-sm text-white hover:bg-cyan-500/10">{item.name}<small className="block text-xs text-slate-400">{item.tagline}</small></button>)}
            </div>}
          </div>
          <a className="header-link" href="#about">About</a>
          <a className="header-link" href="#news">Updates</a>
          <a className="header-link" href="#contact">Contact</a>
        </nav>
        <div className="flex items-center gap-3">
          <a href="https://whatsapp.com/channel/0029VbE0t5FAO7R8DM6Bf52P" target="_blank" rel="noreferrer" className="channel-button"><span className="channel-symbol">◉</span><span>Join Our Channel</span><ArrowRight size={15}/></a>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 rounded-lg border border-cyan-500/30 text-cyan-300" aria-label="Toggle navigation menu" aria-expanded={mobileMenuOpen}>{mobileMenuOpen ? <X/> : <Menu/>}</button>
        </div>
      </div>
      {mobileMenuOpen && <nav className="lg:hidden border-t border-cyan-500/20 bg-[#030714]/98 px-6 py-5 backdrop-blur-xl flex flex-col gap-1" aria-label="Mobile navigation">
        <a onClick={() => navigate('hero')} href="#hero" className="mobile-link">Home</a>
        <button onClick={() => navigate('divisions')} className="mobile-link text-left">Our Ecosystem</button>
        {DIVISIONS.map((item,index) => {
          const Icon = [Sparkles, Layers, Bot][index];
          return <button key={item.id} onClick={() => { onSelectDivision(item.id); navigate('divisions'); }} className="mobile-link pl-6 text-left"><Icon size={16}/> {item.name}</button>;
        })}
        <a onClick={() => navigate('about')} href="#about" className="mobile-link">About</a>
        <a onClick={() => navigate('news')} href="#news" className="mobile-link">Updates</a>
        <a onClick={() => navigate('contact')} href="#contact" className="mobile-link">Contact</a>
        <a href="https://whatsapp.com/channel/0029VbE0t5FAO7R8DM6Bf52P" target="_blank" rel="noreferrer" className="mobile-link text-cyan-300">Join Our Channel <ArrowRight size={16}/></a>
      </nav>}
    </header>
  );
};
