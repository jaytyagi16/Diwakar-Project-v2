
import React, { useState } from 'react';
import { Layout, GitBranch, Search, ChevronRight, Sun, Moon } from 'lucide-react';
import { Step1_FNOL } from './components/Step1_FNOL';
import { Step2_Triage } from './components/Step2_Triage';
import { Step3_Investigation } from './components/Step3_Investigation';
import { Step } from './types';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>('FNOL');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const steps: Step[] = ['FNOL', 'Triage', 'Pre-Investigation'];

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const getStepIcon = (step: Step) => {
    switch (step) {
      case 'FNOL': return <Layout className="w-4 h-4" />;
      case 'Triage': return <GitBranch className="w-4 h-4" />;
      case 'Pre-Investigation': return <Search className="w-4 h-4" />;
    }
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-indigo-100 selection:text-indigo-900 ${isDarkMode ? 'dark' : ''}`}>
      
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-50">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
             </div>
             <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">ClaimsFlow AI</span>
          </div>

          <div className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-full">
            {steps.map((step, index) => {
              const isActive = currentStep === step;
              const isPast = steps.indexOf(currentStep) > index;
              
              return (
                <div key={step} className="flex items-center">
                   <button
                    onClick={() => setCurrentStep(step)}
                    className={`
                      relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2
                      ${isActive 
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm ring-1 ring-black/5 dark:ring-white/10' 
                        : isPast 
                          ? 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white' 
                          : 'text-slate-400 dark:text-slate-600 cursor-not-allowed'
                      }
                    `}
                    disabled={!isPast && !isActive}
                   >
                     {getStepIcon(step)}
                     {step}
                     {isActive && (
                        <motion.div 
                          layoutId="active-pill"
                          className="absolute inset-0 bg-transparent rounded-full" 
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                     )}
                   </button>
                   {index < steps.length - 1 && (
                     <div className="px-2 text-slate-300 dark:text-slate-700">
                       <ChevronRight className="w-3 h-3" />
                     </div>
                   )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
             {/* Persona Banner */}
             <div className="hidden sm:flex flex-col items-end mr-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Current Persona</span>
                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  {currentStep === 'FNOL' ? 'Insured Customer' : 'Senior Adjuster'}
                </span>
             </div>
             
             <button 
                onClick={toggleTheme}
                className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
             >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
             </button>
             
             <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
             </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
         <AnimatePresence mode="wait">
            {currentStep === 'FNOL' && (
              <motion.div key="fnol" exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.2 }}>
                <Step1_FNOL onNext={() => setCurrentStep('Triage')} />
              </motion.div>
            )}
            {currentStep === 'Triage' && (
              <motion.div key="triage" exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.2 }}>
                <Step2_Triage onNext={() => setCurrentStep('Pre-Investigation')} />
              </motion.div>
            )}
            {currentStep === 'Pre-Investigation' && (
              <motion.div key="investigation" exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.2 }}>
                <Step3_Investigation />
              </motion.div>
            )}
         </AnimatePresence>
      </main>

    </div>
  );
};

export default App;
