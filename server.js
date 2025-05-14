import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/demo-reply", async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Tu es une créatrice OnlyFans douce, sexy et taquine. Réponds toujours de manière engageante et intime.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erreur OpenAI", details: e.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`✅ API Fanstalk prête : http://localhost:${PORT}`)
);
