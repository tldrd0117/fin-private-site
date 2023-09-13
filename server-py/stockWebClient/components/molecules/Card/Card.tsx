
import React from "react";
import clsx from "clsx";
import { ImageProps } from "next/image";
import { formatDistanceToNow } from "date-fns";
import { ko } from 'date-fns/locale'
import { TagInput } from "../Input/TagInput";
import { INPUT_STYLE_TYPE } from "../Input/StylableInput";
import { Image } from "@/components/atoms/Image/Image";
import { Header } from "@/components/atoms/Header/Header";
import { Paragraph } from "@/components/atoms/Paragraph/Paragraph";
import { Span } from "@/components/atoms/Span/Span";

export interface CardContentsProps{
    title: string
    subTitle?: string
    date?: Date
    summary?: string
    author?: string
    image?: ImageProps
    tags?: Array<string>
    size?: 'sm' | 'md' | 'lg'
}

export interface CardProps extends CardContentsProps{
    className?: string
    onClick?: React.MouseEventHandler<HTMLDivElement>
}

export interface CardContainerProps {
    className?: string
}

export const Card = (props: CardProps) => {
    const {className, title, subTitle, summary, image, date, tags, author} = props
    const containerProps: CardContainerProps = props
    let {size} = props
    if(!size) size = "md"
    switch(size){
        case "sm":
            return <div {...containerProps}
                    className={clsx(["cardBg","w-64", "p-0", className])}
                    >
                    {
                        image? <Image {...image}
                            alt={image.alt}
                            className={clsx(["rounded-lg h-36 overflow-hidden", image.className])}/>
                            : null
                    }
                    <div className="flex flex-col w-64 p-4">
                        <Header h6 className={clsx(["pb-1", "line-clamp-2"])}>{title}</Header>
                        {
                            subTitle? <Paragraph className="pb-3 truncate">{subTitle}</Paragraph>: null
                        }
                        {
                            date? <Span className="pb-3">{formatDistanceToNow(date, {addSuffix: true, locale: ko})}</Span>: null
                        }
                        <Span className="line-clamp-5">{summary}</Span>
                    </div>
                </div>
        case "md":
            return <div {...containerProps}
                    className={clsx(["cardBg", "w-72", "flex-initial", "p-0", className])}
                    >
                    {
                        image? <Image {...image}
                            alt={image.alt}
                            className={clsx(["rounded-lg h-44 overflow-hidden", image.className])}/>
                            : null
                    }
                    <div className="flex flex-col w-72 p-5">
                        <Header h5 className="pb-1.5 line-clamp-2">{title}</Header>
                        {
                            subTitle? <Header h6 className="pb-3 truncate">{subTitle}</Header>: null
                        }
                        {
                            date? <Span className="pb-3">{formatDistanceToNow(date, {addSuffix: true, locale: ko})}</Span>: null
                        }
                        {
                            author? <Span className="pb-3">{author}</Span>: null
                        }
                        <Paragraph className="line-clamp-5">{summary}</Paragraph>
                        {
                            tags? 
                            <TagInput inputStyleType={INPUT_STYLE_TYPE.NONE} className="bg-transparent" tagValue={tags} readOnly/>: null
                        }
                    </div>
                </div>
        case "lg":
            return <div {...containerProps}
                    className={clsx(["cardBg", "w-96", "p-0", "grow", className])}
                    >
                    {
                        image? <Image {...image}
                            alt={image.alt}
                            className={clsx(["rounded-lg h-64 overflow-hidden", image.className])}/>
                            : null
                    }
                    <div className="flex flex-col w-96 p-6">
                        <Header h4 className="pb-2 line-clamp-2">{title}</Header>
                        {
                            subTitle? <Header h6 className="pb-3 truncate">{subTitle}</Header>: null
                        }
                        {
                            date? <Span className="pb-3">{formatDistanceToNow(date, {addSuffix: true, locale: ko})}</Span>: null
                        }
                        <Paragraph className="line-clamp-5">{summary}</Paragraph>
                    </div>
                </div>
    }
};