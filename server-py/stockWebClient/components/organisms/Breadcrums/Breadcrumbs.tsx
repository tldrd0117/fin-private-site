import Link from "next/link";
import React from "react";

export interface LinkProps{
    href: string
    label: string
}

export interface BreadcumbsProps {
    items: LinkProps[]
}

export const Breadcrumbs = (props: BreadcumbsProps) => {
    const {items} = props
    return <>
        <div className="flex gap-2">
            {
                items ? items.map((item, index) => {
                    return <span key={item.href+item.label} >
                        <Link href={item.href} >{item.label}</Link>
                        {index < items.length - 1 ? <span className="text-gray-400"> /</span> : null}
                    </span>
                }) : null
            }
        </div>
    </>
}