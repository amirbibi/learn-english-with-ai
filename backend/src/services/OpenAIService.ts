import { openai } from "../config";

export class OpenAIService {
  async getTutorResponse(
    instructions: string,
    prompt: string,
    maxRetries = 3
  ): Promise<string> {
    for (let i = 0; i < maxRetries; i++) {
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: instructions },
            { role: "user", content: prompt },
          ],
        });
        return (
          response.choices[0].message?.content || "Unable to generate response."
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
}
