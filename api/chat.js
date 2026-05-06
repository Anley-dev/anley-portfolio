const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

    // Let the SDK choose the correct API version
    const models = await genAI.listModels();
console.log(models);
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "Message is required" });
    }

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: message }],
        },
      ],
    });

    const response = result.response;
    const text = response.text();

    return res.status(200).json({ reply: text });

  } catch (error) {
    console.error("Full error:", error);

    return res.status(500).json({
      reply: "Error: " + (error.message || "Unknown error"),
    });
  }
};
