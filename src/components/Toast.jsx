import React from 'react';
import { CheckCircle2, AlertCircle, Info, Sparkles, X } from 'lucide-react';
import { useQuery } from '../context/QueryContext';

export default function Toast() {
  const { toastNotification } = useQuery();

  if (!toastNotification) return null;

  const { message, type } = toastNotification;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />;
      default:
        return <Sparkles className="w-5 h-5 text-brand-400 shrink-0" />;
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 max-w-md animate-in slide-in-from-bottom-5 duration-300">
      <div className="p-4 rounded-2xl bg-dark-900/95 border border-brand-500/40 text-white shadow-2xl backdrop-blur-xl flex items-start gap-3">
        {getIcon()}
        <div className="text-xs leading-relaxed text-slate-200">
          {message}
        </div>
      </div>
    </div>
  );
}
