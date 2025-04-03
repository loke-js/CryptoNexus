"use client"

import { ThemeProvider } from 'next-themes'
// import {ReactQueryDevtools} from "@tanstack/react-query-devtools"
import React, { useState } from 'react'
import NextTopLoader from 'nextjs-toploader'
import { Provider } from 'react-redux'
import { store } from '@/store/store'

export function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <>
            <NextTopLoader color='oklch(0.546 0.245 262.881)' showSpinner={false} />
            <Provider store={store}>
            <ThemeProvider attribute="class" defaultTheme='system' enableSystem>
                {children}
            </ThemeProvider>
            </Provider>
            
        </>
    )
}