
import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, DollarSign, CheckSquare, 
  Search, AlertCircle, TrendingUp, Sparkles, 
  Upload, X, Minimize2, Send, Clock, CheckCircle2,
  User, Briefcase, FileCheck, AlertTriangle, Loader2
} from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { generateDummyData } from '../data/dummyData';
import { aiService } from '../services/aiService';
import { InvestigationData, InvoiceData, FNOLData, TriageData } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface Step3Props {
    fnolData: FNOLData | null;
    triageData: TriageData | null;
    investigationData: InvestigationData | null;
    setInvestigationData: (data: InvestigationData) => void;
}

export const Step3_Investigation: React.FC<Step3Props> = ({ 
    fnolData, 
    triageData, 
    investigationData, 
    setInvestigationData 
}) => {
  const [data, setData] = useState<InvestigationData | null>(investigationData);
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [loading, setLoading] = useState(!investigationData);
  
  // Invoice Upload States
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('');
  const [showAnalysis, setShowAnalysis] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // AI Assistant States
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate initial investigation data if not already present
    const initData = async () => {
        if (!data && fnolData && triageData) {
            setLoading(true);
            try {
                const result = await aiService.generateInvestigation(fnolData, triageData);
                setData(result);
                setInvestigationData(result);
            } catch (e) {
                console.error("Investigation generation failed, using dummy", e);
                const dummy = generateDummyData();
                setData(dummy.investigation);
                setInvestigationData(dummy.investigation);
            }
            setLoading(false);
        } else if (!data) {
             // Fallback
             const dummy = generateDummyData();
             setData(dummy.investigation);
             setLoading(false);
        }
    };
    initData();
  }, [fnolData, triageData, data, setInvestigationData]);

  useEffect(() => {
    if (aiResponse) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [aiResponse]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    
    const file = e.target.files[0];
    setIsUploading(true);
    setUploadProgress(0);
    setUploadStatus("Uploading document...");
    
    // Simulate UI progress while calling API
    let progress = 0;
    const interval = setInterval(() => {
        progress += 5;
        if (progress > 90) progress = 90;
        setUploadProgress(progress);
        if (progress > 20 && progress < 50) setUploadStatus("Scanning text (OCR)...");
        if (progress >= 50 && progress < 80) setUploadStatus("Matching line items to policy...");
        if (progress >= 80) setUploadStatus("Verifying regional labor rates...");
    }, 100);

    try {
        // Call API with real file
        const result = await aiService.analyzeInvoice(file);
        setInvoiceData(result);
        
        clearInterval(interval);
        setUploadProgress(100);
        setUploadStatus("Analysis Complete");
        setTimeout(() => {
            setIsUploading(false);
            setShowAnalysis(true);
        }, 500);

    } catch (e) {
        clearInterval(interval);
        setIsUploading(false);
        setUploadStatus("Analysis Failed");
        console.error("Invoice analysis failed", e);
        alert("Failed to analyze invoice. Please try again.");
    }
  };

  const handleAskAI = async () => {
    if (!aiQuery.trim()) return;
    setIsTyping(true);
    setAiResponse(null);
    try {
        const context = `Claim ID: ${fnolData?.id}, Summary: ${fnolData?.summary}, Severity: ${data?.severity}, Liability: ${data?.liability}`;
        const response = await aiService.askAssistant(aiQuery, context);
        setAiResponse(response);
    } catch (e) {
        setAiResponse("I'm having trouble connecting right now. Please try again.");
    } finally {
        setIsTyping(false);
    }
  };

  if (loading) {
    return (
        <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
            <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
            <p className="text-slate-500">Preparing investigation dashboard...</p>
        </div>
    );
  }

  if (!data || !fnolData || !triageData) return null;

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  const outstandingItems = data.checklist.filter(i => i.status === 'Pending').length;

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="relative space-y-6 max-w-6xl mx-auto pb-24">
      
      {/* Policy Overview Card */}
      <motion.div variants={item}>
        <Card className="bg-white dark:bg-slate-900 border-l-4 border-l-indigo-500 shadow-sm">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                 <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Pre-Investigation Dashboard</h2>
                 <p className="text-sm text-slate-500">Claim ID: <span className="font-mono text-slate-700 dark:text-slate-300">{fnolData.id}</span></p>
              </div>
              <div className="flex flex-wrap gap-4 md:gap-8">
                  <div className="flex items-center gap-2">
                     <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        <User className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                     </div>
                     <div>
                        <p className="text-xs text-slate-500">Policyholder</p>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{fnolData.claimantName}</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                     </div>
                     <div>
                        <p className="text-xs text-slate-500">Policy Number</p>
                        <p className="text-sm font-medium font-mono text-slate-900 dark:text-white">{fnolData.policyNumber}</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        <Briefcase className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                     </div>
                     <div>
                        <p className="text-xs text-slate-500">Assigned Adjuster</p>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{triageData.recommendedAdjuster}</p>
                     </div>
                  </div>
              </div>
           </div>
        </Card>
      </motion.div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div variants={item}>
            <Card>
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <span className="font-medium text-slate-600 dark:text-slate-300">Severity</span>
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{data.severity}</div>
            </Card>
        </motion.div>
        <motion.div variants={item}>
            <Card>
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                        <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="font-medium text-slate-600 dark:text-slate-300">Est. Cost Range</span>
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{data.estimatedCostRange}</div>
            </Card>
        </motion.div>
        <motion.div variants={item}>
            <Card>
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="font-medium text-slate-600 dark:text-slate-300">Liability</span>
                </div>
                <div className="text-xl font-bold text-slate-900 dark:text-white truncate" title={data.liability}>{data.liability}</div>
            </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Col: Checklist */}
        <motion.div variants={item} className="h-full">
            <Card className="h-full">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                        <CheckSquare className="w-5 h-5 text-slate-400" />
                        Investigation Checklist
                    </h3>
                    <Badge variant={outstandingItems > 0 ? 'warning' : 'success'}>
                        {outstandingItems} Outstanding
                    </Badge>
                </div>
                <div className="space-y-3">
                    {data.checklist.map((item, i) => (
                        <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${
                            item.status === 'Pending' 
                                ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm' 
                                : 'bg-slate-50 dark:bg-slate-800/50 border-transparent opacity-75'
                        }`}>
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center border-2 ${
                                item.status === 'Complete' 
                                    ? 'bg-emerald-100 dark:bg-emerald-900/30 border-emerald-500 text-emerald-600'
                                    : item.status === 'Not Required'
                                        ? 'bg-slate-200 dark:bg-slate-700 border-slate-300 text-slate-400'
                                        : 'border-slate-300 dark:border-slate-500'
                            }`}>
                                {item.status === 'Complete' && <CheckCircle2 className="w-3 h-3" />}
                                {item.status === 'Not Required' && <span className="block w-2 h-0.5 bg-slate-400"></span>}
                            </div>
                            <div className="flex-1">
                                <span className={`text-sm font-medium ${item.status === 'Complete' ? 'text-slate-500 line-through' : 'text-slate-900 dark:text-white'}`}>
                                    {item.task}
                                </span>
                            </div>
                            {item.status === 'Pending' && <Badge variant="danger">Required</Badge>}
                            {item.status === 'Not Required' && <span className="text-xs text-slate-400 italic">N/A</span>}
                        </div>
                    ))}
                </div>
            </Card>
        </motion.div>

        {/* Right Col: Invoice Analyzer */}
        <motion.div variants={item} className="h-full">
            <Card className="h-full flex flex-col">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-indigo-500" />
                    Invoice Analyzer
                </h3>

                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="application/pdf,image/*" 
                  onChange={handleFileUpload} 
                />

                {!showAnalysis ? (
                   <div 
                     onClick={!isUploading ? () => fileInputRef.current?.click() : undefined}
                     className={`
                       flex-1 min-h-[250px] border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center p-6 transition-all duration-300 relative overflow-hidden
                       ${isUploading 
                         ? 'border-indigo-400 bg-indigo-50 dark:bg-indigo-900/10 cursor-wait' 
                         : 'border-slate-300 dark:border-slate-700 hover:border-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer group'
                       }
                     `}
                   >
                     {isUploading ? (
                       <div className="w-full max-w-xs z-10">
                         <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">{Math.round(uploadProgress)}%</span>
                            <span className="text-xs text-slate-500 animate-pulse">{uploadStatus}</span>
                         </div>
                         <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-indigo-500 rounded-full"
                              style={{ width: `${uploadProgress}%` }}
                              transition={{ ease: "linear", duration: 0.1 }}
                            />
                         </div>
                         <div className="mt-8 flex justify-center">
                            <Sparkles className="w-8 h-8 text-indigo-400 animate-spin-slow" />
                         </div>
                       </div>
                     ) : (
                       <>
                         <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                           <Upload className="w-8 h-8 text-slate-400 dark:text-slate-500" />
                         </div>
                         <h4 className="text-base font-medium text-slate-900 dark:text-white">Upload Repair Invoice</h4>
                         <p className="text-sm text-slate-500 mt-2 mb-6">Drag and drop or click to browse<br/>PDF, JPG, or PNG up to 10MB</p>
                         <Button size="sm" variant="outline" className="pointer-events-none">Select Document</Button>
                       </>
                     )}
                   </div>
                ) : (
                    // Analysis Result
                    invoiceData && (
                        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col">
                            <div className={`bg-slate-50 dark:bg-slate-800/50 rounded-xl border overflow-hidden mb-3 flex-1 ${invoiceData.anomalies.length > 0 ? 'border-rose-200 dark:border-rose-900/50' : 'border-emerald-200 dark:border-emerald-900/50'}`}>
                                
                                {/* Result Header */}
                                <div className={`p-4 border-b flex justify-between items-center ${invoiceData.anomalies.length > 0 ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-900/50' : 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-900/50'}`}>
                                    <div className="flex items-center gap-2">
                                        {invoiceData.anomalies.length > 0 ? (
                                            <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                                        ) : (
                                            <FileCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                        )}
                                        <span className="font-semibold text-sm text-slate-900 dark:text-white">
                                            {invoiceData.anomalies.length > 0 ? 'Review Needed' : 'Invoice Approved'}
                                        </span>
                                    </div>
                                    <span className="font-mono text-xs text-slate-500">invoice_scan.pdf</span>
                                </div>
                                
                                {/* Summary Section */}
                                <div className="p-4 bg-white dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                                    <p className="text-sm text-slate-700 dark:text-slate-300 mb-2 leading-relaxed">
                                        <strong className="text-slate-900 dark:text-white">Summary:</strong> {invoiceData.coverageSummary}
                                    </p>
                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                        <div className="bg-emerald-50/50 dark:bg-emerald-900/10 p-3 rounded-lg">
                                            <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-2 uppercase tracking-wide">Covered Items</p>
                                            <ul className="space-y-1">
                                                {invoiceData.coveredItems.map((ci, idx) => (
                                                    <li key={idx} className="text-xs text-emerald-900 dark:text-emerald-200 flex items-start gap-1.5">
                                                        <CheckCircle2 className="w-3 h-3 mt-0.5 flex-shrink-0 opacity-70" />
                                                        {ci}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="bg-rose-50/50 dark:bg-rose-900/10 p-3 rounded-lg">
                                            <p className="text-xs font-bold text-rose-700 dark:text-rose-400 mb-2 uppercase tracking-wide">Not Covered</p>
                                            {invoiceData.nonCoveredItems.length > 0 ? (
                                                <ul className="space-y-1">
                                                    {invoiceData.nonCoveredItems.map((nci, idx) => (
                                                        <li key={idx} className="text-xs text-rose-900 dark:text-rose-200 flex items-start gap-1.5">
                                                            <X className="w-3 h-3 mt-0.5 flex-shrink-0 opacity-70" />
                                                            {nci}
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <span className="text-xs text-slate-400 italic">No exclusions found</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-slate-50 dark:bg-slate-800/20 flex justify-between items-center">
                                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Amount</span>
                                    <span className="text-lg font-bold text-slate-900 dark:text-white">${invoiceData.totalAmount.toFixed(2)}</span>
                                </div>
                                
                                {invoiceData.anomalies.length > 0 && (
                                    <div className="bg-amber-50 dark:bg-amber-900/20 p-3 text-xs text-amber-800 dark:text-amber-200 border-t border-amber-100 dark:border-amber-900/30 flex gap-2">
                                        <Sparkles className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
                                        <div>
                                            <strong>AI Insight:</strong> {invoiceData.anomalies[0]}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <button 
                              onClick={() => { setShowAnalysis(false); setInvoiceData(null); }}
                              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 mt-auto pt-2 flex items-center justify-center gap-1 transition-colors"
                            >
                              <X className="w-3 h-3" /> Upload Different Invoice
                            </button>
                        </motion.div>
                    )
                )}
            </Card>
        </motion.div>
      </div>

      {/* Floating AI Assistant */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-none">
          <AnimatePresence>
            {isAiOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="mb-4 w-[350px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden pointer-events-auto"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex items-center justify-between text-white">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            <span className="font-medium text-sm">Claims Assistant</span>
                        </div>
                        <button onClick={() => setIsAiOpen(false)} className="opacity-80 hover:opacity-100 transition-opacity">
                            <Minimize2 className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Chat Area */}
                    <div className="h-[300px] overflow-y-auto p-4 bg-slate-50 dark:bg-slate-950/50 space-y-4">
                        <div className="flex gap-3">
                             <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center flex-shrink-0">
                                 <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                             </div>
                             <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-3 rounded-2xl rounded-tl-none text-sm text-slate-600 dark:text-slate-300 shadow-sm">
                                 Hello! I've analyzed the policy and incoming evidence. How can I help with this claim?
                             </div>
                        </div>

                        {aiResponse && (
                             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center flex-shrink-0">
                                    <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-3 rounded-2xl rounded-tl-none text-sm text-slate-600 dark:text-slate-300 shadow-sm">
                                    {aiResponse}
                                </div>
                            </motion.div>
                        )}

                        {isTyping && (
                             <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center flex-shrink-0">
                                    <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-3 rounded-2xl rounded-tl-none text-sm text-slate-400 shadow-sm flex gap-1">
                                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                                </div>
                            </div >
                        )}
                        <div ref={chatEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex gap-2">
                        <input 
                          type="text" 
                          placeholder="Ask anything..."
                          value={aiQuery}
                          onChange={(e) => setAiQuery(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
                          className="flex-1 bg-slate-100 dark:bg-slate-800 border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
                        />
                        <button 
                            onClick={handleAskAI}
                            disabled={!aiQuery.trim() || isTyping}
                            className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle Button */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAiOpen(!isAiOpen)}
            className={`
                pointer-events-auto
                w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300
                ${isAiOpen 
                    ? 'bg-slate-800 dark:bg-slate-700 text-white rotate-90' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }
            `}
          >
              {isAiOpen ? <X className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
          </motion.button>
      </div>

    </motion.div>
  );
};
