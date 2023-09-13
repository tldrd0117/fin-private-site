import clsx from "clsx";
import React, { MouseEventHandler } from "react";

export interface TagProps {
    children?: React.ReactNode;
    onClick?: MouseEventHandler<HTMLSpanElement>
    className?: string
}

export const Tag = (props: TagProps) => {
    const { children, onClick, className } = props;
    return (
        <>
            <span className={clsx(["text-sm bg-slate-300 w-auto px-3 py-1.5 rounded-full", className])}
                onClick={onClick}
                >
                {children}
            </span>
        </>
    );
};