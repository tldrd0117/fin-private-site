import React from "react";

export interface ListProps{
    className?: string;
    children?: React.ReactNode;
}

export const List = (props: ListProps) => {
    return <ul {...props}  />
}