
import { FnolResponse, TriageResponse, InvestigationResponse, InvoiceAnalysisResponse, AskAiResponse, SettlementResponse } from '../types';

export const fnolResponses: FnolResponse[] = [
  {
    id: "FNOL-8492",
    claimant: "James Wilson",
    policyNumber: "POL-2024-88421",
    incidentDate: "2024-03-12",
    incidentLocation: "I-95 Southbound, Exit 42",
    vehicleInfo: { make: "Honda", model: "Civic", year: 2021 },
    damageDescription: "Rear-end collision in stop-and-go traffic.",
    injuriesReported: false,
    witnesses: 2,
    policeReportFiled: true,
    estimatedDamage: "$4,200",
    aiExtractedDetails: ["Bumper detached", "Trunk lid crumpled", "Tail light shattered"],
    confidence: 0.94
  },
  {
    id: "FNOL-9921",
    claimant: "Sarah Conner",
    policyNumber: "POL-2024-11234",
    incidentDate: "2024-03-14",
    incidentLocation: "Downtown Main St & 4th Ave",
    vehicleInfo: { make: "Tesla", model: "Model 3", year: 2023 },
    damageDescription: "Side-swipe while parked.",
    injuriesReported: false,
    witnesses: 0,
    policeReportFiled: false,
    estimatedDamage: "$2,800",
    aiExtractedDetails: ["Driver door scratch", "Mirror broken", "Fender dent"],
    confidence: 0.88
  },
  {
    id: "FNOL-7732",
    claimant: "Robert Chen",
    policyNumber: "POL-2024-77211",
    incidentDate: "2024-03-10",
    incidentLocation: "Residential Driveway",
    vehicleInfo: { make: "Ford", model: "F-150", year: 2020 },
    damageDescription: "Backed into a tree.",
    injuriesReported: false,
    witnesses: 1,
    policeReportFiled: false,
    estimatedDamage: "$1,500",
    aiExtractedDetails: ["Tailgate dent", "Bumper misalignment"],
    confidence: 0.96
  },
  {
    id: "FNOL-3321",
    claimant: "Emily Blunt",
    policyNumber: "POL-2024-33221",
    incidentDate: "2024-03-15",
    incidentLocation: "Grocery Store Parking Lot",
    vehicleInfo: { make: "Toyota", model: "RAV4", year: 2019 },
    damageDescription: "Shopping cart collision due to wind.",
    injuriesReported: false,
    witnesses: 3,
    policeReportFiled: false,
    estimatedDamage: "$950",
    aiExtractedDetails: ["Paint scratch passenger door", "Small dent"],
    confidence: 0.91
  },
  {
    id: "FNOL-1129",
    claimant: "Michael Ross",
    policyNumber: "POL-2024-99882",
    incidentDate: "2024-03-11",
    incidentLocation: "Highway 101, Mile Marker 45",
    vehicleInfo: { make: "BMW", model: "X5", year: 2022 },
    damageDescription: "Front-end collision with debris.",
    injuriesReported: true,
    witnesses: 0,
    policeReportFiled: true,
    estimatedDamage: "$8,500",
    aiExtractedDetails: ["Grill destroyed", "Headlight cracked", "Hood bent"],
    confidence: 0.92
  }
];

