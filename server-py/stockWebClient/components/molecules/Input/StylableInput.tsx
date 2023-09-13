import React, { ChangeEventHandler, KeyboardEventHandler, Ref } from 'react'
import style from './input.module.scss'
import clsx from 'clsx';
import { Input, InputProps } from '@/components/atoms/Input/Input';


export const INPUT_STYLE_TYPE = {
    DEFAULT: 'DEAFAULT',
    UNDERLINE: 'UNDERLINE',
    NONE: 'NONE',
    OUTLINE: 'OUTLINE',
} as const;
type INPUT_STYLE_TYPE = typeof INPUT_STYLE_TYPE[keyof typeof INPUT_STYLE_TYPE];

export type RenderInput = (props: StylableInputProps, inputStyle: string, input: JSX.Element) => JSX.Element

export interface StylableInputProps extends InputProps{
    inputStyleType?: INPUT_STYLE_TYPE
    inputBgStyleType?: INPUT_STYLE_TYPE
    leftComponent?: React.ReactNode
    rightComponent?: React.ReactNode
    bgClassName?: string
    inputClassName?: string
    renderInput?: RenderInput
    bgOnClick?: React.MouseEventHandler<HTMLDivElement>
}

export const StylableInput = React.forwardRef((props: StylableInputProps, ref: Ref<HTMLInputElement>) => {
    const {inputStyleType = INPUT_STYLE_TYPE.DEFAULT, leftComponent, rightComponent, 
        className, bgClassName, inputClassName, bgOnClick, renderInput, ...rest} = props
    let { inputBgStyleType } = props
    let inputStyle, inputBgStyle
    switch(inputStyleType){
        case INPUT_STYLE_TYPE.DEFAULT:
            inputStyle = style.inputDefault
            break;
        case INPUT_STYLE_TYPE.UNDERLINE:
            inputStyle = style.inputUnderLine
            break;
        case INPUT_STYLE_TYPE.OUTLINE:
            inputStyle = style.inputOutLine
            break;
        case INPUT_STYLE_TYPE.NONE:
            inputStyle = ""
            break;
    }
    if(!inputBgStyleType) inputBgStyleType = inputStyleType
    switch(inputBgStyleType){
        case INPUT_STYLE_TYPE.DEFAULT:
            inputBgStyle = style.inputDefaultBg;
            break;
        case INPUT_STYLE_TYPE.UNDERLINE:
            inputBgStyle = style.inputUnderLineBg;
            break;
        case INPUT_STYLE_TYPE.OUTLINE:
            inputBgStyle = style.inputOutLineBg;
            break;
        case INPUT_STYLE_TYPE.NONE:
            inputBgStyle = ""
            break;
    }
    const input = <Input
        {...rest}
        ref={ref}
        className={clsx([inputStyle, className, inputClassName])}
    />
    return <>
        <div className={clsx(["relative h-auto flex items-center", inputBgStyle, bgClassName])}
            onClick={bgOnClick}>
            {
                leftComponent
            }
            {
                renderInput? renderInput(props, inputStyle, input) : input
            }
            
            {
                rightComponent
            }
        </div>
    </>
})