
import { FNOLData, TriageData, InvestigationData, InvoiceData, ChecklistItem } from '../types';

// 1. LIABILITY VARIANTS (10)
const liabilityVariants = [
  '100% Insured At-Fault (Rear End)',
  '0% Insured Fault (Rear Ended)',
  'Comparative Negligence (50/50)',
  '100% Third Party Fault (Failure to Yield)',
  'No Fault (Act of Nature/Weather)',
  'Shared Liability (80/20 Insured)',
  'Comprehensive Only (Theft/Vandalism)',
  'Under Investigation (Conflicting Statements)',
  '0% Fault (Hit while Parked)',
  '100% Insured At-Fault (Single Vehicle)'
];

// 2. CHECKLIST VARIANTS (10 Sets)
const checklistVariants: ChecklistItem[][] = [
  // Variant 0: Standard Auto Collision
  [
    { task: 'Police Report Verification', status: 'Pending' },
    { task: 'Witness Statement Collection', status: 'Pending' },
    { task: 'Coverage Confirmation', status: 'Complete' },
    { task: 'Deductible Payment', status: 'Pending' },
    { task: 'Repair Estimate Upload', status: 'Pending' },
    { task: 'Scene Photos Analysis', status: 'Complete' }
  ],
  // Variant 1: Water Damage
  [
    { task: 'Mitigation Invoice Review', status: 'Pending' },
    { task: 'Moisture Map Analysis', status: 'Complete' },
    { task: 'Contents Inventory List', status: 'Pending' },
    { task: 'Coverage Confirmation', status: 'Complete' },
    { task: 'Cause & Origin Report', status: 'Complete' }
  ],
  // Variant 2: Theft
  [
    { task: 'Police Report Verification', status: 'Complete' },
    { task: 'Proof of Ownership (Title)', status: 'Complete' },
    { task: 'Key Account Statement', status: 'Pending' },
    { task: 'SIU Referral Review', status: 'Pending' },
    { task: 'Total Loss Valuation', status: 'Pending' }
  ],
  // Variant 3: Wind/Hail
  [
    { task: 'Meteorological Report', status: 'Complete' },
    { task: 'Roof Inspection Report', status: 'Pending' },
    { task: 'Contractor Estimate Review', status: 'Pending' },
    { task: 'Prior Loss Check', status: 'Complete' },
    { task: 'Deductible Confirmation', status: 'Complete' }
  ],
  // Variant 4: Liability/Slip & Fall
  [
    { task: 'Incident Report Review', status: 'Pending' },
    { task: 'CCTV Footage Request', status: 'Pending' },
    { task: 'Claimant Medical Records', status: 'Pending' },
    { task: 'Lease Agreement Review', status: 'Complete' },
    { task: 'Witness Statements', status: 'Pending' }
  ],
  // Variant 5: Animal Collision
  [
    { task: 'Photo Evidence Review', status: 'Complete' },
    { task: 'Repair Estimate', status: 'Pending' },
    { task: 'Deductible Waiver Check', status: 'Complete' },
    { task: 'Towing Invoice', status: 'Pending' }
  ],
  // Variant 6: Vandalism
  [
    { task: 'Police Report Verification', status: 'Complete' },
    { task: 'Photos of Damages', status: 'Complete' },
    { task: 'Repair Estimate', status: 'Pending' },
    { task: 'Neighborhood Canvas', status: 'Not Required' }
  ],
  // Variant 7: Hail (Auto)
  [
    { task: 'PDR Estimate Review', status: 'Pending' },
    { task: 'Scan for Hidden Damage', status: 'Pending' },
    { task: 'Rental Vehicle Authorization', status: 'Complete' },
    { task: 'Coverage Check', status: 'Complete' }
  ],
  // Variant 8: Fire (Small)
  [
    { task: 'Fire Marshall Report', status: 'Pending' },
    { task: 'Restoration Estimate', status: 'Pending' },
    { task: 'ALE (Living Expenses) Review', status: 'Pending' },
    { task: 'Inventory Loss List', status: 'Pending' }
  ],
  // Variant 9: Bike vs Car
  [
    { task: 'Police Report Verification', status: 'Pending' },
    { task: 'Cyclist Statement', status: 'Pending' },
    { task: 'Medical Bills Review', status: 'Pending' },
    { task: 'Driver Statement', status: 'Complete' },
    { task: 'Scene Diagram', status: 'Pending' }
  ]
];