export const triageResponses: TriageResponse[] = [
  {
    fraudScore: 12,
    fraudRiskLevel: "Low",
    fraudIndicators: [],
    complexityScore: 3,
    complexityLevel: "Low",
    recommendedAdjuster: { name: "Auto AI Bot", expertise: "Fast Track", workload: "Low" },
    aiReasoning: "Damage is consistent with description. Metadata matches location/time.",
    confidence: 0.98,
    priorityLevel: "Low",
    estimatedProcessingTime: "24 hours"
  },
  {
    fraudScore: 78,
    fraudRiskLevel: "High",
    fraudIndicators: ["Inconsistent timeline", "Prior claims history matches pattern", "Metadata mismatch"],
    complexityScore: 8,
    complexityLevel: "High",
    recommendedAdjuster: { name: "John Smith", expertise: "SIU Specialist", workload: "Medium" },
    aiReasoning: "Detected anomalies in photo metadata vs reported time. High frequency of similar claims.",
    confidence: 0.84,
    priorityLevel: "Critical",
    estimatedProcessingTime: "5-7 business days"
  },
  {
    fraudScore: 45,
    fraudRiskLevel: "Medium",
    fraudIndicators: ["Late reporting", "High value claim"],
    complexityScore: 6,
    complexityLevel: "Medium",
    recommendedAdjuster: { name: "Sarah Johnson", expertise: "Auto Collision", workload: "High" },
    aiReasoning: "Claim is legitimate but value exceeds rapid approval threshold.",
    confidence: 0.92,
    priorityLevel: "Medium",
    estimatedProcessingTime: "3 business days"
  },
  {
    fraudScore: 88,
    fraudRiskLevel: "High",
    fraudIndicators: ["Image manipulation detected", "Generic internet photo"],
    complexityScore: 9,
    complexityLevel: "High",
    recommendedAdjuster: { name: "Mike Ross", expertise: "Fraud Investigation", workload: "Low" },
    aiReasoning: "Uploaded images appear to be screenshots or edited. EXIF data missing.",
    confidence: 0.99,
    priorityLevel: "Critical",
    estimatedProcessingTime: "Indefinite"
  },
  {
    fraudScore: 5,
    fraudRiskLevel: "Low",
    fraudIndicators: [],
    complexityScore: 2,
    complexityLevel: "Low",
    recommendedAdjuster: { name: "Auto AI Bot", expertise: "Fast Track", workload: "Low" },
    aiReasoning: "Clear liability, minor damage, verifiable evidence.",
    confidence: 0.97,
    priorityLevel: "Low",
    estimatedProcessingTime: "Instant"
  }
];

export const investigationResponses: InvestigationResponse[] = [
  {
    severityLevel: "Moderate",
    estimatedCostRange: { min: 6500, max: 9200 },
    liabilityAssessment: { claimant: 20, otherParty: 80 },
    missingInfo: ["Repair shop estimate", "Medical records for passenger"],
    adjusterSummary: "Vehicle is drivable but requires significant body work. Liability is shared but favors claimant.",
    riskFactors: ["Potential hidden frame damage", "Rental car duration"],
    recommendedActions: ["Authorize teardown", "Request police report copy"],
    confidence: 0.89
  },
  {
    severityLevel: "Critical",
    estimatedCostRange: { min: 15000, max: 22000 },
    liabilityAssessment: { claimant: 0, otherParty: 100 },
    missingInfo: ["Total loss valuation", "Title transfer docs"],
    adjusterSummary: "Likely total loss. Airbags deployed. Structural integrity compromised.",
    riskFactors: ["High salvage value variance", "Injury claim pending"],
    recommendedActions: ["Move to total loss department", "Arragne towing"],
    confidence: 0.95
  },
  {
    severityLevel: "Low",
    estimatedCostRange: { min: 800, max: 1200 },
    liabilityAssessment: { claimant: 100, otherParty: 0 },
    missingInfo: [],
    adjusterSummary: "Cosmetic damage only. Simple bumper repair.",
    riskFactors: [],
    recommendedActions: ["Approve estimate", "Issue payment"],
    confidence: 0.98
  },
  {
    severityLevel: "High",
    estimatedCostRange: { min: 4500, max: 6000 },
    liabilityAssessment: { claimant: 50, otherParty: 50 },
    missingInfo: ["Witness statements"],
    adjusterSummary: "Disputed lane change accident. Damage consistent with sideswipe.",
    riskFactors: ["Litigation risk", "Subrogation unlikely"],
    recommendedActions: ["Interview witnesses", "Negotiate 50/50 split"],
    confidence: 0.82
  }
];

