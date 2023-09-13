import React from "react";
import { clsx } from "clsx";
import Image, { ImageProps } from 'next/image'

export interface BaseImageProps extends ImageProps{
}

export const BaseImage = (props: BaseImageProps) => {
    return (
        <>
            <Image
                {...props}
            />
        </>
    );
};