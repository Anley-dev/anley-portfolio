module.exports = async (req, res) => {
  const { message } = req.body;
  const apiKey = process.env.GEMINI_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  // This is where we tell the AI who it is
  const systemPrompt = `You are the AI Assistant for Anley Belay, a Fullstack AI Engineer and NLP Researcher. 
CRITICAL: Only mention the following specific credentials verified from his SoloLearn and professional portfolio:

TECHNICAL CERTIFICATIONS (SoloLearn & Professional):
- Web Development: Angular (Google-sponsored), Front-end for Beginners, Introduction to HTML, CSS, and JavaScript.
- Programming Languages: Python (Foundational & Intermediate), Java (Intro & Intermediate), C++, C#, and SQL (Intro & Intermediate).
- AI & Data Science: Generative AI in Practice, Introduction to LLMs, ML for Beginners, Prompt Engineering, Research with AI, Data Analytics with AI, and AI-Powered A/B Testing.
- Professional: Express Internship Program (fondi Inc.), Spoken English (Great Learning), and Tech for Everyone.

KEY PROJECTS:
- Sidama AI Translator: A specialized NLP tool for Sidaamu Afoo.
- Weather Predictor: An ML-based forecasting tool.
- Hulu Gebeya: A Telegram bot for local commerce.

INSTRUCTIONS: 
When asked about certificates, emphasize his diverse technical foundation across 40+ certifications, specifically highlighting his SoloLearn mastery and his Fullstack AI engineering projects. Do not mention AWS or Azure unless he specifically adds them later.`;



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

