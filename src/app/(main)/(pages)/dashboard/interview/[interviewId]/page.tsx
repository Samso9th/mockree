'use client'

import React, { useEffect, useState } from 'react'
import { db } from '../../../../../../../utils/db'
import { MockInterview } from '../../../../../../../utils/schema'
import { eq } from 'drizzle-orm'
import Webcam from 'react-webcam'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { FollowerPointerCard } from "@/components/ui/following-pointer";
import { useUser } from '@clerk/nextjs'
import { WobbleCard } from "@/components/ui/wobble-card";
import { useRouter } from 'next/navigation';
import { useTransitionNavigation } from '@/lib/transition'

type Props = {
    params: {
        interviewId: string
    }
}

const Interview = ({ params }: Props) => {

    const [interviewData, setInterviewData] = useState<typeof MockInterview.$inferSelect | undefined>();
    const [webCamEnabled, setWebCamEnabled] = useState(false);
    const router = useRouter();
    const { user } = useUser();
    const { transitionTo } = useTransitionNavigation();

    const handleClick = () => {
        transitionTo(`/dashboard/interview/${params.interviewId}/start`);
    };


    useEffect(() => {
        const GetInterviewDetails = async () => {
            const result = await db.select().from(MockInterview)
                .where(eq(MockInterview.mockId, params.interviewId))

            setInterviewData(result[0]);
        }

        console.log(params.interviewId)
        GetInterviewDetails();
    }, [params.interviewId])

    const Content = {
        author: user?.firstName || "User",
        authorAvatar: user?.imageUrl || "/avatar.svg",
    };

    const TitleComponent = ({
        title,
        avatar,
    }: {
        title: string;
        avatar: string;
    }) => (
        <div className="flex space-x-2 items-center">
            <Image
                src={user?.imageUrl || "/avatar.svg"}
                height="20"
                width="20"
                alt="thumbnail"
                className="rounded-full border-2 border-white"
            />
            <p>{title}</p>
        </div>
    );

    return (
        <div className='flex justify-center flex-col items-center'>
            <div className='grid grid-cols-1 md:grid-cols-2'>
                <div className='my-10 flex flex-col gap-5'>
                    <WobbleCard className='p-5 rounded-lg border bg-[#1c4b82] flex flex-col gap-5'>
                        <h2 className='text-lg'>
                            <strong>
                                Job Position/Role:
                            </strong>{interviewData?.jobPosition}
                        </h2>
                        <h2 className='text-lg'>
                            <strong>
                                Job Description/Stacks:
                            </strong>{interviewData?.jobDesc}
                        </h2>
                        <h2 className='text-lg'>
                            <strong>
                                Years of Experience:
                            </strong>{interviewData?.jobExperience}
                        </h2>
                    </WobbleCard>
                    <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100 dark:bg-yellow-100 dark:text-black'>
                        <h2 className='flex gap-2 items-center text-yellow-500'>
                            <Lightbulb />
                            <strong>
                                Hey There!
                            </strong>
                        </h2>
                        <h2 className='mt-3 text-yellow-500'>
                            {process.env.NEXT_PUBLIC_INFORMATION}
                        </h2>
                    </div>
                </div>
                <FollowerPointerCard
                    title={
                        <TitleComponent
                            title={Content.author}
                            avatar={Content.authorAvatar}
                        />
                    }
                >
                    <div className='-mt-10'>
                        {webCamEnabled ? <CardContainer className="inter-var">
                            <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                                <CardItem
                                    translateZ="50"
                                    className="text-xl font-bold text-neutral-600 dark:text-white"
                                >
                                    Permissions Granted
                                </CardItem>
                                <CardItem
                                    as="p"
                                    translateZ="60"
                                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                                >
                                    You can now proceed to the Interview
                                </CardItem>
                                <CardItem translateZ="100" className="w-full mt-4">
                                    <Webcam
                                        onUserMedia={() => setWebCamEnabled(true)}
                                        onUserMediaError={() => setWebCamEnabled(false)}
                                        mirrored={true}
                                    />
                                </CardItem>
                                <div className="flex justify-between items-center mt-10">
                                    <CardItem
                                        translateZ={20}
                                        className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                                    >
                                        Grant now →
                                    </CardItem>
                                    <CardItem
                                        translateZ={20}
                                        className="px-4 hover:bg-[#1c4b82] dark:hover:bg-secondary py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                                        onClick={handleClick}
                                    >
                                        Start Interview
                                    </CardItem>
                                </div>
                            </CardBody>
                        </CardContainer>
                            :
                            <>
                                <CardContainer className="inter-var">
                                    <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                                        <CardItem
                                            translateZ="50"
                                            className="text-xl font-bold text-neutral-600 dark:text-white"
                                        >
                                            Let&apos;s Get Started
                                        </CardItem>
                                        <CardItem
                                            as="p"
                                            translateZ="60"
                                            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                                        >
                                            Grant Webcam and Microphone Permissions
                                        </CardItem>
                                        <CardItem translateZ="100" className="w-full mt-4">
                                            <Image
                                                src="/webcam.png"
                                                height="1000"
                                                width="1000"
                                                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                                                alt="thumbnail"
                                            />
                                        </CardItem>
                                        <div className="flex justify-between items-center mt-20">
                                            <CardItem
                                                translateZ={20}
                                                className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                                            >
                                                Grant now →
                                            </CardItem>
                                            <CardItem
                                                translateZ={20}
                                                // as="button"
                                                className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold hover:bg-[#1c4b82] dark:hover:bg-secondary"
                                                onClick={() => setWebCamEnabled(true)}
                                            >
                                                Allow
                                            </CardItem>
                                        </div>
                                    </CardBody>
                                </CardContainer>
                            </>
                        }
                    </div>
                </FollowerPointerCard>
            </div>
        </div>
    )
}

export default Interview