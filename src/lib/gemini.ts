
/**
 * Gemini API utility for generating verse content and answering questions
 */

// This is a publishable API key (safe to include in frontend code)
const API_KEY = "AIzaSyAMupl5_cLN-k_JcSerBydz19LvJnyLf-I";
const API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent";

export interface GeminiResponse {
  success: boolean;
  content: string;
  error?: string;
}

/**
 * Generate content using Gemini API
 */
export const generateContent = async (prompt: string): Promise<GeminiResponse> => {
  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    });

    const data = await response.json();
    
    // Handle possible error formats from the API
    if (data.error) {
      console.error("Gemini API error:", data.error);
      return {
        success: false,
        content: "",
        error: data.error.message || "An error occurred with the Gemini API"
      };
    }

    // Extract the generated text from the response
    if (data.candidates && data.candidates[0]?.content?.parts) {
      const generatedText = data.candidates[0].content.parts
        .filter((part: any) => part.text)
        .map((part: any) => part.text)
        .join(" ");
      
      return {
        success: true,
        content: generatedText
      };
    }

    return {
      success: false,
      content: "",
      error: "Unexpected response format from Gemini API"
    };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return {
      success: false,
      content: "",
      error: error instanceof Error ? error.message : "An unexpected error occurred"
    };
  }
};

/**
 * Generate more verses based on a source/topic
 */
export const generateVerses = async (source: string, count: number = 3): Promise<any[]> => {
  const prompt = `Generate ${count} Sanskrit verses from ${source} with their translations. 
  Format the response as a JSON array with objects having these fields: 
  "id" (a unique identifier like "bg-12-1" for Bhagavad Gita chapter 12 verse 1), 
  "source" (e.g., "${source}"), 
  "sanskrit" (the Sanskrit text in Devanagari script), 
  "translation" (the English translation), and
  "explanation" (a brief explanation of the verse's meaning and philosophical significance).
  Only return the JSON array, no other text.`;

  const response = await generateContent(prompt);
  
  if (!response.success) {
    console.error("Failed to generate verses:", response.error);
    return [];
  }

  try {
    // Try to extract JSON from the response
    const jsonStr = response.content.trim().replace(/```json|```/g, '');
    const verses = JSON.parse(jsonStr);
    
    // Ensure each verse has a valid ID format for routing
    return Array.isArray(verses) ? verses.map(verse => ({
      ...verse,
      // If source is "Bhagavad Gita", ensure the ID is formatted correctly (e.g., "bg-2-1")
      id: verse.id || `${source.toLowerCase().replace(/\s+/g, '-')}-${Math.floor(Math.random() * 20)}-${Math.floor(Math.random() * 50)}`,
      // Ensure source is properly formatted
      source: verse.source || source,
      // Ensure explanation exists
      explanation: verse.explanation || `This verse from ${source} explores philosophical concepts found in ancient Sanskrit wisdom.`
    })) : [];
  } catch (error) {
    console.error("Failed to parse generated verses:", error);
    return [];
  }
};

/**
 * Ask a question about a Sanskrit verse or topic
 */
export const askQuestion = async (question: string, verseContext?: string): Promise<GeminiResponse> => {
  let prompt = `Question: ${question}\n\n`;
  
  if (verseContext) {
    prompt += `Context: ${verseContext}\n\n`;
    prompt += `Based on the specific verse provided in the context, please explain the meaning, significance, and philosophical implications of this verse. Address the question directly in relation to this particular verse. `;
  } else {
    prompt += `Please provide information about this Sanskrit wisdom topic. `;
  }
  
  prompt += `Include historical context and philosophical significance where relevant. Format your response using Markdown for headings (**bold**) and paragraphs. Ensure that formatting is properly displayed with actual bold text rather than showing asterisks.`;
  
  return generateContent(prompt);
};
