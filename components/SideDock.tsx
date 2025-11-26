import React, { useState } from 'react';
import { Zap, MessageSquare, HelpCircle, X, MapPin } from 'lucide-react';
import FloatingChat from './FloatingChat';
import QuickActions from './QuickActions';

interface SideDockProps {
  currentStep: number;
  onAction: (actionName: string) => void;
  onTimelineClick: () => void;
  isTimelineOpen?: boolean;
}

const SideDock: React.FC<SideDockProps> = ({ currentStep, onAction, onTimelineClick, isTimelineOpen }) => {
  const [activePanel, setActivePanel] = useState<'chat' | 'actions' | 'help' | null>(null);

  const togglePanel = (panel: 'chat' | 'actions' | 'help') => {
    setActivePanel(prev => prev === panel ? null : panel);
  };

  const closePanel = () => setActivePanel(null);

  // Show Quick Actions only on Step 3 (Investigation) and Step 4 (Settlement)
  const showActions = currentStep >= 3;
  
  // Show Timeline only on Step 2+
  const showTimeline = currentStep >= 2;

  // Collapse dock if any internal panel is open OR external timeline is open
  const isCollapsed = activePanel !== null || isTimelineOpen;

  return (
    <>
      {/* Side Dock Container */}
      <div className={`side-dock ${isCollapsed ? 'collapsed' : ''}`}>
        
        {/* Quick Actions Button */}
        {showActions && (
          <button
            onClick={() => togglePanel('actions')}
            className={`dock-btn actions-btn ${activePanel === 'actions' ? 'active' : ''}`}
            data-tooltip="Quick Actions"
            aria-label="Quick Actions"
          >
            <Zap size={22} className="icon" />
          </button>
        )}

        {/* AI Chat Button */}
        <button
          onClick={() => togglePanel('chat')}
          className={`dock-btn chat-btn ${activePanel === 'chat' ? 'active' : ''}`}
          data-tooltip="AI Assistant"
          aria-label="AI Assistant"
        >
          <MessageSquare size={22} className="icon" />
          {/* Notification Badge (simulated) */}
          <span className="notification-dot"></span>
        </button>

         {/* Timeline Button */}
         {showTimeline && (
           <button
            onClick={onTimelineClick}
            className={`dock-btn timeline-btn ${isTimelineOpen ? 'active' : ''}`}
            data-tooltip="View Timeline"
            aria-label="View Timeline"
          >
            <MapPin size={22} className="icon" />
          </button>
         )}

        {/* Help Button */}
        <button
          onClick={() => togglePanel('help')}
          className={`dock-btn help-btn ${activePanel === 'help' ? 'active' : ''}`}
          data-tooltip="Help & Tips"
          aria-label="Help & Tips"
        >
          <HelpCircle size={22} className="icon" />
        </button>
      </div>

      {/* Backdrop Overlay */}
      {activePanel && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[90] transition-opacity duration-300"
          onClick={closePanel}
        />
      )}

      {/* Slide-in Panels */}
      
      {/* 1. Quick Actions Panel */}
      <div className={`fixed top-0 right-0 h-full w-[300px] bg-white dark:bg-gray-900 shadow-[-8px_0_32px_rgba(0,0,0,0.2)] z-[101] transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${activePanel === 'actions' ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full relative border-l border-gray-100 dark:border-gray-800">
           <button 
             onClick={closePanel}
             className="absolute top-4 right-4 z-10 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
           >
             <X size={20} />
           </button>
           <QuickActions onAction={(action) => { onAction(action); closePanel(); }} />
        </div>
      </div>

      {/* 2. Chat Panel */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[380px] bg-white dark:bg-gray-900 shadow-[-8px_0_32px_rgba(0,0,0,0.2)] z-[101] transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${activePanel === 'chat' ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full relative border-l border-gray-100 dark:border-gray-800">
           <button 
             onClick={closePanel}
             className="absolute top-4 right-14 text-white/80 hover:text-white z-20 p-1"
           >
             {/* Close logic is inside header usually, but adding redundant external close just in case, though Chat component has its header */}
           </button>
           <FloatingChat />
        </div>
      </div>

      {/* 3. Help Panel (Simple placeholder) */}
      <div className={`fixed top-0 right-0 h-full w-[300px] bg-white dark:bg-gray-900 shadow-[-8px_0_32px_rgba(0,0,0,0.2)] z-[101] transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${activePanel === 'help' ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full relative border-l border-gray-100 dark:border-gray-800 flex flex-col">
           <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
            <h3 className="font-bold text-gray-900 dark:text-white text-base flex items-center">
              <HelpCircle size={18} className="mr-2 text-blue-500" />
              Help & Tips
            </h3>
            <button onClick={closePanel} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
              <X size={20} />
            </button>
           </div>
           <div className="p-6 space-y-6 overflow-y-auto">
             <div>
               <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-2">Navigation</h4>
               <p className="text-sm text-gray-600 dark:text-gray-400">Use the dock on the right to access AI tools anytime. Steps are sequential.</p>
             </div>
             <div>
               <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-2">Shortcuts</h4>
               <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                 <li>• <b>⌘K</b> to open Command Palette</li>
                 <li>• Hover over cards for details</li>
                 <li>• Click AI badges for confidence scores</li>
                 <li>• Use the microphone for voice input</li>
               </ul>
             </div>
             <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
               <p className="text-xs text-blue-700 dark:text-blue-300 font-medium">
                 Need human support? <br/>
                 <a href="#" className="underline">Contact IT Support</a>
               </p>
             </div>
           </div>
        </div>
      </div>

    </>
  );
};

export default SideDock;