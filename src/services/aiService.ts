
import { GoogleGenAI, Type } from "@google/genai";
import { FNOLData, TriageData, InvestigationData, InvoiceData } from "../types";
import { fileToGenerativePart } from "../utils/fileUtils";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const modelId = "gemini-2.5-flash";

export const aiService = {
  // 1. Generate FNOL Data from User Description + Media
  generateFNOL: async (description: string, images: File[] = [], audio: Blob | null = null): Promise<FNOLData> => {
    const parts: any[] = [{ text: `Generate a realistic First Notice of Loss (FNOL) record based on this user description and evidence.
      Invent plausible details for name, policy number (format POL-XXXXXX-State), vehicle (if applicable), and strictly follow the schema.
      
      User Description: "${description}"` }];

    // Add Images
    for (const img of images) {
      const imgPart = await fileToGenerativePart(img);
      parts.push(imgPart);
    }

    // Add Audio
    if (audio) {
      const audioPart = await fileToGenerativePart(audio, "audio/wav"); // Assuming wav/webm from recorder
      parts.push(audioPart);
    }

    const response = await ai.models.generateContent({
      model: modelId,
      contents: { parts },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            policyNumber: { type: Type.STRING },
            claimantName: { type: Type.STRING },
            vehicleDetails: { type: Type.STRING },
            policyType: { type: Type.STRING },
            incidentType: { type: Type.STRING },
            timestamp: { type: Type.STRING },
            summary: { type: Type.STRING },
          },
          required: ["id", "policyNumber", "claimantName", "summary", "incidentType", "policyType", "vehicleDetails", "timestamp"]
        }
      }
    });
    
    return JSON.parse(response.text || "{}") as FNOLData;
  },

  // 2. Generate Triage Analysis based on FNOL (Text-based for now as it consumes FNOL output)
  generateTriage: async (fnol: FNOLData): Promise<TriageData> => {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: `Analyze this insurance claim for triage:
      Claimant: ${fnol.claimantName}
      Incident: ${fnol.incidentType}
      Summary: ${fnol.summary}
      
      Determine fraud score (0-100), complexity, and recommend an adjuster.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            fraudScore: { type: Type.NUMBER },
            fraudReasoning: { type: Type.STRING },
            complexity: { type: Type.STRING, enum: ["Low", "Medium", "High"] },
            recommendedAdjuster: { type: Type.STRING },
            adjusterSpecialty: { type: Type.STRING },
            aiReasoning: { type: Type.STRING },
            confidence: { type: Type.NUMBER },
          },
          required: ["fraudScore", "complexity", "recommendedAdjuster", "aiReasoning"]
        }
      }
    });

    return JSON.parse(response.text || "{}") as TriageData;
  },

  // 3. Generate Investigation Dashboard Data
  generateInvestigation: async (fnol: FNOLData, triage: TriageData): Promise<InvestigationData> => {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: `Create a pre-investigation dashboard for this claim:
      Type: ${fnol.incidentType}
      Severity Context: ${triage.complexity}
      Description: ${fnol.summary}
      
      Provide estimated costs, liability assessment, and a checklist of 4-6 items.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            severity: { type: Type.STRING, enum: ["Minor", "Moderate", "Severe", "Total Loss"] },
            estimatedCostRange: { type: Type.STRING },
            liability: { type: Type.STRING },
            checklist: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  task: { type: Type.STRING },
                  status: { type: Type.STRING, enum: ["Pending", "Complete", "Not Required"] }
                }
              }
            },
            adjusterSummary: { type: Type.STRING },
            invoiceAnalysis: { type: Type.NULL } // Initially null
          },
          required: ["severity", "estimatedCostRange", "liability", "checklist", "adjusterSummary"]
        }
      }
    });

    return JSON.parse(response.text || "{}") as InvestigationData;
  },

  // 4. Analyze Invoice (Multimodal)
  analyzeInvoice: async (file: File): Promise<InvoiceData> => {
    const filePart = await fileToGenerativePart(file);
    
    const response = await ai.models.generateContent({
      model: modelId,
      contents: {
        parts: [
          filePart,
          { text: `Analyze this document (repair invoice). Extract line items, flag anomalies (overpricing, unrelated items), and check coverage based on standard auto/home policies.` }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            totalAmount: { type: Type.NUMBER },
            lineItems: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  description: { type: Type.STRING },
                  amount: { type: Type.NUMBER },
                  flagged: { type: Type.BOOLEAN }
                }
              }
            },
            anomalies: { type: Type.ARRAY, items: { type: Type.STRING } },
            coveredItems: { type: Type.ARRAY, items: { type: Type.STRING } },
            nonCoveredItems: { type: Type.ARRAY, items: { type: Type.STRING } },
            coverageSummary: { type: Type.STRING }
          },
          required: ["totalAmount", "lineItems", "anomalies", "coveredItems", "nonCoveredItems", "coverageSummary"]
        }
      }
    });

    return JSON.parse(response.text || "{}") as InvoiceData;
  },

  // 5. Ask AI Assistant
  askAssistant: async (query: string, context: string): Promise<string> => {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: `Context: ${context}
      User Question: "${query}"
      
      Answer as a helpful senior claims assistant. Be concise.`,
    });

    return response.text || "I couldn't process that request.";
  }
};
