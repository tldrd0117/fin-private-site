'use client'
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { tokenState, userInfoState } from "@/data/recoil/states/user";
import { isLoginSelector } from "@/data/recoil/selectors/user";
import { useSettingListPaging, useSettingMap } from "@/data/query/setting/query";
import { QUERY_KEYS } from "@/data/query/common/constants";
import { Header } from "@/components/atoms/Header/Header";
import { GrayButton } from "@/components/atoms/Button/GrayButton";

export interface AppBarProps{
    title: string
}

export const AppBar = (props: AppBarProps) => {
    const {title} = props
    // const {data: loginState} = useLoginState()
    const router = useRouter()
    const pathname = usePathname()
    const queryClient = useQueryClient()
    const resetToken = useResetRecoilState(tokenState)
    const resetUserInfo = useResetRecoilState(userInfoState)
    const isLogin = useRecoilValue(isLoginSelector)
    const {data: settingMap} = useSettingMap()
    const [isShowLoggedButtons, setIsShowLoggedButtons] = useState("loading")
    const handleLogout = () => {
        resetToken()
        resetUserInfo()
        setTimeout(() => {
            console.log("appbar replace")
            queryClient.clear()
            router.replace("/")
        }, 0);
    }

    const handleClickTitle = () => {
        router.push("/")
    }

    useEffect(() => {
        setIsShowLoggedButtons("finished")
    }, [isLogin])

    return <>
        <div className={clsx(["borderBg","p-4", "flex", "justify-between"])}>
            <div className="place-self-center cursor-pointer" onClick={handleClickTitle}>
                <Header h5 className="italic font-bold">{title}</Header>
            </div>
            <div className="place-self-center">
                {
                    isShowLoggedButtons === "loading"? null: <>
                     {isLogin ? <>
                        <GrayButton onClick={() => handleLogout()} className={"ml-2"} >로그아웃</GrayButton>
                        <GrayButton onClick={() => router.push(`/user/setting`)} className={"ml-2"} >설정</GrayButton>
                   
                    </>: <>
                        <GrayButton onClick={() => router.push(`/user/login?redirect=${pathname}`)} className={"ml-2"} >로그인</GrayButton>
                        {
                            settingMap && !!(settingMap["useJoin"]) ?
                            <GrayButton onClick={() => router.push(`/user/join?redirect=${pathname}`)} className={"ml-2"} >회원가입</GrayButton>
                            : null
                        }
                    </>}
                    {/* <PrimaryButton isShow={isLogin} className={"ml-2"} label="정보수정"/> */}
                    </>
                }
            </div>
        </div>
    </>
}