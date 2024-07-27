import { NextResponse } from 'next/server';
import { chatSession } from '../../../../../utils/geminiAi';

export async function POST(req: Request) {
  try {
    const { prompt, type } = await req.json();
    console.log('Received request:', { prompt, type });

    if (type === 'generate_feedback') {
      console.log('Sending message to chatSession');
      const response = await chatSession.sendMessage(prompt);
      console.log('Received response from chatSession');
      const content = response.response.text();
      console.log('Content:', content);
      
      // Manually parse the content
      const rating = content.match(/rating:\s*(\d+)/i)?.[1];
      const feedback = content.match(/feedback:\s*([\s\S]+?)(?=strengths:|$)/i)?.[1]?.trim();
      const strengths = content.match(/strengths:\s*([\s\S]+?)(?=improvements:|$)/i)?.[1]?.trim();
      const improvements = content.match(/improvements:\s*([\s\S]+)$/i)?.[1]?.trim();

      const parsedContent = {
        rating: rating ? parseInt(rating) : null,
        feedback,
        strengths,
        improvements
      };

      console.log('Parsed content:', parsedContent);
      return NextResponse.json(parsedContent);
    } else {
      console.error('Invalid request type:', type);
      return NextResponse.json({ error: 'Invalid request type' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error in generate-feedback route:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Internal Server Error', details: errorMessage }, { status: 500 });
  }
}