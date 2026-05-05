const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async (req, res) => {
  if (!process.env.GEMINI_KEY) {
    return res.status(500).json({ reply: "Error: GEMINI_KEY is missing in Vercel settings." });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

    // Use the most stable model name for the current SDK version

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const { message } = req.body;
    const prompt = `You are Anley's Portfolio AI. Anley is a 4th-year student at Wachemo University with 42+ certificates. User says: ${message}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ reply: text });
  } catch (error) {
    // If 1.5-flash fails, this catch block captures it
    console.error("Gemini Error:", error);
    res.status(200).json({
      reply: "I'm connected, but the model is acting up. Error: " + error.message 
    });
  }
};

