'use client'

import { useEncPubicKey } from '@/data/query/auth/query'
import { useTypes } from '@/data/query/info/query'
import { useVisitMutation } from '@/data/query/visit/query'
import React, { Suspense, useEffect } from 'react'

export const VisitRecord = ({ children, postId }: { children: React.ReactNode, postId?: string }) => {
    const {data, isLoading}: any = useEncPubicKey()
    const {mutate} = useVisitMutation()
    useEffect(() => {
        if(!isLoading && data.algorithm){
            mutate({target: "today", type: "blog"})
            if(postId){
                mutate({target: postId, type: "Post"})
            }
        }
    }, [isLoading, data])
    return <>
        { children }
    </>
}