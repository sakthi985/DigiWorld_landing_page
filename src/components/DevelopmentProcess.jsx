import React, { useState } from 'react';
import { 
  Clock, 
  Workflow, 
  Sparkles, 
  Check
} from 'lucide-react';
import { companyData } from '../data/companyData';

export default function DevelopmentProcess() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const steps = companyData?.developmentSteps || [
    {
      step: "01",
      title: "Discovery & Architecture Blueprint",
      duration: "3 - 5 Days",
      desc: "We analyze your business goals, user personas, database schemas, and API integrations, establishing the complete technical specification and architectural roadmap.",
      deliverables: ["Technical SRS Document", "Database Entity Schema", "Figma Interactive Wireframe"]
    },
    {
      step: "02",
      title: "UI/UX Design & Clickable Prototyping",
      duration: "4 - 7 Days",
      desc: "Our design team crafts bespoke Figma layouts with responsive design tokens, micro-interactions, dark mode aesthetics, and WCAG AA accessibility compliance.",
      deliverables: ["High-Fidelity UI Screens", "Component Design Tokens", "Clickable Client Prototype"]
    },
    {
      step: "03",
      title: "Agile Full-Stack Engineering",
      duration: "1 - 3 Weeks",
      desc: "Our senior developers build modular components with clean architecture, atomic states, automated API endpoints, and Supabase / PostgreSQL database integration.",
      deliverables: ["Modular Source Code", "REST / GraphQL APIs", "Weekly Working Sprint Builds"]
    },
    {
      step: "04",
      title: "Rigorous QA, Security & Performance Audit",
      duration: "3 - 5 Days",
      desc: "Comprehensive testing covering cross-browser rendering, load stress tests, SQL injection security scans, and Google Lighthouse 95+ score optimization.",
      deliverables: ["Automated Test Matrix", "Security Penetration Audit", "95+ Lighthouse Score Report"]
    },
    {
      step: "05",
      title: "Cloud Deployment & Production Cutover",
      duration: "2 - 3 Days",
      desc: "Automated CI/CD rollout to Supabase, AWS, or Docker containers with zero downtime, SSL certification, DDoS firewall rules, and custom domain setup.",
      deliverables: ["Zero-Downtime Deployment", "SSL & CDN Hardening", "Automated Daily Backups"]
    },
    {
      step: "06",
      title: "Post-Launch Support & SEO Growth",
      duration: "Ongoing SLA",
      desc: "We monitor server health 24/7, track real-time analytics, and execute international SEO optimization to scale your search engine presence.",
      deliverables: ["24/7 Server Health Monitoring", "Monthly SEO & Traffic Reports", "Continuous Feature Upgrades"]
    }
  ];

  const currentStep = steps[activeStepIndex] || steps[0];

  return (
    <section id="process" className="py-24 relative bg-dark-950 border-t border-b border-white/5">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Workflow className="w-3.5 h-3.5" />
            Execution Methodology
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Our 6-Step Agile{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-rose-400">
              Delivery Pipeline
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Transparent milestones, continuous communication, and uncompromising quality from day zero to launch.
          </p>
        </div>

        {/* Interactive Steps Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {steps.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            return (
              <button
                key={step.step || idx}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 relative overflow-hidden group ${
                  isActive
                    ? 'bg-brand-950/70 border-brand-500/60 shadow-lg shadow-brand-500/20'
                    : 'bg-dark-900/80 border-white/5 hover:border-white/20 hover:bg-dark-850'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono font-bold ${
                    isActive ? 'text-brand-400' : 'text-slate-500'
                  }`}>
                    STEP {step.step}
                  </span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span>
                  )}
                </div>

                <h3 className={`text-sm font-bold truncate ${
                  isActive ? 'text-white' : 'text-slate-300'
                }`}>
                  {step.title.split('&')[0]}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Detailed Active Step Card */}
        <div className="rounded-3xl bg-gradient-to-br from-dark-850/90 via-dark-900/95 to-dark-950 border border-white/10 p-8 lg:p-12 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-brand-500/20 border border-brand-500/40 text-brand-300 text-xs font-mono font-bold">
                  PHASE {currentStep.step} / 06
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-brand-400" />
                  Estimated Duration: {currentStep.duration}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                {currentStep.title}
              </h3>

              <p className="text-slate-300 text-base leading-relaxed mb-8 max-w-2xl">
                {currentStep.desc}
              </p>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">
                  Key Deliverables in this Phase:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {currentStep.deliverables?.map((item, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-dark-950/80 border border-white/5 flex items-center gap-2.5 text-xs text-slate-200"
                    >
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Interactive Progress Indicator */}
            <div className="lg:col-span-4 flex flex-col justify-center">
              <div className="p-6 rounded-2xl bg-dark-950/90 border border-white/10 text-center">
                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-brand-400 to-rose-500">
                  {Math.round(((activeStepIndex + 1) / 6) * 100)}%
                </span>
                <span className="text-xs font-mono text-slate-400 block mt-1">
                  Overall Lifecycle Completion
                </span>

                <div className="w-full bg-dark-800 h-2 rounded-full mt-4 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-brand-500 to-rose-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${((activeStepIndex + 1) / 6) * 100}%` }}
                  ></div>
                </div>

                <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/10">
                  <button
                    disabled={activeStepIndex === 0}
                    onClick={() => setActiveStepIndex(prev => Math.max(0, prev - 1))}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    ← Previous
                  </button>

                  <span className="text-xs font-mono text-slate-500">
                    Step {activeStepIndex + 1} of 6
                  </span>

                  <button
                    disabled={activeStepIndex === steps.length - 1}
                    onClick={() => setActiveStepIndex(prev => Math.min(steps.length - 1, prev + 1))}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-brand-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
