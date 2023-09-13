import React from 'react'
import Login from './login'
import { Hydrate, dehydrate } from '@tanstack/react-query'
import getQueryClient from '@/app/getQueryClient'
import { prefetchPublicKey } from '@/data/query/auth/prefetch'

export interface LoginProps{
}

export default async function LoginPage (props: LoginProps) {
    await prefetchPublicKey()
    const state = dehydrate(getQueryClient())
    return <>
        <Hydrate state={state}>
            <Login/>
        </Hydrate>
    </>
}