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
import { DIVISIONS, INITIAL_FOUNDERS, PRODUCTS } from './data/content';
import { Division, Founder, Product } from './types';
import { useScrollReveal } from './hooks/useScrollReveal';

export default function App() {
  const [founders, setFounders] = useState<Founder[]>(INITIAL_FOUNDERS);
  const [selectedDivision, setSelectedDivision] = useState<Division | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | 'support' | null>(null);

  // Initialize scroll-triggered animations
  useScrollReveal();

  const handleUpdateFounderName = (id: string, newName: string) => {
    setFounders((prev) =>
      prev.map((f) => (f.id === id ? { ...f, name: newName } : f))
    );
  };

  const handleSelectDivisionById = (id: string) => {
    const div = DIVISIONS.find((d) => d.id === id);
    if (div) setSelectedDivision(div);
  };

  const handleSelectProductById = (id: string) => {
    const prod = PRODUCTS.find((p) => p.id === id);
    if (prod) setSelectedProduct(prod);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#030714] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 antialiased overflow-x-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Global Header */}
      <Header
        onSelectDivision={handleSelectDivisionById}
        onSelectProduct={handleSelectProductById}
        onOpenStoryModal={() => setIsStoryModalOpen(true)}
      />

      {/* Main Hero Section */}
      <HeroSection
        onExploreTechnology={() => scrollToSection('divisions')}
        onFilterCategory={(cat) => scrollToSection('innovation')}
      />

      {/* Technology Divisions Section */}
      <DivisionsSection
        onSelectDivision={(id) => handleSelectDivisionById(id)}
      />

      {/* About AetherTech & Founders Section */}
      <AboutSection
        founders={founders}
        onUpdateFounderName={handleUpdateFounderName}
        onOpenStoryModal={() => setIsStoryModalOpen(true)}
      />

      {/* Products Section (Learnova AI) */}
      <ProductsSection
        onOpenWaitlist={(prod) => setSelectedProduct(prod)}
      />

      {/* Innovation Section (AI, Software, Robotics, IoT) */}
      <InnovationSection />

      {/* News & Updates Section */}
      <NewsSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer
        onOpenPrivacyModal={() => setLegalModalType('privacy')}
        onOpenTermsModal={() => setLegalModalType('terms')}
        onOpenSupportModal={() => setLegalModalType('support')}
      />

      {/* Interactive Modals */}
      <DivisionModal
        division={selectedDivision}
        onClose={() => setSelectedDivision(null)}
      />

      <StoryModal
        isOpen={isStoryModalOpen}
        onClose={() => setIsStoryModalOpen(false)}
      />

      <WaitlistModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Legal & Support Modal */}
      {legalModalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-[#050f26] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-cyan-950/80">
            <button
              onClick={() => setLegalModalType(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold text-white font-['Space_Grotesk'] mb-3 capitalize">
              {legalModalType === 'privacy' ? 'Privacy Policy' : legalModalType === 'terms' ? 'Terms of Service' : 'Official Support Channel'}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {legalModalType === 'privacy' &&
                'AetherTech enforces an uncompromising privacy-first engineering standard. We do not engage in unauthorized third-party telemetry, behavioral profiling, or advertising trackers across any of our foundational software.'}
              {legalModalType === 'terms' &&
                'Use of AetherTech platforms, APIs, and frameworks is governed by our open technological stewardship charter. All intellectual properties and open-source contributions remain safeguarded under permissible ethical computing standards.'}
              {legalModalType === 'support' &&
                'Direct support inquiries are managed through our GitHub issues channel and contact transmission terminal. Priority enterprise SLA support is coordinated directly with founding architects.'}
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setLegalModalType(null)}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
