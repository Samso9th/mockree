import { NextResponse } from 'next/server';
import { chatSession } from '../../../../../utils/geminiAi';

export async function POST(req: Request) {
  try {
    const { prompt, type } = await req.json();

    if (type === 'generate_questions') {
      // Existing logic for generating interview questions
      const response = await chatSession.sendMessage(prompt);
      const content = response.response.text();
      return NextResponse.json({ content });
    } else if (type === 'generate_feedback') {
      // New logic for generating answer feedback
      const response = await chatSession.sendMessage(prompt);
      const content = response.response.text();
      
      // Attempt to parse the content as JSON
      try {
        const jsonContent = JSON.parse(content);
        return NextResponse.json(jsonContent);
      } catch (parseError) {
        console.error('Error parsing AI response as JSON:', parseError);
        return NextResponse.json({ error: 'Invalid response format' }, { status: 500 });
      }
    } else {
      return NextResponse.json({ error: 'Invalid request type' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error in generate-interview route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}