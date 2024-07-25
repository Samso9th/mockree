import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AddNewInterview from './_components/add-new-interview'
import InterviewList from './_components/interview-list'
import { MockInterview } from '../../../utils/schema'


type Props = {
  interviews: Array<typeof MockInterview.$inferSelect>;
}

const Dashboard = ({ interviews }: Props) => {
  return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold'>Dashboard</h2>
      <h2 className='text-gray-500'>Create and Start your first AI Mock Interview</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
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