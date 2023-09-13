import { MDXRemoteSerializeResult } from "next-mdx-remote";
import React from "react";

export interface FooterProps {
    className?: string
    children?: React.ReactNode
}

export const FooterLayout = (props: FooterProps) => {
    const {className, children} = props
    return <>
        <footer className={className}>
            <div className="p-8 borderBg">
                {children}
            </div>
        </footer>
    </>
}