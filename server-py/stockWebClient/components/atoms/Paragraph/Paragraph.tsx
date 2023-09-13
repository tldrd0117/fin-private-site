import React from "react";
import clsx from "clsx";

export interface ParagraphProps{
    className?: string
    children?: React.ReactNode
}

export const Paragraph = (props: ParagraphProps) => {
    const {children, className} = props
    return <p className={clsx(["text-base",className])}>{children}</p>
};