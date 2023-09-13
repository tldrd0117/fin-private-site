
import { serialize } from 'next-mdx-remote/serialize'
import { Home } from './home'
import remarkGfm from 'remark-gfm'
import { AppBarContentsTemplate } from '@/components/templates/AppBarContentsTemplate'
import { prefetchRecentPostList } from '@/data/query/post/prefetch'
import { prefetchPopularVisit, prefetchVisit } from '@/data/query/visit/prefetch'
import { VISIT_TARGET, VISIT_TYPES } from '@/data/query/common/constants'
import { prefetchPublicKey } from '@/data/query/auth/prefetch'
import { VisitRecord } from './common/VisitRecord'
import { Hydrate, dehydrate } from '@tanstack/react-query'
import getQueryClient from './getQueryClient'
import { visitTypes } from '@/data/api/interfaces/visit'

export default async function HomePage() {
    await prefetchPublicKey()
    await prefetchRecentPostList()
    await prefetchVisit(VISIT_TARGET.TODAY, VISIT_TYPES.BLOG)
    await prefetchPopularVisit(30, VISIT_TYPES.CATEGORY);
    await prefetchPopularVisit(10, VISIT_TYPES.POST);
    await prefetchPopularVisit(500, VISIT_TYPES.TAG);

    const state = dehydrate(getQueryClient())
    return <>
        <Hydrate state={state}>
            <AppBarContentsTemplate>
                <VisitRecord>
                    <Home/>
                </VisitRecord>
            </AppBarContentsTemplate>
        </Hydrate>
    </>
}
