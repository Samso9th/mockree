'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState, useCallback } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, StopCircle } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '../../../../../../../../../utils/geminiAi'
import { db } from '../../../../../../../../../utils/db'
import { UserAnswer } from '../../../../../../../../../utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'

interface RecordAnswerProps {
    mockInterviewQuestion: any[];
    activeQuestionIndex: number;
    interviewData: any;
    isNewInterview: boolean;
    answeredQuestions: Set<number>;
    setAnsweredQuestions: React.Dispatch<React.SetStateAction<Set<number>>>;
    onAnswerSaved: (index: number) => void;
}

const RecordAnswer: React.FC<RecordAnswerProps> = ({ mockInterviewQuestion, activeQuestionIndex, interviewData, isNewInterview, answeredQuestions, setAnsweredQuestions, onAnswerSaved }) => {
    const [userAnswer, setUserAnswer] = useState('');
    const { user } = useUser();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedAnswers = localStorage.getItem('answeredQuestions');
            if (isNewInterview) {
                localStorage.removeItem('answeredQuestions');
                setAnsweredQuestions(new Set());
            } else if (savedAnswers) {
                setAnsweredQuestions(new Set(JSON.parse(savedAnswers)));
            }
        }
    }, [isNewInterview, setAnsweredQuestions]);

    useEffect(() => {
        if (answeredQuestions.size > 0) {
            localStorage.setItem('answeredQuestions', JSON.stringify(Array.from(answeredQuestions)));
        }
    }, [answeredQuestions]);

    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    useEffect(() => {
        if (results.length > 0) {
            const latestResult = results[results.length - 1];
            if (typeof latestResult === 'object' && latestResult.transcript) {
                setUserAnswer(prevAns => prevAns + ' ' + latestResult.transcript);
            }
        }
    }, [results])

    const SaveUserAnswer = async () => {
        if (isRecording) {
            stopSpeechToText();
            // UpdateUserAnswer will be called by the useEffect hook
        } else if (!answeredQuestions.has(activeQuestionIndex)) {
            setUserAnswer(''); // Reset the answer when starting a new recording
            startSpeechToText();
        } else {
            toast('You have already answered this question');
        }
    }

    const UpdateUserAnswer = useCallback(async () => {

        if (userAnswer.length < 10) {
            setLoading(false);
            toast('Answer Length too short, please record again');
            setUserAnswer('');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('/api/record-answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mockInterviewQuestion,
                    activeQuestionIndex,
                    userAnswer,
                    interviewData,
                    user,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to save answer');
            }

            const data = await response.json();

            if (data.result) {
                toast('Answer Saved Successfully');
                onAnswerSaved(activeQuestionIndex);
                setAnsweredQuestions(prev => new Set(prev).add(activeQuestionIndex));
            }
        } catch (error) {
            console.error('Error saving answer:', error);
            toast('Failed to save answer. Please try again.');
        } finally {
            setUserAnswer('');
            setLoading(false);
        }
    }, [userAnswer, activeQuestionIndex, mockInterviewQuestion, interviewData, user, onAnswerSaved, setAnsweredQuestions]);

    useEffect(() => {
        if (!isRecording && userAnswer.length > 0) {
            UpdateUserAnswer();
        }
    }, [isRecording, userAnswer, UpdateUserAnswer]);

    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='flex flex-col my-20 justify-center items-center bg-black rounded-lg p-5'>
                <Image
                    src={'/webcam-icon.png'}
                    alt="Webcam icon"
                    width={200}
                    height={200}
                    className='absolute'
                />
                <Webcam
                    mirrored={true}
                    style={{
                        height: 300,
                        width: '100%',
                        zIndex: 10
                    }}
                />
            </div>
            <div className='flex flex-col -my-10 justify-center items-center'>
                <Button
                    variant="outline"
                    className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 mt-1 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
                    onClick={SaveUserAnswer}
                    disabled={loading || answeredQuestions.has(activeQuestionIndex)}
                >
                    {answeredQuestions.has(activeQuestionIndex) ? (
                        <h2 className='text-gray-400 flex items-center gap-2'>
                            Answer Recorded
                        </h2>
                    ) : isRecording ? (
                        <h2 className='text-red-600 animate-pulse dark:text-red-600 flex items-center gap-2'>
                            <StopCircle />
                            Stop Recording
                        </h2>
                    ) : (
                        <h2 className='text-[#1c4b82] dark:text-white flex items-center gap-2'>
                            <Mic />
                            Record
                        </h2>
                    )}
                </Button>
            </div>
        </div>
    )
}

export default RecordAnswer