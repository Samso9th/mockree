'use client'

import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState, useCallback } from 'react'
import { db } from '../../../../../../utils/db';
import { MockInterview } from '../../../../../../utils/schema';
import { desc, eq } from 'drizzle-orm';
import InterviewItemCard from './interview-item-card';

type Props = {
    interviews: Array<typeof MockInterview.$inferSelect>;
}

const InterviewList = ({ interviews }: Props) => {

    const { user } = useUser();
    const [interviewList, setInterviewList] = useState<Array<typeof MockInterview.$inferSelect>>([]);

    const GetInterviewList = useCallback(async () => {
        try {
            const response = await fetch('/api/interviews');
            if (!response.ok) {
                throw new Error('Failed to fetch interviews');
            }
            const data = await response.json();
            setInterviewList(data);
        } catch (error) {
            console.error('Error fetching interviews:', error);
        }
    }, []);

    useEffect(() => {
        user && GetInterviewList();
    }, [user, GetInterviewList])
    return (
        <div>
            <h2 className='font-medium text-xl'>Past Interviews</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
                {interviewList && interviewList.map((interview, index) => (
                    <InterviewItemCard
                        interview={interview}
                        key={index}
                    />
                ))}
            </div>
        </div>
    )
}

export default InterviewList