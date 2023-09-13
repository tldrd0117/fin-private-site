import getQueryClient from "@/app/getQueryClient"
import { QUERY_KEYS } from "../common/constants"
import { getPost, getPostList, createPost } from "../../api/post"
import { compileMDX } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import { parsePostText } from "@/data/post/util"
import { convertList, convertMdxPost } from "../common/converters"


const DEFAULT_LIMIT = 20;
const RECENT_LIST_LIMIT = 10;

export const prefetchPost = (_id: string) => {
    return getQueryClient().prefetchQuery([QUERY_KEYS.POST.POST, _id], async () => {
        const post = await getPost({_id})
        const mdxPost =  await convertMdxPost(post)
        return mdxPost
    }, {
        staleTime: 1000 * 1,
        cacheTime: 1000 * 60
    })
}

export const prefetchRecentPostList = () => {
    return getQueryClient().prefetchQuery([QUERY_KEYS.POST.LIST, RECENT_LIST_LIMIT], async () => {
        let list =  await getPostList({ limit: RECENT_LIST_LIMIT, offset: 0 })
        return list
    }, {
        staleTime: 1000 * 1,
        cacheTime: 1000 * 60
    })
}

export const prefetchPostListInfinity = () => {
    return getQueryClient().prefetchInfiniteQuery([QUERY_KEYS.POST.LIST, DEFAULT_LIMIT], async ({ pageParam = 0 }) => {
        let list = await getPostList({ limit: DEFAULT_LIMIT, offset: pageParam * DEFAULT_LIMIT })
        return list
    }, {
        staleTime: 1000 * 1,
        cacheTime: 1000 * 60
    })
}
