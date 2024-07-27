import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { db } from '../../../../utils/db';
import { UserAnswer } from '../../../../utils/schema';
import moment from 'moment';

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const { mockInterviewQuestion, activeQuestionIndex, userAnswer, interviewData, user } = await request.json();

    const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, User Answer: ${userAnswer}. Given the interview question and the user's answer, please provide: A rating (1-10) of the answer's quality and relevance to the question, Constructive feedback for improvement, Suggestions for additional content or clarification. Format the response as a JSON object with fields for 'rating', 'feedback', 'strengths', and 'improvements'. Limit the total response to 3-5 concise sentences.`;

    const result = await model.generateContent(feedbackPrompt);
    const response = await result.response;
    let text = response.text();

    // Remove any markdown formatting if present
    text = text.replace(/```json\n?|\n?```/g, '').trim();

    // Parse the JSON response
    const JsonFeedbackResp = JSON.parse(text);

    // Save the user's answer and feedback to the database
    const resp = await db.insert(UserAnswer).values({
      mockIdRef: interviewData?.mockId ?? '',
      question: mockInterviewQuestion[activeQuestionIndex]?.question ?? '',
      correctAnswer: mockInterviewQuestion[activeQuestionIndex]?.answer ?? '',
      userAnswer: userAnswer ?? '',
      feedback: JsonFeedbackResp?.feedback ?? '',
      rating: JsonFeedbackResp?.rating ?? 0,
      userEmail: user?.primaryEmailAddress?.emailAddress ?? '',
      createdAt: moment().format('DD-MM-YYYY')
    });

    return NextResponse.json({ result: JsonFeedbackResp, dbResponse: resp });
  } catch (error) {
    console.error('Error processing answer:', error);
    return NextResponse.json({ error: 'Failed to process answer' }, { status: 500 });
  }
}
