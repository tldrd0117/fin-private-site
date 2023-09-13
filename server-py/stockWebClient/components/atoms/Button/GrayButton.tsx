import React, { MouseEventHandler } from 'react'
import { Button, ButtonProps } from './Button'
import {clsx} from 'clsx'
import styles from './button.module.scss'

interface GrayButtonProps extends ButtonProps{
}

export const GrayButton = (props: GrayButtonProps) => {
    const {onClick, disabled, className} = props
    return <Button 
        {...props}
        className={clsx(["text-stone-800", "bg-gradient-to-b", "from-slate-200", "to-slate-300",
            "hover:bg-gradient-to-r", "hover:from-slate-100", "hover:to-slate-200", "hover:text-stone-700",
            "rounded-full", "pt-2", "pb-2", "pl-4", "pr-4", className])}
        />
}