const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

    // This specific configuration forces the stable v1 path
    const model = genAI.getGenerativeModel(
      { model: "gemini-1.5-flash" },
      { apiVersion: 'v1' }
    );

    const { message } = req.body;
    const result = await model.generateContent(message || "Hello");
    const response = await result.response;

    res.status(200).json({ reply: response.text() });
  } catch (error) {
    // If it still says v1beta here, the package.json update didn't work
    res.status(200).json({ reply: "Error: " + error.message });
  }
};

