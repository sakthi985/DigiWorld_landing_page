import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Award, 
  Eye,
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { companyData } from '../data/companyData';
import { useQuery } from '../context/QueryContext';

export default function PortfolioMatrix() {
  const [activeFilter, setActiveFilter] = useState('all');
  const { openPortfolioModal, openQuoteModal } = useQuery();

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Applications' },
    { id: 'seo', label: 'Global SEO Rankings (#1 Proof)' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'enterprise', label: 'Enterprise ERP' }
  ];

  const items = Array.isArray(companyData?.portfolioItems) 
    ? companyData.portfolioItems 
    : (Array.isArray(companyData?.portfolio) ? companyData.portfolio : []);

  const galleryItems = Array.isArray(companyData?.gallery) ? companyData.gallery : [];

  const filteredItems = (items || []).filter(item => {
    if (!item) return false;
    if (activeFilter === 'all') return true;
    const cat = (item.category || '').toLowerCase();
    if (activeFilter === 'web') return cat.includes('web') || cat.includes('saas');
    if (activeFilter === 'seo') return (item.topKeywords && item.topKeywords.length > 0) || cat.includes('seo');
    if (activeFilter === 'mobile') return cat.includes('mobile') || cat.includes('app');
    if (activeFilter === 'enterprise') return cat.includes('enterprise') || cat.includes('erp');
    return true;
  });

  return (
    <section id="portfolio" className="py-24 relative bg-dark-950">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-bold uppercase tracking-wider mb-4">
              <FolderGit2 className="w-3.5 h-3.5" />
              Verified Case Studies &amp; Rankings
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Featured Work &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-rose-400">
                Client Success
              </span>
            </h2>
          </div>

          <p className="text-slate-400 max-w-md text-base">
            Explore our real-world projects spanning industrial web applications, mobile platforms, and verified #1 Google keyword rankings across the UK, USA, Africa, and Europe.
          </p>
        </div>

        {/* Filter Categories Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => {
            const isActive = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-600 to-rose-600 text-white shadow-lg shadow-brand-500/25'
                    : 'bg-dark-900 border border-white/5 text-slate-300 hover:text-white hover:bg-dark-850'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Portfolio Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-gradient-to-br from-dark-850/80 to-dark-950 border border-white/10 overflow-hidden flex flex-col justify-between group hover:border-brand-500/50 hover:shadow-2xl hover:shadow-brand-500/10 transition-all duration-300"
            >
              {/* Project Image & Overlay */}
              <div className="relative h-56 overflow-hidden bg-dark-900">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent"></div>

                {/* Badge Category */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-dark-950/90 backdrop-blur-md border border-white/10 text-brand-300 text-xs font-semibold">
                    {item.category}
                  </span>
                </div>

                {/* Live URL Link if available */}
                {item.liveUrl && (
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-dark-950/90 backdrop-blur-md border border-white/10 text-slate-300 hover:text-white hover:bg-brand-600 flex items-center justify-center transition-colors"
                    title="Visit Live Site"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>

              {/* Project Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-slate-400 block mb-1">
                    {item.type}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">
                    {item.desc || item.summary}
                  </p>
                </div>

                {/* Quick Stats or SEO Rank Highlights */}
                <div>
                  {item.topKeywords ? (
                    <div className="pt-3 border-t border-white/10">
                      <span className="text-[11px] font-mono text-emerald-400 font-semibold block mb-1.5 flex items-center gap-1">
                        <Award className="w-3.5 h-3.5" />
                        Top Verified Google #1 Rankings:
                      </span>
                      <div className="space-y-1">
                        {item.topKeywords.slice(0, 2).map((k, i) => (
                          <div key={i} className="text-[11px] text-slate-400 flex justify-between bg-dark-950/60 px-2 py-1 rounded">
                            <span className="truncate max-w-[200px]">{k.keyword}</span>
                            <span className="font-bold text-brand-400 shrink-0 ml-1">{k.rank}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : item.stats ? (
                    <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-[11px]">
                      {Object.entries(item.stats).slice(0, 2).map(([key, val]) => (
                        <div key={key} className="bg-dark-950/60 p-2 rounded">
                          <span className="text-slate-400 block capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="font-bold text-slate-200">{val}</span>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {/* Deep-dive button */}
                  <button
                    onClick={() => openPortfolioModal(item)}
                    className="w-full mt-4 py-2.5 rounded-xl bg-white/5 hover:bg-brand-500/20 border border-white/10 hover:border-brand-500/40 text-xs font-semibold text-slate-300 hover:text-white transition-all flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Complete Case Study</span>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* ── RECENT PROJECT GALLERY SHOWCASE ───────────── */}
        {galleryItems.length > 0 && (
          <div className="pt-12 border-t border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-brand-400 font-bold block mb-1">
                  Visual Showcase
                </span>
                <h3 className="text-2xl font-bold text-white">
                  Recent Project Gallery
                </h3>
              </div>
              <p className="text-xs text-slate-400 max-w-sm">
                A visual showcase of recent cross-industry deliveries engineered by the DigiWorld team.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {galleryItems.map((gItem, idx) => (
                <div
                  key={idx}
                  className="rounded-xl overflow-hidden bg-dark-900 border border-white/5 group hover:border-brand-500/40 transition-all duration-300 relative"
                >
                  <div className="h-40 overflow-hidden relative">
                    <img
                      src={gItem.image}
                      alt={gItem.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent"></div>
                  </div>
                  <div className="p-3 bg-dark-950">
                    <h4 className="text-xs font-bold text-white truncate group-hover:text-brand-300 transition-colors">
                      {gItem.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                      {gItem.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
