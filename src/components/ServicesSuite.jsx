import React, { useState } from 'react';
import { 
  Code2, 
  Smartphone, 
  Cpu, 
  TrendingUp, 
  Palette, 
  Server, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  HelpCircle,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { companyData } from '../data/companyData';
import { useQuery } from '../context/QueryContext';

export default function ServicesSuite() {
  const [selectedServiceId, setSelectedServiceId] = useState(companyData.services[0].id);
  const { openQuoteModal } = useQuery();

  const selectedService = companyData.services.find(s => s.id === selectedServiceId) || companyData.services[0];

  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case 'Code2': return <Code2 className="w-5 h-5" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5" />;
      case 'Palette': return <Palette className="w-5 h-5" />;
      case 'Server': return <Server className="w-5 h-5" />;
      default: return <Layers className="w-5 h-5" />;
    }
  };

  return (
    <section id="services" className="py-24 relative bg-dark-950">
      {/* Background Subtle Gradient */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-600/10 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Full-Spectrum Engineering
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Enterprise IT Services &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-rose-400">
                Digital Solutions
              </span>
            </h2>
          </div>

          <p className="text-slate-400 max-w-md text-base">
            From initial concept to full-scale cloud deployment, we build tailored software solutions that supercharge your operational speed.
          </p>
        </div>

        {/* Interactive Services Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {companyData.services.map((service) => {
            const isSelected = service.id === selectedServiceId;
            return (
              <button
                key={service.id}
                onClick={() => setSelectedServiceId(service.id)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between relative overflow-hidden group ${
                  isSelected
                    ? 'bg-gradient-to-b from-brand-950/80 to-dark-850 border-brand-500/60 shadow-lg shadow-brand-500/20'
                    : 'bg-dark-900/80 border-white/5 hover:border-white/20 hover:bg-dark-850'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 to-rose-500"></div>
                )}

                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                  isSelected 
                    ? 'bg-brand-500 text-white shadow-md shadow-brand-500/40' 
                    : 'bg-white/5 text-slate-400 group-hover:text-white'
                }`}>
                  {getServiceIcon(service.icon)}
                </div>

                <div>
                  <span className="text-[11px] font-mono text-slate-400 block mb-0.5">
                    {service.badge}
                  </span>
                  <h3 className={`text-sm font-bold leading-snug ${
                    isSelected ? 'text-white' : 'text-slate-300'
                  }`}>
                    {service.title.split('&')[0]}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Service Showcase Card */}
        <div className="rounded-3xl bg-gradient-to-br from-dark-850/90 via-dark-900/95 to-dark-950 border border-white/10 p-8 lg:p-12 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content Area (7 Cols) */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-brand-500/20 border border-brand-500/40 text-brand-300 text-xs font-bold">
                  {selectedService.badge}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-brand-400" />
                  Typical Timeline: {selectedService.deliveryTime}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4">
                {selectedService.title}
              </h3>

              <div className="flex flex-col sm:flex-row gap-6 items-start mb-8">
                {selectedService.image && (
                  <div className="w-full sm:w-48 h-36 rounded-2xl overflow-hidden bg-dark-900 border border-white/10 shrink-0">
                    <img
                      src={selectedService.image}
                      alt={selectedService.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <p className="text-slate-300 text-base leading-relaxed">
                  {selectedService.fullDesc}
                </p>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-3 mb-8">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Key Capabilities & Deliverables:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedService.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Applied */}
              <div className="pt-6 border-t border-white/10">
                <span className="text-xs font-mono text-slate-400 block mb-3">
                  Core Technologies:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedService.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg bg-dark-950 border border-white/10 text-xs font-mono text-slate-300 shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Action & Architecture Engagement Card (5 Cols) */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-dark-950/90 border border-brand-500/30 p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 blur-2xl rounded-full pointer-events-none"></div>

                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                    <span className="text-xs font-mono text-slate-400">Project Model</span>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Full SLA Guarantee
                    </span>
                  </div>

                  <div className="mb-6 space-y-2">
                    <span className="text-xl font-extrabold text-white tracking-tight block">
                      Dedicated Engineering Engagement
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Custom sprint cycles, 100% intellectual property ownership, milestone-based code deliveries, and continuous QA integration.
                    </p>
                  </div>

                  <div className="bg-dark-900/60 p-4 rounded-xl border border-white/5 space-y-2 text-xs text-slate-300 mb-6">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Architecture Scope:</span>
                      <span className="font-bold text-white">Full-Stack Production</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">IP & Code Ownership:</span>
                      <span className="font-bold text-emerald-400">100% Client Owned</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Lead Architects:</span>
                      <span className="font-bold text-white">Dinesh & Sakthivel</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => openQuoteModal(selectedService.title)}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-600 to-rose-600 text-white font-bold text-sm shadow-lg shadow-brand-600/30 hover:shadow-brand-500/50 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                  >
                    <span>Request Proposal for {selectedService.title.split(' ')[0]}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href="#query-hub"
                    className="w-full py-3 rounded-xl bg-dark-900 hover:bg-dark-850 border border-white/10 text-slate-300 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <HelpCircle className="w-4 h-4 text-brand-400" />
                    <span>Ask Technical Query About This Service</span>
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