// 3. FNOL VARIANTS (10)
const fnolVariants: FNOLData[] = [
  {
    id: 'CLM-2024-8821',
    policyNumber: 'POL-993821-NY',
    claimantName: 'Alice Johnson',
    vehicleDetails: '2022 Tesla Model 3',
    policyType: 'Comprehensive Auto',
    incidentType: 'Vehicle Collision',
    timestamp: new Date().toISOString(),
    summary: 'Insured reports being rear-ended at a stop light on 5th Avenue. Photo evidence shows bumper damage and cracked tail light. No injuries reported.'
  },
  {
    id: 'CLM-2024-1102',
    policyNumber: 'POL-112233-CA',
    claimantName: 'Robert Smith',
    vehicleDetails: 'N/A (Property)',
    policyType: 'Homeowners HO-3',
    incidentType: 'Water Damage',
    timestamp: new Date().toISOString(),
    summary: 'Insured returned home to find kitchen flooded. Suspected pipe burst under the sink. Hardwood flooring in kitchen and hallway is warped.'
  },
  {
    id: 'CLM-2024-4456',
    policyNumber: 'POL-445566-TX',
    claimantName: 'Charlie Davis',
    vehicleDetails: '2019 Ford F-150',
    policyType: 'Commercial Auto',
    incidentType: 'Theft',
    timestamp: new Date().toISOString(),
    summary: 'Vehicle broken into while parked overnight at job site. Passenger side window smashed. Tools and personal items reported missing.'
  },
  {
    id: 'CLM-2024-7789',
    policyNumber: 'POL-778899-FL',
    claimantName: 'Diana Prince',
    vehicleDetails: 'N/A (Property)',
    policyType: 'Condo Unit Owner',
    incidentType: 'Wind Damage',
    timestamp: new Date().toISOString(),
    summary: 'Hurricane debris shattered sliding glass door. Water ingress in living room. Carpet soaked, furniture damaged.'
  },
  {
    id: 'CLM-2024-0011',
    policyNumber: 'POL-000111-IL',
    claimantName: 'Evan Wright',
    vehicleDetails: 'N/A (Liability)',
    policyType: 'General Liability',
    incidentType: 'Slip and Fall',
    timestamp: new Date().toISOString(),
    summary: 'Third party claims they slipped on icy walkway at insured premises. Report mentions back pain. Video doorbell footage available.'
  },
  {
    id: 'CLM-2024-2234',
    policyNumber: 'POL-223456-WA',
    claimantName: 'Fiona Gallagher',
    vehicleDetails: '2020 Subaru Outback',
    policyType: 'Personal Auto',
    incidentType: 'Animal Collision',
    timestamp: new Date().toISOString(),
    summary: 'Insured hit a deer on rural highway. Front grille, headlights, and hood significantly damaged. Airbags did not deploy.'
  },
  {
    id: 'CLM-2024-3345',
    policyNumber: 'POL-334567-AZ',
    claimantName: 'George Miller',
    vehicleDetails: '2023 Toyota Camry',
    policyType: 'Personal Auto',
    incidentType: 'Vandalism',
    timestamp: new Date().toISOString(),
    summary: 'Car was keyed across multiple panels while parked at shopping mall. Tires slashed. Police report filed.'
  },
  {
    id: 'CLM-2024-4457',
    policyNumber: 'POL-445789-MA',
    claimantName: 'Hannah Lee',
    vehicleDetails: '2021 Honda CR-V',
    policyType: 'Personal Auto',
    incidentType: 'Hail Damage',
    timestamp: new Date().toISOString(),
    summary: 'Severe hail storm caused dents on hood, roof, and trunk. Windshield cracked. Vehicle was parked in driveway.'
  },
  {
    id: 'CLM-2024-9901',
    policyNumber: 'POL-990011-OR',
    claimantName: 'Ian Malcolm',
    vehicleDetails: 'N/A (Property)',
    policyType: 'Renters Insurance',
    incidentType: 'Fire Damage',
    timestamp: new Date().toISOString(),
    summary: 'Small grease fire in kitchen. Extinguished by insured. Smoke damage to cabinets and ceiling. Microwave destroyed.'
  },
  {
    id: 'CLM-2024-5566',
    policyNumber: 'POL-556677-CO',
    claimantName: 'Julia Childs',
    vehicleDetails: '2024 Rav4 Hybrid',
    policyType: 'Personal Auto',
    incidentType: 'Bike Collision',
    timestamp: new Date().toISOString(),
    summary: 'Insured opening door struck passing cyclist. Cyclist minor abrasion. Bike front wheel bent. Insured accepts fault.'
  }
];

