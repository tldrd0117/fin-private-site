'use client'
import React, { SyntheticEvent, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import closeIcon from '../../public/images/close_FILL0_wght400_GRAD0_opsz24.svg'
import clsx from 'clsx'
import { IconButton } from '../../molecules/IconButton/IconButton'
import { KeyboardEvent } from 'react'
import { ChangeEvent } from 'react'
import style from './input.module.scss'
import { read } from 'fs'
import { INPUT_STYLE_TYPE, StylableInput, StylableInputProps } from './StylableInput'
import { IconElement } from '@/components/atoms/Icon/BaseIcon'
import { Tag } from '@/components/atoms/Tag/Tag'
import { CancelIcon } from '@/components/atoms/Icon/CancelIcon'

export interface TagInputProps extends StylableInputProps{
    icon?: IconElement
    cancelButton?: boolean
    onCancel?: React.MouseEventHandler<HTMLButtonElement>
    tagValue?: Array<string>
    onTagChange?: (value: Array<string>) => void
}

export const TagInput = (props: TagInputProps) => {
    const {icon, cancelButton, value, className, tagValue,
        onChange, onKeyDown, onCancel, onTagChange, ...rest} = props
    const [tags, setTags] = useState<Array<string>>(tagValue || [])
    const [inputValue, setInputValue] = useState<string>(value || "")
    const inputRef = useRef<HTMLInputElement>(null)

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.nativeEvent.isComposing){
            return;
        }
        if(event.key === "Enter"){
            setTags([...tags, inputValue || ""])
            setInputValue("")
        } else if(event.key === "Backspace"){
            if(inputValue === ""){
                setTags(tags.slice(0, -1))
            }
        }
        onKeyDown && onKeyDown(event)
    }

    useEffect(()=>{
        handleOnTagChange()
    }, [tags])

    const handleOnTagChange = () => {
        onTagChange && onTagChange(tags)
    }

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
        onChange && onChange(event)
    }
    return <>
            <StylableInput
                    ref={inputRef}
                    bgOnClick={()=>inputRef.current?.focus()}
                    bgClassName={clsx(['relative cursor-text h-auto flex flex-wrap flex-1 px-2 py-1', className])}
                    inputClassName={clsx(['whitespace-pre caret-black focus:outline-none w-full px-0 bg-transparent text-transparent h-10', 
                    style.input])}
                    renderInput={(props, inputStyle, input)=>{
                        const {inputClassName} = props
                        return <span className='inline-block whitespace-pre-line break-all'>{inputValue}
                            <div className={clsx(["relative h-auto px-0", style.tagInput])}>
                                {/* <BaseInput 
                                    className={clsx([inputStyle, inputClassName])}
                                /> */}
                                {input}
                            </div>
                        </span>
                        
                    }}
                    // leftContainerClassName={"items-center flex-wrap relative flex bottom-0 m-0"}
                    leftComponent={
                        <>
                            {
                                tags.map((tag, index) => {
                                    return <Tag className='mx-1 my-1 whitespace-pre-line break-all' key={index}>{tag}</Tag>
                                })
                            }
                            <span className='inline-block'>
                                {icon}
                            </span>
                            {/* <span className='inline-block whitespace-pre-line break-all'>{inputValue}</span> */}
                        </>
                    }
                    rightComponent={
                        <>
                            {
                                cancelButton && 
                                <IconButton
                                    icon={<CancelIcon />}
                                    className='pointer-events-auto'
                                    onClick={onCancel}
                                />
                            }
                        </>
                    }
                    onChange={handleOnChange}
                    onKeyDown={(e)=>handleKeyDown(e)}
                    value={inputValue}
                    {...rest}
                />
                {/* <div className='w-auto flex items-center flex-auto pl-2'>
                    {
                        icon?<span className='relative inline-block bottom-0 m-2'>{ icon }</span>:null
                    }
                    <span>{inputValue}</span>
                    <div className={clsx(['inline-grid', style.tagInput])}>
                        <BaseInput
                            type="text"
                            className={clsx(['text-base', 'rounded-lg', 
                                'bg-transparent', 'focus:outline-none', "caret-black",
                                'bg-slate-200', "whitespace-pre", 'text-transparent',
                                'focus:border-blue-500', 'h-10', "w-full", "px-0", style.input,
                                ])}
                            ref={inputRef}
                            value={inputValue}
                            disabled={disabled}
                            onChange={handleOnChange}
                            onKeyDown={(e)=>handleKeyDown(e)}
                            onKeyUp={onKeyUp}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            readOnly={readOnly}
                            />
                    </div>
                </div>
                
                {
                    
                } */}
        {/* </div> */}
    </>
}
