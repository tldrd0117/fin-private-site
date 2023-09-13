'use client'
import { Portal } from "@/components/atoms/Potal/Portal";
import React from "react";

export interface FloatBottomLayoutProps {
    leftComponent?: React.ReactNode
    rightComponent?: React.ReactNode
}

export const FloatBottomLayout = (props: FloatBottomLayoutProps) => {
    return <Portal>
        <div className="absolute bottom-0 w-full flex justify-between pb-8">
            <div className="ml-8 flex gap-2">
                {props.leftComponent}
            </div>
            <div className="mr-8 flex gap-2">
                {props.rightComponent}
            </div>
        </div>
    </Portal>
}

