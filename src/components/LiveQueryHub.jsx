import React, { useState } from 'react';
import { 
  MessageSquareCode, 
  Send, 
  Search, 
  ThumbsUp, 
  CheckCircle2, 
  Clock, 
  Mail, 
  HelpCircle,
  MessageCircle,
  ShieldCheck
} from 'lucide-react';
import { useQuery } from '../context/QueryContext';

export default function LiveQueryHub() {
  const { 
    queries, 
    addQuery, 
    upvoteQuery, 
    isLoadingQueries
  } = useQuery();

  // Form State
  const [formData, setFormData] = useState({
    authorName: '',
    authorEmail: '',
    category: 'Web & SaaS Architecture',
    subject: '',
    question: '',
    priority: 'medium'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hasVotedMap, setHasVotedMap] = useState({});

  const categories = [
    'Web & SaaS Architecture',
    'Mobile App Development',
    'Enterprise Software & ERP',
    'International SEO & Google Ads',
    'Project Scope & Timeline',
    'Cloud Hosting & Security'
  ];

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.question.trim()) return;

    setIsSubmitting(true);
    try {
      await addQuery(formData);
      setFormData({
        authorName: '',
        authorEmail: '',
        category: 'Web & SaaS Architecture',
        subject: '',
        question: '',
        priority: 'medium'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Upvote handler
  const handleUpvote = (queryId) => {
    if (hasVotedMap[queryId]) return;
    upvoteQuery(queryId);
    setHasVotedMap(prev => ({ ...prev, [queryId]: true }));
  };

  // Filter public queries
  const publicQueries = queries.filter(q => q.isPublic !== false);

  const filteredQueries = publicQueries.filter(q => {
    const matchesCategory = activeCategoryFilter === 'all' || q.category === activeCategoryFilter;
    const matchesSearch = 
      (q.question && q.question.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (q.subject && q.subject.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (q.authorName && q.authorName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (q.adminReply && q.adminReply.message && q.adminReply.message.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="query-hub" className="py-24 relative bg-dark-950">
      {/* Background Lighting */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-brand-600/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-bold uppercase tracking-wider mb-4">
              <MessageSquareCode className="w-3.5 h-3.5" />
              Live Interactive Hub
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Ask Engineering Team &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-rose-400">
                Live Q&A Stream
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
            <ShieldCheck className="w-4 h-4" />
            <span>DIRECT LEAD ARCHITECT CONSULTATION</span>
          </div>
        </div>

        {/* 2-Column Layout: Left Form + Right Live Stream */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Ask a Question Form (5 Cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-dark-850/90 via-dark-900/95 to-dark-950 border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Post an Engineering Query</h3>
                  <p className="text-[11px] text-slate-400">Direct response from lead architects with email dispatch</p>
                </div>
              </div>

              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-slate-300 block mb-1">YOUR NAME *</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.authorName}
                      onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-slate-300 block mb-1">EMAIL ID (For Reply) *</label>
                  <input
                    type="email"
                    required
                    placeholder="ramesh@company.com"
                    value={formData.authorEmail}
                    onChange={(e) => setFormData({ ...formData, authorEmail: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-500 transition-colors"
                  />
                </div>
              </div>

              {/* Category Dropdown */}
              <div>
                <label className="text-[11px] font-mono text-slate-300 block mb-1">TOPIC / SERVICE CATEGORY *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-xs text-white focus:outline-none focus:border-brand-500 transition-colors cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="bg-dark-900 text-white">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject Title */}
              <div>
                <label className="text-[11px] font-mono text-slate-300 block mb-1">SUBJECT / HEADLINE *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Scaling Flutter app to 50k users"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-500 transition-colors"
                />
              </div>

              {/* Question Textarea */}
              <div>
                <label className="text-[11px] font-mono text-slate-300 block mb-1">DETAILED QUESTION *</label>
                <textarea
                  required
                  rows="4"
                  placeholder="Ask anything about architecture, timelines, tech stack, database schema, or enterprise scope..."
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-500 transition-colors resize-none"
                ></textarea>
              </div>

              {/* Urgency Priority */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] font-mono text-slate-400">PRIORITY LEVEL:</span>
                <div className="flex gap-2">
                  {['low', 'medium', 'high'].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setFormData({ ...formData, priority: p })}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-mono uppercase font-bold border transition-all ${
                        formData.priority === p
                          ? p === 'high' 
                            ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' 
                            : 'bg-brand-500/20 text-brand-300 border-brand-500/40'
                          : 'bg-dark-950 border-white/5 text-slate-500'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-600 via-rose-600 to-brand-500 text-white font-bold text-xs shadow-lg shadow-brand-600/30 hover:shadow-brand-500/50 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-4"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Transmitting Query...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Query to Lead Architects</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Live Stream Feed (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Search and Filters Bar */}
            <div className="p-4 rounded-2xl bg-dark-900/90 border border-white/10 space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search questions by keyword, topic, or technical answers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-dark-950 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
                />
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <button
                  onClick={() => setActiveCategoryFilter('all')}
                  className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                    activeCategoryFilter === 'all'
                      ? 'bg-brand-500 text-white'
                      : 'bg-dark-950 text-slate-400 hover:text-white border border-white/5'
                  }`}
                >
                  All ({publicQueries.length})
                </button>
                {categories.map((cat) => {
                  const count = publicQueries.filter(q => q.category === cat).length;
                  if (count === 0) return null;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategoryFilter(cat)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                        activeCategoryFilter === cat
                          ? 'bg-brand-500 text-white'
                          : 'bg-dark-950 text-slate-400 hover:text-white border border-white/5'
                      }`}
                    >
                      {cat.split(' ')[0]} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Questions Stream List */}
            <div className="space-y-4">
              {filteredQueries.length === 0 ? (
                <div className="p-12 text-center rounded-3xl bg-dark-900/60 border border-white/5">
                  <HelpCircle className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                  <p className="text-sm text-slate-300 font-semibold">No questions found matching your filter.</p>
                  <p className="text-xs text-slate-500 mt-1">Be the first to ask a query using the form on the left!</p>
                </div>
              ) : (
                filteredQueries.map((query) => {
                  const isAnswered = query.status === 'answered' && query.adminReply;
                  const hasUpvoted = hasVotedMap[query.id];

                  return (
                    <div
                      key={query.id}
                      className="rounded-2xl bg-gradient-to-br from-dark-850/80 to-dark-900 border border-white/10 p-6 hover:border-brand-500/40 transition-all duration-200 shadow-lg space-y-4"
                    >
                      {/* Query Header: Author, Category & Status Badge */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-brand-600 to-rose-500 flex items-center justify-center text-white text-xs font-bold">
                            {query.authorName ? query.authorName.charAt(0) : 'V'}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-white block">
                              {query.authorName}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {query.category} • {new Date(query.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div>
                          {isAnswered ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                              <CheckCircle2 className="w-3 h-3" />
                              Answered by DigiWorld
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-[10px] font-bold">
                              <Clock className="w-3 h-3" />
                              In Queue for Review
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Question Content */}
                      <div>
                        <h4 className="text-sm font-bold text-white mb-1.5">
                          {query.subject}
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {query.question}
                        </p>
                      </div>

                      {/* Verified Admin Reply Card */}
                      {isAnswered && (
                        <div className="mt-3 p-4 rounded-xl bg-gradient-to-r from-dark-950 via-brand-950/30 to-dark-950 border border-brand-500/30 space-y-2">
                          <div className="flex items-center justify-between pb-2 border-b border-white/5">
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 rounded-md bg-brand-500 flex items-center justify-center text-white">
                                <ShieldCheck className="w-3.5 h-3.5" />
                              </div>
                              <span className="text-xs font-bold text-brand-300">
                                {query.adminReply.repliedBy}
                              </span>
                              <span className="text-[10px] bg-brand-500/20 text-brand-200 px-1.5 py-0.2 rounded font-mono">
                                Official Solution
                              </span>
                            </div>

                            <span className="text-[10px] text-slate-500 font-mono">
                              {new Date(query.adminReply.repliedAt || Date.now()).toLocaleDateString()}
                            </span>
                          </div>

                          <p className="text-xs text-slate-200 leading-relaxed">
                            {query.adminReply.message}
                          </p>

                          <div className="pt-1 flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                            <Mail className="w-3 h-3" />
                            <span>Response notification dispatched to author</span>
                          </div>
                        </div>
                      )}

                      {/* Footer Actions: Upvote & Meta */}
                      <div className="flex items-center justify-between pt-2 text-xs text-slate-400">
                        <button
                          onClick={() => handleUpvote(query.id)}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border transition-all ${
                            hasUpvoted
                              ? 'bg-brand-500/20 border-brand-500/40 text-brand-300'
                              : 'bg-dark-950 border-white/5 text-slate-400 hover:text-white hover:border-white/20'
                          }`}
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>Helpful ({query.upvotes || 0})</span>
                        </button>
                      </div>

                    </div>
                  );
                })
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
