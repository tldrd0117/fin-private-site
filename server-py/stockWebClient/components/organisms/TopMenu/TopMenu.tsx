'use client'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import { GrayButton } from '@/components/atoms/Button/GrayButton'

export interface TopMenuItem{
    title: string
    path: string
}

export interface TopMenuProps{
    items: Array<TopMenuItem>
    className: string
}

export const TopMenu = ({items, className} : TopMenuProps) => {
    const router = useRouter()
    const handleClick = (path: string) => {
        router.push(path)
    }
    return <>
        <div className={clsx(["borderBg","flex", "pl-2" ,className, "rounded-xl"])}>
            {
                items.map(item => {
                    return <GrayButton className='mx-1 my-2' onClick={() => handleClick(item.path)} key={item.path}>
                        {item.title}
                    </GrayButton>
                })
            }
        </div>
    </>
}