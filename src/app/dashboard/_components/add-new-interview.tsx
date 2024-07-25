"use client"

import React, { useState } from 'react'
import {
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalTrigger,
} from "@/components/ui/animated-modal";
import { useModal } from "@/components/ui/animated-modal";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '../../../../utils/geminiAi'
import { LoaderCircle } from 'lucide-react'
import { db } from '../../../../utils/db'
import { MockInterview } from '../../../../utils/schema'
import { v4 as uuidv4 } from 'uuid'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { ifError } from 'assert'
import { useRouter } from 'next/navigation'
import { toast } from "sonner"
import { useTransitionNavigation } from '@/lib/transition'

interface FormData {
  jobPosition: string;
  jobDesc: string;
  jobExperience: string;
}

interface InterviewQuestion {
  question: string;
  answer: string;
  difficulty: string;
}

const images = [
    "/test/image1.png",
    "/test/image2.png",
    "/test/image3.jpeg",
    "/test/image4.png",
];

const AddNewInterview = () => {
  const [formData, setFormData] = useState<FormData>({
    jobPosition: '',
    jobDesc: '',
    jobExperience: '',
  });
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { transitionTo } = useTransitionNavigation();
  const { setOpen } = useModal();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.jobPosition || !formData.jobDesc || !formData.jobExperience) {
      toast.error("All fields are required");
      return false;
    }
    const experience = parseInt(formData.jobExperience);
    if (isNaN(experience) || experience < 0 || experience > 25) {
      toast.error("Please enter a valid years of experience (0-25)");
      return false;
    }
    return true;
  };

  const generateInterview = async (formData: FormData): Promise<InterviewQuestion[]> => {
    const InputPrompt = `Given the following variables: Job Title: ${formData.jobPosition}, Job Description (stacks): ${formData.jobDesc}, Years of Experience: ${formData.jobExperience}. Create ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} job interview questions with difficulty levels based on the provided variables. The higher the years of experience or the more complex the job description, the more difficult the questions should be. Provide the questions and answers in JSON format.`;
    
    try {
      const result = await chatSession.sendMessage(InputPrompt);
      const MockJsonResp = result.response.text().replace(/```json|```/g, '');
      return JSON.parse(MockJsonResp);
    } catch (error) {
      console.error("Error generating interview questions:", error);
      throw new Error("Failed to generate interview questions");
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const questions = await generateInterview(formData);
      const resp = await db.insert(MockInterview).values({
        mockId: uuidv4(),
        jsonMockResp: JSON.stringify(questions),
        ...formData,
        createdBy: user?.primaryEmailAddress?.emailAddress ?? '',
        createdAt: moment().format('DD-MM-YYYY')
      }).returning({ mockId: MockInterview.mockId });

      if (resp && resp[0]?.mockId) {
        setOpen(false);
        transitionTo(`dashboard/interview/${resp[0].mockId}`);
        toast.success("Interview Questions Generated", {
          description: moment().format('DD-MM-YYYY'),
        });
      }
    } catch (error) {
      console.error("Error creating interview:", error);
      toast.error("Failed to create interview. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <ModalTrigger>
          <div
            className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
          >
            <div className='font-bold text-lg text'>+ Add New</div>
          </div>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
              Create an{" "}
              <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                AI
              </span>{" "}
              Enabled Interview 👨🏻‍💻
            </h4>
            <div className="flex justify-center items-center">
              {images.map((image, idx) => (
                <motion.div
                  key={"images" + idx}
                  style={{
                    rotate: Math.random() * 20 - 10,
                  }}
                  animate={loading ? {
                    rotate: [0, 360],
                    transition: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }
                  } : {}}
                  whileHover={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                  }}
                  whileTap={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                  }}
                  className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
                >
                  <Image
                    src={image}
                    alt="stack images"
                    width="500"
                    height="500"
                    className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
                  />
                </motion.div>
              ))}
            </div>
            <form onSubmit={onSubmit}>
              <div className='font-bold flex justify-center items-center'>
                <h2>Fill in the required fields to create a new interview.</h2>
              </div>
              <div className='flex gap-4'>
                <div className='flex-1 mt-7 my-2'>
                  <label>Job Role/Position*</label>
                  <Input placeholder='Ex. Full Stack Developer' required
                    onChange={(event) => handleInputChange(event)}
                    value={formData.jobPosition}
                    name="jobPosition"
                  />
                </div>
                <div className='flex-1 mt-7 my-2'>
                  <label>Years of Experience</label>
                  <Input placeholder='5...' type='number' max='25' required
                    onChange={(event) => handleInputChange(event)}
                    value={formData.jobExperience}
                    name="jobExperience"
                  />
                </div>
              </div>
              <div className='my-3'>
                <label>Job Description/Tech Stacks*</label>
                <Textarea placeholder='Ex. Javascript, Python, React, Node, Express, MongoDB, etc.' required
                  onChange={(event) => handleInputChange(event)}
                  value={formData.jobDesc}
                  name="jobDesc"
                />
              </div>
              <div className='flex justify-center gap-5 mt-5'>
                <Button type='submit' disabled={loading}>
                  {loading ?
                    <>
                      <LoaderCircle className='animate-spin' /> Generating With AI...
                    </> : 'Create Interview'}
                </Button>
              </div>
            </form>
          </ModalContent>
        </ModalBody>
      </div>
    </>
  )
}

export default AddNewInterview