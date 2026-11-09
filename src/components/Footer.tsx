import React from 'react';
import { ArrowUp, Shield, FileText, LifeBuoy } from 'lucide-react';

interface FooterProps {
  onOpenPrivacyModal?: () => void;
  onOpenTermsModal?: () => void;
  onOpenSupportModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacyModal, onOpenTermsModal, onOpenSupportModal }) => (
  <footer className="relative bg-[#020510] text-slate-300 pt-8 pb-5 overflow-hidden border-t border-cyan-500/30">
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_rgba(0,240,255,.8)]" />
    <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-7 pb-6">
        <a href="#hero" className="flex items-center gap-3 text-white no-underline">
          <svg viewBox="0 0 100 100" className="w-12 h-12 drop-shadow-[0_0_10px_rgba(0,240,255,.7)]" aria-hidden="true">
            <polygon points="50,10 90,85 10,85" fill="none" stroke="#00f0ff" strokeWidth="7" />
            <ellipse cx="50" cy="53" rx="43" ry="13" fill="none" stroke="#00cfff" strokeWidth="4" transform="rotate(-24 50 53)" />
          </svg>
          <span><b className="block text-xl italic">AetherTech</b><small className="text-xs text-slate-300">Dream Bigger. Build Smarter. Innovate Beyond Limits.</small></span>
        </a>
        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm" aria-label="Footer navigation">
          <a className="hover:text-cyan-300" href="#hero">Home</a><span className="text-cyan-700">|</span>
          <a className="hover:text-cyan-300" href="#divisions">Our Ecosystem</a><span className="text-cyan-700">|</span>
          <a className="hover:text-cyan-300" href="#about">About</a><span className="text-cyan-700">|</span>
          <a className="hover:text-cyan-300" href="#news">Updates</a><span className="text-cyan-700">|</span>
          <a className="hover:text-cyan-300" href="#contact">Contact</a>
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={onOpenPrivacyModal} aria-label="Privacy Policy" title="Privacy Policy" className="footer-icon"><Shield size={17} /></button>
          <button onClick={onOpenTermsModal} aria-label="Terms of Service" title="Terms of Service" className="footer-icon"><FileText size={17} /></button>
          <button onClick={onOpenSupportModal} aria-label="Support" title="Support" className="footer-icon"><LifeBuoy size={17} /></button>
          <button onClick={() => window.scrollTo({top:0,behavior:'smooth'})} aria-label="Back to top" title="Back to top" className="footer-icon"><ArrowUp size={17} /></button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-cyan-500/20 pt-4 text-xs text-slate-400">
        <p>© 2026 AetherTech. All rights reserved.</p>
        <p className="text-cyan-300 italic">Dream Bigger. Build Smarter. Innovate Beyond Limits.</p>
      </div>
    </div>
  </footer>
);
