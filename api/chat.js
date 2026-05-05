const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async (req, res) => {
  // 1. Handle actual chat request
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 2. Check if key exists
  if (!process.env.GEMINI_KEY) {
    return res.status(500).json({ reply: "Error: GEMINI_KEY is missing in Vercel settings." });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

    // FORCE v1 to fix the 404 error
    const model = genAI.getGenerativeModel(
      { model: "gemini-1.5-flash" },
      { apiVersion: 'v1' }
    );

    const { message } = req.body;

    // Setting the personality of your Assistant
    const systemInstruction = "You are Anley Belay's AI Assistant. Anley is a 4th-year student at Wachemo University, an aspiring AI Engineer, and a Frontend Developer. He has 42+ certificates. Be professional, tech-focused, and helpful.";
    const result = await model.generateContent(`${systemInstruction}\n\nUser: ${message}`);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ reply: text });

  } catch (error) {
    console.error("Gemini Error:", error);
    // This will tell us if it's still a 404 or something else
    res.status(200).json({ 
      reply: "Connection established, but Google returned an error: " + error.message 
    });
  }
};

