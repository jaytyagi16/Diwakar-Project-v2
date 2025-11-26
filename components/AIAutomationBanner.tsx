import React from 'react';
import { Sparkles, BrainCircuit, Zap, ShieldCheck } from 'lucide-react';

const AIAutomationBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-brand-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-4 border border-brand-100 dark:border-gray-700 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm text-brand-600 dark:text-brand-400">
          <BrainCircuit size={20} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center">
            AI Analysis Active
            <span className="flex h-2 w-2 relative ml-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400">Processing claims data in real-time</p>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-4 text-xs font-medium text-gray-600 dark:text-gray-300 flex-wrap justify-center">
         <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-700 rounded-full shadow-sm border border-gray-100 dark:border-gray-600">
            <Sparkles size={14} className="text-purple-500" />
            <span>Policy Match</span>
         </div>
         <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-700 rounded-full shadow-sm border border-gray-100 dark:border-gray-600">
            <Zap size={14} className="text-amber-500" />
            <span>Fraud Check</span>
         </div>
         <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-700 rounded-full shadow-sm border border-gray-100 dark:border-gray-600">
            <ShieldCheck size={14} className="text-green-500" />
            <span>Compliance</span>
         </div>
      </div>
    </div>
  );
};

export default AIAutomationBanner;