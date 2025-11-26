import React, { useState, useEffect } from 'react';
import { DollarSign, CheckCircle, AlertTriangle, ArrowRight, Download, Home, FileText, BadgeCheck, Clock, ShieldCheck, Mail, BarChart3 } from 'lucide-react';
import { SettlementResponse, InvoiceAnalysisResponse } from '../types';
import { settlementResponses } from '../data/dummyData';
import { getRandomItem, formatCurrency, wait } from '../utils/helpers';
import AIAutomationBanner from './AIAutomationBanner';
import Confetti from './Confetti';
import useCountUp from '../hooks/useCountUp';

interface Step4Props {
  onComplete: () => void;
  invoiceData: InvoiceAnalysisResponse | null;
  onCompareClick?: () => void;
}

const AnimatedNumber = ({ value, prefix = '' }: { value: number, prefix?: string }) => {
    const animatedValue = useCountUp(value, 1500);
    return <span>{prefix}{animatedValue.toLocaleString()}</span>;
}

const Step4_Settlement: React.FC<Step4Props> = ({ onComplete, invoiceData, onCompareClick }) => {
  const [data, setData] = useState<SettlementResponse | null>(null);
  const [isApproved, setIsApproved] = useState(false);
  const [checks, setChecks] = useState({
    accurate: false,
    reviewed: false
  });

  useEffect(() => {
    const loadData = async () => {
      await wait(600);
      let settlementData = getRandomItem(settlementResponses);
      
      // If we have verified invoice data from Step 3, override to match
      if (invoiceData) {
        settlementData = {
          ...settlementData,
          recommendedPayout: invoiceData.totals.insurerPays,
          range: { 
            min: invoiceData.totals.insurerPays * 0.98, 
            max: invoiceData.totals.insurerPays * 1.02 
          },
          confidence: 0.99,
          breakdown: [], // We'll use the specific layout for invoice data
          flags: invoiceData.flags.map(f => ({ issue: f, suggestion: "Review policy exclusions" }))
        };
      }
      
      setData(settlementData);
    };
    loadData();
  }, [invoiceData]);

  if (!data) return <div className="h-96 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div></div>;

  if (isApproved) {
    return (
      <div className="max-w-2xl mx-auto pt-8 text-center space-y-8 animate-[fadeIn_0.5s_ease] pb-20 relative">
        <Confetti />
        
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 shadow-green-200/50 shadow-lg ring-4 ring-green-50 dark:ring-green-900/10 animate-[popIn_0.5s_ease_0.2s_both]">
          <div className="w-20 h-20">
            <svg className="w-full h-full" viewBox="0 0 52 52">
                <circle className="stroke-green-500" strokeWidth="2" strokeDasharray="166" strokeDashoffset="166" fill="none" cx="26" cy="26" r="25" style={{ animation: 'stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards' }} />
                <path className="stroke-green-500" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="48" strokeDashoffset="48" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" style={{ animation: 'stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.6s forwards' }} />
            </svg>
          </div>
        </div>
        
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 animate-[fadeIn_0.5s_ease_0.8s_both]">Claim Settled Successfully</h2>
          <p className="text-gray-500 dark:text-gray-400 animate-[fadeIn_0.5s_ease_1s_both]">Claim <span className="font-mono text-gray-700 dark:text-gray-300">#CLM-{invoiceData?.invoiceId ? '2024-1024' : Math.floor(Math.random()*10000)}</span> has been closed.</p>
        </div>

        <div className="glass-card rounded-2xl p-0 shadow-xl overflow-hidden text-left animate-[slideUp_0.5s_ease_1.2s_both]">
          <div className="bg-gray-50 dark:bg-gray-900/50 p-6 border-b border-gray-100 dark:border-gray-700">
             <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Settlement Summary</span>
                <span className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs px-2 py-1 rounded font-bold">PAID</span>
             </div>
          </div>
          <div className="p-6 space-y-4">
             <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
               <span className="text-gray-600 dark:text-gray-300">Settlement Amount</span>
               <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600"><AnimatedNumber value={data.recommendedPayout} prefix="$" /></span>
             </div>
             <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
               <span className="text-gray-600 dark:text-gray-300">Paid To</span>
               <span className="font-medium text-gray-900 dark:text-white">{invoiceData?.vendor || "Claimant"}</span>
             </div>
             <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
               <span className="text-gray-600 dark:text-gray-300">Customer Responsibility</span>
               <span className="font-medium text-gray-900 dark:text-white">{invoiceData ? formatCurrency(invoiceData.totals.customerPays) : '$500'}</span>
             </div>
             <div className="flex justify-between items-center py-2">
               <span className="text-gray-600 dark:text-gray-300">Processing Time</span>
               <span className="font-medium text-gray-900 dark:text-white flex items-center">
                 <Clock size={14} className="mr-1 text-gray-400"/> 38 minutes
               </span>
             </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 border-t border-gray-100 dark:border-gray-700 flex justify-between text-xs text-gray-500">
             <span className="flex items-center"><Mail size={12} className="mr-1"/> Confirmation sent</span>
             <span className="flex items-center"><ShieldCheck size={12} className="mr-1"/> Audit trail saved</span>
          </div>
        </div>

        <div className="flex justify-center space-x-4 animate-[fadeIn_0.5s_ease_1.5s_both]">
          <button className="flex items-center px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-200 font-medium">
            <Download className="w-5 h-5 mr-2" /> Download Report
          </button>
          <button 
            onClick={onComplete}
            className="flex items-center px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-medium shadow-lg hover:shadow-brand-500/30 transition-all"
          >
            <Home className="w-5 h-5 mr-2" /> Start New Claim
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 page-transition pb-32">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settlement Authorization</h2>
          <p className="text-gray-500 dark:text-gray-400">Review final calculations and authorize payout.</p>
        </div>
        <div className="hidden md:block">
           <AIAutomationBanner />
        </div>
      </div>

      {/* Claim Summary Card */}
      <div className="hover-card bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4 flex items-center">
          <FileText size={16} className="mr-2"/> Claim Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
           <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
             <span className="text-gray-500">Claimant</span>
             <span className="font-semibold text-gray-900 dark:text-white">Sarah Mitchell</span>
           </div>
           <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
             <span className="text-gray-500">Policy</span>
             <span className="font-semibold text-gray-900 dark:text-white">POL-2024-78542</span>
           </div>
           <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
             <span className="text-gray-500">Vehicle</span>
             <span className="font-semibold text-gray-900 dark:text-white">2022 Toyota Camry</span>
           </div>
           <div className="flex justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
             <span className="text-gray-500">Incident</span>
             <span className="font-semibold text-gray-900 dark:text-white">Front-end collision</span>
           </div>
        </div>
      </div>

      {/* Settlement Breakdown - Glassmorphism */}
      <div className="glass-card rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center">
          <h3 className="font-bold text-gray-900 dark:text-white flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-brand-500" />
            Settlement Breakdown
          </h3>
          <div className="flex gap-2">
            {onCompareClick && (
                <button 
                 onClick={onCompareClick}
                 className="text-xs bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300 px-3 py-1 rounded-full font-bold hover:bg-brand-200 transition-colors flex items-center"
                >
                    <BarChart3 size={12} className="mr-1"/> Compare
                </button>
            )}
            {invoiceData && (
                <span className="text-xs bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 px-2 py-1 rounded-full font-medium">
                Source: Invoice Analysis
                </span>
            )}
          </div>
        </div>
        
        <div className="p-6">
           {invoiceData ? (
             // Layout when we have Invoice Data
             <div className="space-y-6">
               <div className="flex justify-between items-center text-lg">
                 <span className="font-medium text-gray-700 dark:text-gray-300">Total Repair Cost</span>
                 <span className="font-bold text-gray-900 dark:text-white"><AnimatedNumber value={invoiceData.totals.totalBilled} prefix="$" /></span>
               </div>
               
               <div className="border-t border-b border-gray-100 dark:border-gray-700 py-4 space-y-2">
                 <div className="flex justify-between text-sm">
                   <span className="text-gray-500 flex items-center"><CheckCircle size={12} className="text-green-500 mr-2"/> Covered by Policy</span>
                   <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(invoiceData.totals.totalCovered)}</span>
                 </div>
                 <div className="flex justify-between text-sm">
                   <span className="text-gray-500 flex items-center"><AlertTriangle size={12} className="text-orange-500 mr-2"/> Not Covered</span>
                   <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(invoiceData.totals.totalBilled - invoiceData.totals.totalCovered)}</span>
                 </div>
                 <div className="flex justify-between text-sm">
                   <span className="text-gray-500 flex items-center"><BadgeCheck size={12} className="text-blue-500 mr-2"/> Deductible Applied</span>
                   <span className="font-medium text-red-500">-{formatCurrency(invoiceData.totals.deductible)}</span>
                 </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                 <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl text-center border border-red-100 dark:border-red-900/30">
                   <p className="text-xs font-bold text-red-600 dark:text-red-400 uppercase mb-1">Customer Pays</p>
                   <p className="text-xl font-bold text-gray-900 dark:text-white"><AnimatedNumber value={invoiceData.totals.customerPays} prefix="$" /></p>
                 </div>
                 <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl text-center border border-green-100 dark:border-green-900/30 ring-2 ring-green-500/20">
                   <p className="text-xs font-bold text-green-600 dark:text-green-400 uppercase mb-1">Insurance Pays</p>
                   <p className="text-xl font-bold text-gray-900 dark:text-white"><AnimatedNumber value={invoiceData.totals.insurerPays} prefix="$" /></p>
                 </div>
               </div>
             </div>
           ) : (
             // Fallback layout for random data
             <div className="space-y-4">
               {data.breakdown.map((row, i) => (
                 <div key={i} className="flex justify-between items-center text-sm">
                   <span className="text-gray-600 dark:text-gray-300">{row.item}</span>
                   <span className={`font-mono font-medium ${row.amount < 0 ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>
                      {row.amount < 0 ? '-' : ''}{formatCurrency(Math.abs(row.amount))}
                   </span>
                 </div>
               ))}
               <div className="border-t border-gray-100 dark:border-gray-700 my-4 pt-4 flex justify-between items-center">
                 <span className="font-bold text-lg text-gray-900 dark:text-white">Net Settlement</span>
                 <span className="font-bold text-xl text-green-600 dark:text-green-400"><AnimatedNumber value={data.recommendedPayout} prefix="$" /></span>
               </div>
             </div>
           )}
        </div>
      </div>

      {/* Authorization Section */}
      <div className="glass-card p-6 border border-brand-200 dark:border-brand-900 shadow-md">
         <h3 className="text-sm font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-4 flex items-center">
           <BadgeCheck size={16} className="mr-2"/> Authorization
         </h3>
         
         <div className="mb-6 p-4 bg-brand-50 dark:bg-brand-900/20 rounded-xl border border-brand-100 dark:border-brand-900/30 text-sm text-gray-700 dark:text-gray-300">
           You are authorizing a payment of <span className="font-bold">{formatCurrency(data.recommendedPayout)}</span> to <span className="font-bold">{invoiceData?.vendor || "Claimant"}</span>.
         </div>

         <div className="space-y-3 mb-6">
           <label className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg transition-colors">
             <input 
               type="checkbox" 
               className="w-5 h-5 text-brand-600 rounded focus:ring-brand-500 border-gray-300"
               checked={checks.accurate}
               onChange={(e) => setChecks(prev => ({ ...prev, accurate: e.target.checked }))}
             />
             <span className="text-sm text-gray-700 dark:text-gray-200">I confirm this settlement is accurate and within policy limits</span>
           </label>
           <label className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg transition-colors">
             <input 
               type="checkbox" 
               className="w-5 h-5 text-brand-600 rounded focus:ring-brand-500 border-gray-300"
               checked={checks.reviewed}
               onChange={(e) => setChecks(prev => ({ ...prev, reviewed: e.target.checked }))}
             />
             <span className="text-sm text-gray-700 dark:text-gray-200">I have reviewed the invoice analysis and coverage details</span>
           </label>
         </div>

         <div className="grid grid-cols-2 gap-4">
           <button 
             onClick={() => setIsApproved(true)}
             disabled={!checks.accurate || !checks.reviewed}
             className={`
               py-3 rounded-xl font-bold shadow-lg flex items-center justify-center transition-all
               ${checks.accurate && checks.reviewed 
                 ? 'bg-green-600 hover:bg-green-700 text-white hover:shadow-green-500/30 btn-primary-anim' 
                 : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'}
             `}
           >
             <CheckCircle className="w-5 h-5 mr-2" />
             Approve & Pay
           </button>
           <button className="py-3 rounded-xl border border-gray-200 dark:border-gray-700 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
             ✏️ Request Review
           </button>
         </div>
      </div>

    </div>
  );
};

export default Step4_Settlement;