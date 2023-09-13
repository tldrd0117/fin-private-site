import React from "react";
import { BaseIcon, IconProps } from "./BaseIcon";

export interface ArrowIconProps extends IconProps{
    left?: boolean
    right?: boolean
    doubleLeft?: boolean
    doubleRight?: boolean
}

export const ArrowIcon = (props: ArrowIconProps) => {
    const { width = 24, height = 24, fill = "black" } = props;
    if(props.left){
        return <BaseIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width={width} height={height}>
            <path fill={fill} d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/>
        </BaseIcon>
    }
    if(props.right){
        return <BaseIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width={width} height={height}>
            <path fill={fill} d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/>
        </BaseIcon>
    }
    if(props.doubleLeft){
        return <BaseIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width={width} height={height}>
            <path fill={fill} d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z"/>
        </BaseIcon>
    }
    if(props.doubleRight){
        return <BaseIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width={width} height={height}>
            <path fill={fill} d="M383-480 200-664l56-56 240 240-240 240-56-56 183-184Zm264 0L464-664l56-56 240 240-240 240-56-56 183-184Z"/>
        </BaseIcon>
    }
    return <></>
};