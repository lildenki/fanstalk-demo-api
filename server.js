const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Configuration, OpenAIApi } = require("openai");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/demo-reply", async (req, res) => {
  const { message } = req.body;
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Tu es une créatrice OnlyFans douce, sexy et taquine." },
        { role: "user", content: message }
      ]
    });
    res.json({ reply: completion.data.choices[0].message.content });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erreur OpenAI", details: e.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ API Fanstalk prête : http://localhost:${PORT}`));
