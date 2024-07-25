'use client'

import React, { useEffect, useState } from 'react'
import { db } from '../../../../../../utils/db'
import { MockInterview } from '../../../../../../utils/schema'
import { eq } from 'drizzle-orm'
import InterviewQuestions from './_components/interview-questions'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useTransitionNavigation } from '@/lib/transition'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

// Add this interface
interface RecordAnswerProps {
    mockInterviewQuestion: any[];
    activeQuestionIndex: number;
    interviewData: typeof MockInterview.$inferSelect | undefined;
    isNewInterview: boolean;
    answeredQuestions: Set<number>;
    setAnsweredQuestions: React.Dispatch<React.SetStateAction<Set<number>>>;
    onAnswerSaved: (index: number) => void;
}

// Update the dynamic import
const RecordAnswer = dynamic<RecordAnswerProps>(() => import('./_components/record-answer') as Promise<{ default: React.ComponentType<RecordAnswerProps> }>, {
    ssr: false,
})

type Props = {
    params: {
        interviewId: string
    }
}

const StartInterview = ({ params }: Props) => {

    const [interviewData, setInterviewData] = useState<typeof MockInterview.$inferSelect | undefined>();
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState<any[]>([]);
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('activeQuestionIndex');
            return saved ? parseInt(saved, 10) : 0;
        }
        return 0;
    });
    const { transitionTo } = useTransitionNavigation();
    const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
    const [isNewInterview, setIsNewInterview] = useState(true);

    useEffect(() => {
        const checkIfNewInterview = () => {
            const savedAnswers = localStorage.getItem('answeredQuestions');
            if (savedAnswers) {
                setIsNewInterview(false);
                setAnsweredQuestions(new Set(JSON.parse(savedAnswers)));
            }
        };
        checkIfNewInterview();
    }, []);

    useEffect(() => {
        localStorage.setItem('activeQuestionIndex', activeQuestionIndex.toString());
    }, [activeQuestionIndex]);

    const handleClick = () => {
        transitionTo('/dashboard/interview/' + interviewData?.mockId + '/feedback');
    };

    useEffect(() => {
        GetInterviewDetails();
    }, []);

    const GetInterviewDetails = async () => {
        const result = await db.select().from(MockInterview)
            .where(eq(MockInterview.mockId, params.interviewId))

        const jsonMockResp = (result[0].jsonMockResp).replace(/^\{/, '[').replace(/\}$/, ']').replace(/\\/g, '').replace(/"(\{.*?\})"/g, '$1');
        const cleanJsonMockResp = JSON.parse(jsonMockResp)
        console.log(cleanJsonMockResp)
        setMockInterviewQuestion(cleanJsonMockResp);
        setInterviewData(result[0]);
    }

    return (
        <div className='flex flex-col'>
            <div className='flex-grow grid grid-cols-1 md:grid-cols-2 gap-10 mb-6'>
                {mockInterviewQuestion.length > 0 ? (
                    <InterviewQuestions
                        mockInterviewQuestion={mockInterviewQuestion}
                        activeQuestionIndex={activeQuestionIndex}
                    />
                ) : (
                    <Skeleton height={500} />
                )}
                {mockInterviewQuestion.length > 0 ? (
                    <RecordAnswer
                        mockInterviewQuestion={mockInterviewQuestion}
                        activeQuestionIndex={activeQuestionIndex}
                        interviewData={interviewData}
                        isNewInterview={isNewInterview}
                        answeredQuestions={answeredQuestions}
                        setAnsweredQuestions={setAnsweredQuestions}
                        onAnswerSaved={(index) => {
                            setAnsweredQuestions(prev => {
                                const newSet = new Set(prev);
                                newSet.add(index);
                                return newSet;
                            });
                            setIsNewInterview(false);
                        }}
                    />
                ) : (
                    <div>
                        <Skeleton height={300} className="my-20" />
                        <div className='flex justify-center'>
                            <Skeleton height={40} width={120} className="mt-4" />
                        </div>
                    </div>
                )}
            </div>
            <Separator className="my-4" />
            <div className='flex justify-evenly gap-6'>
                {mockInterviewQuestion.length > 0 ? (
                    <>
                        {activeQuestionIndex > 0 && <Button
                            className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 mt-1 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
                            variant="outline"
                            onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
                        >
                            Previous Question
                        </Button>}
                        {activeQuestionIndex != mockInterviewQuestion?.length - 1 && <Button
                            className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 mt-1 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
                            variant="outline"
                            onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
                            disabled={!answeredQuestions.has(activeQuestionIndex)}
                        >
                            Next Question
                        </Button>}
                        {activeQuestionIndex == mockInterviewQuestion?.length - 1 && <Button
                            className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 mt-1 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
                            variant="outline"
                            onClick={handleClick}
                        >
                            End Interview
                        </Button>}
                    </>
                ) : (
                    <Skeleton height={40} width={200} className="mx-2" />
                )}
            </div>
        </div>
    )
}

export default StartInterview