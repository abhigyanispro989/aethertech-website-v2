import React, { useState } from 'react';
import { X, CheckCircle2, Sparkles, Layers, Bot, ArrowRight, Shield, Terminal, Check, Loader2, AlertTriangle } from 'lucide-react';
import { Division, Product } from '../types';
import { api, isValidEmail } from '../lib/api';

interface DivisionModalProps {
  division: Division | null;
  onClose: () => void;
}

export const DivisionModal: React.FC<DivisionModalProps> = ({ division, onClose }) => {
  if (!division) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#050f26] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-cyan-950/80 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border border-cyan-400/50 p-1 bg-slate-950 shrink-0">
            <img
              src={division.illustration}
              alt={division.name}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              {division.badge}
            </span>
            <h3 className="text-3xl font-extrabold text-white font-['Space_Grotesk']">
              {division.name}
            </h3>
            <p className="text-sm text-cyan-300">{division.tagline}</p>
          </div>
        </div>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
          {division.description}
        </p>

        {/* Technical Architecture Features */}
        <div className="mb-6">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
            Core Technical Capabilities
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {division.features.map((feat, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950/70 border border-cyan-500/20 text-xs sm:text-sm text-slate-200"
              >
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Specifications Matrix */}
        <div className="mb-8">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
            Performance Benchmarks
          </h4>
          <div className="grid grid-cols-3 gap-3">
            {division.specs.map((spec, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#030919] border border-cyan-500/30 text-center"
              >
                <div className="text-xs text-slate-400 mb-1">{spec.label}</div>
                <div className="text-sm sm:text-base font-bold text-cyan-300 font-mono">
                  {spec.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-cyan-500/20">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-slate-900 border border-slate-700 hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#050f26] border border-cyan-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-cyan-950/80 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <span className="text-xs font-mono tracking-widest text-cyan-400 font-semibold uppercase mb-2 block">
          FOUNDING CHRONICLE
        </span>
        <h3 className="text-3xl sm:text-4xl font-extrabold text-white font-['Space_Grotesk'] mb-6">
          The Story of AetherTech
        </h3>

        <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
          <p>
            AetherTech was founded by a team of four passionate technologists driven by a shared conviction: that true technological progress is measured by its accessibility, elegance, and ability to elevate human potential.
          </p>
          <p>
            Rather than treating Artificial Intelligence, Software Engineering, and Physical Robotics as isolated disciplines, our founding team united these three pillars under a single cohesive architecture.
          </p>
          <p>
            From our core neural research at <strong className="text-cyan-300 font-semibold">AetherAI</strong>, to our universal developer systems at <strong className="text-cyan-300 font-semibold">AetherSoft</strong>, and kinetic hardware at <strong className="text-cyan-300 font-semibold">AetherLabs</strong>, we build technologies engineered to endure.
          </p>
        </div>

        {/* Milestone Timeline */}
        <div className="my-8 pt-6 border-t border-cyan-500/20">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4">
            Roadmap & Milestones
          </h4>
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <span className="font-mono text-xs text-cyan-400 bg-cyan-950 px-2 py-1 rounded border border-cyan-500/30">
                2025 Q4
              </span>
              <div>
                <div className="text-sm font-bold text-white">Founding Cohort Assembly</div>
                <div className="text-xs text-slate-400">Core architecture unified across AI, Software, and Robotics.</div>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <span className="font-mono text-xs text-cyan-400 bg-cyan-950 px-2 py-1 rounded border border-cyan-500/30">
                2026 Q1
              </span>
              <div>
                <div className="text-sm font-bold text-white">Learnova AI Prototype Development</div>
                <div className="text-xs text-slate-400">Initiation of adaptive cognitive learning systems.</div>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <span className="font-mono text-xs text-cyan-400 bg-cyan-950 px-2 py-1 rounded border border-cyan-500/30">
                2026 Q3
              </span>
              <div>
                <div className="text-sm font-bold text-white">Global Ecosystem Expansion</div>
                <div className="text-xs text-slate-400">Public commercial rollout of Learnova AI and AetherCore framework.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-cyan-500/20">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-cyan-600 hover:bg-cyan-500 transition-colors"
          >
            Close Story
          </button>
        </div>
      </div>
    </div>
  );
};

interface WaitlistModalProps {
  product: Product | null;
  onClose: () => void;
}

export const WaitlistModal: React.FC<WaitlistModalProps> = ({ product, onClose }) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Engineer / Developer');
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [ticket, setTicket] = useState('');
  const [already, setAlready] = useState(false);

  if (!product) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setError('');
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setSending(true);
    const res = await api.waitlist({ email, product: product.name, source: `${role}` });
    setSending(false);

    if (!res.ok || !res.data) {
      setError(res.error || 'Could not join the waitlist. Please retry.');
      return;
    }
    setTicket(res.data.id);
    setAlready(res.data.alreadyRegistered);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#050f26] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-cyan-950/80">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 rounded-full bg-cyan-950 border border-cyan-400 flex items-center justify-center mx-auto mb-4 text-cyan-400">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white font-['Space_Grotesk'] mb-2">
              Access Granted to Waitlist
            </h3>
            <p className="text-sm text-slate-300 mb-6">
              {already ? (
                <>You are already on the priority list for <span className="text-cyan-300 font-semibold">{product.name}</span> — nothing else to do.</>
              ) : (
                <>You are queued for the upcoming <span className="text-cyan-300 font-semibold">{product.name}</span> private alpha cohort.</>
              )}
            </p>
            {ticket && (
              <div className="inline-block px-3 py-1.5 rounded-lg bg-slate-950 border border-cyan-500/30 font-mono text-[11px] text-cyan-400 mb-5">
                TICKET: {ticket}
              </div>
            )}
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="text-left">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-1">
              EXCLUSIVE EARLY ACCESS
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Space_Grotesk'] mb-3">
              {product.name} Waitlist
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mb-6">
              Join the priority release cohort for AetherTech's adaptive learning intelligence platform.
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                  Work / Personal Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-cyan-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                  Primary Domain
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-cyan-500/30 text-white text-sm focus:outline-none focus:border-cyan-400"
                >
                  <option value="Engineer / Developer">Software Engineer / Architect</option>
                  <option value="AI Researcher">AI / ML Researcher</option>
                  <option value="Hardware / Robotics">Hardware / Robotics Engineer</option>
                  <option value="Educator / Academic">Educator / Academic Institution</option>
                  <option value="Founder / Enterprise">Founder / Enterprise Leader</option>
                </select>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 p-3 mb-4 rounded-xl bg-red-950/40 border border-red-500/40 text-xs text-red-200">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={sending}
              className="w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-wait inline-flex items-center justify-center gap-2"
            >
              {sending && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>{sending ? 'Submitting…' : 'Submit Application'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
