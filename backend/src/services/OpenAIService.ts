import { openai } from "../config";

export class OpenAIService {
  // Get a response from the OpenAI API
  async getResponse(
    instructions: string,
    prompt: string,
    maxRetries = 3
  ): Promise<string> {
    // Retry the request if it fails (maxRetries times at most)
    for (let i = 0; i < maxRetries; i++) {
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: instructions },
            { role: "user", content: prompt },
          ],
          temperature: 0.7,
          top_p: 1,
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
        throw this.handleError(error);
      }
    }
    throw new Error("Failed to get response after multiple retries");
  }

  // Handle OpenAI API errors
  private handleError(error: any): Error {
    if (error.response) {
      return new Error(
        `OpenAI API error: ${error.response.status} - ${error.response.data}`
      );
    } else if (error.request) {
      return new Error("OpenAI API request failed");
    } else {
      return new Error("Error setting up OpenAI API request");
    }
  }
}
