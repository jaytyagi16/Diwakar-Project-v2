
import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastProps {
  toast: ToastMessage;
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, 3000);
    return () => clearTimeout(timer);
  }, [toast.id, onClose]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success': return <CheckCircle size={18} className="text-green-500" />;
      case 'error': return <AlertCircle size={18} className="text-red-500" />;
      default: return <Info size={18} className="text-blue-500" />;
    }
  };

  const getBorderColor = () => {
    switch (toast.type) {
      case 'success': return 'border-l-green-500';
      case 'error': return 'border-l-red-500';
      default: return 'border-l-blue-500';
    }
  };

  return (
    <div className={`
      flex items-center p-4 mb-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg 
      border-l-4 ${getBorderColor()} border-t border-r border-b border-gray-100 dark:border-gray-700
      animate-[slideInRight_0.3s_ease] min-w-[300px] pointer-events-auto
    `}>
      <div className="mr-3">
        {getIcon()}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{toast.message}</p>
      </div>
      <button 
        onClick={() => onClose(toast.id)}
        className="ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;