// 4. TRIAGE VARIANTS (10)
const triageVariants: TriageData[] = [
  {
    fraudScore: 12,
    fraudReasoning: 'Low risk. Incident aligns with weather reports and telematics data.',
    complexity: 'Low',
    recommendedAdjuster: 'Auto-Bot Express',
    adjusterSpecialty: 'Fast Track Auto',
    aiReasoning: 'Clear liability, minor damage, verification sources match.',
    confidence: 98
  },
  {
    fraudScore: 88,
    fraudReasoning: 'High risk. Policy started 2 days ago. Photos metadata mismatch.',
    complexity: 'High',
    recommendedAdjuster: 'Sarah Connor (SIU)',
    adjusterSpecialty: 'Fraud Investigation',
    aiReasoning: 'Suspicious timing relative to policy inception. Requires manual SIU review.',
    confidence: 92
  },
  {
    fraudScore: 45,
    fraudReasoning: 'Moderate risk. Previous claims history for similar incidents.',
    complexity: 'Medium',
    recommendedAdjuster: 'Mike Ross',
    adjusterSpecialty: 'Property Damage',
    aiReasoning: 'Standard property claim but frequent filer flag triggered.',
    confidence: 88
  },
  {
    fraudScore: 5,
    fraudReasoning: 'Very low risk. Police report filed and consistent with statement.',
    complexity: 'Medium',
    recommendedAdjuster: 'Harvey Specter',
    adjusterSpecialty: 'Liability Disputes',
    aiReasoning: 'Third-party involvement complicates simple processing.',
    confidence: 95
  },
  {
    fraudScore: 25,
    fraudReasoning: 'Low-Medium risk. High value items claimed without receipts yet.',
    complexity: 'High',
    recommendedAdjuster: 'Jessica Pearson',
    adjusterSpecialty: 'High Value Contents',
    aiReasoning: 'Requires proof of ownership validation for listed electronics.',
    confidence: 85
  },
  {
    fraudScore: 65,
    fraudReasoning: 'Elevated risk. Inconsistent statements regarding driver identity.',
    complexity: 'High',
    recommendedAdjuster: 'Saul Goodman',
    adjusterSpecialty: 'Complex Liability',
    aiReasoning: 'Potential unlisted driver. Coverage verification needed.',
    confidence: 89
  },
  {
    fraudScore: 10,
    fraudReasoning: 'Low risk. Dashcam footage corroborates insured account.',
    complexity: 'Low',
    recommendedAdjuster: 'Auto-Bot Lite',
    adjusterSpecialty: 'Express Handling',
    aiReasoning: 'Video evidence conclusive. Straight through processing candidate.',
    confidence: 99
  },
  {
    fraudScore: 30,
    fraudReasoning: 'Low risk. Severity is high but facts are consistent.',
    complexity: 'High',
    recommendedAdjuster: 'Olivia Pope',
    adjusterSpecialty: 'Total Loss / Severe',
    aiReasoning: 'High dollar value exposure. Requires senior adjuster oversight.',
    confidence: 94
  },
  {
    fraudScore: 55,
    fraudReasoning: 'Moderate risk. Late reporting of incident (>14 days).',
    complexity: 'Medium',
    recommendedAdjuster: 'Alicia Florrick',
    adjusterSpecialty: 'General Claims',
    aiReasoning: 'Delay in reporting needs explanation. Prejudice to investigation possible.',
    confidence: 82
  },
  {
    fraudScore: 18,
    fraudReasoning: 'Low risk. Repeat customer with clean 10-year history.',
    complexity: 'Low',
    recommendedAdjuster: 'Auto-Bot Premium',
    adjusterSpecialty: 'VIP Handling',
    aiReasoning: 'VIP status detected. Expedite payment channels.',
    confidence: 97
  }
];

