import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Sparkles, 
  Phone, 
  Mail, 
  ChevronRight, 
  Menu, 
  X,
  Lock,
  UserCheck
} from 'lucide-react';
import { useQuery } from '../context/QueryContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { 
    openQuoteModal, 
    isAdminLoggedIn, 
    isClientLoggedIn,
    sessionUser,
    navigateTo,
    queries 
  } = useQuery();

  const pendingQueriesCount = queries.filter(q => q.status === 'pending').length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Process', href: '#process' },
    { name: 'Live Q&A', href: '#query-hub', highlight: true },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Sleek Top Utility Bar */}
      <div className="bg-dark-950/95 border-b border-white/5 py-1.5 px-4 sm:px-8 text-xs font-mono text-slate-400">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Left Live Status */}
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 text-emerald-400 font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              SYSTEM STATUS: ONLINE
            </span>
            <span className="text-slate-600 hidden md:inline">|</span>
            <span className="text-slate-400 hidden md:inline">
              Chennai, India • Enterprise Full-Stack Engineering
            </span>
          </div>

          {/* Right Direct Communication Links */}
          <div className="flex items-center gap-6">
            <a 
              href="tel:+919944735841" 
              className="hover:text-brand-300 transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3 h-3 text-brand-400" />
              <span>+91 9944735841</span>
            </a>
            <a 
              href="mailto:digiworld384@gmail.com" 
              className="hover:text-brand-300 transition-colors hidden sm:flex items-center gap-1.5"
            >
              <Mail className="w-3 h-3 text-brand-400" />
              <span>digiworld384@gmail.com</span>
            </a>
          </div>

        </div>
      </div>

      {/* Main Primary Navigation Bar */}
      <div className={`transition-all duration-300 ${
        isScrolled 
          ? 'py-3 bg-dark-950/90 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-black/80' 
          : 'py-4 bg-dark-950/60 backdrop-blur-md border-b border-white/5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          
          {/* Logo Brand */}
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              navigateTo('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-rose-600 to-amber-500 p-[1.5px] shadow-lg shadow-brand-500/20 group-hover:shadow-brand-500/40 transition-all">
                <div className="w-full h-full bg-dark-900 rounded-[10px] flex items-center justify-center">
                  <Terminal className="w-5 h-5 text-brand-400 group-hover:scale-110 transition-transform" />
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center">
                DIGI<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-rose-400 to-brand-300">WORLD</span>
              </span>
              <span className="text-[9px] tracking-widest text-slate-400 uppercase font-mono font-semibold -mt-1">
                SOFTWARE SOLUTIONS
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] p-1.5 rounded-full border border-white/10 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 relative ${
                  link.highlight 
                    ? 'text-brand-300 hover:text-white bg-brand-500/10 hover:bg-brand-500/20 border border-brand-500/20' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
                {link.highlight && (
                  <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse"></span>
                )}
              </a>
            ))}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Dedicated Login Portal Link */}
            <button
              onClick={() => navigateTo('login')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all duration-200 ${
                isAdminLoggedIn || isClientLoggedIn
                  ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/40 shadow-lg shadow-emerald-950/50'
                  : 'bg-dark-900 border-white/10 text-slate-300 hover:border-brand-500/40 hover:text-brand-300 hover:bg-dark-850'
              }`}
            >
              {isAdminLoggedIn ? (
                <>
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Admin Dashboard</span>
                </>
              ) : isClientLoggedIn ? (
                <>
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Client Workspace</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Portal Login</span>
                </>
              )}

              {pendingQueriesCount > 0 && isAdminLoggedIn && (
                <span className="bg-brand-500 text-white text-[10px] px-1.5 py-0.5 rounded-md font-bold">
                  {pendingQueriesCount}
                </span>
              )}
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => openQuoteModal()}
              className="relative group overflow-hidden px-4.5 py-2 rounded-xl bg-gradient-to-r from-brand-600 via-rose-600 to-brand-500 text-white text-xs font-bold shadow-lg shadow-brand-600/30 hover:shadow-brand-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-200" />
              <span>Get Free Quote</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => navigateTo('login')}
              className="p-2 rounded-xl bg-dark-900 border border-white/10 text-slate-300 text-xs flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5 text-brand-400" />
              <span className="font-semibold text-[11px]">
                {isAdminLoggedIn ? 'Admin' : isClientLoggedIn ? 'Client' : 'Login'}
              </span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-dark-900 border border-white/10 text-slate-200 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-dark-950/98 backdrop-blur-2xl border-b border-white/10 px-4 py-5 mt-2 animate-in slide-in-from-top-3 duration-200">
            <div className="flex flex-col gap-1.5 max-w-md mx-auto">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:bg-brand-500/10 hover:text-brand-300 transition-colors flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  {link.highlight ? (
                    <span className="text-[10px] font-mono bg-brand-500/20 text-brand-300 px-2 py-0.5 rounded-md">Live Hub</span>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                  )}
                </a>
              ))}

              <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openQuoteModal();
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-600 to-rose-600 text-white font-bold text-xs text-center shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Request a Free Quote
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigateTo('login');
                  }}
                  className="w-full py-2.5 rounded-xl bg-dark-850 border border-white/10 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2"
                >
                  <Lock className="w-3.5 h-3.5 text-brand-400" />
                  {isAdminLoggedIn || isClientLoggedIn ? 'Open Account Workspace' : 'Portal Login'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
