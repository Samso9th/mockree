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
    const InputPrompt = `Generate ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions for a ${jobPosition} position with ${jobExperience} years of experience. Job description: ${jobDesc}. Return only a JSON array of objects, each with 'question', 'answer', and 'difficulty' fields.`;

    const result = await model.generateContent(InputPrompt);
    const response = await result.response;
    let text = response.text();

    // Remove any markdown formatting if present
    text = text.replace(/```json\n?|\n?```/g, '').trim();

    // Validate JSON
    JSON.parse(text);

    return NextResponse.json({ result: text });
  } catch (error) {
    console.error('Error generating interview questions:', error);
    return NextResponse.json({ error: 'Failed to generate interview questions' }, { status: 500 });
  }
}