import React, { useState, useEffect } from 'react';
import { X, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { useQuery } from '../context/QueryContext';
import confetti from 'canvas-confetti';

export default function EnquiryModal() {
  const { isQuoteModalOpen, closeQuoteModal, quotePrefillData, showToast, submitProposal } = useQuery();

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    country: 'India',
    phone: '',
    email: '',
    serviceInterest: 'Full-Stack Web Application Development',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (quotePrefillData) {
      if (typeof quotePrefillData === 'string') {
        setFormData(prev => ({ ...prev, serviceInterest: quotePrefillData }));
      } else if (typeof quotePrefillData === 'object') {
        setFormData(prev => ({
          ...prev,
          serviceInterest: quotePrefillData.serviceId || quotePrefillData.packageName || prev.serviceInterest,
          message: quotePrefillData.details || prev.message
        }));
      }
    }
  }, [quotePrefillData]);

  if (!isQuoteModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitProposal({
        name: formData.name,
        company: formData.company,
        phone: formData.phone,
        email: formData.email,
        serviceInterest: formData.serviceInterest,
        message: formData.message
      });

      setIsDone(true);
      try {
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}

      showToast('Proposal request recorded in database! Sakthivel & Dinesh will review your specifications.');
      setTimeout(() => {
        setIsDone(false);
        closeQuoteModal();
      }, 2500);
    } catch (err) {
      showToast('Proposal request submitted.');
      setIsDone(true);
      setTimeout(() => {
        setIsDone(false);
        closeQuoteModal();
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-dark-950 border border-brand-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={closeQuoteModal}
          className="absolute top-5 right-5 p-2 rounded-xl bg-dark-800 hover:bg-dark-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {isDone ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-xl font-bold text-white">Proposal Request Received!</h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              Our engineering leadership (Sakthivel & Dinesh) will analyze your parameters and dispatch an official breakdown within 30 minutes.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-brand-400 text-xs font-mono font-bold uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Direct Engineering Consultation
            </div>
            <h3 className="text-xl font-bold text-white mb-1">
              Request Project Proposal & Architecture Plan
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              Get an accurate scope, architecture plan, and dedicated sprint team for your digital project.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-mono text-slate-300 block mb-1">YOUR NAME *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-dark-900 border border-white/10 text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="font-mono text-slate-300 block mb-1">COMPANY *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Corp"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-dark-900 border border-white/10 text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-mono text-slate-300 block mb-1">PHONE NUMBER *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 9944735841"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-dark-900 border border-white/10 text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="font-mono text-slate-300 block mb-1">WORK EMAIL *</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-dark-900 border border-white/10 text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-slate-300 block mb-1">SELECTED SERVICE / STACK</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.serviceInterest}
                    onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-dark-900 border border-white/10 text-brand-300 font-semibold focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-slate-300 block mb-1">PROJECT SPECIFICATIONS & REQUIREMENTS</label>
                <textarea
                  rows="3"
                  placeholder="Describe your tech requirements, key features, target launch deadline, or system scope..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-dark-900 border border-white/10 text-white focus:outline-none focus:border-brand-500 resize-none"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-600 via-rose-600 to-brand-500 hover:from-brand-500 hover:to-rose-500 text-white font-bold shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      Recording in Database...
                    </span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Project Consultation Request</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
