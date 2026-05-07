module.exports = async (req, res) => {
  const { message } = req.body;
  const apiKey = process.env.GEMINI_KEY;

  // FIXED MODEL NAME: gemini-1.5-flash-latest
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: message || "Hello" }]
        }]
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(200).json({ reply: "Google Error: " + data.error.message });
    }

    const aiReply = data.candidates[0].content.parts[0].text;
    res.status(200).json({ reply: aiReply });

  } catch (error) {
    res.status(200).json({ reply: "Fetch Error: " + error.message });
  }
};

