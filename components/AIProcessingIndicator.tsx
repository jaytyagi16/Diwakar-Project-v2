import React, { useEffect, useState } from 'react';

interface ProcessingStep {
  id: string;
  label: string;
  delay: number;
}

const processingSteps: ProcessingStep[] = [
  { id: '1', label: 'Image analysis', delay: 500 },
  { id: '2', label: 'Document extraction', delay: 800 },
  { id: '3', label: 'Policy lookup', delay: 600 },
  { id: '4', label: 'Fraud detection', delay: 1000 },
  { id: '5', label: 'Cost estimation', delay: 700 },
  { id: '6', label: 'Generate summary', delay: 500 },
];

const AIProcessingIndicator: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<string>(processingSteps[0].id);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timeoutId: any;
    let stepIndex = 0;

    const runStep = () => {
      if (stepIndex >= processingSteps.length) {
        if (onComplete) onComplete();
        return;
      }

      const step = processingSteps[stepIndex];
      setCurrentStep(step.id);
      
      timeoutId = setTimeout(() => {
        setCompletedSteps(prev => [...prev, step.id]);
        stepIndex++;
        setProgress((stepIndex / processingSteps.length) * 100);
        runStep();
      }, step.delay);
    };

    runStep();

    return () => clearTimeout(timeoutId);
  }, [onComplete]);

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-100 dark:border-indigo-800 rounded-xl p-5 mb-4 shadow-sm animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl animate-bounce">🤖</span>
        <span className="font-bold text-indigo-900 dark:text-indigo-100">AI Processing</span>
        <span className="relative flex h-2.5 w-2.5 ml-auto">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
        </span>
      </div>
      
      <div className="space-y-2 mb-4">
        {processingSteps.map((step) => {
          const isComplete = completedSteps.includes(step.id);
          const isActive = currentStep === step.id && !isComplete;
          const isPending = !isComplete && !isActive;

          return (
            <div key={step.id} className={`flex items-center gap-3 text-sm font-mono transition-colors duration-300
              ${isComplete ? 'text-green-600 dark:text-green-400' : ''}
              ${isActive ? 'text-indigo-600 dark:text-indigo-400 font-bold' : ''}
              ${isPending ? 'text-gray-400 dark:text-gray-600' : ''}
            `}>
              <span className="w-5 text-center">
                {isComplete && '✅'}
                {isActive && '⏳'}
                {isPending && '○'}
              </span>
              <span>{step.label}</span>
              <span className="flex-1 border-b border-dotted border-current opacity-20 mx-2"></span>
              <span className="w-12 text-right">
                {isComplete && 'Done'}
                {isActive && '...'}
              </span>
            </div>
          );
        })}
      </div>
      
      <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-center mt-2 text-gray-500 dark:text-gray-400">
        Estimated time remaining: {Math.max(0, Math.ceil((100 - progress) / 20))}s
      </p>
    </div>
  );
};

export default AIProcessingIndicator;