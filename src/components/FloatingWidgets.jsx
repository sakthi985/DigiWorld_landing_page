import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  Mail, 
  HelpCircle, 
  ChevronUp, 
  Lock,
  PhoneCall
} from 'lucide-react';
import { useQuery } from '../context/QueryContext';

export default function FloatingWidgets() {
  const { openQuoteModal, openAdminModal, isAdminLoggedIn } = useQuery();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      
      {/* 1. Quick WhatsApp Launcher */}
      <a
        href="https://wa.me/+919655445841"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-500/30 flex items-center justify-center transition-all hover:scale-110 active:scale-95 group relative"
        title="Instant WhatsApp Consultation"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute right-14 bg-dark-900 text-white text-xs font-semibold px-3 py-1 rounded-xl shadow-lg border border-white/10 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap">
          WhatsApp Direct
        </span>
      </a>

      {/* 2. Direct Email Launcher */}
      <a
        href="mailto:digiworld384@gmail.com"
        className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/30 flex items-center justify-center transition-all hover:scale-110 active:scale-95 group relative"
        title="Email Engineering Team"
      >
        <Mail className="w-5 h-5" />
        <span className="absolute right-14 bg-dark-900 text-white text-xs font-semibold px-3 py-1 rounded-xl shadow-lg border border-white/10 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Email DigiWorld
        </span>
      </a>

      {/* 3. Instant Query / Quote Drawer Button */}
      <button
        onClick={() => openQuoteModal()}
        className="w-12 h-12 rounded-full bg-gradient-to-r from-brand-600 to-rose-600 hover:from-brand-500 hover:to-rose-500 text-white shadow-xl shadow-brand-600/30 flex items-center justify-center transition-all hover:scale-110 active:scale-95 group relative"
        title="Instant Project Inquiry"
      >
        <HelpCircle className="w-6 h-6" />
        <span className="absolute right-14 bg-dark-900 text-white text-xs font-semibold px-3 py-1 rounded-xl shadow-lg border border-white/10 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Request Quote
        </span>
      </button>

      {/* 4. Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-dark-850 hover:bg-dark-800 text-slate-300 hover:text-white border border-white/10 shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95 animate-in fade-in"
          title="Back to Top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
