import { GoogleGenerativeAI } from '@google/generative-ai';
import { buildPrompt } from './buildPrompt.js';
import { ENV } from './config/env.js';

const genAI = new GoogleGenerativeAI(ENV.GEMINI_API_KEY);

export async function summarize(diff: string) {
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
  });

  const prompt = buildPrompt(diff);

  const result = await model.generateContent(prompt);

  return result.response.text();
}
