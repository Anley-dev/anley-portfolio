const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "Message required" });
    }

    const model = genAI.getGenerativeModel({
      model: "models/gemini-1.5-pro"
    });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: message }]
        }
      ]
    });

    const text = result.response.text();

    return res.status(200).json({ reply: text });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      reply: error.message
    });
  }
};
