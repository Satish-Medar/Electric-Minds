// Using a fixed API key - replace this with your actual Gemini API key
const GEMINI_API_KEY = "AIzaSyAReVrHi_ntcfZ0D6tfBdAnpUaiJXKq2pc";

export const generateGeminiResponse = async (prompt) => {
  try {
    const messages = [
      {
        role: "user",
        parts: [{ text: prompt }]
      }
    ];

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: messages,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1000,
          },
        }),
      }
    );

    const data = await response.json();
    
    if (data.error) {
      console.error("Gemini API Error:", data.error);
      return "Sorry, there was an error with the AI service. Please try again later.";
    }

    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, there was an error connecting to the AI service. Please try again later.";
  }
};
