import React, { ChangeEventHandler, KeyboardEventHandler, Ref } from 'react'

export interface InputProps{
    name?: string
    type?: string
    value?: string
    placeholder?: string
    disabled?: boolean
    readOnly?: boolean
    className?: string
    onChange?: ChangeEventHandler<HTMLInputElement>
    onKeyDown?: KeyboardEventHandler<HTMLInputElement>
    onKeyUp?: KeyboardEventHandler<HTMLInputElement>
    onFocus?: React.FocusEventHandler<HTMLInputElement>
    onBlur?: React.FocusEventHandler<HTMLInputElement>
    onClick?: React.MouseEventHandler<HTMLInputElement>
}

export const Input = React.forwardRef((props: InputProps, ref: Ref<HTMLInputElement>) => {
    const {name, type, value, readOnly, className, placeholder, disabled, onChange, onKeyDown, onKeyUp, onFocus, onBlur, onClick} = props
    return <>
        <input
            name={name}
            type={type}
            ref={ref}
            readOnly={readOnly}
            className={className}
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            onFocus={onFocus}
            onBlur={onBlur}
            onClick={onClick}
        />
    </>
})