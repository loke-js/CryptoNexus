import BreadCrumbHeader from '@/components/BreadCrumbHeader'
import Logo from '@/components/Logo'
import NavigationTabs from '@/components/NavigationTabs'
import { MobileSideBar } from '@/components/Sidebar'
import { ModeToggle } from '@/components/themeModeToggle'
import { Separator } from '@/components/ui/separator'

import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex h-screen">
            <div className="flex flex-col flex-1 min-h-screen">
                <header className="flex items-center justify-between px-4  h-[50px] container">
                    <div className='flex items-center justify-center'>
                    <Logo/>
                    </div>
                    <BreadCrumbHeader />
                        <NavigationTabs />
                    <div className="gap-1 flex items-center">
                        <ModeToggle />
    
                    </div>
                </header>
                <Separator />
                <div className="overflow-auto">
                    <div className="flex-1 container text-accent-foreground py-4">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default layout