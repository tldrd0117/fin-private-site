import React, { Ref, forwardRef, useState } from 'react'
import Image from 'next/image'
import closeIcon from '../../public/images/close_FILL0_wght400_GRAD0_opsz24.svg'
import clsx from 'clsx'
import { IconButton } from '../../molecules/IconButton/IconButton'
import { StylableInput, StylableInputProps } from './StylableInput'
import { IconElement } from '@/components/atoms/Icon/BaseIcon'
import { CancelIcon } from '@/components/atoms/Icon/CancelIcon'

export interface TextInputProps extends StylableInputProps{
    icon?: IconElement
    rightIcon?: IconElement
    cancelButton?: boolean
    onCancel?: React.MouseEventHandler<HTMLButtonElement>
}


export const TextInput = forwardRef((props: TextInputProps, ref: Ref<HTMLInputElement>) => {
    const {icon, rightIcon, cancelButton, onCancel, ...rest} = props
    return <>
        <StylableInput
            ref={ref}
            type='text'
            inputClassName={clsx([{ 'pl-10': icon }, { 'pl-4': !icon }, { 'pr-8': cancelButton }, { 'pr-4': !cancelButton }])}
            leftComponent={<div className='absolute m-2'>{icon}</div>}
            rightComponent={<>
                <div className='flex absolute m-2 right-0 bottom-0 pointer-events-none'>
                    {
                        rightIcon
                    }
                    {
                        cancelButton && 
                        <IconButton
                            className='pointer-events-none'
                            icon={<CancelIcon />}
                            onClick={onCancel}
                        />
                    }
                </div>
            </>}
            {...rest}
        />
    </>
})
