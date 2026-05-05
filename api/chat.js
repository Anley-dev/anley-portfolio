const { GoogleGenerativeAI } = require("@google/generative-ai");
const info = require("../data/info.json");

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `You are Anley's Portfolio AI. Context: ${JSON.stringify(info)}. Mention his 42+ certs and Wachemo University.`
  });

  try {
    const { message } = req.body;
    const result = await model.generateContent(message);
    const response = await result.response;
    res.status(200).json({ reply: response.text() });
  } catch (error) {
    res.status(500).json({ error: "API Error", details: error.message });
  }
};