// 5. INVESTIGATION VARIANTS (10)
const investigationVariants: InvestigationData[] = [
  {
    severity: 'Minor',
    estimatedCostRange: '$800 - $1,500',
    liability: liabilityVariants[0],
    checklist: checklistVariants[0],
    adjusterSummary: 'Straightforward bumper repair. Shop network engaged. Subrogation potential high against adverse carrier.',
    invoiceAnalysis: null
  },
  {
    severity: 'Severe',
    estimatedCostRange: '$40,000 - $55,000',
    liability: liabilityVariants[4],
    checklist: checklistVariants[1],
    adjusterSummary: 'Significant structural damage. Temporary housing authorized. Cause and origin expert assigned.',
    invoiceAnalysis: null
  },
  {
    severity: 'Moderate',
    estimatedCostRange: '$7,500 - $10,000',
    liability: liabilityVariants[6],
    checklist: checklistVariants[2],
    adjusterSummary: 'Tools stolen from vehicle. Checking limits for business personal property under auto policy.',
    invoiceAnalysis: null
  },
  {
    severity: 'Total Loss',
    estimatedCostRange: '$19,000 - $24,000',
    liability: liabilityVariants[5],
    checklist: checklistVariants[3],
    adjusterSummary: 'Roof compromised. Interior water damage substantial. Hotel approved for 3 nights.',
    invoiceAnalysis: null
  },
  {
    severity: 'Minor',
    estimatedCostRange: '$350 - $600',
    liability: liabilityVariants[2],
    checklist: checklistVariants[4],
    adjusterSummary: 'Slip and fall. Minor soft tissue injury alleged. Med pay limit likely sufficient.',
    invoiceAnalysis: null
  },
  {
    severity: 'Moderate',
    estimatedCostRange: '$4,500 - $6,200',
    liability: liabilityVariants[5],
    checklist: checklistVariants[5],
    adjusterSummary: 'Deer hit. Comprehensive claim. No fault chargeable. Estimate approved.',
    invoiceAnalysis: null
  },
  {
    severity: 'Total Loss',
    estimatedCostRange: '$32,000 - $35,000',
    liability: liabilityVariants[6],
    checklist: checklistVariants[6],
    adjusterSummary: 'Vandalism extensive. Paint damage on all panels + slashed seats. Constructive total loss.',
    invoiceAnalysis: null
  },
  {
    severity: 'Moderate',
    estimatedCostRange: '$2,500 - $4,000',
    liability: liabilityVariants[4],
    checklist: checklistVariants[7],
    adjusterSummary: 'Hail damage. PDR (Paintless Dent Repair) scheduled. Rental authorized for repair duration.',
    invoiceAnalysis: null
  },
  {
    severity: 'Minor',
    estimatedCostRange: '$1,200 - $1,800',
    liability: liabilityVariants[8],
    checklist: checklistVariants[8],
    adjusterSummary: 'Smoke mitigation only. No structural fire damage. Cleaning crew dispatched.',
    invoiceAnalysis: null
  },
  {
    severity: 'Minor',
    estimatedCostRange: '$400 - $800',
    liability: liabilityVariants[0],
    checklist: checklistVariants[9],
    adjusterSummary: 'Cyclist bike wheel damage. Insured at fault. Quick settlement recommended to avoid BI escalation.',
    invoiceAnalysis: null
  }
];

