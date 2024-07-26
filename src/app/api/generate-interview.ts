import { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const { jobPosition, jobDesc, jobExperience } = req.body;
    const InputPrompt = `Given the following variables: Job Title: ${jobPosition}, Job Description (stacks): ${jobDesc}, Years of Experience: ${jobExperience}. Create ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} job interview questions with difficulty levels based on the provided variables. The higher the years of experience or the more complex the job description, the more difficult the questions should be. Provide the questions and answers in JSON format.`;

    const result = await model.generateContent(InputPrompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ result: text });
  } catch (error) {
    console.error('Error generating interview questions:', error);
    res.status(500).json({ error: 'Failed to generate interview questions' });
  }
}
