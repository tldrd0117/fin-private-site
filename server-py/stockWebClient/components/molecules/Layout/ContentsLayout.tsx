import clsx from 'clsx'
import React from 'react'

export interface ContentsLayoutProps {
    children: React.ReactNode;
    className: string;
}

export const ContentsLayout = (props: ContentsLayoutProps) => {
    const {children, className} = props
    return (
        <div {...props} className={clsx(['p-8', className])} />
    )
}