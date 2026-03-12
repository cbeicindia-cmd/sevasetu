import { Request, Response } from "express";
import OpenAI from "openai";
import { env } from "../../config/env.js";

const client = new OpenAI({ apiKey: env.openaiApiKey });

const runPrompt = async (prompt: string) => {
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7
  });

  return completion.choices[0]?.message?.content ?? "";
};

export const generateDescription = async (req: Request, res: Response) => {
  const text = await runPrompt(`Generate SEO optimized product description for: ${req.body.productName}`);
  return res.json({ content: text });
};

export const suggestPricing = async (req: Request, res: Response) => {
  const text = await runPrompt(`Suggest competitive pricing in INR for: ${JSON.stringify(req.body)}`);
  return res.json({ content: text });
};

export const forecastDemand = async (req: Request, res: Response) => {
  const text = await runPrompt(`Predict demand trend for next 3 months: ${JSON.stringify(req.body)}`);
  return res.json({ content: text });
};

export const generateCaption = async (req: Request, res: Response) => {
  const text = await runPrompt(`Create social media marketing captions for: ${req.body.productName}`);
  return res.json({ content: text });
};
