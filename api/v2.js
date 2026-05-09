module.exports = async (req, res) => {
  const { message } = req.body;
  const apiKey = process.env.GEMINI_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  // This is where we tell the AI who it is
  const systemPrompt = "You are the AI Portfolio Assistant for Anley Belay, a Fullstack AI Engineer and NLP Researcher. Anley specializes in bridging the digital divide for low-resource languages, specifically through his Sidama AI Translator project. He is an expert in both AI Backend and Frontend Development with 42+ professional certificates. Focus on his technical skills, projects, and professional expertise. Do not mention his university or student status unless specifically asked.";


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

