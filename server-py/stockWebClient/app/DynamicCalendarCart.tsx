'use client'
import dynamic from 'next/dynamic'

export const DynamicCalendarCart = dynamic(() => import('@/components/molecules/Chart/CalendarChart').then((module) => module.CalendarChart), { 
    loading: () => <p>loading...</p>,
    ssr: false
});