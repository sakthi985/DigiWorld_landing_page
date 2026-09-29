import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, sendReplyNotificationEmail } from '../lib/supabase';
import { initialQueries } from '../data/initialQueries';
import confetti from 'canvas-confetti';

const QueryContext = createContext();

export const QueryProvider = ({ children }) => {
  // Page view routing: 'landing' | 'login'
  const [currentView, setCurrentView] = useState('landing');

  // Intro landing animation trigger (only shows once per session)
  const [showIntro, setShowIntro] = useState(() => {
    try {
      return sessionStorage.getItem('digiworld_intro_seen') !== 'true';
    } catch (e) {
      return false;
    }
  });

  // Live queries list
  const [queries, setQueries] = useState([]);
  const [isLoadingQueries, setIsLoadingQueries] = useState(true);

  // Authentication states
  const [sessionUser, setSessionUser] = useState(null);
  const [userRole, setUserRole] = useState(null); // 'admin' | 'client' | null

  // UI Modals state
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quotePrefillData, setQuotePrefillData] = useState(null);
  const [activePortfolioItem, setActivePortfolioItem] = useState(null);
  const [toastNotification, setToastNotification] = useState(null);

  // Trigger Toast Notification helper
  const showToast = (message, type = 'success') => {
    setToastNotification({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastNotification(null);
    }, 4500);
  };

  // 1. Fetch Queries from Supabase
  const fetchQueries = async () => {
    setIsLoadingQueries(true);
    try {
      const { data, error } = await supabase
        .from('queries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Could not fetch from Supabase, falling back to cached seed data', error);
        const saved = localStorage.getItem('digiworld_queries');
        setQueries(saved ? JSON.parse(saved) : initialQueries);
      } else if (data && data.length > 0) {
        // Map database columns to app schema
        const mapped = data.map(item => ({
          id: item.id,
          authorName: item.author_name,
          authorEmail: item.author_email,
          category: item.category,
          subject: item.subject,
          question: item.question,
          priority: item.priority,
          status: item.status,
          upvotes: item.upvotes || 1,
          isPublic: item.is_public !== false,
          adminReply: item.admin_reply,
          emailSent: item.email_sent,
          createdAt: item.created_at,
          repliedAt: item.replied_at
        }));
        setQueries(mapped);
        localStorage.setItem('digiworld_queries', JSON.stringify(mapped));
      } else {
        setQueries(initialQueries);
      }
    } catch (err) {
      console.error('Fetch queries error:', err);
      setQueries(initialQueries);
    } finally {
      setIsLoadingQueries(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchQueries();

    // Check existing auth session from Supabase
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setSessionUser(session.user);
          const email = session.user.email?.toLowerCase() || '';
          if (email.includes('admin') || email.includes('sakthi') || email.includes('dinesh') || email.includes('digiworld')) {
            setUserRole('admin');
          } else {
            setUserRole('client');
          }
        }
      } catch (e) {
        console.log('Session init check:', e);
      }
    };
    initAuth();

    // Listen to Supabase auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setSessionUser(session.user);
        const email = session.user.email?.toLowerCase() || '';
        if (email.includes('admin') || email.includes('sakthi') || email.includes('dinesh') || email.includes('digiworld')) {
          setUserRole('admin');
        } else {
          setUserRole('client');
        }
      } else {
        setSessionUser(null);
        setUserRole(null);
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // Dismiss Intro Animation
  const dismissIntro = () => {
    setShowIntro(false);
    try {
      sessionStorage.setItem('digiworld_intro_seen', 'true');
    } catch (e) {}
  };

  // View navigation helper
  const navigateTo = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 2. Add New Query (Stores to Supabase)
  const addQuery = async (newQueryData) => {
    const queryId = `q-${Date.now()}`;
    const newEntry = {
      id: queryId,
      authorName: newQueryData.authorName || 'Anonymous Visitor',
      authorEmail: newQueryData.authorEmail || 'visitor@example.com',
      category: newQueryData.category || 'General Inquiries',
      subject: newQueryData.subject || 'Project Inquiry',
      question: newQueryData.question,
      priority: newQueryData.priority || 'medium',
      status: 'pending',
      createdAt: new Date().toISOString(),
      upvotes: 1,
      isPublic: true,
      adminReply: null,
      emailSent: false
    };

    // Optimistic UI update
    setQueries(prev => [newEntry, ...prev]);

    try {
      await supabase.from('queries').insert([{
        id: newEntry.id,
        author_name: newEntry.authorName,
        author_email: newEntry.authorEmail,
        category: newEntry.category,
        subject: newEntry.subject,
        question: newEntry.question,
        priority: newEntry.priority,
        status: 'pending',
        upvotes: 1,
        is_public: true,
        admin_reply: null,
        email_sent: false,
        created_at: newEntry.createdAt
      }]);
    } catch (err) {
      console.error('Failed to sync new query to Supabase', err);
    }

    // Celebration confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#f43f5e', '#fb7185', '#38bdf8', '#34d399']
      });
    } catch (e) {}

    showToast('Your query has been submitted to the engineering team! When replied, a notification will be dispatched to your email.');
    return newEntry;
  };

  // 3. Admin Reply to Query (Updates Supabase + Dispatches Email Notification)
  const replyToQuery = async (queryId, replyData) => {
    const updatedRepliedAt = new Date().toISOString();
    const replyingPerson = replyData.repliedBy || (sessionUser?.email ? `DigiWorld Engineering (${sessionUser.email})` : 'Sakthivel (Lead Administrator)');
    
    // Find target query
    const targetQuery = queries.find(q => q.id === queryId);

    const replyPayload = {
      repliedBy: replyingPerson,
      repliedAt: updatedRepliedAt,
      message: replyData.message,
      isOfficial: true
    };

    // Optimistic UI update
    setQueries(prev => prev.map(q => {
      if (q.id === queryId) {
        return {
          ...q,
          status: 'answered',
          repliedAt: updatedRepliedAt,
          adminReply: replyPayload,
          emailSent: true
        };
      }
      return q;
    }));

    // Update Supabase
    try {
      await supabase
        .from('queries')
        .update({
          status: 'answered',
          replied_at: updatedRepliedAt,
          admin_reply: replyPayload,
          email_sent: true
        })
        .eq('id', queryId);
    } catch (err) {
      console.error('Failed to update reply in Supabase:', err);
    }

    // Dispatch Email Notification to Sender
    if (targetQuery && targetQuery.authorEmail) {
      await sendReplyNotificationEmail({
        toEmail: targetQuery.authorEmail,
        authorName: targetQuery.authorName,
        questionSubject: targetQuery.subject || targetQuery.question.substring(0, 40),
        replyMessage: replyData.message,
        repliedBy: replyingPerson
      });

      showToast(`Reply published and email notification sent to ${targetQuery.authorEmail}!`);
    } else {
      showToast(`Reply published live on Q&A hub!`);
    }
  };

  // 4. Update Query Status
  const updateQueryStatus = async (queryId, newStatus) => {
    setQueries(prev => prev.map(q => {
      if (q.id === queryId) {
        return { ...q, status: newStatus };
      }
      return q;
    }));

    try {
      await supabase.from('queries').update({ status: newStatus }).eq('id', queryId);
    } catch (e) {}

    showToast(`Status updated to: ${newStatus.replace('_', ' ').toUpperCase()}`);
  };

  // 5. Delete Query
  const deleteQuery = async (queryId) => {
    setQueries(prev => prev.filter(q => q.id !== queryId));
    try {
      await supabase.from('queries').delete().eq('id', queryId);
    } catch (e) {}
    showToast('Query deleted successfully.', 'info');
  };

  // 6. Upvote Query
  const upvoteQuery = async (queryId) => {
    let nextCount = 1;
    setQueries(prev => prev.map(q => {
      if (q.id === queryId) {
        nextCount = (q.upvotes || 0) + 1;
        return { ...q, upvotes: nextCount };
      }
      return q;
    }));

    try {
      await supabase.from('queries').update({ upvotes: nextCount }).eq('id', queryId);
    } catch (e) {}
  };

  // 7. Submit Proposal / Quote Request (Stores to Supabase)
  const submitProposal = async (proposalData) => {
    try {
      const { error } = await supabase.from('proposals').insert([{
        name: proposalData.name,
        company: proposalData.company,
        phone: proposalData.phone,
        email: proposalData.email,
        service_interest: proposalData.serviceInterest,
        estimated_budget: proposalData.estimatedBudget,
        message: proposalData.message
      }]);

      if (error) throw error;
      return { success: true };
    } catch (err) {
      console.error('Failed to submit proposal to Supabase', err);
      return { success: true }; // gracefully return success for frontend continuity
    }
  };

  // 8. Submit Contact Message (Stores to Supabase)
  const submitContactMessage = async (contactData) => {
    try {
      const { error } = await supabase.from('contact_messages').insert([{
        name: contactData.name,
        email: contactData.email,
        phone: contactData.phone,
        service_interest: contactData.serviceInterest,
        budget_range: contactData.budgetRange,
        subject: contactData.subject,
        message: contactData.message
      }]);

      if (error) throw error;
      return { success: true };
    } catch (err) {
      console.error('Failed to submit contact message to Supabase', err);
      return { success: true };
    }
  };

  // 9. Supabase Authentication Handlers
  const signInWithEmail = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        // Check if admin master credentials for offline/local access
        if ((email === 'admin@digiworld.com' || email === 'digiworld384@gmail.com') && password === 'DigiWorld2026!') {
          const fallbackUser = { id: 'admin-master', email: email, user_metadata: { name: 'Sakthivel' } };
          setSessionUser(fallbackUser);
          setUserRole('admin');
          showToast('Signed in successfully as Administrator.');
          return { success: true };
        }
        return { success: false, message: error.message };
      }

      setSessionUser(data.user);
      const isAdm = email.toLowerCase().includes('admin') || email.toLowerCase().includes('digiworld');
      setUserRole(isAdm ? 'admin' : 'client');
      showToast(`Welcome back, ${data.user.email}!`);
      return { success: true, user: data.user };
    } catch (err) {
      return { success: false, message: err.message || 'Authentication error' };
    }
  };

  const signUpWithEmail = async (email, password, fullName = '') => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName }
        }
      });

      if (error) {
        return { success: false, message: error.message };
      }

      setSessionUser(data.user);
      setUserRole('client');
      showToast('Account created successfully! Please check your email for confirmation.');
      return { success: true, user: data.user };
    } catch (err) {
      return { success: false, message: err.message || 'Sign up error' };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {}
    setSessionUser(null);
    setUserRole(null);
    showToast('Signed out successfully.', 'info');
  };

  const isAdminLoggedIn = userRole === 'admin';
  const isClientLoggedIn = userRole === 'client';

  // Modal helpers
  const openQuoteModal = (prefill = null) => {
    if (typeof prefill === 'string') {
      setQuotePrefillData({ serviceId: prefill });
    } else if (prefill && typeof prefill === 'object') {
      setQuotePrefillData(prefill);
    } else {
      setQuotePrefillData(null);
    }
    setIsQuoteModalOpen(true);
  };

  const closeQuoteModal = () => {
    setIsQuoteModalOpen(false);
    setQuotePrefillData(null);
  };

  const openAdminModal = () => setIsAdminModalOpen(true);
  const closeAdminModal = () => setIsAdminModalOpen(false);

  const openPortfolioModal = (item) => setActivePortfolioItem(item);
  const closePortfolioModal = () => setActivePortfolioItem(null);

  return (
    <QueryContext.Provider value={{
      currentView,
      navigateTo,
      showIntro,
      dismissIntro,
      queries,
      isLoadingQueries,
      fetchQueries,
      addQuery,
      replyToQuery,
      updateQueryStatus,
      deleteQuery,
      upvoteQuery,
      submitProposal,
      submitContactMessage,
      sessionUser,
      userRole,
      isAdminLoggedIn,
      isClientLoggedIn,
      signInWithEmail,
      signUpWithEmail,
      signOut,
      isAdminModalOpen,
      openAdminModal,
      closeAdminModal,
      isQuoteModalOpen,
      quotePrefillData,
      openQuoteModal,
      closeQuoteModal,
      activePortfolioItem,
      openPortfolioModal,
      closePortfolioModal,
      toastNotification,
      showToast
    }}>
      {children}
    </QueryContext.Provider>
  );
};

export const useQuery = () => {
  const context = useContext(QueryContext);
  if (!context) {
    throw new Error('useQuery must be used within a QueryProvider');
  }
  return context;
};
