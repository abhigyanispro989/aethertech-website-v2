import React from 'react';
import { Github, Twitter, Linkedin, MessageSquare, ArrowUp, Shield, FileText, LifeBuoy } from 'lucide-react';

interface FooterProps {
  onOpenPrivacyModal?: () => void;
  onOpenTermsModal?: () => void;
  onOpenSupportModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacyModal,
  onOpenTermsModal,
  onOpenSupportModal,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#020510] text-slate-400 pt-16 pb-12 overflow-hidden border-t border-cyan-500/20">
      {/* Thin glowing blue separator line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_rgba(0,240,255,0.8)]" />

      {/* Subtle bottom ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[150px] bg-blue-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 pb-12">
          
          {/* Left: AetherTech Logo, Wordmark & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 relative">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_10px_rgba(0,240,255,0.7)]">
                  <polygon
                    points="50,10 90,85 10,85"
                    fill="none"
                    stroke="#00f0ff"
                    strokeWidth="8"
                    strokeLinejoin="round"
                  />
                  <polygon
                    points="50,38 72,76 28,76"
                    fill="none"
                    stroke="#0070f3"
                    strokeWidth="5"
                    strokeLinejoin="round"
                  />
                  <line x1="34" y1="62" x2="66" y2="62" stroke="#ffffff" strokeWidth="4" />
                </svg>
              </div>

              <span className="text-xl font-extrabold tracking-wider text-white font-['Space_Grotesk']">
                AETHERTECH
              </span>
            </div>

            <p className="text-sm text-cyan-300 font-medium">
              Innovation Beyond Limits.
            </p>
          </div>

          {/* Centre: Privacy Policy, Terms of Service, Support */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
            <button
              onClick={onOpenPrivacyModal}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-slate-700">·</span>
            <button
              onClick={onOpenTermsModal}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span className="text-slate-700">·</span>
            <button
              onClick={onOpenSupportModal}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Support
            </button>
          </div>

          {/* Right: Social Media Icon Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/abhigyanispro989/aethertech-main-website"
              target="_blank"
              rel="noreferrer"
              title="GitHub"
              className="w-10 h-10 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-300 hover:border-cyan-400/60 hover:shadow-[0_0_12px_rgba(0,240,255,0.3)] transition-all"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              title="Twitter / X"
              className="w-10 h-10 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-300 hover:border-cyan-400/60 hover:shadow-[0_0_12px_rgba(0,240,255,0.3)] transition-all"
            >
              <Twitter className="w-4 h-4" />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              title="LinkedIn"
              className="w-10 h-10 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-300 hover:border-cyan-400/60 hover:shadow-[0_0_12px_rgba(0,240,255,0.3)] transition-all"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              title="Return to Top"
              className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 hover:text-white hover:border-cyan-400 transition-all ml-2"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Thin Divider Line */}
        <div className="h-[1px] w-full bg-cyan-500/10 mb-8" />

        {/* Bottom: Copyright & Legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 text-center sm:text-left">
          <p>© 2026 AetherTech Inc. All rights reserved. Innovation Beyond Limits.</p>
          <p className="font-mono text-[11px] text-slate-600">
            PLATFORM ARCHITECTURE // ULTRA-FUTURISTIC WEB ENGINE
          </p>
        </div>

      </div>
    </footer>
  );
};
