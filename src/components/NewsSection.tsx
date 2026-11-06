import React, { useState } from 'react';
import { ArrowRight, Calendar, Clock, Newspaper, X } from 'lucide-react';
import { NEWS_ITEMS } from '../data/content';
import { NewsItem } from '../types';

export const NewsSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);

  return (
    <section id="news" className="py-24 relative overflow-hidden bg-[#030714] border-t border-cyan-500/15">
      <div className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 scroll-reveal">
          <span className="text-xs font-mono tracking-widest text-cyan-400 font-semibold uppercase mb-3 block">
            DISPATCHES & LOGS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Space_Grotesk'] mb-4">
            News & Updates
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Stay informed with official technical releases, engineering breakthroughs and company chronicles.
          </p>
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {NEWS_ITEMS.map((item, idx) => {
            const delays = ['delay-100', 'delay-200', 'delay-300'];
            return (
              <article
                key={item.id}
                onClick={() => setSelectedArticle(item)}
                className={`group cursor-pointer rounded-2xl p-6 bg-gradient-to-br from-[#061433]/85 to-[#040b1e]/95 border border-cyan-500/25 hover:border-cyan-400/80 shadow-[0_0_15px_rgba(0,195,255,0.12)] hover:shadow-[0_0_25px_rgba(0,240,255,0.25)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between scroll-reveal ${delays[idx % 3]}`}
              >
              <div>
                {/* Metadata row */}
                <div className="flex items-center gap-3 text-xs text-slate-400 mb-4">
                  <span className="font-mono text-cyan-300 font-bold">{item.category}</span>
                  <span>·</span>
                  <span>{item.date}</span>
                  <span>·</span>
                  <span>{item.readTime}</span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors font-['Space_Grotesk'] mb-3 line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed line-clamp-3 mb-6">
                  {item.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-cyan-500/15 flex items-center gap-2 text-xs font-semibold text-cyan-400 group-hover:text-cyan-300">
                <span>Read Full Announcement</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          );
        })}
        </div>

      </div>

      {/* Modal for Reading Full News Article */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#050f26] border border-cyan-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-cyan-950/80">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 text-xs text-cyan-400 font-mono mb-3">
              <span>{selectedArticle.category}</span>
              <span>·</span>
              <span>{selectedArticle.date}</span>
              <span>·</span>
              <span>{selectedArticle.readTime}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Space_Grotesk'] mb-4">
              {selectedArticle.title}
            </h3>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
              <p className="font-medium text-slate-200">{selectedArticle.summary}</p>
              <p>{selectedArticle.content}</p>
              <p>
                As AetherTech continues to advance our technological divisions, further architectural whitepapers and public benchmarks will be released directly through our developer portals.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-cyan-500/20 flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 transition-colors"
              >
                Close Dispatch
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
