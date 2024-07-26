import { NextResponse } from 'next/server';
import { db } from '../../../../../utils/db';
import { MockInterview } from '../../../../../utils/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: { interviewId: number } }
) {
  try {
    const interview = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.id, params.interviewId))
      .limit(1);

    const result = interview[0];

    if (!result) {
      return NextResponse.json({ error: 'Interview not found' }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching interview:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}