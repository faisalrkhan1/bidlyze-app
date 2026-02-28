import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const ANALYSIS_PROMPT = `You are an expert government tender/procurement analyst. Analyze the following tender document and extract structured information.

Return your response as a valid JSON object with exactly these fields:

{
  "summary": {
    "projectName": "Name of the project or tender",
    "issuingAuthority": "Organization issuing the tender",
    "tenderReference": "Reference/ID number of the tender",
    "estimatedValue": "Estimated contract value (number or string)",
    "currency": "Currency code (e.g. USD, EUR, ZAR)",
    "submissionDeadline": "Submission deadline date",
    "projectDuration": "Duration of the project",
    "location": "Project location",
    "sector": "Industry sector",
    "briefDescription": "Brief 2-3 sentence description of the tender"
  },
  "requirements": [
    {
      "category": "Category of requirement (e.g. Technical, Financial, Legal)",
      "requirement": "Description of the requirement",
      "mandatory": true,
      "priority": "HIGH | MEDIUM | LOW"
    }
  ],
  "complianceChecklist": [
    {
      "item": "Compliance item description",
      "category": "Category (e.g. Documentation, Legal, Financial)",
      "critical": true
    }
  ],
  "riskFlags": [
    {
      "risk": "Description of the risk",
      "severity": "HIGH | MEDIUM | LOW",
      "recommendation": "How to mitigate this risk"
    }
  ],
  "keyDates": [
    {
      "event": "Name of the event/milestone",
      "date": "Date or timeframe"
    }
  ],
  "evaluationCriteria": [
    {
      "criterion": "Name of the evaluation criterion",
      "weight": "Weight or percentage",
      "details": "Details about what is evaluated"
    }
  ],
  "financialRequirements": {
    "bidBond": "Bid bond/guarantee requirement",
    "performanceBond": "Performance bond/guarantee requirement",
    "minimumTurnover": "Minimum annual turnover requirement",
    "otherFinancial": "Any other financial requirements"
  },
  "bidScore": {
    "score": 75,
    "recommendation": "BID",
    "reasoning": "Detailed reasoning for the bid/no-bid recommendation"
  }
}

Important instructions:
- The "score" must be a number between 0 and 100
- The "recommendation" must be either "BID" or "NO-BID"
- All arrays should have at least one item if relevant information exists
- If information is not found in the document, use "Not specified" for strings
- Return ONLY valid JSON, no markdown formatting or extra text`;

function parseGeminiResponse(text) {
  const cleaned = text
    .replace(/```json\s*/g, "")
    .replace(/```\s*/g, "")
    .trim();
  return JSON.parse(cleaned);
}

export async function analyzeTender(documentText) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `${ANALYSIS_PROMPT}

TENDER DOCUMENT:
${documentText}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysis = parseGeminiResponse(response.text());

    return { success: true, data: analysis };
  } catch (error) {
    console.error("Gemini analysis error:", error);
    return {
      success: false,
      error: error.message || "Failed to analyze tender document",
    };
  }
}

export async function analyzeTenderFromPDF(base64PDF) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: "application/pdf",
          data: base64PDF,
        },
      },
      { text: ANALYSIS_PROMPT },
    ]);
    const response = await result.response;
    const analysis = parseGeminiResponse(response.text());

    return { success: true, data: analysis };
  } catch (error) {
    console.error("Gemini PDF analysis error:", error);
    return {
      success: false,
      error: error.message || "Failed to analyze tender PDF",
    };
  }
}
