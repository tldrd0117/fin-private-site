import React, { useState } from 'react'
import Image from 'next/image'
import closeIcon from '../../public/images/close_FILL0_wght400_GRAD0_opsz24.svg'
import clsx from 'clsx'
import { IconButton } from '../../molecules/IconButton/IconButton'
import { Input, InputProps } from '@/components/atoms/Input/Input'
import { CancelIcon } from '@/components/atoms/Icon/CancelIcon'
import { IconElement } from '@/components/atoms/Icon/BaseIcon'

export interface PasswordInputProps extends InputProps{
    icon?: IconElement
    cancelButton?: boolean
    onCancel?: React.MouseEventHandler<HTMLButtonElement>
}

export const PasswordInput = (props: PasswordInputProps) => {
    const {icon, cancelButton, value, className, placeholder, disabled, name,
        onChange, onKeyDown, onKeyUp, onFocus, onBlur, onCancel} = props
    return <>
        <div className={clsx(['relative h-10', className])}>
            <div className="absolute rounded-lg bg-slate-200 w-full">
                <span className='absolute left-0 m-2'>{ icon }</span>
                <Input
                    name={name}
                    type="password"
                    className={clsx(['text-base', 'rounded-lg', 'bg-transparent', 'focus:outline-none', 'focus:ring', "w-full",
                        'focus:border-blue-500', 'h-10', {'pl-10': icon}, {'pl-4': !icon}, {'pr-8': cancelButton}, {'pr-4': !cancelButton}])}
                    placeholder={placeholder}
                    value={value}
                    disabled={disabled}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    onKeyUp={onKeyUp}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    />
                {
                    cancelButton && 
                    <IconButton
                        icon={<CancelIcon />}
                        className='absolute right-0 m-2'
                        onClick={onCancel}
                    />
                }
            </div>
        </div>
    </>
}
