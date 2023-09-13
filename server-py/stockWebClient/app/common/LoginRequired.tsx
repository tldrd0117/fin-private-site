'use client'
import dynamic from 'next/dynamic'
import { tokenState } from "@/data/recoil/states/user";
import { redirect, usePathname, useRouter } from "next/navigation";
import React, { use, useEffect } from "react";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { is } from 'date-fns/locale';
import { isLoginSelector } from '@/data/recoil/selectors/user';

export default function LoginRequired ({ children }: { children: React.ReactNode }) {
    // const {data: loginState, isLoading} = useLoginState()
    const pathname = usePathname()
    const isLogin = useRecoilValue(isLoginSelector)
    if(!isLogin){
        redirect(`/user/login?redirect=${pathname}`)
    }
    return <>
        {isLogin? children: null}
    </>
}