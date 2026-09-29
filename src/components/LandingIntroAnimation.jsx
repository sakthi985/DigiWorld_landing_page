import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Shield, Cpu, Zap, ArrowRight, FastForward } from 'lucide-react';
import { useQuery } from '../context/QueryContext';

export default function LandingIntroAnimation() {
  const { showIntro, dismissIntro } = useQuery();
  const [progress, setProgress] = useState(0);
  const [bootStep, setBootStep] = useState(0);

  const bootLogs = [
    { text: "INITIALIZING DIGIWORLD CORE KERNEL v4.2...", icon: Cpu },
    { text: "LOADING HIGH-CONCURRENCY REACT RUNTIMES...", icon: Zap },
    { text: "ESTABLISHING ENCRYPTED CLIENT GATEWAYS...", icon: Shield },
    { text: "CONNECTING LIVE Q&A ENGINE & ADMIN TELEMETRY...", icon: Terminal },
    { text: "SYSTEM NOMINAL — READY FOR NEXT-GEN DEPLOYMENT.", icon: ArrowRight }
  ];

  useEffect(() => {
    if (!showIntro) return;

    // Fast numerical progress loader
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Accelerating progress curve
        const step = prev < 40 ? 4 : prev < 80 ? 6 : 8;
        return Math.min(prev + step, 100);
      });
    }, 45);

    return () => clearInterval(interval);
  }, [showIntro]);

  useEffect(() => {
    if (!showIntro) return;

    // Step logger sync
    if (progress >= 15 && bootStep === 0) setBootStep(1);
    if (progress >= 40 && bootStep === 1) setBootStep(2);
    if (progress >= 70 && bootStep === 2) setBootStep(3);
    if (progress >= 95 && bootStep === 3) setBootStep(4);

    if (progress === 100) {
      const timer = setTimeout(() => {
        dismissIntro();
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [progress, bootStep, showIntro, dismissIntro]);

  // Handle ESC key to skip
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showIntro) {
        dismissIntro();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showIntro, dismissIntro]);

  if (!showIntro) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="intro-splash"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, y: -40, filter: "blur(12px)" }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark-950 text-white select-none overflow-hidden"
      >
        {/* Ambient Glowing Orbs */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-brand-600/15 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-rose-600/15 rounded-full blur-3xl pointer-events-none"></div>

        {/* Matrix Grid Lines Background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>

        {/* Skip Button */}
        <div className="absolute top-6 right-6 z-20">
          <button
            onClick={dismissIntro}
            className="group px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-500/40 text-xs font-semibold text-slate-300 hover:text-white transition-all flex items-center gap-2 backdrop-blur-md"
          >
            <span>Skip Intro</span>
            <FastForward className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-brand-400" />
            <kbd className="hidden sm:inline-block text-[10px] text-slate-500 bg-black/40 px-1.5 py-0.5 rounded border border-white/10">ESC</kbd>
          </button>
        </div>

        {/* Top Status Telemetry */}
        <div className="absolute top-8 left-8 hidden sm:flex items-center gap-2 text-xs font-mono text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>DIGIWORLD_INITIALIZER // BUILD 2026.4</span>
        </div>

        {/* Center Emblem & Logo Animation */}
        <div className="relative z-10 max-w-lg w-full px-6 flex flex-col items-center text-center">
          
          {/* Animated Logo Frame */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative mb-6"
          >
            {/* Spinning Neural Glow Rings */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-brand-500 via-rose-500 to-amber-500 opacity-30 blur-lg animate-pulse"></div>
            
            <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-dark-900 via-dark-850 to-dark-950 border border-brand-500/40 p-1 flex items-center justify-center shadow-2xl shadow-brand-500/20">
              <div className="w-full h-full rounded-xl bg-dark-900/90 flex items-center justify-center relative overflow-hidden">
                <Terminal className="w-10 h-10 text-brand-400" />
                
                {/* Light streak sweep */}
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                  className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
                />
              </div>
            </div>
          </motion.div>

          {/* Typography */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-1">
              DIGI<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-rose-400 to-brand-300">WORLD</span>
            </h1>
            <p className="text-xs sm:text-sm font-semibold tracking-widest text-slate-400 uppercase">
              Software Solutions & Next-Gen Cloud Architecture
            </p>
          </motion.div>

          {/* Progress Bar Container */}
          <div className="w-full max-w-md mt-8 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono text-slate-400 px-1">
              <span className="flex items-center gap-1.5 text-brand-400">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse"></span>
                BOOTING STACK
              </span>
              <span className="font-bold text-white">{progress}%</span>
            </div>

            {/* Bar Track */}
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/10 backdrop-blur-md">
              <motion.div
                className="h-full bg-gradient-to-r from-brand-600 via-rose-500 to-amber-400 rounded-full shadow-lg shadow-brand-500/50"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Live Diagnostic Terminal Feed */}
          <div className="w-full max-w-md mt-6 bg-dark-900/80 border border-white/10 rounded-xl p-3.5 backdrop-blur-md text-left">
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/5 text-[11px] font-mono text-slate-400">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-rose-500/80"></div>
                <div className="w-2 h-2 rounded-full bg-amber-500/80"></div>
                <div className="w-2 h-2 rounded-full bg-emerald-500/80"></div>
              </div>
              <span className="text-slate-500 ml-1">telemetry.log</span>
            </div>

            <div className="space-y-1.5 font-mono text-xs text-slate-300 min-h-[3.5rem] flex flex-col justify-end">
              {bootLogs.slice(0, bootStep + 1).map((log, index) => {
                const IconComponent = log.icon;
                const isCurrent = index === bootStep;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex items-center gap-2 ${isCurrent ? 'text-brand-300 font-semibold' : 'text-slate-400'}`}
                  >
                    <IconComponent className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                    <span className="truncate text-[11px] sm:text-xs">{log.text}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Location & Certifications footer */}
          <div className="mt-8 flex items-center justify-center gap-4 text-[11px] text-slate-500 font-mono">
            <span>CHENNAI, INDIA</span>
            <span>•</span>
            <span>ISO COMPLIANT AGILE</span>
            <span>•</span>
            <span>ENTERPRISE GRADE</span>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
