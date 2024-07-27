import { NextResponse } from 'next/server';
import { db } from '../../../../../utils/db';
import { MockInterview } from '../../../../../utils/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: { interviewId: string } }
) {
  try {
    // The interviewId from the URL parameter is used to fetch the mockId
    const mockId = params.interviewId;
    console.log('Fetching interview with mockId:', mockId);

    const interview = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, mockId))
      .limit(1);

    console.log('Query result:', interview);

    if (interview.length === 0) {
      return NextResponse.json({ error: 'Interview not found' }, { status: 404 });
    }

    return NextResponse.json(interview[0]);
  } catch (error) {
    console.error('Error fetching interview:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}