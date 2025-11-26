import React, { useState, useEffect } from 'react';
import { DollarSign, AlertCircle, FileCheck, Check, Sparkles, XCircle, FileText, CheckCircle, BarChart3, TrendingUp, AlertTriangle } from 'lucide-react';
import { InvestigationResponse, InvoiceAnalysisResponse } from '../types';
import { investigationResponses, invoiceAnalysisResponses } from '../data/dummyData';
import { getRandomItem, formatCurrency, wait } from '../utils/helpers';
import FileUpload from './FileUpload';
import AIAutomationBanner from './AIAutomationBanner';

interface Step3Props {
  onInvoiceAnalyzed?: (invoice: InvoiceAnalysisResponse) => void;
}

const Step3_Investigation: React.FC<Step3Props> = ({ onInvoiceAnalyzed }) => {
  const [data, setData] = useState<InvestigationResponse | null>(null);
  const [invoiceAnalysis, setInvoiceAnalysis] = useState<InvoiceAnalysisResponse | null>(null);
  const [isAnalyzingInvoice, setIsAnalyzingInvoice] = useState(false);
  
  useEffect(() => {
    setTimeout(() => {
      setData(getRandomItem(investigationResponses));
    }, 800);
  }, []);

  useEffect(() => {
    if (invoiceAnalysis && onInvoiceAnalyzed) {
      onInvoiceAnalyzed(invoiceAnalysis);
    }
  }, [invoiceAnalysis, onInvoiceAnalyzed]);

  const handleInvoiceUpload = async (files: File[]) => {
    if (files.length === 0) return;
    setIsAnalyzingInvoice(true);
    await wait(2000);
    // Select a random invoice scenario
    setInvoiceAnalysis(getRandomItem(invoiceAnalysisResponses));
    setIsAnalyzingInvoice(false);
  };

  const getSeverityColor = (level: string) => {
    switch(level) {
      case 'Critical': return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
      case 'High': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400';
      case 'Moderate': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400';
      default: return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
    }
  };

  const getSeverityPercent = (level: string) => {
    switch(level) {
      case 'Critical': return 95;
      case 'High': return 75;
      case 'Moderate': return 50;
      default: return 25;
    }
  };

  if (!data) return <div className="h-96 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div></div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8 page-transition pb-32">
      <AIAutomationBanner />
      
      {/* Top Grid: Investigation KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Severity Card - Fixed */}
        <div className="hover-card bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm col-span-1">
           <div className="flex items-center gap-2 mb-2">
             <AlertTriangle size={16} className="text-gray-500" />
             <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Severity</p>
           </div>
           
           <div className="flex items-end gap-2 mb-2">
             <span className={`text-sm font-bold px-2 py-0.5 rounded ${getSeverityColor(data.severityLevel)}`}>
               {data.severityLevel.toUpperCase()}
             </span>
             <span className="text-xs text-gray-400 mb-0.5">{getSeverityPercent(data.severityLevel)}% Impact</span>
           </div>
           
           {/* Visual Bar */}
           <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 mb-3 overflow-hidden">
             <div 
               className={`h-full rounded-full animate-fill-bar ${
                 data.severityLevel === 'Critical' ? 'bg-red-500' :
                 data.severityLevel === 'High' ? 'bg-orange-500' :
                 data.severityLevel === 'Moderate' ? 'bg-yellow-500' : 'bg-green-500'
               }`} 
               style={{ '--target-width': `${getSeverityPercent(data.severityLevel)}%` } as React.CSSProperties}
             ></div>
           </div>

           <ul className="space-y-1">
             <li className="text-[10px] text-gray-500 flex items-center">
               <span className="w-1 h-1 rounded-full bg-gray-400 mr-2"></span>
               Based on damage analysis
             </li>
             <li className="text-[10px] text-gray-500 flex items-center">
               <span className="w-1 h-1 rounded-full bg-gray-400 mr-2"></span>
               Est. repair time: {data.severityLevel === 'Critical' ? '14+' : data.severityLevel === 'High' ? '7-10' : '3-5'} days
             </li>
           </ul>
        </div>

        <div className="hover-card bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
           <div className="flex items-center gap-2 mb-2">
             <DollarSign size={16} className="text-gray-500" />
             <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Est. Cost</p>
           </div>
           <p className="text-xl font-mono font-bold text-gray-900 dark:text-gray-100 mt-2">
             {formatCurrency(data.estimatedCostRange.min)}
             <span className="text-gray-400 text-sm font-normal mx-1">-</span>
             {formatCurrency(data.estimatedCostRange.max)}
           </p>
           <p className="text-[10px] text-gray-400 mt-1">Includes parts & labor</p>
        </div>

        <div className="hover-card bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
           <div className="flex items-center gap-2 mb-2">
             <TrendingUp size={16} className="text-gray-500" />
             <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Liability</p>
           </div>
           <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2 flex overflow-hidden">
             <div className="bg-blue-500 h-2.5 animate-fill-bar shimmer-effect" style={{ '--target-width': `${data.liabilityAssessment.otherParty}%` } as React.CSSProperties}></div>
             <div className="bg-brand-500 h-2.5 animate-fill-bar shimmer-effect" style={{ '--target-width': `${data.liabilityAssessment.claimant}%` } as React.CSSProperties}></div>
           </div>
           <div className="flex justify-between text-xs mt-1 text-gray-500">
             <span>Other: {data.liabilityAssessment.otherParty}%</span>
             <span>Client: {data.liabilityAssessment.claimant}%</span>
           </div>
        </div>

        <div className="hover-card bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
           <div className="flex items-center gap-2 mb-2">
             <Sparkles size={16} className="text-brand-500" />
             <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Confidence</p>
           </div>
           <div className="flex items-baseline text-brand-600 dark:text-brand-400 font-bold text-2xl mt-1">
              {(data.confidence * 100).toFixed(0)}%
           </div>
           <p className="text-[10px] text-gray-400 mt-1">AI certainty score</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Summary & Checklist */}
        <div className="space-y-6">
          <div className="hover-card bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Adjuster Summary</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
              {data.adjusterSummary}
            </p>
            <div className="mt-6">
              <h4 className="text-xs font-bold text-gray-500 uppercase mb-3">Recommended Actions</h4>
              <ul className="space-y-2">
                {data.recommendedActions.map((action, i) => (
                  <li key={i} className="list-item-hover flex items-center text-sm text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900/50 p-2 rounded-lg animate-[slideInRight_0.4s_ease]" style={{ animationDelay: `${i * 0.1}s` }}>
                    <Check className="w-4 h-4 mr-2 text-green-500" />
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Missing Info Checklist */}
          <div className="hover-card bg-orange-50 dark:bg-orange-900/10 p-6 rounded-2xl border border-orange-100 dark:border-orange-900/30">
             <h3 className="text-lg font-bold text-orange-800 dark:text-orange-200 mb-4 flex items-center">
               <AlertCircle className="w-5 h-5 mr-2" />
               Missing Information
             </h3>
             {data.missingInfo.length > 0 ? (
               <div className="space-y-3">
                 {data.missingInfo.map((item, i) => (
                   <label key={i} className="list-item-hover flex items-center p-3 bg-white dark:bg-gray-800 rounded-lg cursor-pointer transition-colors shadow-sm border border-transparent hover:border-orange-200">
                     <input type="checkbox" className="w-4 h-4 text-orange-600 rounded border-gray-300 focus:ring-orange-500" />
                     <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-200">{item}</span>
                   </label>
                 ))}
               </div>
             ) : (
               <p className="text-sm text-orange-700 dark:text-orange-300">All required documents have been collected.</p>
             )}
          </div>
        </div>

        {/* Right Column: Invoice Analyzer */}
        <div className="space-y-6">
          
          {/* Enhanced Invoice Analyzer */}
          <div className="hover-card bg-white dark:bg-gray-800 p-0 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm relative overflow-hidden h-full flex flex-col min-h-[500px]">
             
             {/* Header */}
             <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between bg-gray-50/50 dark:bg-gray-800/50">
               <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                 <FileText className="w-5 h-5 mr-2 text-brand-500" />
                 Invoice Analyzer
               </h3>
               {invoiceAnalysis && <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 px-3 py-1 rounded-full font-bold animate-[fadeIn_0.5s_ease]">AI Verified</span>}
             </div>

             <div className="p-6 flex-1 flex flex-col">
               {!invoiceAnalysis ? (
                 <>
                   <div className="flex-1 flex flex-col justify-center">
                     <FileUpload 
                        accept=".pdf,.jpg,.png" 
                        variant="invoice"
                        label="Upload Repair Invoice"
                        subLabel="PDF or Image scans"
                        onFilesSelected={handleInvoiceUpload}
                     />
                   </div>
                   {isAnalyzingInvoice && (
                     <div className="absolute inset-0 bg-white/90 dark:bg-gray-900/90 flex flex-col items-center justify-center z-10 backdrop-blur-sm animate-[fadeIn_0.3s_ease]">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mb-4"></div>
                        <p className="text-base font-medium text-brand-600 animate-pulse">Matching Line Items to Policy...</p>
                     </div>
                   )}
                 </>
               ) : (
                 <div className="animate-slide-up space-y-6">
                   
                   {/* 1. Policy Details Card */}
                   <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-900/50">
                      <div className="flex items-center gap-2 mb-2">
                        <FileCheck size={16} className="text-blue-600 dark:text-blue-400" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">Policy Details Matched</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-y-1 gap-x-4 text-sm text-gray-700 dark:text-gray-200">
                         <div className="flex justify-between"><span>Policy #:</span> <span className="font-medium">{invoiceAnalysis.policy.policyNumber}</span></div>
                         <div className="flex justify-between"><span>Coverage:</span> <span className="font-medium">{invoiceAnalysis.policy.coverageType}</span></div>
                         <div className="flex justify-between"><span>Deductible:</span> <span className="font-medium">{formatCurrency(invoiceAnalysis.policy.deductible)}</span></div>
                         <div className="flex justify-between"><span>Max Limit:</span> <span className="font-medium">{formatCurrency(invoiceAnalysis.policy.maxCoverage)}</span></div>
                      </div>
                   </div>

                   {/* 2. Line Item Analysis Table */}
                   <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 dark:bg-gray-800 text-gray-500 uppercase text-xs">
                          <tr>
                            <th className="px-3 py-2">Item</th>
                            <th className="px-3 py-2 text-right">Billed</th>
                            <th className="px-3 py-2 text-center">Covered</th>
                            <th className="px-3 py-2 text-right hidden sm:table-cell">Cust.</th>
                            <th className="px-3 py-2 text-right hidden sm:table-cell">Ins.</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                          {invoiceAnalysis.lineItems.map((item, idx) => (
                            <tr key={idx} className={`hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${idx % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50/30 dark:bg-gray-800/30'}`}>
                              <td className="px-3 py-2.5">
                                <div className={`font-medium ${item.covered ? 'text-gray-900 dark:text-gray-100' : 'text-red-600 dark:text-red-400'}`}>
                                  {item.description}
                                </div>
                                {item.notes && <div className="text-[10px] text-gray-500 italic mt-0.5">{item.notes}</div>}
                              </td>
                              <td className="px-3 py-2.5 text-right font-mono text-gray-600 dark:text-gray-300">{formatCurrency(item.billed)}</td>
                              <td className="px-3 py-2.5 text-center">
                                {item.covered ? (
                                  <span className="inline-flex items-center text-xs font-bold text-green-600 dark:text-green-400">
                                    <Check size={12} className="mr-1"/> Yes
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-1.5 py-0.5 rounded">
                                    <XCircle size={12} className="mr-1"/> No
                                  </span>
                                )}
                              </td>
                              <td className="px-3 py-2.5 text-right font-mono text-gray-500 hidden sm:table-cell">
                                {item.customerPays > 0 ? formatCurrency(item.customerPays) : '-'}
                              </td>
                              <td className="px-3 py-2.5 text-right font-mono font-bold text-gray-900 dark:text-gray-100 hidden sm:table-cell">
                                {item.insurerPays > 0 ? formatCurrency(item.insurerPays) : '-'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                   </div>

                   {/* 3. Payment Summary Cards */}
                   <div className="grid grid-cols-2 gap-4">
                      {/* Customer Pays */}
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/10 border border-red-100 dark:border-red-900/30 shadow-sm text-center transform transition-transform hover:scale-[1.02]">
                         <p className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wide mb-1">Customer Pays</p>
                         <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{formatCurrency(invoiceAnalysis.totals.customerPays)}</p>
                         <div className="text-[10px] text-gray-500 space-y-1">
                            <div className="flex justify-between px-2"><span>Deductible:</span> <span>{formatCurrency(invoiceAnalysis.totals.deductible)}</span></div>
                            <div className="flex justify-between px-2"><span>Not Covered:</span> <span>{formatCurrency(invoiceAnalysis.totals.totalBilled - invoiceAnalysis.totals.totalCovered)}</span></div>
                         </div>
                      </div>

                      {/* Insurer Pays */}
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/10 border border-green-100 dark:border-green-900/30 shadow-sm text-center transform transition-transform hover:scale-[1.02]">
                         <p className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wide mb-1">Insurance Pays</p>
                         <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{formatCurrency(invoiceAnalysis.totals.insurerPays)}</p>
                         <div className="text-[10px] text-gray-500 space-y-1">
                            <div className="flex justify-between px-2"><span>Total Covered:</span> <span>{formatCurrency(invoiceAnalysis.totals.totalCovered)}</span></div>
                            <div className="flex justify-between px-2"><span>Less Deductible:</span> <span>-{formatCurrency(invoiceAnalysis.totals.deductible)}</span></div>
                         </div>
                      </div>
                   </div>

                   {/* 4. AI Coverage Notes */}
                   <div className="bg-amber-50/50 dark:bg-amber-900/10 p-4 rounded-xl border border-amber-100 dark:border-amber-900/30">
                      <h4 className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase mb-2 flex items-center">
                        <Sparkles size={12} className="mr-1.5"/> AI Coverage Analysis
                      </h4>
                      <ul className="space-y-1.5">
                        {invoiceAnalysis.aiNotes.map((note, idx) => (
                           <li key={idx} className="text-xs text-gray-600 dark:text-gray-300 flex items-start">
                             <span className="mr-2 mt-0.5">•</span> {note}
                           </li>
                        ))}
                      </ul>
                   </div>

                   <div className="flex gap-3 pt-2">
                     <button className="flex-1 btn-primary-anim py-2.5 rounded-xl bg-brand-600 text-white font-medium shadow-md text-sm hover:bg-brand-700 flex items-center justify-center">
                       <CheckCircle className="w-4 h-4 mr-2" />
                       Approve Breakdown
                     </button>
                     <button 
                       onClick={() => setInvoiceAnalysis(null)}
                       className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-medium text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                     >
                       Reset
                     </button>
                   </div>

                 </div>
               )}
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Step3_Investigation;