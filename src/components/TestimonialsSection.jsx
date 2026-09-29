import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Award, CheckCircle2, MessageSquare } from 'lucide-react';
import { companyData } from '../data/companyData';

export default function TestimonialsSection() {
  const testimonials = companyData?.testimonials || [];

  return (
    <section className="py-24 relative bg-dark-950/80 border-t border-b border-white/5">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5" />
            Endorsements & Results
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            What Leaders Say About{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-rose-400">
              DigiWorld
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Real feedback from enterprise directors and business owners who have scaled with our solutions.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testi, idx) => (
            <div
              key={testi.id || idx}
              className="rounded-3xl bg-gradient-to-br from-dark-850/90 to-dark-900 border border-white/10 p-8 flex flex-col justify-between relative group hover:border-brand-500/50 hover:shadow-2xl transition-all duration-300"
            >
              <Quote className="w-10 h-10 text-brand-500/20 absolute top-6 right-6 pointer-events-none group-hover:text-brand-500/40 transition-colors" />

              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testi.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-slate-300 ml-2">5.0 Verified</span>
                </div>

                {/* Quote Text */}
                <p className="text-sm text-slate-300 leading-relaxed italic mb-8">
                  "{testi.quote || testi.content || 'DigiWorld delivered exceptional enterprise-grade software.'}"
                </p>
              </div>

              {/* Author Details */}
              <div className="pt-6 border-t border-white/10 flex items-center gap-3.5">
                <img
                  src={testi.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                  alt={testi.author || testi.name || 'Client'}
                  className="w-12 h-12 rounded-full object-cover border-2 border-brand-500/40"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";
                  }}
                />
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1">
                    {testi.author || testi.name || 'Client Director'}
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </h4>
                  <p className="text-xs text-brand-300 font-medium">
                    {testi.designation || testi.role || 'Enterprise Partner'}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate max-w-[200px]">
                    {testi.company || testi.location || 'Global Client'}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
