import React from 'react';
import { X, Bell } from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'info' | 'default';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Invoice analysis complete',
    message: '3 items flagged for review',
    time: 'Just now',
    read: false,
  },
  {
    id: '2',
    type: 'info',
    title: 'Claimant uploaded 2 new photos',
    message: 'Tap to view details',
    time: '5 min ago',
    read: false,
  },
  {
    id: '3',
    type: 'default',
    title: 'Claim assigned to you',
    message: 'By Michael Chen',
    time: '32 min ago',
    read: true,
  },
];

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[49] bg-transparent" onClick={onClose} />
      <div className="absolute top-16 right-4 md:right-20 w-80 md:w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-[50] animate-fade-in overflow-hidden origin-top-right">
        <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Bell size={16} className="text-brand-500" />
            <span className="font-bold text-gray-900 dark:text-white">Notifications</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <X size={18} />
          </button>
        </div>
        
        <div className="max-h-[400px] overflow-y-auto">
          {notifications.map((notif) => (
            <div key={notif.id} className={`p-4 border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors cursor-pointer relative
              ${!notif.read ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''}
            `}>
              {!notif.read && (
                <span className="absolute top-5 left-2 w-2 h-2 rounded-full bg-blue-500"></span>
              )}
              <div className="pl-4">
                <div className="flex justify-between items-start mb-1">
                   <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{notif.title}</h4>
                   <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">{notif.time}</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{notif.message}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700 flex justify-between">
           <button className="text-xs font-medium text-brand-600 dark:text-brand-400 hover:underline">Mark all as read</button>
           <button className="text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">View history</button>
        </div>
      </div>
    </>
  );
};

export default NotificationPanel;