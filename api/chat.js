const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async (req, res) => {
  // Check if key exists
  if (!process.env.GEMINI_KEY) {
    return res.status(500).json({ reply: "Error: GEMINI_KEY is missing in Vercel settings." });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are Anley's AI Assistant. Anley is a 4th-year student at Wachemo University with 42+ certificates. Answer this: ${req.body.message}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ reply: text });
  } catch (error) {
    res.status(200).json({ reply: "I'm online, but Gemini gave an error: " + error.message });
  }
};

