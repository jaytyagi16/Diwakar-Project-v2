import React from 'react';
import { Check, Circle } from 'lucide-react';

interface StepperProps {
  currentStep: number;
}

const steps = [
  { id: 1, name: 'FNOL Intake' },
  { id: 2, name: 'AI Triage' },
  { id: 3, name: 'Pre-Investigation' },
  { id: 4, name: 'Settlement' },
];

const Stepper: React.FC<StepperProps> = ({ currentStep }) => {
  return (
    <nav aria-label="Progress" className="w-full mb-8">
      <ol role="list" className="flex items-center justify-center space-x-2 md:space-x-8">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className="relative flex items-center">
            {step.id < currentStep ? (
              // Completed Step
              <div className="flex items-center group cursor-default">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-600 hover:bg-brand-700 transition-all duration-300 transform group-hover:scale-110 shadow-lg shadow-brand-500/30">
                  <Check className="w-5 h-5 text-white animate-[fadeIn_0.3s_ease]" aria-hidden="true" />
                </span>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-100 hidden md:block group-hover:text-brand-600 transition-colors">
                  {step.name}
                </span>
              </div>
            ) : step.id === currentStep ? (
              // Current Step
              <div className="flex items-center" aria-current="step">
                <span className="relative flex items-center justify-center w-8 h-8 rounded-full border-2 border-brand-600">
                  <span className="absolute w-full h-full rounded-full border-2 border-brand-500 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-30"></span>
                  <span className="h-2.5 w-2.5 rounded-full bg-brand-600 shadow-[0_0_10px_rgba(14,165,233,0.6)]" />
                </span>
                <span className="ml-3 text-sm font-bold text-brand-600 dark:text-brand-400 hidden md:block drop-shadow-sm">
                  {step.name}
                </span>
              </div>
            ) : (
              // Upcoming Step
              <div className="flex items-center group">
                <span className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 group-hover:border-gray-400 transition-colors">
                  <Circle className="w-5 h-5 text-transparent" aria-hidden="true" />
                </span>
                <span className="ml-3 text-sm font-medium text-gray-500 dark:text-gray-400 hidden md:block group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                  {step.name}
                </span>
              </div>
            )}
            
            {/* Connector Line */}
            {stepIdx !== steps.length - 1 && (
              <div className="hidden md:block absolute top-4 left-full w-4 md:w-8 -translate-y-1/2 ml-2 md:ml-4">
                <div className="h-0.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                   <div 
                     className={`h-full bg-brand-600 transition-all duration-700 ease-in-out ${step.id < currentStep ? 'w-full' : 'w-0'}`}
                   />
                </div>
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Stepper;