// 6. INVOICE VARIANTS (10)
const invoiceVariants: InvoiceData[] = [
  {
    totalAmount: 1450.00,
    lineItems: [
      { description: 'Bumper Cover', amount: 450.00, flagged: false },
      { description: 'Paint & Labor', amount: 800.00, flagged: false },
      { description: 'Misc Shop Supplies', amount: 200.00, flagged: true }
    ],
    anomalies: ['Shop supplies charge exceeds regional average (15% vs 5%).'],
    coveredItems: ['Bumper Cover', 'Paint & Labor'],
    nonCoveredItems: ['Excessive Shop Supplies'],
    coverageSummary: 'Primary repair items covered. Adjustment needed for supplies.'
  },
  {
    totalAmount: 5200.00,
    lineItems: [
      { description: 'Water Extraction', amount: 1200.00, flagged: false },
      { description: 'Dehumidifier Rental (7 days)', amount: 1500.00, flagged: true },
      { description: 'Flooring Replacement', amount: 2500.00, flagged: false }
    ],
    anomalies: ['Rental duration inconsistent with square footage dried.'],
    coveredItems: ['Water Extraction', 'Flooring Replacement'],
    nonCoveredItems: ['Excess Rental Days (3)'],
    coverageSummary: 'Mitigation covered. Rental equipment duration reduced to standard 4 days.'
  },
  {
    totalAmount: 320.00,
    lineItems: [
      { description: 'Windshield OEM', amount: 320.00, flagged: false }
    ],
    anomalies: [],
    coveredItems: ['Windshield OEM'],
    nonCoveredItems: [],
    coverageSummary: 'Full coverage for glass replacement. No deductible applied.'
  },
  {
    totalAmount: 12500.00,
    lineItems: [
      { description: 'Roofing Materials', amount: 5000.00, flagged: false },
      { description: 'Labor', amount: 7500.00, flagged: true }
    ],
    anomalies: ['Labor cost is 150% of materials; standard is 100-120%.'],
    coveredItems: ['Roofing Materials', 'Standard Labor Rate'],
    nonCoveredItems: ['Premium Labor Surcharge'],
    coverageSummary: 'Material costs approved. Labor capped at regional prevailing rate.'
  },
  {
    totalAmount: 890.00,
    lineItems: [
      { description: 'Emergency Towing', amount: 890.00, flagged: true }
    ],
    anomalies: ['Towing rate significantly higher than negotiated network rate.'],
    coveredItems: ['Base Towing Fee (up to $500)'],
    nonCoveredItems: ['Excess Mileage Charge'],
    coverageSummary: 'Towing covered up to policy limit ($500). Balance is insured responsibility.'
  },
  {
    totalAmount: 2100.00,
    lineItems: [
      { description: 'Headlight Assembly', amount: 1200.00, flagged: false },
      { description: 'Calibration', amount: 900.00, flagged: true }
    ],
    anomalies: ['Calibration cost exceeds OEM guidelines.'],
    coveredItems: ['Headlight Assembly'],
    nonCoveredItems: ['Calibration Markup'],
    coverageSummary: 'Parts covered. Calibration approved at standard 1.5 labor hours.'
  },
  {
    totalAmount: 450.00,
    lineItems: [
      { description: 'Detailing Service', amount: 450.00, flagged: true }
    ],
    anomalies: ['Detailing is generally not covered unless related to biohazard.'],
    coveredItems: [],
    nonCoveredItems: ['Full Detailing'],
    coverageSummary: 'Denied. Cleaning/detailing is maintenance, not loss related.'
  },
  {
    totalAmount: 1800.00,
    lineItems: [
      { description: 'Locksmith Services', amount: 300.00, flagged: false },
      { description: 'Ignition Replacement', amount: 1500.00, flagged: false }
    ],
    anomalies: [],
    coveredItems: ['Locksmith', 'Ignition Cylinder'],
    nonCoveredItems: [],
    coverageSummary: 'Theft recovery repairs fully covered.'
  },
  {
    totalAmount: 9500.00,
    lineItems: [
      { description: 'Medical Bills (ER)', amount: 5000.00, flagged: false },
      { description: 'Physical Therapy', amount: 4500.00, flagged: true }
    ],
    anomalies: ['PT frequency exceeds standard treatment protocol for soft tissue.'],
    coveredItems: ['ER Visit', 'Initial PT Sessions'],
    nonCoveredItems: ['Excessive PT Sessions'],
    coverageSummary: 'Emergency care covered. PT subject to independent medical review.'
  },
  {
    totalAmount: 600.00,
    lineItems: [
      { description: 'Rental Car (Enterprise)', amount: 600.00, flagged: false }
    ],
    anomalies: [],
    coveredItems: ['10 Days Rental @ $60/day'],
    nonCoveredItems: [],
    coverageSummary: 'Rental reimbursement approved within policy limits.'
  }
];

// 7. ASK AI RESPONSES (10)
const askAiResponses = [
  "Based on the photos, the impact angle suggests the other driver was merging, which supports our insured's statement.",
  "The water damage pattern indicates a slow leak over time rather than a sudden burst, which may raise coverage issues regarding 'sudden and accidental'.",
  "Checking the metadata, the photos were taken at the insured address, verifying the location.",
  "Comparing this invoice to regional benchmarks, the labor rate is in the 90th percentile.",
  "Based on previous similar claims, the settlement typically ranges between $2,500 and $3,000.",
  "I've flagged a potential mismatch: The damage height on the bumper doesn't align with the reported SUV impact.",
  "Policy limits for 'Loss of Use' are $30/day up to $900. The current rental request exceeds this daily limit.",
  "Weather reports for the date of loss confirm severe hail in the insured's zip code.",
  "The VIN decoding confirms this vehicle is equipped with ADAS, necessitating the calibration line item.",
  "Subrogation is recommended. The police report explicitly cites the other driver for 'Failure to Yield'."
];

export const getRandomData = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const generateDummyData = () => {
  // We sync indices roughly to ensure data makes sense together if possible, 
  // but random is also fine for dummy purposes.
  // To make it slightly smarter, we'll pick a random index for the scenario type.
  const index = Math.floor(Math.random() * fnolVariants.length);
  
  return {
    fnol: fnolVariants[index] || fnolVariants[0],
    triage: triageVariants[index] || triageVariants[0],
    investigation: investigationVariants[index] || investigationVariants[0],
    invoice: invoiceVariants[index] || invoiceVariants[0],
    askAi: askAiResponses[index] || askAiResponses[0]
  };
};
