import React from 'react';
import { Clipboard, Phone, RefreshCw, Truck, AlertTriangle, Pencil, Zap } from 'lucide-react';

interface QuickActionsProps {
  onAction: (actionName: string) => void;
}

// Converted to a contained component for the SideDock panel
const QuickActions: React.FC<QuickActionsProps> = ({ onAction }) => {
  const actions = [
    { id: 'docs', label: 'Request Docs', icon: <Clipboard size={24} className="text-blue-500" />, title: "Request additional documents" },
    { id: 'call', label: 'Call Claimant', icon: <Phone size={24} className="text-green-500" />, title: "Initiate call" },
    { id: 'appraisal', label: 'Appraisal', icon: <Truck size={24} className="text-purple-500" />, title: "Order vehicle appraisal" },
    { id: 'reassign', label: 'Reassign', icon: <RefreshCw size={24} className="text-orange-500" />, title: "Reassign claim" },
    { id: 'flag', label: 'Flag SIU', icon: <AlertTriangle size={24} className="text-red-500" />, title: "Escalate to SIU" },
    { id: 'note', label: 'Add Note', icon: <Pencil size={24} className="text-gray-500" />, title: "Add internal note" },
  ];

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
        <h3 className="font-bold text-gray-900 dark:text-white text-base flex items-center">
          <Zap size={18} className="mr-2 text-brand-500" />
          Quick Actions
        </h3>
      </div>
      
      <div className="p-4 grid grid-cols-2 gap-4 overflow-y-auto">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => onAction(action.label)}
            title={action.title}
            className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 group shadow-sm"
          >
            <div className="mb-3 p-3 rounded-full bg-gray-50 dark:bg-gray-800 group-hover:bg-white dark:group-hover:bg-gray-700 shadow-sm group-hover:shadow-md transition-all icon-hover">
              {action.icon}
            </div>
            <span className="text-xs font-bold text-center leading-tight text-gray-700 dark:text-gray-200 group-hover:text-brand-600 dark:group-hover:text-brand-400">
              {action.label}
            </span>
          </button>
        ))}
      </div>
      
      <div className="p-4 mt-auto border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
        <p className="text-xs text-center text-gray-500">
          Actions are logged to the audit trail immediately.
        </p>
      </div>
    </div>
  );
};

export default QuickActions;