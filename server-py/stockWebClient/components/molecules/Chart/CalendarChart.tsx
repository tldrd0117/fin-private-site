
'use client'
import React from "react";
import { ResponsiveCalendar } from "@nivo/calendar"
import { add, format, startOfYear } from "date-fns";

export interface CalendarChartProps{
    data: Array<{ value: number, day: string}>
}

export const CalendarChart = ({ data }: CalendarChartProps) => {
    const today = new Date()
    const from = format(add(today, { years: - 1, days: 1}), "yyyy-MM-dd")
    const to = format(today, "yyyy-MM-dd")
    return <div className="h-96">
        <ResponsiveCalendar
            data={data}
            from={from}
            to={to}
            emptyColor="#eeeeee"
            colors={[ '#61cdbb', '#97e3d5', '#e8c1a0', '#f47560' ]}
            margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
            yearSpacing={40}
            monthBorderColor="#ffffff"
            dayBorderWidth={2}
            dayBorderColor="#ffffff"
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'row',
                    translateY: 36,
                    itemCount: 4,
                    itemWidth: 42,
                    itemHeight: 36,
                    itemsSpacing: 14,
                    itemDirection: 'right-to-left'
                }
            ]}
        />
    </div>
}