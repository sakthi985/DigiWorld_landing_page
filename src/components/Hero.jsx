import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Code2, 
  ShieldCheck, 
  Zap, 
  Globe2, 
  Cpu, 
  MessageSquareCode,
  Terminal,
  Activity,
  Star,
  Users,
  Award
} from 'lucide-react';
import { useQuery } from '../context/QueryContext';

export default function Hero() {
  const { openQuoteModal, openAdminModal, queries } = useQuery();
  const [activeTab, setActiveTab] = useState('react');

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-8 pb-20 overflow-hidden bg-grid-pattern">
      {/* Background Ambient Glow Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-brand-600/15 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-rose-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Top Interactive Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-brand-500/30 backdrop-blur-md mb-6 hover:border-brand-500/60 transition-colors cursor-default">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
              </span>
              <span className="text-xs font-semibold text-slate-200">
                Next-Gen Software Development & Global SEO
              </span>
              <span className="text-[10px] bg-brand-500/20 text-brand-300 font-bold px-2 py-0.5 rounded-full">
                500+ Shipped
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-6">
              Solutions That{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-brand-400 to-rose-500 text-glow-brand">
                Evolve With
              </span>{' '}
              Your Business.
            </h1>

            {/* Sub-headline text */}
            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed mb-8 max-w-2xl">
              We engineer scalable custom software, high-converting web applications, and native mobile platforms with proven <span className="text-white font-semibold underline decoration-brand-500/50">#1 Google keyword rankings</span> across international markets.
            </p>

            {/* Dual CTAs & Live Query Quick Action */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={() => openQuoteModal()}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-gradient-to-r from-brand-600 via-rose-600 to-brand-500 text-white font-bold text-base shadow-xl shadow-brand-600/30 hover:shadow-brand-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-3 group"
              >
                <Sparkles className="w-5 h-5 text-rose-200 animate-pulse" />
                <span>Request Project Proposal</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#query-hub"
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-dark-850/90 hover:bg-dark-800 border border-white/10 hover:border-brand-500/40 text-slate-200 hover:text-white font-semibold text-base transition-all duration-200 flex items-center justify-center gap-2.5 shadow-md"
              >
                <MessageSquareCode className="w-5 h-5 text-brand-400" />
                <span>Ask Engineering Query</span>
                <span className="bg-brand-500/20 text-brand-300 text-xs px-2 py-0.5 rounded-full font-mono">
                  Live
                </span>
              </a>
            </div>

            {/* Trust Badges & Verified Stats Row */}
            <div className="pt-6 border-t border-white/10 w-full grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex flex-col">
                <span className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight flex items-center">
                  5+ <span className="text-brand-400 text-xl font-bold ml-0.5">Years</span>
                </span>
                <span className="text-xs text-slate-400 mt-0.5">Industry Experience</span>
              </div>

              <div className="flex flex-col">
                <span className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight flex items-center">
                  98<span className="text-brand-400 font-bold">%</span>
                </span>
                <span className="text-xs text-slate-400 mt-0.5">Client Retention</span>
              </div>

              <div className="flex flex-col">
                <span className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight flex items-center">
                  500<span className="text-brand-400 font-bold">+</span>
                </span>
                <span className="text-xs text-slate-400 mt-0.5">Projects Delivered</span>
              </div>

              <div className="flex flex-col">
                <span className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight flex items-center">
                  1k<span className="text-brand-400 font-bold">+</span>
                </span>
                <span className="text-xs text-slate-400 mt-0.5">Global Clients</span>
              </div>
            </div>

          </div>

          {/* Right Column: Live Interactive Telemetry & Code Showcase */}
          <div className="lg:col-span-5 relative">
            
            {/* Main Interactive Showcase Card */}
            <div className="relative rounded-2xl bg-gradient-to-b from-dark-850/90 to-dark-950/95 border border-white/10 p-6 backdrop-blur-xl shadow-2xl shadow-black/80 hover:border-brand-500/40 transition-all duration-300 group">
              
              {/* Window Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  <span className="text-xs font-mono text-slate-400 ml-2">digiworld-engine.ts</span>
                </div>

                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  99.9% SLA Online
                </div>
              </div>

              {/* Code Snippet Tabs */}
              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={() => setActiveTab('react')}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    activeTab === 'react' 
                      ? 'bg-brand-500/20 text-brand-300 border border-brand-500/40' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Frontend.tsx
                </button>
                <button
                  onClick={() => setActiveTab('api')}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    activeTab === 'api' 
                      ? 'bg-brand-500/20 text-brand-300 border border-brand-500/40' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Architecture.go
                </button>
                <button
                  onClick={() => setActiveTab('seo')}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    activeTab === 'seo' 
                      ? 'bg-brand-500/20 text-brand-300 border border-brand-500/40' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  SEO_Rank.json
                </button>
              </div>

              {/* Interactive Code Content */}
              <div className="bg-dark-950/80 rounded-xl p-4 font-mono text-xs text-slate-300 border border-white/5 overflow-x-auto min-h-[170px]">
                {activeTab === 'react' && (
                  <div className="space-y-1">
                    <p><span className="text-purple-400">const</span> <span className="text-blue-400">DigiWorldEngine</span> = () =&gt; &#123;</p>
                    <p className="pl-4"><span className="text-purple-400">const</span> clientSuccess = <span className="text-amber-400">useMeasurableGrowth</span>(&#123;</p>
                    <p className="pl-8 text-slate-400">framework: <span className="text-emerald-400">"React 19 + Next.js"</span>,</p>
                    <p className="pl-8 text-slate-400">speedIndex: <span className="text-amber-400">&lt;0.8s</span>,</p>
                    <p className="pl-8 text-slate-400">security: <span className="text-emerald-400">"Enterprise OWASP"</span>,</p>
                    <p className="pl-8 text-slate-400">roiMultiplier: <span className="text-brand-400">"4.8x Guaranteed"</span></p>
                    <p className="pl-4">&#125;);</p>
                    <p className="pl-4"><span className="text-purple-400">return</span> <span className="text-blue-400">&lt;EvolveYourBusiness /&gt;</span>;</p>
                    <p>&#125;;</p>
                  </div>
                )}

                {activeTab === 'api' && (
                  <div className="space-y-1">
                    <p><span className="text-purple-400">func</span> <span className="text-blue-400">DeployHighConcurrencyMicroservice</span>() &#123;</p>
                    <p className="pl-4 text-slate-400">// Zero latency cluster</p>
                    <p className="pl-4">cluster := <span className="text-emerald-400">aws.NewEKSCluster</span>(&#123;</p>
                    <p className="pl-8 text-slate-400">Regions: []string&#123;<span className="text-emerald-400">"us-east-1"</span>, <span className="text-emerald-400">"ap-south-1"</span>&#125;,</p>
                    <p className="pl-8 text-slate-400">AutoScaling: <span className="text-amber-400">true</span>,</p>
                    <p className="pl-8 text-slate-400">Websockets: <span className="text-brand-400">"Redis PubSub"</span>,</p>
                    <p className="pl-4">&#125;)</p>
                    <p className="pl-4"><span className="text-purple-400">return</span> cluster.<span className="text-blue-400">HealthCheck200</span>()</p>
                    <p>&#125;</p>
                  </div>
                )}

                {activeTab === 'seo' && (
                  <div className="space-y-1">
                    <p>&#123;</p>
                    <p className="pl-4"><span className="text-blue-400">"targetKeywords"</span>: [</p>
                    <p className="pl-8"><span className="text-emerald-400">"Plug valves in UK"</span>: <span className="text-brand-400">"#1 Position (USA/UK)"</span>,</p>
                    <p className="pl-8"><span className="text-emerald-400">"Cryogenic ball valve SA"</span>: <span className="text-brand-400">"#1 Position (Global)"</span>,</p>
                    <p className="pl-8"><span className="text-emerald-400">"Heat exchangers Denmark"</span>: <span className="text-brand-400">"#1 Position"</span></p>
                    <p className="pl-4">],</p>
                    <p className="pl-4"><span className="text-blue-400">"organicTrafficGrowth"</span>: <span className="text-emerald-400">"+320% in 90 days"</span></p>
                    <p>&#125;</p>
                  </div>
                )}
              </div>

              {/* Live Mini Telemetry Bars */}
              <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-3 gap-3">
                <div className="p-2.5 rounded-xl bg-dark-900/90 border border-white/5 flex flex-col">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Activity className="w-3 h-3 text-emerald-400" />
                    Load Speed
                  </span>
                  <span className="text-sm font-bold text-white mt-0.5">0.42s</span>
                </div>

                <div className="p-2.5 rounded-xl bg-dark-900/90 border border-white/5 flex flex-col">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-brand-400" />
                    Security
                  </span>
                  <span className="text-sm font-bold text-white mt-0.5">A+ Rated</span>
                </div>

                <div className="p-2.5 rounded-xl bg-dark-900/90 border border-white/5 flex flex-col">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    Satisfaction
                  </span>
                  <span className="text-sm font-bold text-white mt-0.5">4.9 / 5.0</span>
                </div>
              </div>

              {/* Floating Verified Badge */}
              <div className="absolute -bottom-5 -left-5 bg-dark-900/95 border border-brand-500/40 rounded-xl p-3 shadow-xl backdrop-blur-xl flex items-center gap-3 hidden sm:flex">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-brand-600 to-rose-500 flex items-center justify-center text-white">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Verified Tech Partner</p>
                  <p className="text-[10px] text-slate-400">Chennai & Global Export</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
