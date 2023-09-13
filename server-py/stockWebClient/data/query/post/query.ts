import { QUERY_KEYS } from "../common/constants"
import { getPost, getPostList, createPost, deletePostList, updatePost, searchPosts, getCompiledMdx } from "../../api/post"
import { QueryClient, useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import remarkGfm from "remark-gfm"
import { compileMDX } from "next-mdx-remote/rsc"
import { PostCreate, PostDelete, PostRawCreate, PostUpdate } from "../../api/interfaces/post"
import { KeyLike } from "jose"
import { makeStringErrorByResponse } from "../../api/utils/common"
import { useRouter } from "next/navigation"
import { useEncPubicKey, useToken } from "../auth/query"
import { useRecoilState } from "recoil"
import { tokenState, userInfoState } from "../../recoil/states/user"
import { PaginationState } from "@tanstack/react-table"
import { parsePostText } from "@/data/post/util"
import { convertList, convertMdxPost } from "../common/converters"
import * as runtime from 'react/jsx-runtime'
import {compile, run} from '@mdx-js/mdx'

const DEFAULT_LIMIT = 20;
const RECENT_LIST_LIMIT = 10;
export const TAG_SEPARATOR = "(/*/)";

export const usePost = (_id: string) => {
    return useQuery<any, any, any, any>({
        queryKey: [QUERY_KEYS.POST.POST, _id],
        queryFn: async () => {
            const post = await getPost({_id})
            const mdxPost =  await convertMdxPost(post)
            return mdxPost
        },
        initialData: () => {
            return {
                source: "",
                mdxContent: "",
                tags: [],
                title: "",
                category: "",
            }
        },
    },{
        enabled: !!_id?.length,
    })
}

export const usePostUpdateMutation = () => {
    const router = useRouter()
    const {data: encPublicKey} = useEncPubicKey()
    const {data: token} = useToken()
    const [userInfo, setUserInfo] = useRecoilState(userInfoState)
    return useMutation({
        mutationFn: async (post: PostUpdate) => {
            const summary = `${post.title} ${(post?.tags?.join("") || "")} ${post?.category||""} ${userInfo.name}`
            const postInfo: PostUpdate = {
                _id: post._id,
                title: post.title,
                author: userInfo._id,
                authorName: userInfo.name,
                summary,
                text: post.text,
                tags: post.tags,
                category: post.category,
            }
            return await updatePost(postInfo, encPublicKey!!, token)
        },
        onSuccess: async () => {
            router.push("/post/list")
        }
    })
}

export const usePostMutation = () => {
    const router = useRouter()
    const {data: encPublicKey} = useEncPubicKey()
    const {data: token} = useToken()
    const [userInfo, setUserInfo] = useRecoilState(userInfoState)
    return useMutation({
        mutationFn: async (post: PostRawCreate) => {
            const summary = `${post.title} ${(post?.tags?.join("") || "")} ${post?.category||""} ${userInfo.name}`
            const postInfo: PostCreate = {
                title: post.title,
                author: userInfo._id,
                authorName: userInfo.name,
                summary,
                text: post.text,
                tags: post.tags,
                category: post.category,
            }
            return await createPost(postInfo, encPublicKey!!, token)
        },
        onSuccess: async () => {
            router.push("/post/list")
        }
    })
}

export const useDeletePostListMutation = () => {
    const {data: encPublicKey} = useEncPubicKey()
    const [token, setToken] = useRecoilState(tokenState)
    return useMutation({
        mutationFn: async (data: Array<PostDelete>) => {
            return await deletePostList(data, encPublicKey!!, token!!)
        }
    })
}

export const useRecentPostList = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.POST.LIST, RECENT_LIST_LIMIT],
        queryFn: async () => {
            let list =  await getPostList({ limit: RECENT_LIST_LIMIT, offset: 0 })
            return list
        },
        cacheTime: 1000 * 10,
        staleTime: 1000 * 1,
    })
}

export const usePostSearchInfinity = (word: string) => {
    return useInfiniteQuery({
        queryKey: [QUERY_KEYS.POST.SEARCH_LIST, DEFAULT_LIMIT, word],
        queryFn: async ({ pageParam = 0}) => {
            let list = await searchPosts({ limit: DEFAULT_LIMIT, offset: pageParam * DEFAULT_LIMIT, word })
            return list
        },
        getNextPageParam: (lastPage, allPage) => {
            // DEFAULT_LIMIT * lastPage
            if( allPage.length * DEFAULT_LIMIT < lastPage.total)
                return allPage.length + 1
        },
        getPreviousPageParam: (firstPage) => {
        },
        cacheTime: 1000 * 10,
        staleTime: 1000 * 1,
    })
}


export const usePostListInfinity = () => {
    return useInfiniteQuery({
        queryKey: [QUERY_KEYS.POST.LIST, DEFAULT_LIMIT],
        queryFn: async ({ pageParam = 0}) => {
            let list = await getPostList({ limit: DEFAULT_LIMIT, offset: pageParam * DEFAULT_LIMIT })
            console.log("useInfiniteQuery",list)
            return list
        },
        getNextPageParam: (lastPage, allPage) => {
            // DEFAULT_LIMIT * lastPage
            if( allPage.length * DEFAULT_LIMIT < lastPage.total)
                return allPage.length + 1
        },
        getPreviousPageParam: (firstPage) => {
        },
        cacheTime: 1000 * 10,
        staleTime: 1000 * 1,
    })
}

export const usePostList = (fetchDataOptions: PaginationState) => {
    return useQuery({
        queryKey: [QUERY_KEYS.POST.LIST, fetchDataOptions],
        queryFn: async () => {
            const items = await getPostList({ limit: fetchDataOptions.pageSize, 
                offset: fetchDataOptions.pageSize * fetchDataOptions.pageIndex })
            return items
        },
        cacheTime: 1000 * 10,
        staleTime: 1000 * 1,
    })
}

export const useCompiledMdxMutation = () => {
    return useMutation({
        mutationFn: async (source: string) => {
            const result = await getCompiledMdx(source)
            const mo = await run(result.code, runtime)
            return mo
        }
    })
}