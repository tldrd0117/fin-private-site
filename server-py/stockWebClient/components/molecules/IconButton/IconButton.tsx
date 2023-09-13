import React, { MouseEventHandler } from "react";
import clsx from "clsx";
import { Button } from "@/components/atoms/Button/Button";
import { IconElement } from "@/components/atoms/Icon/BaseIcon";

export interface IconButtonProps{
    icon: IconElement
    className?: string
    disabled?: boolean
    onClick?: MouseEventHandler<HTMLButtonElement>
}

export const IconButton = (props: IconButtonProps) => {
    const {className, onClick, icon, disabled} = props
    return (
        <>
            <Button onClick={onClick} className={clsx(["disabled:opacity-50",className])} disabled={disabled}>
                {icon}
            </Button>
        </>
    );
};