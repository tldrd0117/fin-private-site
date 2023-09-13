import React from "react";
import { clsx } from "clsx";
import Img, { ImageProps } from 'next/image'

export const Image = (props: ImageProps) => {
    const {className, fill} = props
    return (
        <div className={clsx(["relative", className])}>
            <Img
                {...props}
                fill={true}
                className="object-cover w-full h-full"
            />
        </div>
    );
};