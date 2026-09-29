import React, { useState } from 'react';
import { 
  Lock, 
  UserCheck, 
  Terminal, 
  ArrowLeft, 
  ShieldCheck, 
  Key, 
  Mail, 
  Eye, 
  EyeOff, 
  Sparkles, 
  CheckCircle2, 
  Briefcase, 
  Clock, 
  LogOut, 
  UserPlus,
  AlertCircle,
  MessageSquare,
  Search,
  Send,
  Trash2,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { useQuery } from '../context/QueryContext';

export default function LoginPage() {
  const { 
    navigateTo, 
    sessionUser,
    userRole,
    isAdminLoggedIn, 
    isClientLoggedIn,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    openQuoteModal,
    queries,
    replyToQuery,
    deleteQuery,
    fetchQueries
  } = useQuery();

  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Admin Dashboard State
  const [activeTabFilter, setActiveTabFilter] = useState('pending'); // 'all' | 'pending' | 'answered'
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedReplyQueryId, setSelectedReplyQueryId] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [replyingStaff, setReplyingStaff] = useState('Dinesh (Technical Lead & Architect)');
  const [isSyncing, setIsSyncing] = useState(false);

  // Count pending queries for admin telemetry
  const pendingQueries = queries.filter(q => q.status === 'pending').length;
  const answeredQueries = queries.filter(q => q.status === 'answered').length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      if (mode === 'signin') {
        const res = await signInWithEmail(email, password);
        if (!res.success) {
          setErrorMessage(res.message || 'Invalid email or password. Please try again.');
        }
      } else {
        const res = await signUpWithEmail(email, password, fullName);
        if (!res.success) {
          setErrorMessage(res.message || 'Could not create account. Please check your details.');
        } else {
          setSuccessMessage('Account created! You can now sign in or check your verification email.');
        }
      }
    } catch (err) {
      setErrorMessage('An unexpected authentication error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendReply = async (queryId) => {
    if (!replyMessage.trim()) return;
    await replyToQuery(queryId, {
      repliedBy: replyingStaff,
      message: replyMessage
    });
    setReplyMessage('');
    setSelectedReplyQueryId(null);
  };

  const handleManualSync = async () => {
    setIsSyncing(true);
    await fetchQueries();
    setTimeout(() => setIsSyncing(false), 500);
  };

  // Filtered queries in admin view
  const filteredQueries = queries.filter(q => {
    if (activeTabFilter === 'pending' && q.status === 'answered') return false;
    if (activeTabFilter === 'answered' && q.status !== 'answered') return false;

    if (searchFilter) {
      const s = searchFilter.toLowerCase();
      return (
        (q.authorName && q.authorName.toLowerCase().includes(s)) ||
        (q.authorEmail && q.authorEmail.toLowerCase().includes(s)) ||
        (q.question && q.question.toLowerCase().includes(s)) ||
        (q.subject && q.subject.toLowerCase().includes(s))
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 relative flex flex-col justify-between overflow-x-hidden selection:bg-brand-500 selection:text-white">
      
      {/* Background Cyber Grids */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Header Bar */}
      <header className="relative z-20 border-b border-white/10 bg-dark-950/80 backdrop-blur-xl py-4 px-6 sm:px-12 flex items-center justify-between">
        <button
          onClick={() => navigateTo('landing')}
          className="group flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-500/40 text-xs font-semibold text-slate-300 hover:text-white transition-all"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-brand-400" />
          <span>Back to Main Website</span>
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-700 to-rose-500 p-[1px] flex items-center justify-center shadow-lg shadow-brand-500/20">
            <div className="w-full h-full bg-dark-900 rounded-[7px] flex items-center justify-center">
              <Terminal className="w-4 h-4 text-brand-400" />
            </div>
          </div>
          <span className="font-extrabold text-lg tracking-tight">
            DIGI<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-rose-500">WORLD</span>
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>SUPABASE AUTH & DATABASE SECURED</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 container mx-auto px-4 py-8 max-w-6xl flex-1 flex items-center justify-center">
        
        {/* Authenticated View */}
        {sessionUser ? (
          isAdminLoggedIn ? (
            /* 1. COMPREHENSIVE ADMIN DASHBOARD */
            <div className="w-full bg-dark-900/95 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl shadow-black/80 animate-in fade-in zoom-in-95 duration-200">
              
              {/* Dashboard Top Row */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-brand-400">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      Admin Control Dashboard
                      <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                        Live Database Connected
                      </span>
                    </h2>
                    <p className="text-xs text-slate-400 font-mono">
                      Logged in as: <span className="text-brand-300 font-semibold">{sessionUser.email}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleManualSync}
                    disabled={isSyncing}
                    className="px-3 py-2 rounded-xl bg-dark-950 hover:bg-dark-850 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-all"
                    title="Sync with Supabase"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-brand-400 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>Sync DB</span>
                  </button>

                  <button
                    onClick={() => navigateTo('landing')}
                    className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-1.5 transition-all"
                  >
                    <span>View Public Site</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={signOut}
                    className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 hover:text-rose-300 border border-rose-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all text-rose-400"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 my-6">
                <div className="bg-dark-950/80 border border-white/10 p-4 rounded-2xl">
                  <span className="text-xs text-slate-400 block mb-1">Total Database Inquiries</span>
                  <span className="text-2xl font-black text-white">{queries.length}</span>
                </div>
                <div className="bg-dark-950/80 border border-brand-500/30 p-4 rounded-2xl">
                  <span className="text-xs text-brand-300 block mb-1">Awaiting Response</span>
                  <span className="text-2xl font-black text-brand-400">{pendingQueries}</span>
                </div>
                <div className="bg-dark-950/80 border border-emerald-500/30 p-4 rounded-2xl">
                  <span className="text-xs text-emerald-300 block mb-1">Answered & Emailed</span>
                  <span className="text-2xl font-black text-emerald-400">{answeredQueries}</span>
                </div>
                <div className="bg-dark-950/80 border border-white/10 p-4 rounded-2xl">
                  <span className="text-xs text-slate-400 block mb-1">Auto Email Dispatch</span>
                  <span className="text-sm font-bold text-emerald-400 flex items-center gap-1 mt-2">
                    <CheckCircle2 className="w-4 h-4" /> ACTIVE ON REPLY
                  </span>
                </div>
              </div>

              {/* Filter & Search Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-dark-950/60 rounded-2xl border border-white/5 mb-6">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setActiveTabFilter('pending')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      activeTabFilter === 'pending'
                        ? 'bg-brand-500 text-white'
                        : 'bg-dark-900 text-slate-400 hover:text-white border border-white/5'
                    }`}
                  >
                    Pending ({pendingQueries})
                  </button>
                  <button
                    onClick={() => setActiveTabFilter('answered')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      activeTabFilter === 'answered'
                        ? 'bg-brand-500 text-white'
                        : 'bg-dark-900 text-slate-400 hover:text-white border border-white/5'
                    }`}
                  >
                    Answered ({answeredQueries})
                  </button>
                  <button
                    onClick={() => setActiveTabFilter('all')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      activeTabFilter === 'all'
                        ? 'bg-brand-500 text-white'
                        : 'bg-dark-900 text-slate-400 hover:text-white border border-white/5'
                    }`}
                  >
                    All ({queries.length})
                  </button>
                </div>

                <div className="relative w-full sm:w-72">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by author, subject, or email..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-dark-900 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              {/* Queries List */}
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                {filteredQueries.length === 0 ? (
                  <div className="p-12 text-center bg-dark-950/40 rounded-2xl border border-white/5">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                    <p className="text-sm font-bold text-white">All caught up!</p>
                    <p className="text-xs text-slate-400 mt-1">No inquiries match the current filter.</p>
                  </div>
                ) : (
                  filteredQueries.map((query) => {
                    const isReplying = selectedReplyQueryId === query.id;
                    const isAnswered = query.status === 'answered' && query.adminReply;

                    return (
                      <div
                        key={query.id}
                        className={`rounded-2xl border p-5 transition-all ${
                          isAnswered 
                            ? 'bg-dark-950/70 border-white/10' 
                            : 'bg-dark-950 border-brand-500/40 shadow-lg'
                        }`}
                      >
                        {/* Header */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center">
                              {query.authorName ? query.authorName.charAt(0) : 'V'}
                            </div>
                            <div>
                              <span className="text-xs font-bold text-white">
                                {query.authorName}
                              </span>
                              <span className="text-[11px] text-slate-400 ml-2 font-mono">
                                &lt;{query.authorEmail}&gt;
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-dark-900 text-slate-400 border border-white/5">
                              {query.category}
                            </span>
                            {isAnswered ? (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                Answered & Emailed
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold animate-pulse">
                                Pending Reply
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Subject & Question */}
                        <div className="mb-4">
                          <h4 className="text-sm font-bold text-white mb-1">
                            {query.subject}
                          </h4>
                          <p className="text-xs text-slate-300 leading-relaxed bg-dark-900 p-3 rounded-xl border border-white/5">
                            {query.question}
                          </p>
                        </div>

                        {/* Existing Official Reply */}
                        {isAnswered && (
                          <div className="mb-4 p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-1.5 text-xs">
                            <div className="flex items-center justify-between text-emerald-300 font-bold">
                              <span className="flex items-center gap-1.5">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                                Official Response by: {query.adminReply.repliedBy}
                              </span>
                              <span className="text-[10px] font-mono text-slate-400">
                                {new Date(query.adminReply.repliedAt || Date.now()).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-slate-200">
                              {query.adminReply.message}
                            </p>
                            <div className="pt-1 flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                              <Mail className="w-3 h-3" />
                              <span>Response notification dispatched to {query.authorEmail}</span>
                            </div>
                          </div>
                        )}

                        {/* Reply Form */}
                        {isReplying ? (
                          <div className="mt-4 p-4 rounded-xl bg-dark-900 border border-brand-500/50 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-brand-300 flex items-center gap-1.5">
                                <Mail className="w-3.5 h-3.5 text-brand-400" />
                                Drafting Official Response (Will email &lt;{query.authorEmail}&gt;):
                              </span>
                              <select
                                value={replyingStaff}
                                onChange={(e) => setReplyingStaff(e.target.value)}
                                className="bg-dark-950 border border-white/10 text-[11px] text-white px-2 py-1 rounded-lg"
                              >
                                <option value="Dinesh (Technical Lead & Architect)">Dinesh (Technical Lead & Architect)</option>
                                <option value="Sakthivel (Business Head & Strategy Lead)">Sakthivel (Business Head & Strategy Lead)</option>
                                <option value="Ranjith (Project Manager)">Ranjith (Project Manager)</option>
                              </select>
                            </div>

                            <textarea
                              rows="3"
                              placeholder="Type technical advice, timeline estimate, or architecture recommendation..."
                              value={replyMessage}
                              onChange={(e) => setReplyMessage(e.target.value)}
                              className="w-full p-3 rounded-xl bg-dark-950 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500 resize-none"
                            ></textarea>

                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => setSelectedReplyQueryId(null)}
                                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleSendReply(query.id)}
                                className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-rose-600 text-white font-bold text-xs shadow-md shadow-brand-500/30 flex items-center gap-1.5"
                              >
                                <Send className="w-3.5 h-3.5" />
                                <span>Publish Reply & Send Email Notification</span>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
                            <button
                              onClick={() => {
                                setSelectedReplyQueryId(query.id);
                                setReplyMessage(query.adminReply ? query.adminReply.message : '');
                              }}
                              className="px-3.5 py-1.5 rounded-lg bg-brand-500 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-brand-600 transition-colors"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>{query.adminReply ? 'Edit Reply & Re-send Email' : 'Reply & Email Sender Now'}</span>
                            </button>

                            <button
                              onClick={() => deleteQuery(query.id)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 transition-colors"
                              title="Delete from Database"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}

                      </div>
                    );
                  })
                )}
              </div>

            </div>
          ) : (
            /* 2. CLIENT WORKSPACE */
            <div className="w-full max-w-2xl bg-dark-900/90 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl shadow-black/80 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-lg">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      {sessionUser.user_metadata?.full_name || sessionUser.email}
                      <span className="text-xs font-normal px-2 py-0.5 rounded-md border bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                        Client Account
                      </span>
                    </h2>
                    <p className="text-xs text-slate-400 font-mono">{sessionUser.email}</p>
                  </div>
                </div>

                <button
                  onClick={signOut}
                  className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-rose-500/20 hover:text-rose-300 border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-all text-slate-300"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </div>

              <div className="mt-6 space-y-6">
                <div className="bg-dark-950/70 border border-white/10 rounded-xl p-5">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-mono uppercase text-brand-400 font-bold flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5" /> Client Portal Overview
                    </span>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      CONNECTED
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">Custom Project Dashboard</h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Your account is connected to DigiWorld Software Solutions production systems.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => {
                      navigateTo('landing');
                      setTimeout(() => {
                        const el = document.getElementById('query-hub');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-rose-600 hover:from-brand-500 hover:to-rose-500 text-white font-bold text-sm shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2 transition-all"
                  >
                    Ask a Direct Project Query
                  </button>
                  <button
                    onClick={() => openQuoteModal()}
                    className="py-3 px-5 rounded-xl bg-dark-800 hover:bg-dark-750 border border-white/10 text-slate-200 font-semibold text-sm flex items-center justify-center gap-2 transition-all"
                  >
                    <Sparkles className="w-4 h-4 text-brand-400" />
                    Request Custom Proposal
                  </button>
                </div>
              </div>
            </div>
          )
        ) : (
          /* 3. Real Authentication Form (Zero Pre-typed / Demo artifact free) */
          <div className="w-full max-w-md bg-dark-900/90 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl shadow-black/80">
            
            {/* Mode Switcher */}
            <div className="flex bg-dark-950/80 p-1 rounded-xl border border-white/10 mb-6">
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setErrorMessage('');
                  setSuccessMessage('');
                }}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  mode === 'signin'
                    ? 'bg-brand-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                Sign In
              </button>
              
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setErrorMessage('');
                  setSuccessMessage('');
                }}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  mode === 'signup'
                    ? 'bg-brand-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                Create Account
              </button>
            </div>

            {/* Form Title */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-black tracking-tight text-white">
                {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {mode === 'signin' 
                  ? 'Sign in to access your DigiWorld account & management portal' 
                  : 'Register for project tracking and direct engineering consultations'}
              </p>
            </div>

            {/* Error / Success Feedback */}
            {errorMessage && (
              <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="mb-5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rajesh Kumar"
                    className="w-full bg-dark-950/80 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-dark-950/80 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full bg-dark-950/80 border border-white/10 rounded-xl pl-10 pr-11 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded bg-dark-950 border-white/20 text-brand-600 focus:ring-brand-500"
                  />
                  <span>Remember session</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-600 via-rose-600 to-brand-500 hover:from-brand-500 hover:to-rose-500 text-white font-bold text-sm shadow-lg shadow-brand-600/30 hover:shadow-brand-500/50 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-2"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Authenticating...
                  </span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>{mode === 'signin' ? 'Sign In to Portal' : 'Register Account'}</span>
                  </>
                )}
              </button>
            </form>

          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-20 py-4 px-6 border-t border-white/10 text-center text-xs text-slate-500 font-mono">
        © 2026 DigiWorld Software Solutions • Enterprise Portal • Chennai, India
      </footer>
    </div>
  );
}
