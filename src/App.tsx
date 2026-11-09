/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { DivisionsSection } from './components/DivisionsSection';
import { AboutSection } from './components/AboutSection';
import { ProductsSection } from './components/ProductsSection';
import { InnovationSection } from './components/InnovationSection';
import { NewsSection } from './components/NewsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { DivisionModal, StoryModal, WaitlistModal } from './components/Modals';
import { DIVISIONS, PRODUCTS } from './data/content';
import { Division, Product } from './types';
import { useScrollReveal } from './hooks/useScrollReveal';

export default function App() {
  const [selectedDivision, setSelectedDivision] = useState<Division | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | 'support' | null>(null);

  useScrollReveal();

  const handleSelectDivisionById = (id: string) => {
    const division = DIVISIONS.find((item) => item.id === id);
    if (division) setSelectedDivision(division);
  };

  const handleSelectProductById = (id: string) => {
    const product = PRODUCTS.find((item) => item.id === id);
    if (product) setSelectedProduct(product);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#030714] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 antialiased overflow-x-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      <Header
        onSelectDivision={handleSelectDivisionById}
        onSelectProduct={handleSelectProductById}
        onOpenStoryModal={() => setIsStoryModalOpen(true)}
      />
      <main>
        <HeroSection onExploreTechnology={() => scrollToSection('divisions')} />
        <DivisionsSection onSelectDivision={handleSelectDivisionById} />
        <div className="brand-highlights" aria-label="AetherTech values">
          <div><span className="highlight-icon">✦</span><b>Infinite<br />Possibilities</b></div>
          <div><span className="highlight-icon">◉</span><b>Growing<br />Community</b></div>
          <div><span className="highlight-icon">♧</span><b>Ideas to<br />Impact</b></div>
          <div><span className="highlight-icon">◎</span><b>A Smarter<br />Tomorrow</b></div>
        </div>
        <AboutSection onOpenStoryModal={() => setIsStoryModalOpen(true)} />
        <ProductsSection onOpenWaitlist={(product) => setSelectedProduct(product)} />
        <InnovationSection />
        <NewsSection />
        <ContactSection />
      </main>
      <Footer
        onOpenPrivacyModal={() => setLegalModalType('privacy')}
        onOpenTermsModal={() => setLegalModalType('terms')}
        onOpenSupportModal={() => setLegalModalType('support')}
      />
      <DivisionModal division={selectedDivision} onClose={() => setSelectedDivision(null)} />
      <StoryModal isOpen={isStoryModalOpen} onClose={() => setIsStoryModalOpen(false)} />
      <WaitlistModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      {legalModalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-[#050f26] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-cyan-950/80">
            <button onClick={() => setLegalModalType(null)} className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors" aria-label="Close">✕</button>
            <h3 className="text-2xl font-bold text-white font-['Space_Grotesk'] mb-3 capitalize">
              {legalModalType === 'privacy' ? 'Privacy Policy' : legalModalType === 'terms' ? 'Terms of Service' : 'Official Support Channel'}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {legalModalType === 'privacy' && 'AetherTech enforces a privacy-first engineering standard across its platforms.'}
              {legalModalType === 'terms' && 'Use of AetherTech platforms is governed by the applicable product terms.'}
              {legalModalType === 'support' && 'For support, use the Contact section to reach the AetherTech team.'}
            </p>
            <div className="flex justify-end"><button onClick={() => setLegalModalType(null)} className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 transition-colors">Close</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
