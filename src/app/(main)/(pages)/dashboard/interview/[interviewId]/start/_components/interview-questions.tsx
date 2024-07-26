'use client'

import React from 'react'
import { Lightbulb, Volume2 } from 'lucide-react';


type Question = {
    question: string;
    difficulty: string;
    answer: string;
}

type Props = {
    mockInterviewQuestion: Question[],
    activeQuestionIndex: number
}


const InterviewQuestions = ({ mockInterviewQuestion, activeQuestionIndex }: Props) => {
    
    const textToSpeech=(text: string)=>{
        if ('speechSynthesis' in window) {
            const speech=new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech)
        }
        else{
            alert('Your browser does not support text to speech')
        }
    }

    return (
        <div className='p-5 border rounded-lg'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {mockInterviewQuestion.map((question, index) => (
                    <div
                        key={index}
                    >
                        <h2 className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer ${activeQuestionIndex == index ? 'bg-[#1c4b82] text-white dark:bg-[#1c4b82] dark:text-white' : 'bg-secondary text-black dark:bg-secondary dark:text-white'}`}>
                            Question #{index + 1}
                        </h2>
                    </div>
                ))}
            </div>
            <h2 className='my-5 text-md md:text-lg'>
                {mockInterviewQuestion[activeQuestionIndex]?.question}
            </h2>
            <Volume2
                onClick={() => textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)}
                className='cursor-pointer'
            />
            <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
                <h2 className='flex gap-2 items-center text-[#1c4b82] '>
                    <Lightbulb />
                    <strong>
                        Note:
                    </strong>
                </h2>
                <h2 className='text-sm text-[#1c4b82] my-2'>
                    {process.env.NEXT_PUBLIC_QUESTION_NOTE}
                </h2>
            </div>
        </div>
    )
}

export default InterviewQuestions