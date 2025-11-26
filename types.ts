
export interface FNOLData {
  id: string;
  policyNumber: string;
  claimantName: string;
  vehicleDetails: string; // New
  policyType: string; // New
  incidentType: string;
  timestamp: string;
  summary: string;
}

export interface TriageData {
  fraudScore: number; // 0-100
  fraudReasoning: string;
  complexity: 'Low' | 'Medium' | 'High';
  recommendedAdjuster: string;
  adjusterSpecialty: string;
  aiReasoning: string;
  confidence: number; // 0-100
}

export interface ChecklistItem {
  task: string;
  status: 'Pending' | 'Complete' | 'Not Required';
}

export interface InvestigationData {
  severity: 'Minor' | 'Moderate' | 'Severe' | 'Total Loss';
  estimatedCostRange: string;
  liability: string;
  checklist: ChecklistItem[]; // Changed from missingInfo string[]
  adjusterSummary: string;
  invoiceAnalysis: InvoiceData | null;
  askAiResponse?: string;
}

export interface InvoiceData {
  totalAmount: number;
  lineItems: { description: string; amount: number; flagged: boolean }[];
  anomalies: string[];
  coveredItems: string[]; // New
  nonCoveredItems: string[]; // New
  coverageSummary: string; // New
}

export type Step = 'FNOL' | 'Triage' | 'Pre-Investigation';
