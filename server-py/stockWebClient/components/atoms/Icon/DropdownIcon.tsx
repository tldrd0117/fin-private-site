import React from "react";
import { IconProps, BaseIcon } from "./BaseIcon";
import clsx from "clsx";


export const DropdownIcon = (props: IconProps) => {
    const { width = 24, height = 24, fill = "black", className } = props;
    return <BaseIcon data-testid={"dropdown-icon"} fill={fill} xmlns="http://www.w3.org/2000/svg" className={clsx([className])} 
            height={height.toString() } viewBox="0 96 960 960" width={width.toString()}>
                <path d="M480 696 280 496h400L480 696Z"/>
    </BaseIcon>
};