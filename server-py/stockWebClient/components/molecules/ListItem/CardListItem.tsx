import React from "react";
import { Card, CardContentsProps, CardProps } from "../Card/Card";
import { ListItem } from "./ListItem";

interface CardListItemProps extends CardProps{
}

export const CardListItem = (props: CardListItemProps) => {
    return <>
        <li className={props.className}>
            <Card {...props} className={"list-none"}/>
        </li>
        {/* <ListItem {...props} tagtype={Card} className="list-none"/> */}
    </>
}