export const invoiceAnalysisResponses: InvoiceAnalysisResponse[] = [
  {
    invoiceId: "INV-2024-1024",
    vendor: "AutoFix Pro",
    uploadedFile: "AutoFix_Pro_Invoice_1024.pdf",
    policy: {
      policyNumber: "POL-2024-78542",
      coverageType: "Comprehensive",
      deductible: 500,
      maxCoverage: 25000
    },
    lineItems: [
      { 
        description: "Front bumper replacement", 
        billed: 850, 
        covered: true, 
        customerPays: 0, 
        insurerPays: 850,
        notes: null
      },
      { 
        description: "Hood replacement", 
        billed: 1200, 
        covered: true, 
        customerPays: 0, 
        insurerPays: 1200,
        notes: null
      },
      { 
        description: "Labor (8 hrs @ $120/hr)", 
        billed: 960, 
        covered: true, 
        customerPays: 0, 
        insurerPays: 960,
        notes: "Rate within acceptable range"
      },
      { 
        description: "Paint work", 
        billed: 650, 
        covered: true, 
        customerPays: 0, 
        insurerPays: 650,
        notes: null
      },
      { 
        description: "Premium detailing", 
        billed: 200, 
        covered: false, 
        customerPays: 200, 
        insurerPays: 0,
        notes: "Cosmetic enhancement - not covered"
      },
      { 
        description: "Aftermarket spoiler", 
        billed: 450, 
        covered: false, 
        customerPays: 450, 
        insurerPays: 0,
        notes: "Non-OEM modification - not covered"
      }
    ],
    totals: {
      totalBilled: 4310,
      totalCovered: 3660,
      deductible: 500,
      customerPays: 1150,
      insurerPays: 3160
    },
    aiNotes: [
      "Premium detailing not covered - cosmetic enhancement",
      "Aftermarket spoiler not covered - non-OEM modification",
      "Labor rate ($120/hr) is within acceptable range",
      "All parts verified as OEM replacements"
    ],
    flags: []
  },
  {
    invoiceId: "INV-2024-1025",
    vendor: "City Auto Body",
    uploadedFile: "CityAutoBody_Repair.pdf",
    policy: {
      policyNumber: "POL-2024-65321",
      coverageType: "Comprehensive",
      deductible: 250,
      maxCoverage: 30000
    },
    lineItems: [
      { description: "Rear bumper repair", billed: 600, covered: true, customerPays: 0, insurerPays: 600, notes: null },
      { description: "Tail light replacement", billed: 350, covered: true, customerPays: 0, insurerPays: 350, notes: null },
      { description: "Labor (4 hrs)", billed: 480, covered: true, customerPays: 0, insurerPays: 480, notes: null }
    ],
    totals: {
      totalBilled: 1430,
      totalCovered: 1430,
      deductible: 250,
      customerPays: 250,
      insurerPays: 1180
    },
    aiNotes: [
      "All items covered under comprehensive policy",
      "Repair costs within expected range for damage type",
      "No flags or concerns identified"
    ],
    flags: []
  },
  {
    invoiceId: "INV-2024-1026",
    vendor: "Premium Auto Care",
    uploadedFile: "PremiumAuto_Invoice.pdf",
    policy: {
      policyNumber: "POL-2024-99887",
      coverageType: "Comprehensive",
      deductible: 500,
      maxCoverage: 20000
    },
    lineItems: [
      { description: "Door panel replacement", billed: 900, covered: true, customerPays: 0, insurerPays: 900, notes: null },
      { description: "Window replacement", billed: 450, covered: true, customerPays: 0, insurerPays: 450, notes: null },
      { description: "Labor (6 hrs @ $180/hr)", billed: 1080, covered: true, customerPays: 0, insurerPays: 1080, notes: "⚠️ Rate 35% above market average" }
    ],
    totals: {
      totalBilled: 2430,
      totalCovered: 2430,
      deductible: 500,
      customerPays: 500,
      insurerPays: 1930
    },
    aiNotes: [
      "⚠️ Labor rate ($180/hr) is 35% above market average ($133/hr)",
      "Recommend requesting itemized labor breakdown",
      "Parts pricing is within normal range"
    ],
    flags: ["Labor rate above market average"]
  },
  {
    invoiceId: "INV-2024-1027",
    vendor: "Elite Collision Center",
    uploadedFile: "EliteCollision_Estimate.pdf",
    policy: {
      policyNumber: "POL-2024-11223",
      coverageType: "Basic",
      deductible: 1000,
      maxCoverage: 10000
    },
    lineItems: [
      { description: "Frame straightening", billed: 3500, covered: true, customerPays: 0, insurerPays: 3500, notes: null },
      { description: "Engine mount repair", billed: 2200, covered: true, customerPays: 0, insurerPays: 2200, notes: null },
      { description: "Front end assembly", billed: 4800, covered: true, customerPays: 0, insurerPays: 4800, notes: null },
      { description: "Labor (20 hrs)", billed: 2400, covered: true, customerPays: 400, insurerPays: 2000, notes: "Partial - exceeds policy max" }
    ],
    totals: {
      totalBilled: 12900,
      totalCovered: 10000,
      deductible: 1000,
      customerPays: 3900,
      insurerPays: 9000
    },
    aiNotes: [
      "⚠️ Total repairs exceed policy maximum ($10,000)",
      "Customer responsible for $2,900 above coverage limit",
      "Consider discussing policy upgrade with claimant",
      "All repair items are legitimate and necessary"
    ],
    flags: ["Exceeds policy maximum"]
  },
  {
    invoiceId: "INV-2024-1028",
    vendor: "Luxury Auto Restoration",
    uploadedFile: "LuxuryAuto_Quote.pdf",
    policy: {
      policyNumber: "POL-2024-44556",
      coverageType: "Standard",
      deductible: 500,
      maxCoverage: 15000
    },
    lineItems: [
      { description: "Quarter panel repair", billed: 1100, covered: true, customerPays: 0, insurerPays: 1100, notes: null },
      { description: "Paint matching", billed: 800, covered: true, customerPays: 0, insurerPays: 800, notes: null },
      { description: "Ceramic coating", billed: 600, covered: false, customerPays: 600, insurerPays: 0, notes: "Premium service - not covered" },
      { description: "Interior detailing", billed: 350, covered: false, customerPays: 350, insurerPays: 0, notes: "Cosmetic - not covered" },
      { description: "Wheel refinishing", billed: 400, covered: false, customerPays: 400, insurerPays: 0, notes: "Unrelated to claim damage" }
    ],
    totals: {
      totalBilled: 3250,
      totalCovered: 1900,
      deductible: 500,
      customerPays: 1850,
      insurerPays: 1400
    },
    aiNotes: [
      "3 items identified as non-covered services",
      "Ceramic coating: Premium enhancement, not repair",
      "Interior detailing: Cosmetic service, not damage-related",
      "Wheel refinishing: Not related to reported incident"
    ],
    flags: ["Multiple non-covered items"]
  }
];

