import { db } from '../../../../utils/db';
import { MockInterview } from '../../../../utils/schema';
import { desc } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    const interviews = await db.select()
      .from(MockInterview)
      .orderBy(desc(MockInterview.id));

    return NextResponse.json(interviews);
  } catch (error) {
    console.error('Error fetching interviews:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: 'Failed to fetch interviews', details: errorMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const mockId = uuidv4();
    const result = await db.insert(MockInterview).values({
      mockId,
      ...body,
    }).returning({ mockId: MockInterview.mockId });

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error creating interview:', error);
    return NextResponse.json({ error: 'Failed to create interview' }, { status: 500 });
  }
}