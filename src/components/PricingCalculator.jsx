import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  ArrowRight, 
  Calculator, 
  Zap
} from 'lucide-react';
import { companyData } from '../data/companyData';
import { useQuery } from '../context/QueryContext';

export default function PricingCalculator() {
  const { openQuoteModal } = useQuery();
  const [activeView, setActiveView] = useState('packages'); // 'packages' | 'calculator'

  // Interactive Estimator state
  const [pagesCount, setPagesCount] = useState(8);
  const [needAuth, setNeedAuth] = useState(true);
  const [needPayment, setNeedPayment] = useState(false);
  const [needMobileApp, setNeedMobileApp] = useState(false);
  const [seoTier, setSeoTier] = useState('advanced'); // 'none' | 'basic' | 'advanced'
  const [urgency, setUrgency] = useState('standard'); // 'standard' | 'rush'

  // Calculate dynamic estimate
  const calculateEstimate = () => {
    let base = 12000;
    // Page cost
    base += (pagesCount - 5) * 1200;
    // Auth & roles
    if (needAuth) base += 8000;
    // Payment Gateway
    if (needPayment) base += 6500;
    // Mobile companion app
    if (needMobileApp) base += 32000;
    // SEO tier
    if (seoTier === 'basic') base += 5000;
    if (seoTier === 'advanced') base += 14000;
    // Urgency rush
    if (urgency === 'rush') base = Math.round(base * 1.25);

    return Math.max(10000, base);
  };

  const estimatedPrice = calculateEstimate();

  const handleCustomQuote = () => {
    const addons = [];
    if (needAuth) addons.push('User Auth & Admin Panel');
    if (needPayment) addons.push('Payment Gateway');
    if (needMobileApp) addons.push('Mobile App');
    if (seoTier !== 'none') addons.push(`SEO (${seoTier})`);

    openQuoteModal({
      serviceId: `Custom Web Project (${pagesCount} Pages)`,
      price: `₹${estimatedPrice.toLocaleString('en-IN')}`,
      details: `Custom Scope: ${pagesCount} Pages. Add-ons: ${addons.join(', ')}. Estimated Budget: ₹${estimatedPrice.toLocaleString('en-IN')}`
    });
  };

  return (
    <section id="pricing" className="py-24 relative bg-dark-950 border-t border-b border-white/5">
      {/* Background Glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-brand-600/10 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Investment Plans &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-rose-400">
              Interactive Estimator
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Choose a standardized package or use our real-time interactive calculator to estimate your bespoke project cost.
          </p>

          {/* View Toggle */}
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-dark-900 border border-white/10 mt-8">
            <button
              onClick={() => setActiveView('packages')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeView === 'packages'
                  ? 'bg-gradient-to-r from-brand-600 to-rose-600 text-white shadow-lg shadow-brand-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Standard Packages
            </button>
            <button
              onClick={() => setActiveView('calculator')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                activeView === 'calculator'
                  ? 'bg-gradient-to-r from-brand-600 to-rose-600 text-white shadow-lg shadow-brand-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Interactive Cost Calculator</span>
            </button>
          </div>
        </div>

        {/* View 1: Standard Packages Grid */}
        {activeView === 'packages' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyData.pricingPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-3xl p-6 lg:p-7 flex flex-col justify-between relative transition-all duration-300 border ${
                  pkg.popular
                    ? 'bg-gradient-to-b from-brand-950/60 via-dark-850 to-dark-950 border-brand-500/60 shadow-xl shadow-brand-500/20 scale-[1.02]'
                    : 'bg-gradient-to-b from-dark-850/80 to-dark-950 border-white/10 hover:border-white/20'
                }`}
              >
                {pkg.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-500 to-rose-500 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow-md tracking-wider">
                    {pkg.badge}
                  </div>
                )}

                <div>
                  <span className="text-xs font-mono text-slate-400 block mb-1">
                    {pkg.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    {pkg.desc}
                  </p>

                  <div className="mb-6 pt-4 border-t border-white/10">
                    <span className="text-3xl font-extrabold text-white tracking-tight">
                      {pkg.price}
                    </span>
                    <span className="text-xs text-slate-400 block mt-1">
                      Range: {pkg.priceRange}
                    </span>
                    <span className="text-[11px] font-mono text-brand-300 mt-1 block">
                      ⚡ Timeline: {pkg.timeline}
                    </span>
                  </div>

                  {/* Feature List */}
                  <div className="space-y-2.5 mb-8">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                      Included:
                    </span>
                    {pkg.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-mono text-slate-400 mb-4 bg-dark-950 p-2.5 rounded-xl border border-white/5 truncate">
                    Stack: {pkg.techStack}
                  </div>

                  <button
                    onClick={() => openQuoteModal({
                      serviceId: pkg.name,
                      price: pkg.price,
                      details: `Selected ${pkg.name} package. Included: ${pkg.features.join(', ')}. Tech Stack: ${pkg.techStack}`
                    })}
                    className={`w-full py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-brand-600 to-rose-600 text-white shadow-lg shadow-brand-500/30 hover:scale-[1.02]'
                        : 'bg-dark-900 hover:bg-dark-800 border border-white/10 text-slate-200 hover:text-white'
                    }`}
                  >
                    <span>Choose {pkg.name.split(' ')[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View 2: Interactive Real-Time Cost Estimator */}
        {activeView === 'calculator' && (
          <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-dark-850/90 via-dark-900/95 to-dark-950 border border-white/10 p-8 lg:p-12 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Configuration Sliders (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* 1. Pages Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold font-mono text-slate-300">
                      NUMBER OF CUSTOM PAGES
                    </label>
                    <span className="text-sm font-bold text-brand-400 bg-brand-500/10 px-2.5 py-0.5 rounded-lg border border-brand-500/20">
                      {pagesCount} Pages
                    </span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="30"
                    step="1"
                    value={pagesCount}
                    onChange={(e) => setPagesCount(Number(e.target.value))}
                    className="w-full h-2 bg-dark-950 rounded-lg appearance-none cursor-pointer accent-brand-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                    <span>3 Pages (Landing)</span>
                    <span>15 Pages (Corporate)</span>
                    <span>30+ (Portal)</span>
                  </div>
                </div>

                {/* 2. Authentication & Admin Panel */}
                <div className="p-4 rounded-xl bg-dark-950/80 border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">User Auth & Admin Dashboard</span>
                    <span className="text-[11px] text-slate-400">Multi-role permissions, secure JWT login, content management</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={needAuth}
                    onChange={(e) => setNeedAuth(e.target.checked)}
                    className="w-5 h-5 accent-brand-500 rounded cursor-pointer"
                  />
                </div>

                {/* 3. Payment Gateway Integration */}
                <div className="p-4 rounded-xl bg-dark-950/80 border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">eCommerce & Payment Gateway</span>
                    <span className="text-[11px] text-slate-400">Razorpay, Stripe, UPI checkout, order management & receipts</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={needPayment}
                    onChange={(e) => setNeedPayment(e.target.checked)}
                    className="w-5 h-5 accent-brand-500 rounded cursor-pointer"
                  />
                </div>

                {/* 4. Native / Flutter Companion App */}
                <div className="p-4 rounded-xl bg-dark-950/80 border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">Mobile App Companion (iOS + Android)</span>
                    <span className="text-[11px] text-slate-400">Cross-platform Flutter mobile app synced with backend</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={needMobileApp}
                    onChange={(e) => setNeedMobileApp(e.target.checked)}
                    className="w-5 h-5 accent-brand-500 rounded cursor-pointer"
                  />
                </div>

                {/* 5. SEO Tier */}
                <div>
                  <label className="text-xs font-bold font-mono text-slate-300 block mb-2">
                    SEO & DIGITAL MARKETING PACKAGE
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'none', label: 'Basic Meta Only' },
                      { id: 'basic', label: 'On-Page SEO' },
                      { id: 'advanced', label: 'Global Rank #1 SEO' },
                    ].map((tier) => (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => setSeoTier(tier.id)}
                        className={`p-2.5 rounded-xl text-xs font-semibold border transition-all ${
                          seoTier === tier.id
                            ? 'bg-brand-500/20 border-brand-500/50 text-brand-300'
                            : 'bg-dark-950 border-white/5 text-slate-400 hover:text-white'
                        }`}
                      >
                        {tier.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Live Estimate Output Box (5 Cols) */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl bg-gradient-to-br from-brand-950/70 via-dark-900 to-dark-950 border border-brand-500/40 p-8 shadow-xl text-center flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold mb-4">
                      <Zap className="w-3.5 h-3.5" />
                      Instant Dynamic Estimate
                    </div>

                    <span className="text-slate-400 text-xs block mb-2">
                      Estimated Project Investment
                    </span>

                    <div className="text-4xl lg:text-5xl font-black text-white tracking-tight mb-2">
                      ₹{estimatedPrice.toLocaleString('en-IN')}
                    </div>

                    <span className="text-xs font-mono text-brand-300 block mb-6">
                      Estimated Delivery: {pagesCount > 15 ? '18 - 25 Days' : '7 - 12 Days'}
                    </span>

                    <div className="bg-dark-950/80 p-4 rounded-xl border border-white/5 text-left text-xs space-y-2 mb-6 text-slate-300">
                      <div className="flex justify-between">
                        <span>Pages Count:</span>
                        <span className="font-bold text-white">{pagesCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Admin/Auth:</span>
                        <span className="font-bold text-white">{needAuth ? 'Included' : 'No'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Payments:</span>
                        <span className="font-bold text-white">{needPayment ? 'Active Gateway' : 'None'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Mobile Companion:</span>
                        <span className="font-bold text-white">{needMobileApp ? 'iOS + Android' : 'None'}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCustomQuote}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-600 via-rose-600 to-brand-500 text-white font-bold text-sm shadow-xl shadow-brand-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <span>Lock In This Quotation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
