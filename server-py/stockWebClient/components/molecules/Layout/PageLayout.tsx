import React from "react";
import clsx from "clsx";
import style from './PageLayout.module.scss'

export interface PageLayoutProps{
    className?: string;
    children?: React.ReactNode;
}

export const PageLayout = (props: PageLayoutProps) => {
    const { className, children } = props;
    return <>
        <div {...props} className={clsx([style.background,"overflow-auto","absolute","w-full", "h-full", "p-4", className])}/>
    </>
}