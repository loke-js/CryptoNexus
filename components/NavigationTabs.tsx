"use client"

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function NavigationTabs() {
  const pathName = usePathname();
  const activeValue = pathName?.split("/")[2];
  
  return (
    <Tabs value={activeValue} className='w-[40vw] max-md:hidden'>
        <TabsList className='grid w-full grid-cols-3 '>
            <Link href={`/weather`}><TabsTrigger value="weather"  className='w-full dark:text-accent-foreground'>Weather</TabsTrigger>
            </Link>
            <Link href={`/crypto`}>
            <TabsTrigger value="crypto" className='w-full dark:text-accent-foreground'>Crypto</TabsTrigger>
            </Link>
            <Link href={`/news`}>
            <TabsTrigger value="news" className={cn(`w-full dark:text-accent-foreground`)}>News</TabsTrigger>
            </Link>
        </TabsList>
    </Tabs>
  )
}
