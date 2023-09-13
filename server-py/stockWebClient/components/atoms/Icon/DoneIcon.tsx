import React from "react";
import { IconProps, BaseIcon } from "./BaseIcon";
import clsx from "clsx";

export const DoneIcon = (props: IconProps) => {
    const { width = 24, height = 24, fill = "black", className } = props;
    return <BaseIcon data-testid={"done-icon"} className={clsx(["relative", className])} xmlns="http://www.w3.org/2000/svg" height={height.toString()} 
        viewBox="0 96 960 960" width={width.toString()}>
            <path fill={fill} d="M382 816 154 588l57-57 171 171 367-367 57 57-424 424Z"/>
        </BaseIcon>
};