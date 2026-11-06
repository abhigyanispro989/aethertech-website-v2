import React, { useState } from 'react';
import { Sparkles, ArrowRight, BookOpen, Cpu, Zap, CheckCircle2, Lock } from 'lucide-react';
import { PRODUCTS } from '../data/content';
import { Product } from '../types';

interface ProductsSectionProps {
  onOpenWaitlist: (product: Product) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({ onOpenWaitlist }) => {
  const product = PRODUCTS[0]; // Learnova AI

  return (
    <section id="products" className="py-24 relative overflow-hidden bg-[#030714] border-t border-cyan-500/15">
      {/* Background glow accent */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-600/5 blur-[160px] pointer-events-none" />

      <div className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 scroll-reveal">
          <span className="text-xs font-mono tracking-widest text-cyan-400 font-semibold uppercase mb-3 block">
            FLAGSHIP PRODUCT ECOSYSTEM
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Space_Grotesk'] mb-4">
            Next-Generation Products
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Engineering tools designed to unlock exponential human leverage and intellectual mastery.
          </p>
        </div>

        {/* Featured Card for Learnova AI */}
        <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#061435] via-[#081b45] to-[#040c24] border border-cyan-400/40 shadow-[0_0_35px_rgba(0,195,255,0.2)] scroll-reveal delay-200">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-cyan-500/20 border border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.4)]">
                  {product.status}
                </span>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-xs text-slate-400">First Planned Commercial Release</span>
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-['Space_Grotesk'] mb-3">
                {product.name}
              </h3>

              <p className="text-base sm:text-lg text-cyan-300 font-medium mb-4">
                {product.tagline}
              </p>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Four Architectural Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mb-8">
                {product.pillars.map((pillar, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-cyan-500/20 text-xs sm:text-sm text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{pillar}</span>
                  </div>
                ))}
              </div>

              {/* Metrics & Waitlist CTA */}
              <div className="flex flex-wrap items-center gap-6 w-full pt-4 border-t border-cyan-500/20">
                <button
                  onClick={() => onOpenWaitlist(product)}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Request Early Access & Specs</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-6">
                  {product.metrics.map((metric, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-xs text-slate-400 font-mono">{metric.label}</span>
                      <span className="text-sm font-bold text-cyan-300">{metric.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Visual: Holographic UI Simulator */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl p-6 bg-[#040d21] border border-cyan-500/30 shadow-2xl shadow-cyan-950/50">
                <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                    <span className="text-xs font-mono font-semibold text-slate-300">
                      LEARNOVA // SYNAPSE ENGINE
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                    STAGE: ALPHA v0.8
                  </span>
                </div>

                {/* Simulated Knowledge Node Graph */}
                <div className="space-y-3 font-mono text-xs text-slate-300">
                  <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/20 flex items-center justify-between">
                    <span className="text-cyan-300">Adaptive Context Vector</span>
                    <span className="text-emerald-400 font-bold">Synchronized</span>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                    <span>Cognitive Friction Reduction</span>
                    <span className="text-cyan-400">94.2%</span>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                    <span>Real-Time Code Synthesizer</span>
                    <span className="text-cyan-400">Ready</span>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                    <span>Multimodal Dialogue Mesh</span>
                    <span className="text-purple-400 font-bold">Active</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-cyan-500/20 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Target Release: Q3 2026</span>
                  <span className="text-cyan-400 font-mono">CONFIDENTIAL // AETHERTECH</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
