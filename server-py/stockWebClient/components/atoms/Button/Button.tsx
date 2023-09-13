import React, { MouseEventHandler } from 'react'

export interface ButtonProps{
    className?: string
    onClick?: MouseEventHandler<HTMLButtonElement>
    disabled?: boolean
    children?: React.ReactNode
    type?: "button" | "submit" | "reset" | undefined
}

export const Button = ({ children, className, onClick, disabled, type }: ButtonProps) => {
    return <button
        className={className}
        onClick={onClick}
        disabled={disabled}
        type={type}
        >
        {children}
    </button>
}