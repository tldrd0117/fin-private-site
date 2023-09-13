import React, { FC, ReactElement } from 'react'
import Image, {StaticImageData} from 'next/image'
import clsx from 'clsx';


export interface IconProps extends React.SVGProps<SVGSVGElement>{
}

export interface IconElement extends ReactElement<IconProps>{
}

export const BaseIcon = (props: IconProps) => {
    const {className} = props
    return <>
        <svg {...props}
            className={clsx(["pointer-events-none", className])} 
        />
    </>
};