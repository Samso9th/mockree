import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const { jobPosition, jobDesc, jobExperience } = await request.json();
    const InputPrompt = `Given the following variables: Job Title: ${jobPosition}, Job Description (stacks): ${jobDesc}, Years of Experience: ${jobExperience}. Create ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} job interview questions with difficulty levels based on the provided variables. The higher the years of experience or the more complex the job description, the more difficult the questions should be. Provide the questions and answers in JSON format.`;

    const result = await model.generateContent(InputPrompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ result: text });
  } catch (error) {
    console.error('Error generating interview questions:', error);
    return NextResponse.json({ error: 'Failed to generate interview questions' }, { status: 500 });
  }
}