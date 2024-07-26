import React from 'react'
import { Header } from './_components/header'
import { Toaster } from "@/components/ui/sonner"

type Props = { children: React.ReactNode }

const DashboardLayout = (props: Props) => {
  return (
    <div className="w-full">
      {/* <Header /> */}
      <div className="my-20 mx-5 md:mx-20 lg:mx-36">
        {props.children}
        <Toaster />
      </div>
    </div>
  )
}

export default DashboardLayout