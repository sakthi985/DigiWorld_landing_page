import React from 'react';
import { X, ExternalLink, Award, CheckCircle2, TrendingUp, Globe2, ShieldCheck, Search, Image as ImageIcon } from 'lucide-react';
import { useQuery } from '../context/QueryContext';

export default function ProjectDetailsModal() {
  const { activePortfolioItem, closePortfolioModal, openQuoteModal } = useQuery();

  if (!activePortfolioItem) return null;

  const item = activePortfolioItem;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-4xl max-h-[90vh] bg-dark-950 border border-brand-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto relative">
        
        {/* Close Button */}
        <button
          onClick={closePortfolioModal}
          className="absolute top-5 right-5 p-2 rounded-xl bg-dark-800 hover:bg-dark-700 text-slate-400 hover:text-white transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header with Client Logo if available */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-brand-500/20 border border-brand-500/40 text-brand-300 text-xs font-mono font-bold">
                {item.category} • {item.type}
              </span>
              {item.startedDate && (
                <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400 text-[11px] font-mono">
                  Started: {item.startedDate}
                </span>
              )}
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 mb-2">
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              {item.desc}
            </p>
          </div>

          {item.clientLogo && (
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl shrink-0 self-start">
              <img 
                src={item.clientLogo} 
                alt={`${item.title} Logo`}
                className="h-10 object-contain max-w-[120px]"
              />
            </div>
          )}
        </div>

        {/* Multi-Screenshot Showcase (Desktop + Console Proof if available) */}
        {item.desktopScreenshot && item.consoleProof ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-dark-900 flex flex-col">
              <div className="px-3.5 py-2 bg-dark-900 border-b border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-brand-400" />
                  Live Web Experience
                </span>
                <span className="text-emerald-400 font-semibold">100% Responsive</span>
              </div>
              <img
                src={item.desktopScreenshot}
                alt={`${item.title} Live Desktop`}
                className="w-full h-56 object-cover object-top"
              />
            </div>

            <div className="rounded-2xl overflow-hidden border border-emerald-500/30 bg-dark-900 flex flex-col">
              <div className="px-3.5 py-2 bg-emerald-950/40 border-b border-emerald-500/20 flex items-center justify-between text-[11px] font-mono text-emerald-300">
                <span className="flex items-center gap-1.5 font-bold">
                  <Search className="w-3.5 h-3.5 text-emerald-400" />
                  Google Console #1 Proof
                </span>
                <span className="bg-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-bold">Verified Organic</span>
              </div>
              <img
                src={item.consoleProof}
                alt={`${item.title} Google Console Ranking Proof`}
                className="w-full h-56 object-cover object-top"
              />
            </div>
          </div>
        ) : (
          <div className="rounded-2xl overflow-hidden mb-6 border border-white/10 bg-dark-900 max-h-72">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover object-top"
            />
          </div>
        )}

        {/* Top Keywords / Rankings Table (If SEO project) */}
        {item.topKeywords && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-400" />
                Verified Global Google #1 Keyword Positions:
              </h4>
              <span className="text-[11px] font-mono text-slate-400 bg-dark-900 px-2.5 py-1 rounded-lg border border-white/5">
                {item.topKeywords.length} Verified Page #1 Keywords
              </span>
            </div>
            
            <div className="rounded-xl border border-white/10 overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-dark-900 text-slate-400 font-mono text-[11px]">
                  <tr>
                    <th className="p-3">Target International Keyword Query</th>
                    <th className="p-3 text-right">Search Engine Position</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 bg-dark-950">
                  {item.topKeywords.map((kw, i) => (
                    <tr key={i} className="hover:bg-dark-900/50 transition-colors">
                      <td className="p-3 text-slate-200 font-medium capitalize flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{kw.keyword}</span>
                      </td>
                      <td className="p-3 text-right font-bold text-brand-400 font-mono">
                        <span className="bg-brand-500/10 border border-brand-500/20 px-2.5 py-1 rounded-md text-emerald-300">
                          {kw.rank}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        {item.stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {Object.entries(item.stats).map(([k, v]) => (
              <div key={k} className="p-3.5 rounded-xl bg-dark-900 border border-white/5 text-xs">
                <span className="text-slate-400 block capitalize text-[10px] font-mono">
                  {k.replace(/([A-Z])/g, ' $1')}
                </span>
                <span className="font-bold text-white mt-0.5 block">{v}</span>
              </div>
            ))}
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
          {item.liveUrl ? (
            <a
              href={item.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-dark-900 hover:bg-dark-850 border border-white/10 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <span>Visit Live Web Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <span className="text-xs text-slate-500 font-mono">Enterprise Software Delivery</span>
          )}

          <button
            onClick={() => {
              closePortfolioModal();
              openQuoteModal(`Similar to: ${item.title}`);
            }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-rose-600 text-white text-xs font-bold shadow-md shadow-brand-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Build a Similar Solution
          </button>
        </div>

      </div>
    </div>
  );
}
