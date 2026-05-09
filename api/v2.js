module.exports = async (req, res) => {
  const { message } = req.body;
  const apiKey = process.env.GEMINI_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  // This is where we tell the AI who it is
  const systemPrompt = "You are Anley Belay's AI Portfolio Assistant. Anley is a 4th-year Information Systems student at Wachemo University, an AI Engineer, and a Frontend Developer. He built the Sidama AI Translator. Be professional and highlight his 42+ certificates.";

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `${systemPrompt}\n\nUser Question: ${message}` }]
        }]
      })
    });

    const data = await response.json();
    const aiReply = data.candidates[0].content.parts[0].text;
    res.status(200).json({ reply: aiReply });

  } catch (error) {
    res.status(200).json({ reply: "Error: " + error.message });
  }
};

