
export interface FnolResponse {
  id: string;
  claimant: string;
  policyNumber: string;
  incidentDate: string;
  incidentLocation: string;
  vehicleInfo: { make: string; model: string; year: number };
  damageDescription: string;
  injuriesReported: boolean;
  witnesses: number;
  policeReportFiled: boolean;
  estimatedDamage: string;
  aiExtractedDetails: string[];
  confidence: number;
}

export interface TriageResponse {
  fraudScore: number;
  fraudRiskLevel: "Low" | "Medium" | "High";
  fraudIndicators: string[];
  complexityScore: number;
  complexityLevel: "Low" | "Medium" | "High";
  recommendedAdjuster: { name: string; expertise: string; workload: string };
  aiReasoning: string;
  confidence: number;
  priorityLevel: "Low" | "Medium" | "High" | "Critical";
  estimatedProcessingTime: string;
}

export interface InvestigationResponse {
  severityLevel: "Low" | "Moderate" | "High" | "Critical";
  estimatedCostRange: { min: number; max: number };
  liabilityAssessment: { claimant: number; otherParty: number };
  missingInfo: string[];
  adjusterSummary: string;
  riskFactors: string[];
  recommendedActions: string[];
  confidence: number;
}

export interface InvoiceLineItem {
  description: string;
  billed: number;
  covered: boolean;
  customerPays: number;
  insurerPays: number;
  notes: string | null;
}

export interface InvoicePolicy {
  policyNumber: string;
  coverageType: string;
  deductible: number;
  maxCoverage: number;
}

export interface InvoiceTotals {
  totalBilled: number;
  totalCovered: number;
  deductible: number;
  customerPays: number;
  insurerPays: number;
}

export interface InvoiceAnalysisResponse {
  invoiceId: string;
  vendor: string;
  uploadedFile: string;
  policy: InvoicePolicy;
  lineItems: InvoiceLineItem[];
  totals: InvoiceTotals;
  aiNotes: string[];
  flags: string[];
}

export interface SettlementBreakdownItem {
  item: string;
  amount: number;
  status: string;
  note: string;
}

export interface SettlementResponse {
  recommendedPayout: number;
  range: { min: number; max: number };
  confidence: number;
  breakdown: SettlementBreakdownItem[];
  comparison: {
    similarAverage: number;
    regionalBenchmark: number;
    percentageDiff: number;
  };
  flags: { issue: string; suggestion: string }[];
}

export interface AskAiResponse {
  question: string;
  answer: string;
  sources: string[];
  confidence: number;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}