export const settlementResponses: SettlementResponse[] = [
  {
    recommendedPayout: 7850,
    range: { min: 7200, max: 8400 },
    confidence: 0.91,
    breakdown: [
      { item: "Vehicle Repairs", amount: 6200, status: "verified", note: "3 estimates" },
      { item: "Rental Car", amount: 450, status: "covered", note: "5 days" },
      { item: "Towing", amount: 150, status: "verified", note: "Receipt verified" },
      { item: "Admin/Processing", amount: 100, status: "verified", note: "Standard fee" },
      { item: "Depreciation Adjustment", amount: -950, status: "info", note: "Vehicle age factor" },
      { item: "Deductible", amount: -500, status: "verified", note: "Per policy" }
    ],
    comparison: {
      similarAverage: 7620,
      regionalBenchmark: 7900,
      percentageDiff: 3
    },
    flags: [
      { issue: "Labor rate above market", suggestion: "Request breakdown" }
    ]
  },
  {
    recommendedPayout: 3200,
    range: { min: 2900, max: 3500 },
    confidence: 0.95,
    breakdown: [
      { item: "Bumper Repair", amount: 1800, status: "verified", note: "OEM parts" },
      { item: "Paint", amount: 800, status: "verified", note: "3-stage pearl" },
      { item: "Rental Car", amount: 600, status: "covered", note: "10 days" },
      { item: "Deductible", amount: -500, status: "verified", note: "Per policy" }
    ],
    comparison: {
      similarAverage: 3100,
      regionalBenchmark: 3300,
      percentageDiff: 0
    },
    flags: []
  },
  {
    recommendedPayout: 12500,
    range: { min: 11000, max: 14000 },
    confidence: 0.82,
    breakdown: [
      { item: "Total Loss Value", amount: 14000, status: "verified", note: "CCC Valuation" },
      { item: "Taxes & Fees", amount: 1200, status: "verified", note: "State regulation" },
      { item: "Salvage Value", amount: -2200, status: "verified", note: "High bid" },
      { item: "Deductible", amount: -500, status: "verified", note: "Per policy" }
    ],
    comparison: {
      similarAverage: 12800,
      regionalBenchmark: 13000,
      percentageDiff: -2
    },
    flags: [
      { issue: "Condition rating disputed", suggestion: "Review photos" },
      { issue: "Recent tires not credited", suggestion: "Request receipts" }
    ]
  },
  {
    recommendedPayout: 850,
    range: { min: 800, max: 950 },
    confidence: 0.98,
    breakdown: [
      { item: "Glass Replacement", amount: 600, status: "verified", note: "Windshield" },
      { item: "Calibration", amount: 500, status: "verified", note: "ADAS system" },
      { item: "Deductible", amount: -250, status: "verified", note: "Glass policy" }
    ],
    comparison: {
      similarAverage: 900,
      regionalBenchmark: 950,
      percentageDiff: -10
    },
    flags: []
  },
  {
    recommendedPayout: 4500,
    range: { min: 4200, max: 5100 },
    confidence: 0.88,
    breakdown: [
      { item: "Suspension Repair", amount: 3800, status: "verified", note: "Complex labor" },
      { item: "Alignment", amount: 200, status: "verified", note: "4-wheel" },
      { item: "Rental Car", amount: 1000, status: "covered", note: "Parts delay" },
      { item: "Deductible", amount: -500, status: "verified", note: "Per policy" }
    ],
    comparison: {
      similarAverage: 4400,
      regionalBenchmark: 4600,
      percentageDiff: 2
    },
    flags: [
      { issue: "Extended rental duration", suggestion: "Verify parts ETA" }
    ]
  }
];

export const askAiResponses: AskAiResponse[] = [
  {
    question: "What are the key risk factors?",
    answer: "Based on the telemetry and photos, the key risk is hidden suspension damage due to the angle of impact on the wheel well. Also, the claimant waited 3 days to report.",
    sources: ["Photo metadata", "Impact analysis", "FNOL Report"],
    confidence: 0.91
  },
  {
    question: "Is the invoice reasonable?",
    answer: "The labor hours for a bumper replacement are 40% higher than the regional average for this vehicle make/model.",
    sources: ["Market database", "Estimate #4421"],
    confidence: 0.95
  },
  {
    question: "Who is at fault?",
    answer: "Preliminary analysis suggests 80% liability on the other party due to rear-end collision nature, but claimant was stopped abruptly.",
    sources: ["Police Report", "Traffic Pattern Data"],
    confidence: 0.85
  }
];
