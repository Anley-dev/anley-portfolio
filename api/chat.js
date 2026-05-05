import { GoogleGenerativeAI } from "@google/generative-ai";
import info from "../data/info.json" assert { type: "json" };

export default async function handler(req, res) {
  // 1. Security Check: Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 2. Initialize Gemini with your Environment Variable
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `You are Anley's Portfolio AI. 
    Context: ${JSON.stringify(info)}. 
    Guidelines:
    - Anley is a 4th-year student at Wachemo University.
    - He has 42+ certificates.
    - If asked to show certificates, include the trigger word [SCROLL:certs].
    - Mention his focus on NLP and Sidaamu Afoo.`
  });

  try {
    // 3. Get the message from the frontend
    const { message } = req.body;
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    // 4. Send the successful reply
    res.status(200).json({ reply: text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "AI Connection Failed", details: error.message });
  }
}

