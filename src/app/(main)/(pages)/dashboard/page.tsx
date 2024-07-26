"use client";
import React from "react";
import { UserButton } from '@clerk/nextjs'
import AddNewInterview from './_components/add-new-interview'
import InterviewList from './_components/interview-list'
import { MockInterview } from '../../../../../utils/schema'


type Props = {
  interviews: Array<{
    id: number;
    jsonMockResp: string;
    jobDesc: string;
    jobPosition: string;
    jobExperience: string;
    createdBy: string;
    createdAt: string;
    mockId: string;
  }>;
}

const Dashboard = ({ interviews }: Props) => {
  return (
    <div>
      <h2 className='text-xl sm:text-2xl font-bold mb-2'>Dashboard</h2>
      <h2 className='text-gray-500 text-sm sm:text-base mb-4'>Create and Start your first AI Mock Interview</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8'>
        <AddNewInterview />
      </div>

      {/* Past Interviews */}
      <InterviewList
        interviews={interviews}
      />
    </div>
  )
}

export default Dashboard