"use client"

import { Cloudy, CoinsIcon, HomeIcon, LucideNewspaper, MenuIcon } from 'lucide-react'
import React, { useState } from 'react'
import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import Logo from './Logo';


const routes = [
    {
        href: "/",
        label: "Home",
        icon: HomeIcon
    },
    {
        href: "weather",
        label: "Weather",
        icon: Cloudy
    },
    {
        href: "crypto",
        label: "Crypto ",
        icon: CoinsIcon
    },
    {
        href: "news",
        label: "News",
        icon: LucideNewspaper
    },
];
const DesktopSidebar = () => {
    const pathName = usePathname();
    const activeRoute = routes.find((route) => {
        if (route.href === "/") {
            return pathName === "/";
        }
        return pathName.startsWith(`/${route.href}`);
    }) || routes[0];
    return (
        <div className='hidden relative md:block  min-w-[280px] max-w-[280px] h-screen overflow-hidden w-full bg-primary/5 dark:bg-secondary/30 dark:text-foreground text-muted-foreground border-r-2 border-separate '>
            <div className="flex items-center justify-center gap-2 border-separate p-4 border-b-[1px]">
                {/* <Logo /> */}
            </div>
            <div className="flex flex-col gap-1 p-2">
                {routes.map(route => (
                    <Link key={route.href} href={route.href} className={buttonVariants({
                        variant:activeRoute.href === route.href ? 'sidebarActiveItem' : 'sidebarItem'
                    })}>
                        <route.icon size={20}/>
                        {route.label}
                    </Link>
                )
                )}
            </div>
        </div>
    )
}

export function MobileSideBar() {
    const [isOpen, setOpen] = useState(false);
    const pathName = usePathname();
    const activeRoute = routes.find((route) => {
        if (route.href === "/") {
            return pathName === "/";
        }
        return pathName.startsWith(`/${route.href}`);
    }) || routes[0];
    return <div className="block border-separate bg-background md:hidden">
        <nav className='container flex items-center justify-center  px-8'>
            <Sheet open={isOpen} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button variant={"ghost"} size={"icon"}>
                        <MenuIcon/>
                    </Button>
                </SheetTrigger>
                <SheetContent className='w-[300px] sm:w-[500px] space-y-8 ' side={"left"}>
                    <Logo/>
                    <div className="flex flex-col  gap-1">
                        {routes.map(route => (
                            <Link key={route.href} href={route.href} className={buttonVariants({
                                variant: activeRoute.href === route.href ? 'sidebarActiveItem' : 'sidebarItem'
                            })} 
                            onClick={()=>setOpen((prev)=>!prev)}
                            >
                                <route.icon size={20} />
                                {route.label}
                            </Link>
                        )
                        )}
                    </div>
                </SheetContent>
            </Sheet>
        </nav>
    </div>
}

export default DesktopSidebar