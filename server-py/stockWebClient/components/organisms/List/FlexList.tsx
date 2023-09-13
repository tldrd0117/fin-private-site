import React from "react";
import clsx from "clsx";

export interface FlexListProps{
    className?: string;
    children?: React.ReactNode;
}

export const FlexList = (props: FlexListProps) => {
    let {className} = props
    if(!className?.includes("gap")){
        className += " gap-4"
    }
    return <ul {...props} className={clsx([`flex flex-wrap`, className])} />
}