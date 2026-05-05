import { GoogleGenerativeAI } from "@google/generative-ai";
import info from "../data/info.json";

export default async function handler(req, res) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: `You are Anley's Portfolio AI. Context: ${JSON.stringify(info)}. 
    If asked about certificates, explain he has 42+ and use the command [SCROLL:certs].`
  });

  const result = await model.generateContent(req.body.message);
  res.status(200).json({ reply: result.response.text() });
}

