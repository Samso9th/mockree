import React from 'react'

import InfoBar from '@/components/ui/infobar'
import DashSidebar from '@/components/ui/dashsidebar'

type Props = { children: React.ReactNode }

const Layout = (props: Props) => {
  return (
    <div className="flex overflow-hidden h-screen">
      <DashSidebar />
      <div className="w-full">
        <InfoBar />
        {props.children}
      </div>
    </div>
  )
}

export default Layout