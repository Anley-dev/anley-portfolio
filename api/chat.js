const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
    
    // Using the 'latest' alias is the safest way to avoid 404s
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const { message } = req.body;
    const result = await model.generateContent(message || "Hello");
    const response = await result.response;
    
    res.status(200).json({ reply: response.text() });
  } catch (error) {
    // This will now show the REAL error if it fails
    res.status(200).json({ reply: "API Error: " + error.message });
  }
};

