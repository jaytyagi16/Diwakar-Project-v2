import React, { useState } from 'react';
import { Clipboard, Phone, RefreshCw, Truck, AlertTriangle, Pencil, Zap, X } from 'lucide-react';

interface QuickActionsProps {
  onAction: (actionName: string) => void;
  step: number;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onAction, step }) => {
  const [isOpen, setIsOpen] = useState(false);

  // ONLY show on Step 3 (Investigation) and Step 4 (Settlement)
  // Step 1 is Claimant view, Step 2 is Manager view
  if (step < 3) return null;

  const actions = [
    { id: 'docs', label: 'Request Docs', icon: <Clipboard size={24} className="text-blue-500" />, title: "Request additional documents" },
    { id: 'call', label: 'Call Claimant', icon: <Phone size={24} className="text-green-500" />, title: "Initiate call" },
    { id: 'appraisal', label: 'Appraisal', icon: <Truck size={24} className="text-purple-500" />, title: "Order vehicle appraisal" },
    { id: 'reassign', label: 'Reassign', icon: <RefreshCw size={24} className="text-orange-500" />, title: "Reassign claim" },
    { id: 'flag', label: 'Flag SIU', icon: <AlertTriangle size={24} className="text-red-500" />, title: "Escalate to SIU" },
    { id: 'note', label: 'Add Note', icon: <Pencil size={24} className="text-gray-500" />, title: "Add internal note" },
  ];

  const handleActionClick = (label: string) => {
    onAction(label);
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Button - Pill Shape */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-24 left-6 h-14 px-6 rounded-full shadow-2xl flex items-center justify-center gap-2 z-[100] transition-all duration-300 transform 
          ${isOpen 
            ? 'bg-gray-800 dark:bg-gray-700 text-white' 
            : 'bg-gradient-to-tr from-brand-600 to-blue-600 text-white hover:shadow-brand-500/50 hover:scale-105'
          }`}
        title="Quick Actions"
      >
        {isOpen ? <X size={20} /> : <Zap size={20} className={isOpen ? '' : 'animate-pulse'} />}
        <span className="font-bold text-sm">Actions</span>
      </button>

      {/* Expanded Panel */}
      <div 
        className={`fixed bottom-40 left-6 w-[280px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.15)] border border-gray-100 dark:border-gray-700 overflow-hidden z-[99] transition-all duration-300 origin-bottom-left
          ${isOpen 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-90 translate-y-10 pointer-events-none'
          }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-gray-800">
          <h3 className="font-bold text-gray-900 dark:text-white text-sm flex items-center">
            <Zap size={14} className="mr-2 text-brand-500" />
            Quick Actions
          </h3>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <X size={16} />
          </button>
        </div>
        
        <div className="p-4 grid grid-cols-3 gap-3">
          {actions.map((action) => (
            <button
              key={action.id}
              onClick={() => handleActionClick(action.label)}
              title={action.title}
              className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
            >
              <div className="mb-2 p-3 rounded-full bg-gray-50 dark:bg-gray-800 group-hover:bg-white dark:group-hover:bg-gray-700 shadow-sm group-hover:shadow-md transition-all icon-hover">
                {action.icon}
              </div>
              <span className="text-[10px] font-semibold text-center leading-tight text-gray-600 dark:text-gray-300 group-hover:text-brand-600 dark:group-hover:text-brand-400">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Backdrop for mobile to close when clicking outside */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[90]" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default QuickActions;