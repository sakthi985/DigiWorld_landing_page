import React from 'react';
import { 
  Cpu, 
  Search, 
  Headphones, 
  Layers, 
  Sparkles,
  Terminal,
  ShieldCheck
} from 'lucide-react';
import { useQuery } from '../context/QueryContext';

export default function BentoFeatures() {
  const { openQuoteModal } = useQuery();

  return (
    <section id="features" className="py-24 relative bg-dark-950/60 border-t border-b border-white/5">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Engineering Excellence
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Why High-Growth Companies Choose{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-rose-400">
              DigiWorld
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            We bridge the gap between complex software engineering and measurable digital revenue growth.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-6">
          
          {/* Card 1: Global SEO Dominance (Large 7 Cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-gradient-to-br from-dark-850/80 via-dark-900/90 to-dark-950 border border-white/10 p-8 relative overflow-hidden group hover:border-brand-500/50 transition-all duration-300">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600/10 blur-3xl rounded-full pointer-events-none group-hover:bg-brand-600/20 transition-all"></div>
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400 mb-6">
                  <Search className="w-6 h-6" />
                </div>

                <div className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3 border border-emerald-500/30">
                  Proven International SEO
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">
                  Google Page #1 Rankings Across 8+ Global Markets
                </h3>
                
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Our data-driven SEO architecture has catapulted industrial manufacturers and SaaS providers to the #1 spot on Google in the USA, UK, India, UAE, Poland, and South Africa for high-intent B2B search terms.
                </p>
              </div>

              {/* Live Rank Highlights Pill Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/10">
                <div className="bg-dark-950/70 p-3 rounded-xl border border-white/5 flex items-center justify-between">
                  <span className="text-xs text-slate-300 truncate">Plug valves (Ashington, UK)</span>
                  <span className="text-xs font-bold text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded">#1 Rank</span>
                </div>
                <div className="bg-dark-950/70 p-3 rounded-xl border border-white/5 flex items-center justify-between">
                  <span className="text-xs text-slate-300 truncate">Cryogenic valves (S. Africa)</span>
                  <span className="text-xs font-bold text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded">#1 Rank</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Full-Stack Architecture (5 Cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-dark-850/80 via-dark-900/90 to-dark-950 border border-white/10 p-8 relative overflow-hidden group hover:border-brand-500/50 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6">
              <Cpu className="w-6 h-6" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-3">
              Modern Full-Stack Architecture
            </h3>
            
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              No bloated templates. We build custom applications using React, Next.js, Node.js, Flutter, and Tailwind CSS for snappy performance and zero technical debt.
            </p>

            <div className="flex flex-wrap gap-2">
              {['React 19', 'Next.js', 'Flutter', 'Node.js', 'PostgreSQL', 'Tailwind', 'Supabase'].map((tech) => (
                <span key={tech} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Card 3: 24/7 Support & SLA (4 Cols) */}
          <div className="lg:col-span-4 rounded-3xl bg-gradient-to-br from-dark-850/80 to-dark-950 border border-white/10 p-7 group hover:border-brand-500/50 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-5">
              <Headphones className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              24/7 Dedicated SLA & Support
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Round-the-clock technical monitoring, automated backups, and instant developer response to ensure maximum business continuity.
            </p>
          </div>

          {/* Card 4: Milestone-Based Agile Delivery (4 Cols) */}
          <div className="lg:col-span-4 rounded-3xl bg-gradient-to-br from-dark-850/80 to-dark-950 border border-white/10 p-7 group hover:border-brand-500/50 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Milestone-Based Agile Delivery
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Clear scope specifications, verified milestone code commits, complete IP ownership, and zero hidden dependencies.
            </p>
          </div>

          {/* Card 5: Direct Access to Leadership (4 Cols) */}
          <div className="lg:col-span-4 rounded-3xl bg-gradient-to-br from-dark-850/80 to-dark-950 border border-white/10 p-7 group hover:border-brand-500/50 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-5">
              <Terminal className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Direct Senior Dev Access
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Work directly with our Business Head Sakthivel and Tech Lead Dinesh, not junior account middlemen.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
