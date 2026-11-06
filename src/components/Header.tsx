import React, { useState, useEffect } from 'react';
import { ChevronDown, ArrowRight, Menu, X, Sparkles, Cpu, Layers, Bot } from 'lucide-react';
import { DIVISIONS, PRODUCTS } from '../data/content';

interface HeaderProps {
  onSelectDivision: (id: string) => void;
  onSelectProduct: (id: string) => void;
  onOpenStoryModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSelectDivision,
  onSelectProduct,
  onOpenStoryModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [divisionsDropdown, setDivisionsDropdown] = useState(false);
  const [productsDropdown, setProductsDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#030714]/90 backdrop-blur-md border-b border-cyan-500/20 py-3 shadow-lg shadow-[#020510]/80'
          : 'bg-transparent py-5 border-b border-white/5'
      }`}
    >
      <div className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between gap-6">
        {/* Left: Brand Logo & Wordmark */}
        <a href="#hero" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-9 h-9 flex items-center justify-center">
            {/* Glowing triangular A logo */}
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full drop-shadow-[0_0_12px_rgba(0,240,255,0.7)] group-hover:scale-105 transition-transform duration-300"
            >
              <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f0ff" />
                  <stop offset="50%" stopColor="#0070f3" />
                  <stop offset="100%" stopColor="#7928ca" />
                </linearGradient>
                <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              {/* Outer triangle frame */}
              <polygon
                points="50,10 90,85 10,85"
                fill="none"
                stroke="url(#logoGrad)"
                strokeWidth="7"
                strokeLinejoin="round"
              />
              {/* Inner triangle cutout */}
              <polygon
                points="50,38 72,76 28,76"
                fill="none"
                stroke="#00f0ff"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              {/* Center crossbar */}
              <line x1="34" y1="62" x2="66" y2="62" stroke="#ffffff" strokeWidth="3" />
            </svg>
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-wider text-white font-['Space_Grotesk'] group-hover:text-cyan-300 transition-colors">
              AETHERTECH
            </span>
          </div>
        </a>

        {/* Centre: Main Navigation Links */}
        <nav className="hidden xl:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a
            href="#hero"
            className="hover:text-cyan-400 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-cyan-400 after:transition-all"
          >
            Home
          </a>

          <a
            href="#about"
            className="hover:text-cyan-400 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-cyan-400 after:transition-all"
          >
            About Us
          </a>

          {/* Divisions Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDivisionsDropdown(true)}
            onMouseLeave={() => setDivisionsDropdown(false)}
          >
            <a
              href="#divisions"
              className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors py-1"
            >
              <span>Divisions</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  divisionsDropdown ? 'rotate-180 text-cyan-400' : 'text-slate-400'
                }`}
              />
            </a>

            {divisionsDropdown && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-[#050e24]/95 border border-cyan-500/30 rounded-xl p-2 shadow-2xl shadow-cyan-950/60 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
                {DIVISIONS.map((div) => (
                  <button
                    key={div.id}
                    onClick={() => {
                      onSelectDivision(div.id);
                      setDivisionsDropdown(false);
                      const el = document.getElementById('divisions');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-cyan-500/10 hover:border-cyan-500/20 border border-transparent transition-all flex items-start gap-3 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400 group-hover:scale-105 transition-transform">
                      {div.id === 'aether-ai' ? <Sparkles className="w-4 h-4" /> : div.id === 'aether-soft' ? <Layers className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-cyan-300">
                        {div.name}
                      </div>
                      <div className="text-xs text-slate-400 line-clamp-1">{div.tagline}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Products Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setProductsDropdown(true)}
            onMouseLeave={() => setProductsDropdown(false)}
          >
            <a
              href="#products"
              className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors py-1"
            >
              <span>Products</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  productsDropdown ? 'rotate-180 text-cyan-400' : 'text-slate-400'
                }`}
              />
            </a>

            {productsDropdown && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-[#050e24]/95 border border-cyan-500/30 rounded-xl p-2 shadow-2xl shadow-cyan-950/60 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
                {PRODUCTS.map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => {
                      onSelectProduct(prod.id);
                      setProductsDropdown(false);
                      const el = document.getElementById('products');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full text-left p-3 rounded-lg hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/20 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white group-hover:text-cyan-300">
                        {prod.name}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300">
                        {prod.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-1">{prod.tagline}</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href="#innovation"
            className="hover:text-cyan-400 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-cyan-400 after:transition-all"
          >
            Innovation
          </a>

          <a
            href="#news"
            className="hover:text-cyan-400 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-cyan-400 after:transition-all"
          >
            News & Updates
          </a>

          <a
            href="#contact"
            className="hover:text-cyan-400 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-cyan-400 after:transition-all"
          >
            Contact
          </a>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Explore Products Button with Glowing Blue Outline & Arrow */}
          <a
            href="#products"
            className="relative group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#061433]/70 border border-cyan-400/60 hover:border-cyan-300 shadow-[0_0_15px_rgba(0,195,255,0.3)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] transition-all duration-300"
          >
            <span className="relative z-10 group-hover:text-cyan-200 transition-colors">
              Explore Products
            </span>
            <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform relative z-10" />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-slate-400 hover:text-white rounded-lg border border-slate-800 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#030714]/98 border-b border-cyan-500/20 px-6 py-6 backdrop-blur-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-4 text-base font-medium">
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 hover:text-cyan-400 py-2 border-b border-white/5"
            >
              Home
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 hover:text-cyan-400 py-2 border-b border-white/5"
            >
              About Us
            </a>
            <a
              href="#divisions"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 hover:text-cyan-400 py-2 border-b border-white/5"
            >
              Divisions
            </a>
            <a
              href="#products"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 hover:text-cyan-400 py-2 border-b border-white/5"
            >
              Products (Learnova AI)
            </a>
            <a
              href="#innovation"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 hover:text-cyan-400 py-2 border-b border-white/5"
            >
              Innovation
            </a>
            <a
              href="#news"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 hover:text-cyan-400 py-2 border-b border-white/5"
            >
              News & Updates
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 hover:text-cyan-400 py-2 border-b border-white/5"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
