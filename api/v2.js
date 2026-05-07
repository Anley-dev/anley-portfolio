module.exports = async (req, res) => {
  const { message } = req.body;
  const apiKey = process.env.GEMINI_KEY;

  // The definitive stable URL
  // We go back to v1beta, but we use the "latest" tag which is the most reliable
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `You are Anley's Portfolio AI. Keep it short. User: ${message}` }]
        }]
      })
    });

    const data = await response.json();

    // If Google sends an error, we read it properly now
    if (!response.ok) {
      return res.status(200).json({ 
        reply: `Google API Error: ${data.error?.message || response.statusText}` 
      });
    }

    // Safely extract the text
    const aiReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm thinking, but I have no words.";
    res.status(200).json({ reply: aiReply });

  } catch (error) {
    res.status(200).json({ reply: "Network Error: " + error.message });
  }
};

