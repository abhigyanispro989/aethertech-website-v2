import React, { useState } from 'react';
import { Send, CheckCircle2, MessageSquare, Shield, Github, Sparkles } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    organization: '',
    category: 'General Technology',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [transmissionId, setTransmissionId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.message.trim()) return;

    // Generate clean transmission ID
    const randomHex = Math.random().toString(16).substring(2, 8).toUpperCase();
    setTransmissionId(`AETH-TRX-${randomHex}`);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormState({
      name: '',
      organization: '',
      category: 'General Technology',
      message: '',
    });
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#020510] border-t border-cyan-500/15">
      <div className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Direct Info & Communication Protocol */}
          <div className="lg:col-span-5 flex flex-col items-start text-left scroll-reveal">
            <span className="text-xs font-mono tracking-widest text-cyan-400 font-semibold uppercase mb-3 block">
              SECURE CHANNELS
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Space_Grotesk'] mb-6">
              Connect With AetherTech
            </h2>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-8">
              Whether you are an engineering partner, researcher, or organization exploring next-generation technology, our founding team reviews every inquiry directly.
            </p>

            {/* Official Repository Channel */}
            <div className="w-full space-y-4">
              <a
                href="https://github.com/abhigyanispro989/aethertech-main-website"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-[#06122c]/80 border border-cyan-500/30 hover:border-cyan-400 text-slate-200 hover:text-white transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-cyan-300">
                    Official GitHub Repository
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    abhigyanispro989/aethertech-main-website
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-[#040c20]/60 border border-slate-800 text-xs text-slate-400">
                <Shield className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>
                  All communications are encrypted and routed directly to the founding engineering leads.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Transmission Form */}
          <div className="lg:col-span-7 scroll-reveal delay-200">
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#061536]/90 via-[#071940]/80 to-[#040b20]/95 border border-cyan-500/30 shadow-[0_0_30px_rgba(0,195,255,0.15)]">
              
              {submitted ? (
                <div className="text-center py-8 animate-in fade-in zoom-in-95 duration-200">
                  <div className="w-14 h-14 rounded-full bg-cyan-950/80 border-2 border-cyan-400 flex items-center justify-center mx-auto mb-5 shadow-[0_0_20px_rgba(0,240,255,0.5)]">
                    <CheckCircle2 className="w-7 h-7 text-cyan-400" />
                  </div>

                  <h3 className="text-2xl font-bold text-white font-['Space_Grotesk'] mb-2">
                    Transmission Dispatched
                  </h3>

                  <p className="text-sm text-slate-300 max-w-md mx-auto mb-6">
                    Thank you, <span className="text-cyan-300 font-semibold">{formState.name}</span>. Your inquiry has been routed to the appropriate AetherTech team.
                  </p>

                  <div className="inline-block px-4 py-2 rounded-lg bg-slate-950 border border-cyan-500/30 font-mono text-xs text-cyan-400 mb-8">
                    TRANSMISSION REF: {transmissionId}
                  </div>

                  <div>
                    <button
                      onClick={handleReset}
                      className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-900 border border-cyan-500/40 hover:bg-slate-800 transition-colors"
                    >
                      Send Another Transmission
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Alex Mercer"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-cyan-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                        Organization / Role
                      </label>
                      <input
                        type="text"
                        value={formState.organization}
                        onChange={(e) => setFormState({ ...formState, organization: e.target.value })}
                        placeholder="e.g. Autonomous Robotics Lab"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-cyan-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                      Inquiry Category
                    </label>
                    <select
                      value={formState.category}
                      onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-cyan-500/30 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                    >
                      <option value="General Technology">General Technology Exploration</option>
                      <option value="AetherAI Partnership">AetherAI Research Collaboration</option>
                      <option value="AetherSoft Frameworks">AetherSoft Software Systems</option>
                      <option value="AetherLabs Robotics">AetherLabs Robotics & Hardware</option>
                      <option value="Learnova AI Early Access">Learnova AI Product Access</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Outline your inquiry, proposal, or technical requirements..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-cyan-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Transmit Message</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
