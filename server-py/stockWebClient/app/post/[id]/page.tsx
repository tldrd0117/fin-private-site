import React from 'react'
import { dehydrate, Hydrate } from '@tanstack/react-query'
import getQueryClient from '../../getQueryClient'
import Post from './post'
import { GetServerSidePropsContext } from 'next'
import { prefetchPost } from '@/data/query/post/prefetch'
import { prefetchPublicKey } from '@/data/query/auth/prefetch'
import { AppBarContentsTemplate } from '@/components/templates/AppBarContentsTemplate'
import { VisitRecord } from '@/app/common/VisitRecord'


export default async function Page(context: GetServerSidePropsContext<{id: string}>) {
    const id = context.params?.id as string || ""
    await prefetchPublicKey()
    await prefetchPost(id)
    const state = dehydrate(getQueryClient())
    return <>
        <Hydrate state={state}>
            <AppBarContentsTemplate>
                <VisitRecord postId={id}>
                    <Post id={id}/>
                </VisitRecord>
            </AppBarContentsTemplate>
        </Hydrate>
    </>
}
