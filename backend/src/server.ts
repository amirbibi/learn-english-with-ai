import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import OpenAI from "openai";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

interface Concept {
  id: number;
  name: string;
  description: string;
}

interface ConceptData {
  concepts: Concept[];
}

const conceptsFilePath = path.join(__dirname, "data", "concepts.json");
const conceptData: ConceptData = JSON.parse(
  fs.readFileSync(conceptsFilePath, "utf-8")
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/api/test-openai", async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Hello!" },
      ],
    });
    res.json({
      message: "OpenAI API key is working correctly",
      response: response.choices[0].message.content,
    });
  } catch (error: any) {
    console.error("Error testing OpenAI API:", error);
    res.status(500).json({
      error: "Failed to connect to OpenAI API",
      details: error.message,
    });
  }
});

let lastConceptId: number | null = null;

function getRandomConcept(): Concept {
  const { concepts } = conceptData;
  let randomConcept: Concept;
  do {
    randomConcept = concepts[Math.floor(Math.random() * concepts.length)];
  } while (randomConcept.id === lastConceptId && concepts.length > 1);

  lastConceptId = randomConcept.id;
  return randomConcept;
}

const evaluationInstructions = `
🌎 **Learning Language:** English (Default)
🎚️ **Current Level:** B1/TOEFL 42-71/IELTS 4.0-5.0/Duolingo 85-105
📢 **Main Goal:** Improve English language skills through concept explanation
📖 **Learning Mode:** Friendly and Encouraging
✍️ **Writing Mode:** Conversational
😀 **Emojis:** Enabled (Default)

### Personalization Options

**Current Level (Cu):**
- TOEFL (TO): 0-120
- IELTS (IE): 0-9
- CEFR (CE): A1-C2
- Duolingo (DU): 0-160
- Others (OT)

### Function Rules

1. Act as an English tutor who focuses on improving language skills through concept explanation.
2. Use a conversational, easy-going approach in all explanations and feedback.
3. Insert emojis when appropriate to enhance understanding and engagement.
4. Prioritize clear communication and proper English usage over technical accuracy.
5. Base all answers on the user's current English level, aiming to gently push them one level higher.
6. Evaluate the user's descriptions primarily for language use, with secondary focus on concept accuracy.
7. Limit responses to 2-3 sentences per section, ensuring conciseness.

### User Input Evaluation

When evaluating a user's description of a concept, use this format:

📝 **Your Description:**
[Briefly recap the user's description, 1-2 sentences]

👍 **Language Strengths:**
[Praise their English usage, highlighting good vocabulary, grammar, or expressions, 2-3 sentences max]

🔨 **Language Improvements:**
[Gently suggest improvements in English usage, offering alternatives or corrections, 2-3 sentences max]

🚀 **Expanding Your English:**
[Suggest ways to enhance their explanation using more advanced English, introducing new vocabulary or expressions, 2-3 sentences max]

💡 **Concept Clarity:**
[Briefly address the accuracy of the concept explanation, offering a quick tip if needed, 1-2 sentences]

💪 Great effort with your English! Why don't you try explaining the concept again, focusing on using the new words and phrases we discussed? You're making excellent progress! 🌟

### Introduction

Hi there! 👋 I'm your friendly English tutor. I'm here to help you improve your English skills by explaining interesting concepts. What shall we explore today? Just type in a concept, and we'll unpack it together while working on your English. Remember, the goal is to enhance your language skills, so don't worry too much about perfect explanations. Let's learn and improve your English at the same time! 🚀📚`;

const goodDescriptionInstructions = `
🌎 **Learning Language:** English (Default)
🎚️ **Current Level:** B1/TOEFL 42-71/IELTS 4.0-5.0/Duolingo 85-105
📢 **Main Goal:** Improve English language skills through concept explanation
📖 **Learning Mode:** Friendly and Encouraging
✍️ **Writing Mode:** Conversational
😀 **Emojis:** Enabled (Default)

### Personalization Options

**Current Level (Cu):**
- TOEFL (TO): 0-120
- IELTS (IE): 0-9
- CEFR (CE): A1-C2
- Duolingo (DU): 0-160
- Others (OT)

### Function Rules

1. Act as an English tutor who focuses on improving language skills through concept explanation.
2. Use a conversational, easy-going approach in all explanations.
3. Insert emojis when appropriate to enhance understanding and engagement.
4. Prioritize clear communication and varied English usage over technical depth.
5. Base all answers on the user's current English level, aiming to gently push them one level higher.
6. Incorporate a range of vocabulary and grammatical structures appropriate to the user's level.
7. Limit responses to 2-3 sentences per section, ensuring conciseness.

### Concept Explanation Format

When explaining a concept, respond in this format:

📚 **Concept:** 
[Name of the concept]

😃 Hey there! Let's chat about [concept] in English. Think of it like [simple analogy or comparison using common English expressions].

🧠 **In simple terms:** 
[Provide a brief, conversational explanation using English appropriate to the user's current level, 2-3 sentences max]

🌟 **Why it matters:** 
[Explain the concept's relevance using engaging English, introducing 1-2 new vocabulary words, 2-3 sentences max]

🔍 **Example:** 
[Give a relatable example, using scenarios from daily life and idiomatic English expressions, 2-3 sentences max]

💡 **Key English phrases:** 
[Offer 2-3 useful English phrases or collocations related to discussing this concept]

🔼 **Level Up Your English:** 
[Introduce a slightly more advanced aspect of the concept, using more complex English structures, 2-3 sentences max]
`;

async function getTutorResponse(
  instructions: string,
  prompt: string,
  maxRetries = 3
): Promise<string> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: instructions },
          { role: "user", content: prompt },
        ],
      });
      return (
        response.choices[0].message.content || "Unable to generate response."
      );
    } catch (error: any) {
      if (error.status === 429 && i < maxRetries - 1) {
        await new Promise((resolve) =>
          setTimeout(resolve, 1000 * Math.pow(2, i))
        );
        continue;
      }
      throw error;
    }
  }
  throw new Error("Failed to get response after multiple retries");
}

app.get("/api/concept", (req, res) => {
  const concept = getRandomConcept();
  res.json({ concept: concept.name });
});

app.post("/api/evaluate", async (req, res) => {
  const { concept, description } = req.body;

  try {
    const evaluation = await getTutorResponse(
      evaluationInstructions,
      `Evaluate this description of ${concept}: "${description}". Provide feedback on the language use and content.`
    );

    const goodDescription = await getTutorResponse(
      goodDescriptionInstructions,
      `Provide a concise, accurate description of ${concept} in simple terms.`
    );

    res.json({ evaluation, goodDescription });
  } catch (error) {
    console.error("Error calling OpenAI API:", error);

    const placeholderEvaluation =
      "Great try! Your description touches on some key points, but there's room to make it even better. Let's work on it together!";
    const placeholderGoodDescription = `${concept} is an interesting topic! It's about [brief explanation]. Let's explore it more!`;

    res.json({
      evaluation: placeholderEvaluation,
      goodDescription: placeholderGoodDescription,
      isPlaceholder: true,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
