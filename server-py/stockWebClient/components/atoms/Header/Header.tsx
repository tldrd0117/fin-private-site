import React from "react";
import clsx from "clsx";

export interface HeaderProps{
    h1?: boolean
    h2?: boolean
    h3?: boolean
    h4?: boolean
    h5?: boolean
    h6?: boolean
    className?: string
    children?: React.ReactNode
}

export const Header = (props: HeaderProps) => {
    const {children, h1, h2, h3, h4, h5, h6, className} = props
    if(h1) return <h1 className={clsx(["text-6xl",className])}>{children}</h1>
    if(h2) return <h2 className={clsx(["text-5xl",className])}>{children}</h2>
    if(h3) return <h3 className={clsx(["text-4xl",className])}>{children}</h3>
    if(h4) return <h4 className={clsx(["text-3xl",className])}>{children}</h4>
    if(h5) return <h5 className={clsx(["text-2xl",className])}>{children}</h5>
    if(h6) return <h6 className={clsx(["text-xl",className])}>{children}</h6>
    return (
        <>
            {children}
        </>
    );
};