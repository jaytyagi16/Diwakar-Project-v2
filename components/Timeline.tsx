import React from 'react';
import { X } from 'lucide-react';

interface TimelineProps {
  isOpen: boolean;
  onClose: () => void;
  currentStep: number;
}

const Timeline: React.FC<TimelineProps> = ({ isOpen, onClose, currentStep }) => {
  const events = [
    { 
      id: '1', 
      time: '10:24 AM', 
      title: 'Claim Filed', 
      detail: 'Sarah Mitchell via Mobile App', 
      status: currentStep >= 1 ? 'complete' : 'pending' 
    },
    { 
      id: '2', 
      time: '10:24 AM', 
      title: 'AI Analysis Complete', 
      detail: '4 images, 2 documents processed', 
      status: currentStep >= 2 ? 'complete' : 'pending' 
    },
    { 
      id: '3', 
      time: '10:25 AM', 
      title: 'Auto-Triage Complete', 
      detail: 'Fraud: 45 | Complexity: Medium', 
      status: currentStep >= 3 ? 'complete' : (currentStep === 2 ? 'active' : 'pending')
    },
    { 
      id: '4', 
      time: '10:30 AM', 
      title: 'Investigation Active', 
      detail: 'Invoice analyzed, Policy matched', 
      status: currentStep >= 4 ? 'complete' : (currentStep === 3 ? 'active' : 'pending')
    },
    { 
      id: '5', 
      time: 'Pending', 
      title: 'Settlement Approval', 
      detail: 'Awaiting Authorization',
      status: currentStep === 4 ? 'active' : 'pending' 
    },
    { 
      id: '6', 
      time: 'Pending', 
      title: 'Payment Processing', 
      detail: '',
      status: 'pending' 
    },
  ];

  return (
    <div className={`fixed inset-y-0 left-0 w-80 bg-gray-900/95 backdrop-blur-xl border-r border-white/10 shadow-2xl z-[200] transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex justify-between items-center p-5 border-b border-white/10">
        <h3 className="text-white font-bold flex items-center gap-2">
          📍 Claim Timeline
        </h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
          <X size={20} />
        </button>
      </div>
      
      <div className="p-6">
        <div className="relative pl-2">
          {events.map((event, index) => (
            <div key={event.id} className="flex gap-4 pb-8 relative group">
              {/* Vertical Line */}
              {index !== events.length - 1 && (
                <div className="absolute left-[7px] top-4 bottom-0 w-0.5 bg-white/10 group-hover:bg-brand-500/50 transition-colors"></div>
              )}
              
              {/* Dot */}
              <div className={`relative z-10 w-4 h-4 rounded-full flex-shrink-0 transition-all duration-300
                ${event.status === 'complete' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : ''}
                ${event.status === 'active' ? 'bg-brand-500 animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.5)]' : ''}
                ${event.status === 'pending' ? 'bg-transparent border-2 border-gray-600' : ''}
              `}></div>
              
              <div className={`mt-[-4px] transition-opacity duration-300 ${event.status === 'pending' ? 'opacity-50' : 'opacity-100'}`}>
                <span className="text-xs font-mono text-gray-500 block mb-1">{event.time}</span>
                <h4 className={`text-sm font-bold mb-1 ${event.status === 'pending' ? 'text-gray-500' : 'text-white'}`}>
                  {event.title}
                </h4>
                {event.detail && (
                  <p className="text-xs text-gray-400 leading-relaxed">{event.detail}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;