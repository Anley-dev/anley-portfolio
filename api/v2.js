module.exports = async (req, res) => {
  const { message } = req.body;
  const apiKey = process.env.GEMINI_KEY;

  // This name comes directly from your successful ListModels call
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message || "Hi" }] }]
      })
    });

    const data = await response.json();

    if (data.error) {
      // If it fails, we ask Google: "What models CAN I use?"
      const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
      const listRes = await fetch(listUrl);
      const listData = await listRes.json();
      
      const available = listData.models?.map(m => m.name.split('/').pop()).join(', ') || "None";
      
      return res.status(200).json({ 
        reply: `Error: ${data.error.message}. Available models for your key: ${available}` 
      });
    }

    const aiReply = data.candidates[0].content.parts[0].text;
    res.status(200).json({ reply: aiReply });

  } catch (error) {
    res.status(200).json({ reply: "Connection Error: " + error.message });
  }
};

