
import React, { useState } from 'react';
import { Car, Moon, Sun, Bell } from 'lucide-react';
import { useTheme } from './ThemeContext';
import Stepper from './components/Stepper';
import Step1_FNOL from './components/Step1_FNOL';
import Step2_Triage from './components/Step2_Triage';
import Step3_Investigation from './components/Step3_Investigation';
import Step4_Settlement from './components/Step4_Settlement';
import FloatingChat from './components/FloatingChat';
import QuickActions from './components/QuickActions';
import Toast from './components/Toast';
import { FnolResponse, TriageResponse, InvoiceAnalysisResponse, ToastMessage } from './types';

function App() {
  const { theme, toggleTheme } = useTheme();
  
  // Navigation State
  const [currentStep, setCurrentStep] = useState(1);
  
  // Data State
  const [fnolData, setFnolData] = useState<FnolResponse | null>(null);
  const [triageData, setTriageData] = useState<TriageResponse | null>(null);
  const [invoiceAnalysis, setInvoiceAnalysis] = useState<InvoiceAnalysisResponse | null>(null);
  
  // Toast State
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleAction = (actionName: string) => {
    const messages: Record<string, string> = {
      'Request Docs': '📄 Document request sent to claimant.',
      'Call Claimant': '📞 Dialing claimant...',
      'Reassign': '🔄 Reassignment workflow initiated.',
      'Order Appraisal': '🚗 Appraisal ordered successfully.',
      'Flag SIU': '⚠️ Claim flagged for Special Investigation Unit.',
      'Add Note': '📝 Note added to claim file.'
    };
    
    addToast(messages[actionName] || `Action: ${actionName} triggered`, actionName === 'Flag SIU' ? 'info' : 'success');
  };

  const handleFnolComplete = (data: FnolResponse) => {
    setFnolData(data);
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTriageComplete = (data: TriageResponse) => {
    setTriageData(data);
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInvestigationComplete = () => {
    setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setCurrentStep(1);
    setFnolData(null);
    setTriageData(null);
    setInvoiceAnalysis(null);
    window.scrollTo(0, 0);
  };

  // Dynamic Persona Logic
  const getCurrentPersona = () => {
    switch (currentStep) {
      case 1:
        return {
          name: "Sarah Mitchell",
          role: "Policyholder",
          action: "Filing new claim",
          avatarColor: "from-emerald-400 to-green-600",
          badgeColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
        };
      case 2:
        return {
          name: "Michael Chen",
          role: "Claims Manager",
          action: "Reviewing & Assigning",
          avatarColor: "from-amber-400 to-orange-600",
          badgeColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
        };
      case 3:
      case 4:
        return {
          name: triageData?.recommendedAdjuster.name || "Alex Morgan",
          role: "Senior Adjuster",
          action: currentStep === 3 ? "Investigation" : "Settlement",
          avatarColor: "from-brand-500 to-purple-600",
          badgeColor: "bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400"
        };
      default:
        return {
          name: "Alex Morgan",
          role: "Senior Adjuster",
          action: "View Mode",
          avatarColor: "from-brand-500 to-purple-600",
          badgeColor: "bg-gray-100 text-gray-700"
        };
    }
  };

  const persona = getCurrentPersona();

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300">
      
      {/* Toast Container */}
      <div className="fixed top-20 right-4 z-[200] flex flex-col items-end pointer-events-none">
        {toasts.map(toast => (
          <Toast key={toast.id} toast={toast} onClose={removeToast} />
        ))}
      </div>

      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer" onClick={handleRestart}>
              <div className="bg-brand-600 p-2 rounded-xl group-hover:bg-brand-700 transition-all duration-300 group-hover:scale-105 shadow-md group-hover:shadow-brand-500/30">
                <Car className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
                  ClaimsFlow AI
                </h1>
                <p className="text-[10px] font-medium tracking-wider text-gray-500 uppercase">Enterprise Edition</p>
              </div>
            </div>

            {/* Middle: Claim ID (only in flow) */}
            {fnolData && (
              <div className="hidden lg:flex items-center px-4 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 animate-[fadeIn_0.5s_ease]">
                <span className="text-xs font-mono text-gray-500 dark:text-gray-400 mr-2">CLAIM ID</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{fnolData.id}</span>
              </div>
            )}

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              
              {/* Dynamic Persona Block */}
              <div className="hidden md:flex flex-col items-end mr-2 animate-[fadeIn_0.5s_ease]">
                <div className="flex items-center gap-2 mb-0.5">
                   <span className="text-sm font-bold text-gray-900 dark:text-gray-100 transition-all">{persona.name}</span>
                   <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider transition-colors shadow-sm ${persona.badgeColor}`}>
                     {persona.role}
                   </span>
                </div>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                   {currentStep === 1 && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>}
                   {currentStep === 2 && <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5 animate-pulse"></span>}
                   {currentStep >= 3 && <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-1.5 animate-pulse"></span>}
                   {persona.action}
                </div>
              </div>

              {/* Dynamic Avatar */}
              <div className={`h-9 w-9 rounded-full bg-gradient-to-tr ${persona.avatarColor} border-2 border-white dark:border-gray-800 shadow-sm transition-all duration-500 ring-2 ring-transparent group-hover:ring-brand-200 transform hover:scale-110`}></div>
              
              <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>

              <button className="shake-hover p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-gray-900 animate-[pulse_3s_infinite]"></span>
              </button>

              <button 
                onClick={toggleTheme}
                className="rotate-hover p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500"
                aria-label="Toggle Dark Mode"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8 pt-8 pb-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          
          <Stepper currentStep={currentStep} />
          
          <div className="mt-8">
            {currentStep === 1 && (
              <Step1_FNOL onComplete={handleFnolComplete} />
            )}
            
            {currentStep === 2 && fnolData && (
              <Step2_Triage fnolData={fnolData} onComplete={handleTriageComplete} />
            )}

            {currentStep === 3 && (
              <>
                <Step3_Investigation onInvoiceAnalyzed={setInvoiceAnalysis} />
                {/* Continue Button */}
                <div className="fixed bottom-6 right-6 z-50">
                    <button 
                      onClick={handleInvestigationComplete}
                      className="btn-primary-anim px-8 py-3 rounded-xl bg-brand-600 text-white font-bold shadow-xl hover:shadow-brand-500/40 flex items-center"
                    >
                      Continue to Settlement
                      <span className="ml-2">→</span>
                    </button>
                </div>
              </>
            )}

            {currentStep === 4 && (
              <Step4_Settlement onComplete={handleRestart} invoiceData={invoiceAnalysis} />
            )}
          </div>

        </div>
      </main>

      {/* Global Floating Components */}
      <FloatingChat />
      <QuickActions step={currentStep} onAction={handleAction} />

    </div>
  );
}

export default App;
