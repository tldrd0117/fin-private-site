import React from "react";
import clsx from "clsx";

export interface SpanProps{
    className?: string
    children?: React.ReactNode
}

export const Span = (props: SpanProps) => {
    const {children, className} = props
    return <span className={clsx(["text-sm",className])}>{children}</span>
};