import React, { useEffect, useState } from 'react';
import { ShieldAlert, Activity, UserCheck, ArrowRight, BrainCircuit, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';
import { TriageResponse, FnolResponse } from '../types';
import { triageResponses } from '../data/dummyData';
import { getRandomItem } from '../utils/helpers';
import useCountUp from '../hooks/useCountUp';
import { CardSkeleton } from './Skeleton';
import RichTooltip from './RichTooltip';

interface Step2Props {
  fnolData: FnolResponse;
  onComplete: (data: TriageResponse) => void;
}

const AnimatedNumber = ({ value, suffix = '', prefix = '' }: { value: number, suffix?: string, prefix?: string }) => {
    const animatedValue = useCountUp(value, 1500);
    return <span>{prefix}{animatedValue}{suffix}</span>;
}

const Step2_Triage: React.FC<Step2Props> = ({ fnolData, onComplete }) => {
  const [data, setData] = useState<TriageResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(getRandomItem(triageResponses));
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-8 page-transition pb-20">
      
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Claim Triage & Scoring</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">AI assessment based on intake data for claim #{fnolData.id}</p>
        </div>
        {data && (
            <div className="hidden md:flex items-center space-x-2 bg-brand-50 dark:bg-brand-900/30 px-3 py-1.5 rounded-full border border-brand-100 dark:border-brand-900 shadow-sm animate-fade-in">
                <BrainCircuit size={16} className="text-brand-600 dark:text-brand-400" />
                <span className="text-sm font-semibold text-brand-700 dark:text-brand-300">
                    AI Confidence: <AnimatedNumber value={Math.floor(data.confidence * 100)} suffix="%" />
                </span>
            </div>
        )}
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Fraud Score Card */}
        {loading || !data ? <CardSkeleton /> : (
            <RichTooltip
                content={
                    <div className="p-1">
                        <h4 className="font-bold mb-2 flex items-center gap-2">🔍 Fraud Score Analysis</h4>
                        <div className={`text-xs font-bold mb-3 px-2 py-1 rounded w-fit ${data.fraudRiskLevel === 'High' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                            Risk Level: {data.fraudRiskLevel.toUpperCase()}
                        </div>
                        <div className="space-y-2 mb-3">
                            <h5 className="text-xs font-semibold text-gray-500">Contributing Factors:</h5>
                            <div className="flex justify-between text-xs"><span>Prior claim (6 mo ago)</span><span className="text-red-500 font-bold">+15</span></div>
                            <div className="flex justify-between text-xs"><span>Inconsistent timeline</span><span className="text-red-500 font-bold">+12</span></div>
                            <div className="flex justify-between text-xs"><span>Metadata check</span><span className="text-red-500 font-bold">+5</span></div>
                        </div>
                        <button className="w-full py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-medium rounded hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors">
                            View Full Analysis →
                        </button>
                    </div>
                }
            >
                <div className={`
                hover-card relative overflow-hidden p-6 rounded-2xl border 
                bg-gradient-to-br from-white to-red-50 dark:from-gray-800 dark:to-red-900/20
                ${data.fraudRiskLevel === 'High' ? 'border-red-200 dark:border-red-800 shadow-red-100 dark:shadow-none' : 'border-gray-200 dark:border-gray-700'}
                cursor-help
                `}>
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg shadow-inner">
                    <ShieldAlert className="w-6 h-6 text-red-600 dark:text-red-400" />
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase shadow-sm
                    ${data.fraudRiskLevel === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 animate-pulse' : 'bg-green-100 text-green-700'}
                    `}>
                    {data.fraudRiskLevel} Risk
                    </span>
                </div>
                <div className="space-y-2">
                    <p className="text-sm text-gray-500">Fraud Probability Score</p>
                    <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        <AnimatedNumber value={data.fraudScore} />
                    </span>
                    <span className="text-gray-400">/ 100</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                    <div 
                        className={`h-full rounded-full animate-fill-bar shimmer-effect ${data.fraudScore > 50 ? 'bg-red-500' : 'bg-green-500'}`} 
                        style={{ '--target-width': `${data.fraudScore}%` } as React.CSSProperties}
                    ></div>
                    </div>
                </div>
                </div>
            </RichTooltip>
        )}

        {/* Complexity Card */}
        {loading || !data ? <CardSkeleton /> : (
            <div className="hover-card relative overflow-hidden p-6 rounded-2xl border border-blue-100 dark:border-blue-900 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg shadow-inner">
                <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="px-2 py-1 rounded text-xs font-bold uppercase bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 shadow-sm">
                {data.complexityLevel} Complexity
                </span>
            </div>
            <div className="space-y-2">
                <p className="text-sm text-gray-500">Complexity Index</p>
                <div className="flex items-baseline space-x-2">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    <AnimatedNumber value={data.complexityScore} />
                </span>
                <span className="text-gray-400">/ 10</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                <div 
                    className="h-full bg-blue-500 rounded-full animate-fill-bar shimmer-effect"
                    style={{ '--target-width': `${data.complexityScore * 10}%` } as React.CSSProperties}
                ></div>
                </div>
            </div>
            </div>
        )}

        {/* Adjuster Card */}
        {loading || !data ? <CardSkeleton /> : (
            <div className="hover-card relative overflow-hidden p-6 rounded-2xl border border-purple-100 dark:border-purple-900 bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-purple-900/20">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg shadow-inner">
                <UserCheck className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <span className="px-2 py-1 rounded text-xs font-bold uppercase bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 shadow-sm">
                Recommended
                </span>
            </div>
            <div>
                <p className="text-sm text-gray-500 mb-1">Assigned Adjuster</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white truncate">{data.recommendedAdjuster.name}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                <span className="text-xs bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-2 py-1 rounded text-gray-600 dark:text-gray-300 shadow-sm">
                    {data.recommendedAdjuster.expertise}
                </span>
                    <span className="text-xs bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-2 py-1 rounded text-gray-600 dark:text-gray-300 shadow-sm">
                    {data.recommendedAdjuster.workload} Load
                </span>
                </div>
            </div>
            </div>
        )}

      </div>

      {/* Deep Dive Section */}
      {data && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-slide-up">
            
            {/* Left: AI Reasoning */}
            <div className="lg:col-span-2 space-y-6">
            <div className="hover-card bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <BrainCircuit className="w-5 h-5 mr-2 text-brand-500" />
                AI Analysis & Reasoning
                </h3>
                <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                <p className="mb-4">{data.aiReasoning}</p>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 text-xs uppercase tracking-wider">Detected Risk Factors</h4>
                    {data.fraudIndicators.length > 0 ? (
                    <ul className="space-y-2">
                        {data.fraudIndicators.map((indicator, idx) => (
                        <li key={idx} className="list-item-hover flex items-start text-sm text-red-600 dark:text-red-400 p-1 rounded-lg animate-[fadeIn_0.5s_ease]" style={{ animationDelay: `${idx * 0.1}s` }}>
                            <AlertTriangle className="w-4 h-4 mr-2 mt-0.5 shrink-0" />
                            {indicator}
                        </li>
                        ))}
                    </ul>
                    ) : (
                    <div className="flex items-center text-green-600 dark:text-green-400 text-sm">
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        No significant risk factors detected.
                    </div>
                    )}
                </div>
                </div>
            </div>
            </div>

            {/* Right: Status */}
            <div className="space-y-6">
            <div className="hover-card bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-gray-700">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Triage Status</h3>
                
                <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-sm text-gray-500">Priority Level</span>
                    <span className={`text-sm font-bold px-2 py-0.5 rounded ${data.priorityLevel === 'Critical' ? 'bg-red-100 text-red-600 animate-pulse' : 'text-gray-900 dark:text-white'}`}>
                        {data.priorityLevel}
                    </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-sm text-gray-500">Processing Time</span>
                    <div className="flex items-center text-sm font-medium text-gray-900 dark:text-white">
                        <Clock className="w-4 h-4 mr-1 text-gray-400" />
                        {data.estimatedProcessingTime}
                    </div>
                    </div>
                </div>

                <button 
                onClick={() => onComplete(data)}
                className="btn-primary-anim w-full mt-8 bg-gray-900 dark:bg-brand-600 text-white font-medium py-3 rounded-xl hover:bg-gray-800 dark:hover:bg-brand-500 transition-colors shadow-lg flex items-center justify-center group"
                >
                Start Investigation
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
            </div>

        </div>
      )}
    </div>
  );
};

export default Step2_Triage;