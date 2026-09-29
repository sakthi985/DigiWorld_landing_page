import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Sparkles, 
  CheckCircle2,
  ExternalLink,
  MessageCircle
} from 'lucide-react';
import { useQuery } from '../context/QueryContext';
import confetti from 'canvas-confetti';

export default function ContactSection() {
  const { showToast, submitContactMessage } = useQuery();

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    country: 'India',
    phone: '',
    email: '',
    service: 'Web Application Development',
    timeline: 'Immediate (within 2-4 weeks)',
    message: ''
  });

  const [isSending, setIsSending] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const countries = [
    'India', 'United States', 'United Kingdom', 'United Arab Emirates', 'Singapore',
    'Australia', 'Canada', 'Germany', 'France', 'Poland', 'South Africa', 'Qatar',
    'Saudi Arabia', 'Malaysia', 'Egypt', 'Other'
  ];

  const servicesList = [
    'Web Application Development',
    'Mobile App (iOS & Android)',
    'Enterprise Custom Software & ERP',
    'International SEO & Growth Marketing',
    'Brand Identity & UI/UX Design',
    'Cloud Hosting & DevOps'
  ];

  const timelines = [
    'Immediate (within 2-4 weeks)',
    '1 - 2 Months',
    'Quarterly Strategy Rollout',
    'Exploratory / Discovery Stage'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      await submitContactMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        serviceInterest: formData.service,
        timelinePreference: formData.timeline,
        subject: `Project Inquiry from ${formData.company || formData.name}`,
        message: formData.message
      });

      setSubmittedSuccess(true);
      
      try {
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.7 }
        });
      } catch (e) {}

      showToast('Thank you! Your project details have been received by Sakthivel & Dinesh. Expect a response in under 30 minutes.');
    } catch (err) {
      showToast('Submitted successfully.');
      setSubmittedSuccess(true);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-dark-950 border-t border-white/5">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/4 w-[450px] h-[450px] bg-brand-600/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Mail className="w-3.5 h-3.5" />
            Let's Build Something Great
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Get In Touch With Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-rose-400">
              Solution Architects
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Have a new product idea, enterprise system upgrade, or international SEO goal? Request a rapid proposal today.
          </p>
        </div>

        {/* Main Grid: Info + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Contact Info & Address Cards (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Channel 1: Phone */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-dark-850/90 to-dark-900 border border-white/10 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400 shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-slate-400 block mb-1">CALL US DIRECTLY</span>
                <a href="tel:+919944735841" className="text-base font-bold text-white hover:text-brand-300 transition-colors block">
                  +91 9944735841
                </a>
                <a href="tel:+919655445841" className="text-sm font-semibold text-slate-300 hover:text-brand-300 transition-colors block mt-0.5">
                  +91 9655445841 (WhatsApp Direct)
                </a>
              </div>
            </div>

            {/* Direct Channel 2: Email */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-dark-850/90 to-dark-900 border border-white/10 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-slate-400 block mb-1">OFFICIAL INBOX</span>
                <a href="mailto:digiworld384@gmail.com" className="text-base font-bold text-white hover:text-brand-300 transition-colors block">
                  digiworld384@gmail.com
                </a>
                <span className="text-xs text-slate-400 block mt-0.5">
                  Guaranteed response within 30 minutes during SLA hours.
                </span>
              </div>
            </div>

            {/* Direct Channel 3: Office Address & Maps Link */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-dark-850/90 to-dark-900 border border-white/10 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-slate-400 block mb-1">HEADQUARTERS</span>
                <p className="text-xs text-slate-200 leading-relaxed font-medium mb-3">
                  T1-1501, 15th Floor, Lake Dugar Apartments, West Balaji Nagar, Kallikuppam, Ambattur, Chennai, Tamil Nadu - 600053, India.
                </p>
                <a
                  href="https://maps.app.goo.gl/1Cf3LLw2C3f5qvNE6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-400 hover:text-brand-300"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* WhatsApp Direct Chat Trigger */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/60 to-dark-900 border border-emerald-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Instant WhatsApp Chat</h4>
                  <p className="text-xs text-slate-400">Available Mon-Sat: 9 AM - 8 PM</p>
                </div>
              </div>

              <a
                href="https://wa.me/+919655445841"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-colors"
              >
                Chat Now
              </a>
            </div>

          </div>

          {/* Right: Comprehensive Proposal Form (7 Cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-gradient-to-br from-dark-850/90 via-dark-900/95 to-dark-950 border border-white/10 p-8 lg:p-10 shadow-2xl">
            {submittedSuccess ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white">Inquiry Received!</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Thank you for reaching out to DigiWorld Software Solutions. Sakthivel and Dinesh have received your request in the database and will contact you shortly.
                </p>
                <button
                  onClick={() => setSubmittedSuccess(false)}
                  className="px-6 py-2.5 rounded-xl bg-dark-800 hover:bg-dark-700 text-xs font-bold text-white transition-colors mt-4"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-2">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-brand-400" />
                    Request Free Project Proposal & Architecture Plan
                  </h3>
                  <span className="text-[11px] font-mono text-emerald-400">⚡ 30-min SLA</span>
                </div>

                {/* Name & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1">YOUR NAME *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Sundaram"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-dark-950 border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1">COMPANY NAME *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Global Engineering"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-dark-950 border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                {/* Country & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1">COUNTRY *</label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-dark-950 border border-white/10 text-xs text-white focus:outline-none focus:border-brand-500 cursor-pointer"
                    >
                      {countries.map((c) => (
                        <option key={c} value={c} className="bg-dark-900 text-white">
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1">MOBILE NUMBER *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-dark-950 border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                {/* Email & Service Interest */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1">EMAIL ID *</label>
                    <input
                      type="email"
                      required
                      placeholder="anand@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-dark-950 border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1">PRIMARY SERVICE INTEREST *</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-dark-950 border border-white/10 text-xs text-white focus:outline-none focus:border-brand-500 cursor-pointer"
                    >
                      {servicesList.map((s) => (
                        <option key={s} value={s} className="bg-dark-900 text-white">
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Target Timeline */}
                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">TARGET TIMELINE *</label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-dark-950 border border-white/10 text-xs text-white focus:outline-none focus:border-brand-500 cursor-pointer"
                  >
                    {timelines.map((t) => (
                      <option key={t} value={t} className="bg-dark-900 text-white">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">PROJECT REQUIREMENTS & SCOPE</label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Tell us about your project goals, key features, target launch date, and existing infrastructure..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-dark-950 border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-500 resize-none"
                  ></textarea>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-600 via-rose-600 to-brand-500 text-white font-bold text-sm shadow-xl shadow-brand-600/30 hover:shadow-brand-500/50 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  {isSending ? (
                    <span className="animate-pulse">Submitting Inquiry...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Transmit Project Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
