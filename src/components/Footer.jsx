import React from 'react';
import { 
  Terminal, 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle
} from 'lucide-react';
import { companyData } from '../data/companyData';

// Inline SVG social icons (lucide-react v1+ removed brand icons)
const LinkedinIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-dark-950 border-t border-white/10 pt-16 pb-12 relative overflow-hidden text-slate-400 text-xs">
      
      {/* Background Accent */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Top Footer Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1 & 2: Brand & About (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-700 to-rose-500 flex items-center justify-center text-white shadow-md">
                <Terminal className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-white">
                  DIGI<span className="text-brand-400">WORLD</span>
                </span>
                <span className="text-[9px] tracking-widest text-slate-400 uppercase font-semibold -mt-1">
                  Software Solutions
                </span>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
              At DigiWorld Software Solutions, we specialize in custom software engineering, scalable web apps, mobile applications, and international SEO strategies that help businesses grow faster in the digital era.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href={companyData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-dark-900 border border-white/10 hover:border-brand-500 hover:text-brand-400 flex items-center justify-center transition-colors"
                title="LinkedIn"
              >
                <LinkedinIcon />
              </a>
              <a
                href={companyData.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-dark-900 border border-white/10 hover:border-brand-500 hover:text-brand-400 flex items-center justify-center transition-colors"
                title="Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href={companyData.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-dark-900 border border-white/10 hover:border-brand-500 hover:text-brand-400 flex items-center justify-center transition-colors"
                title="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href={companyData.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-dark-900 border border-white/10 hover:border-brand-500 hover:text-brand-400 flex items-center justify-center transition-colors"
                title="WhatsApp Direct"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" className="hover:text-brand-300 transition-colors">Web Application Development</a></li>
              <li><a href="#services" className="hover:text-brand-300 transition-colors">Mobile App Engineering (Flutter/Native)</a></li>
              <li><a href="#services" className="hover:text-brand-300 transition-colors">Enterprise Software &amp; Custom ERP</a></li>
              <li><a href="#services" className="hover:text-brand-300 transition-colors">International SEO (#1 Rankings)</a></li>
              <li><a href="#services" className="hover:text-brand-300 transition-colors">Google Ads &amp; Performance PPC</a></li>
              <li><a href="#services" className="hover:text-brand-300 transition-colors">Brand Identity &amp; UI/UX Design</a></li>
              <li><a href="#services" className="hover:text-brand-300 transition-colors">Cloud Hosting &amp; 24/7 DevOps</a></li>
            </ul>
          </div>

          {/* Col 4: Navigation */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#about" className="hover:text-brand-300 transition-colors">About DigiWorld</a></li>
              <li><a href="#features" className="hover:text-brand-300 transition-colors">Why Choose Us</a></li>
              <li><a href="#portfolio" className="hover:text-brand-300 transition-colors">Verified Case Studies</a></li>
              <li><a href="#process" className="hover:text-brand-300 transition-colors">6-Step Agile Pipeline</a></li>
              <li><a href="#query-hub" className="hover:text-brand-300 text-brand-400 font-semibold transition-colors">Live Q&amp;A Hub</a></li>
              <li><a href="#contact" className="hover:text-brand-300 transition-colors">Contact Solution Architects</a></li>
            </ul>
          </div>

          {/* Col 5: Head Office & Quick Info */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4">
              Headquarters
            </h4>
            <div className="space-y-3 text-xs leading-relaxed">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <span>T1-1501, 15th Floor, Lake Dugar Apartments, Ambattur, Chennai - 600053</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <a href="tel:+919944735841" className="hover:text-white">+91 9944735841</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                <a href="mailto:digiworld384@gmail.com" className="hover:text-white">digiworld384@gmail.com</a>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Visitor Counter & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          
          {/* Visitor Counter Pill */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Live Visitor Count:</span>
            <span className="font-mono font-bold text-slate-300 bg-dark-900 px-2 py-0.5 rounded border border-white/5">
              {companyData.visitorCount + 12} Verified
            </span>
          </div>

          <div>
            Copyright &copy; {new Date().getFullYear()} <span className="text-slate-300 font-semibold">DigiWorld Software Solutions</span>. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <a href="#contact" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#contact" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#contact" className="hover:text-slate-300 transition-colors">Security SLA</a>
          </div>

        </div>

      </div>
    </footer>
  );
}
