"use client";
import React, { useEffect, useState } from "react";
import { UserButton } from '@clerk/nextjs'
import AddNewInterview from './_components/add-new-interview'
import InterviewList from './_components/interview-list'
import { MockInterview } from '../../../../../utils/schema'



const Dashboard = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInterviews = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/interviews');
        if (!response.ok) {
          throw new Error('Failed to fetch interviews');
        }
        const data = await response.json();
        setInterviews(data);
      } catch (err) {
        console.error('Error fetching interviews:', err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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