
import React, { useState, useEffect } from 'react';
import { ShieldAlert, AlertTriangle, UserCheck, Sparkles, ArrowRight, FileText, Car, CreditCard, Hash } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { generateDummyData } from '../data/dummyData';
import { TriageData, FNOLData } from '../types';
import { motion } from 'framer-motion';

interface Step2Props {
  onNext: () => void;
}

export const Step2_Triage: React.FC<Step2Props> = ({ onNext }) => {
  const [data, setData] = useState<TriageData | null>(null);
  const [fnolData, setFnolData] = useState<FNOLData | null>(null);

  useEffect(() => {
    // Simulate loading data
    const dummy = generateDummyData();
    setData(dummy.triage);
    setFnolData(dummy.fnol);
  }, []);

  if (!data || !fnolData) return null;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-5xl mx-auto">
      
      <motion.div variants={item} className="text-center mb-8">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white mb-2">AI Triage Analysis</h2>
        <div className="flex items-center justify-center gap-2">
          <Badge variant="success" className="bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300">
             Confidence Score: {data.confidence}%
          </Badge>
          <span className="text-sm text-slate-500">Analysis completed in 1.2s</span>
        </div>
      </motion.div>

      {/* Policy Details Card (New Feature) */}
      <motion.div variants={item}>
        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-md">
                    <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200">Policy Details</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide font-medium mb-1">Policyholder</p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{fnolData.claimantName}</p>
                </div>
                <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide font-medium mb-1 flex items-center gap-1"><Hash className="w-3 h-3" /> Policy Number</p>
                    <p className="text-sm font-mono text-slate-700 dark:text-slate-300">{fnolData.policyNumber}</p>
                </div>
                <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide font-medium mb-1 flex items-center gap-1"><Car className="w-3 h-3" /> Insured Item</p>
                    <p className="text-sm text-slate-700 dark:text-slate-300">{fnolData.vehicleDetails}</p>
                </div>
                <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide font-medium mb-1 flex items-center gap-1"><CreditCard className="w-3 h-3" /> Coverage Type</p>
                    <Badge variant="info">{fnolData.policyType}</Badge>
                </div>
            </div>
        </Card>
      </motion.div>

      {/* Top 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Fraud Score */}
        <motion.div variants={item}>
            <Card className="h-full relative overflow-hidden bg-gradient-to-br from-white to-rose-50/50 dark:from-slate-900 dark:to-rose-900/10 border-rose-100 dark:border-rose-900/30">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <ShieldAlert className="w-24 h-24 text-rose-500" />
            </div>
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-rose-100 dark:bg-rose-900/50 rounded-lg">
                    <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-100">Fraud Risk</h3>
                </div>
                <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{data.fraudScore}<span className="text-xl text-slate-400 font-normal">/100</span></div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {data.fraudReasoning}
                </p>
            </div>
            </Card>
        </motion.div>

        {/* Complexity */}
        <motion.div variants={item}>
            <Card className="h-full relative overflow-hidden bg-gradient-to-br from-white to-sky-50/50 dark:from-slate-900 dark:to-sky-900/10 border-sky-100 dark:border-sky-900/30">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <AlertTriangle className="w-24 h-24 text-sky-500" />
            </div>
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-sky-100 dark:bg-sky-900/50 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-100">Complexity</h3>
                </div>
                <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{data.complexity}</div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {data.complexity === 'High' ? 'Requires specialist review.' : 'Standard claims processing.'}
                </p>
            </div>
            </Card>
        </motion.div>

        {/* Adjuster */}
        <motion.div variants={item}>
            <Card className="h-full relative overflow-hidden bg-gradient-to-br from-white to-purple-50/50 dark:from-slate-900 dark:to-purple-900/10 border-purple-100 dark:border-purple-900/30">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <UserCheck className="w-24 h-24 text-purple-500" />
            </div>
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                    <UserCheck className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-100">Assignment</h3>
                </div>
                <div className="text-xl font-bold text-slate-900 dark:text-white mb-1">{data.recommendedAdjuster}</div>
                <Badge variant="purple" className="mb-2">{data.adjusterSpecialty}</Badge>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                 Best match based on workload and expertise.
                </p>
            </div>
            </Card>
        </motion.div>
      </div>

      {/* AI Reasoning */}
      <motion.div variants={item}>
        <Card className="bg-slate-50 dark:bg-slate-900/50">
            <div className="flex items-start gap-4">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mt-1">
                    <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                    <h3 className="font-medium text-slate-900 dark:text-white mb-1">AI Reasoning Engine</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        {data.aiReasoning} The system analyzed 12 datapoints including historical patterns, geolocation metadata, and policy constraints. 
                        Recommendation is to proceed to direct investigation.
                    </p>
                </div>
            </div>
        </Card>
      </motion.div>

      <motion.div variants={item} className="flex justify-end pt-4">
        <Button 
          onClick={onNext} 
          variant="secondary"
          className="w-full md:w-auto px-8"
          icon={<ArrowRight className="w-4 h-4" />}
        >
          Continue to Adjuster View
        </Button>
      </motion.div>
    </motion.div>
  );
};
