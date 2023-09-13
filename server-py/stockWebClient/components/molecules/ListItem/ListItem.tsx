import React, { MouseEventHandler } from "react";
import clsx from "clsx";

export interface ListItemProps{
    className?: string;
    children?: React.ReactNode;
}

export const ListItem = (props: ListItemProps) => {
    const {className} = props
    return <>
        <li {...props} className={clsx(["break-all", className])} />
    </>
}