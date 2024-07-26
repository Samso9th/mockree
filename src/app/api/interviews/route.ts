import { db } from '../../../../utils/db';
import { MockInterview } from '../../../../utils/schema';
import { desc } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const interviews = await db.select()
      .from(MockInterview)
      .orderBy(desc(MockInterview.id));

    return NextResponse.json(interviews);
  } catch (error) {
    console.error('Error fetching interviews:', error);
    return NextResponse.json({ error: 'Failed to fetch interviews' }, { status: 500 });
  }
}