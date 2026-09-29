import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Trash2, 
  Eye, 
  EyeOff, 
  Mail,
  LogOut, 
  RefreshCw, 
  AlertCircle,
  MessageSquare,
  Search
} from 'lucide-react';
import { useQuery } from '../context/QueryContext';

export default function AdminConsoleModal() {
  const { 
    isAdminModalOpen, 
    closeAdminModal, 
    isAdminLoggedIn, 
    sessionUser,
    signInWithEmail, 
    signOut,
    queries, 
    replyToQuery, 
    fetchQueries,
    updateQueryStatus, 
    deleteQuery
  } = useQuery();

  // Login form state (zero pre-typed values)
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Admin view state
  const [activeTabFilter, setActiveTabFilter] = useState('pending'); // 'all' | 'pending' | 'answered'
  const [selectedQueryId, setSelectedQueryId] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [replyingStaff, setReplyingStaff] = useState('Dinesh (Technical Lead & Architect)');
  const [searchFilter, setSearchFilter] = useState('');

  if (!isAdminModalOpen) return null;

  // Handle Login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const res = await signInWithEmail(emailInput, passwordInput);
      if (!res.success) {
        setLoginError(res.message || 'Invalid credentials. Please verify your admin email & password.');
      }
    } catch (err) {
      setLoginError('Authentication failed. Please check network connectivity.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle Reply Submit (Dispatches email to sender via context)
  const handleSendReply = async (queryId) => {
    if (!replyMessage.trim()) return;
    await replyToQuery(queryId, {
      repliedBy: replyingStaff,
      message: replyMessage
    });
    setReplyMessage('');
    setSelectedQueryId(null);
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

  const pendingCount = queries.filter(q => q.status === 'pending').length;
  const answeredCount = queries.filter(q => q.status === 'answered').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      
      {/* Modal Card */}
      <div className="w-full max-w-5xl max-h-[90vh] bg-dark-950 border border-brand-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col relative">
        
        {/* Modal Top Header Bar */}
        <div className="px-6 py-4 bg-dark-900 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-500/20 border border-brand-500/40 flex items-center justify-center text-brand-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                DigiWorld Admin In-Page Response Console
                {isAdminLoggedIn && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                    Supabase Connected
                  </span>
                )}
              </h3>
              <p className="text-xs text-slate-400">
                Manage visitor inquiries, publish answers & dispatch email notifications directly to clients
              </p>
            </div>
          </div>

          <button
            onClick={closeAdminModal}
            className="p-2 rounded-xl bg-dark-800 hover:bg-dark-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* BODY AREA */}
        {!isAdminLoggedIn ? (
          /* 1. ADMIN AUTHENTICATION FORM */
          <div className="p-8 sm:p-12 overflow-y-auto max-w-lg mx-auto w-full my-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-rose-500 flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-brand-500/30">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <h4 className="text-2xl font-extrabold text-white mb-2">
              Administrator Authentication
            </h4>
            <p className="text-xs text-slate-400 mb-8">
              Sign in with your DigiWorld administrative account to manage live database queries.
            </p>

            {loginError && (
              <div className="p-3 mb-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 text-left">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1">ADMIN EMAIL</label>
                <input
                  type="email"
                  required
                  placeholder="admin@digiworld.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-dark-900 border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-500 font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1">PASSWORD</label>
                <input
                  type="password"
                  required
                  placeholder="Enter admin password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-dark-900 border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-500 font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-600 to-rose-600 text-white font-bold text-xs shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 transition-all flex items-center justify-center gap-2 mt-2"
              >
                {isLoggingIn ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Authenticating...
                  </span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Sign In to Admin Workspace</span>
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* 2. ADMIN DASHBOARD & QUERY MANAGEMENT */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Admin Metrics & Filter Subheader */}
            <div className="px-6 py-3 bg-dark-900/60 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Admin Account:</span>
                <span className="font-bold text-white bg-dark-800 px-2.5 py-1 rounded-lg border border-white/10 font-mono">
                  {sessionUser?.email || 'Sakthivel (Admin)'}
                </span>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTabFilter('pending')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    activeTabFilter === 'pending'
                      ? 'bg-brand-500 text-white'
                      : 'bg-dark-900 text-slate-400 hover:text-white border border-white/5'
                  }`}
                >
                  Pending ({pendingCount})
                </button>

                <button
                  onClick={() => setActiveTabFilter('answered')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    activeTabFilter === 'answered'
                      ? 'bg-brand-500 text-white'
                      : 'bg-dark-900 text-slate-400 hover:text-white border border-white/5'
                  }`}
                >
                  Answered ({answeredCount})
                </button>

                <button
                  onClick={() => setActiveTabFilter('all')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    activeTabFilter === 'all'
                      ? 'bg-brand-500 text-white'
                      : 'bg-dark-900 text-slate-400 hover:text-white border border-white/5'
                  }`}
                >
                  All Inquiries ({queries.length})
                </button>
              </div>

              {/* Admin Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={fetchQueries}
                  className="p-1.5 rounded-lg bg-dark-900 hover:bg-dark-800 border border-white/10 text-slate-400 hover:text-white flex items-center gap-1 text-xs"
                  title="Refresh from Supabase Database"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Sync</span>
                </button>
                <button
                  onClick={signOut}
                  className="px-2.5 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 font-semibold flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Main Content Area: Scrollable Query List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              
              {/* Search input in Admin */}
              <div className="relative mb-2">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter inquiries by name, question keyword, or email..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-dark-900 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
                />
              </div>

              {filteredQueries.length === 0 ? (
                <div className="p-12 text-center bg-dark-900/40 rounded-2xl border border-white/5">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <p className="text-sm font-bold text-white">All caught up!</p>
                  <p className="text-xs text-slate-400 mt-1">No pending inquiries matching this filter.</p>
                </div>
              ) : (
                filteredQueries.map((query) => {
                  const isSelectedForReply = selectedQueryId === query.id;
                  const isAnswered = query.status === 'answered';

                  return (
                    <div
                      key={query.id}
                      className={`rounded-2xl border p-5 transition-all ${
                        isAnswered
                          ? 'bg-dark-900/70 border-white/10'
                          : 'bg-dark-900 border-brand-500/40 shadow-lg'
                      }`}
                    >
                      {/* Query Metadata Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
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
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-dark-950 text-slate-400 border border-white/5">
                            {query.category}
                          </span>

                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                            query.priority === 'high' 
                              ? 'bg-rose-500/20 text-rose-300' 
                              : 'bg-dark-950 text-slate-400'
                          }`}>
                            {(query.priority || 'NORMAL').toUpperCase()}
                          </span>

                          {isAnswered ? (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              Answered & Dispatched
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold animate-pulse">
                              Pending Reply
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Subject & Detailed Question */}
                      <div className="mb-4">
                        <h4 className="text-sm font-bold text-white mb-1">
                          {query.subject}
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed bg-dark-950 p-3.5 rounded-xl border border-white/5">
                          {query.question}
                        </p>
                      </div>

                      {/* Existing Admin Reply View */}
                      {query.adminReply && (
                        <div className="mb-4 p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-1.5 text-xs">
                          <div className="flex items-center justify-between text-emerald-300 font-bold">
                            <span className="flex items-center gap-1.5">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                              Official Reply by: {query.adminReply.repliedBy}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400">
                              {new Date(query.adminReply.repliedAt || Date.now()).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-slate-200">
                            {query.adminReply.message}
                          </p>
                          <div className="pt-1 flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                            <Mail className="w-3 h-3" />
                            <span>Notification email dispatched to {query.authorEmail}</span>
                          </div>
                        </div>
                      )}

                      {/* Reply Form Box */}
                      {isSelectedForReply ? (
                        <div className="mt-4 p-4 rounded-xl bg-dark-950 border border-brand-500/50 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-brand-300 flex items-center gap-1.5">
                              <Mail className="w-3.5 h-3.5 text-brand-400" />
                              Drafting Official Response (Will automatically email &lt;{query.authorEmail}&gt;):
                            </span>
                            <select
                              value={replyingStaff}
                              onChange={(e) => setReplyingStaff(e.target.value)}
                              className="bg-dark-900 border border-white/10 text-[11px] text-white px-2 py-1 rounded-lg"
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
                            className="w-full p-3 rounded-xl bg-dark-900 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500 resize-none"
                          ></textarea>

                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setSelectedQueryId(null)}
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
                        /* Admin Row Actions */
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10 text-xs">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setSelectedQueryId(query.id);
                                if (query.adminReply) {
                                  setReplyMessage(query.adminReply.message);
                                } else {
                                  setReplyMessage('');
                                }
                              }}
                              className="px-3.5 py-1.5 rounded-lg bg-brand-500 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-brand-600 transition-colors"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>{query.adminReply ? 'Edit Official Reply' : 'Write Reply & Email Sender'}</span>
                            </button>
                          </div>

                          <button
                            onClick={() => deleteQuery(query.id)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 transition-colors"
                            title="Delete Inquiry from Database"
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
        )}

      </div>
    </div>
  );
}
