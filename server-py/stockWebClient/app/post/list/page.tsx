import React from "react";
import { PostList } from "./list";
import { prefetchPublicKey } from "@/data/query/auth/prefetch";
import getQueryClient from "@/app/getQueryClient";
import { Hydrate, dehydrate } from "@tanstack/react-query";
import { prefetchPostListInfinity } from "@/data/query/post/prefetch";
import { AppBarContentsTemplate } from "@/components/templates/AppBarContentsTemplate";
import { VisitRecord } from "@/app/common/VisitRecord";

export interface PostListProps{
}

export default async function PostListPage (props: PostListProps) {
    await prefetchPublicKey()
    await prefetchPostListInfinity()
    const state = dehydrate(getQueryClient())
    return <>
        <Hydrate state={state}>
            <AppBarContentsTemplate>
                <VisitRecord>
                    <PostList/>
                </VisitRecord>
            </AppBarContentsTemplate>
        </Hydrate>
    </>
}