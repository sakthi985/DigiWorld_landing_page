import React from 'react';
import { Users, Mail, Award, CheckCircle2 } from 'lucide-react';
import { companyData } from '../data/companyData';

export default function TeamSection() {
  const team = companyData?.leadership || [];

  return (
    <section id="about" className="py-24 relative bg-dark-950">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Users className="w-3.5 h-3.5" />
            Leadership & Engineering
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Meet the Minds Behind{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-rose-400">
              DigiWorld
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Dedicated technology strategists and full-stack architects committed to your digital ascendancy.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member) => (
            <div
              key={member.name}
              className="rounded-3xl bg-gradient-to-br from-dark-850/80 to-dark-900 border border-white/10 p-7 flex flex-col justify-between group hover:border-brand-500/50 hover:shadow-2xl transition-all duration-300"
            >
              <div>
                {/* Photo & Badge */}
                <div className="relative h-64 rounded-2xl overflow-hidden mb-6 bg-dark-950 border border-white/5">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent"></div>
                  
                  <div className="absolute bottom-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-dark-900/90 border border-white/10 text-brand-300 text-xs font-bold backdrop-blur-md">
                      {member.role?.split('&')[0] || member.badge || 'Engineering'}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-xs text-brand-400 font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  {member.bio}
                </p>
              </div>

              {/* Skills Tags */}
              <div className="pt-4 border-t border-white/10">
                <span className="text-[10px] font-mono text-slate-500 uppercase block mb-2 font-bold">
                  Core Specializations:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(member.expertise || []).map((exp) => (
                    <span
                      key={exp}
                      className="px-2.5 py-1 rounded-md bg-dark-950 border border-white/5 text-[11px] text-slate-300 font-medium"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
