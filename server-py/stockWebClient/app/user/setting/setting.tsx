'use client'
import React from 'react'
import { SettingTable } from '@/app/user/setting/fragments/SettingTable'
import { DynamicLoginRequired } from '@/app/common/DynamicLoginRequired'
import { PostTable } from '@/app/user/setting/fragments/PostTable'
import { CategoryTable } from '@/app/user/setting/fragments/CategoryTable'
import { Breadcrumbs } from '@/components/organisms/Breadcrums/Breadcrumbs'
import { Header } from '@/components/atoms/Header/Header'


export interface SettingProps{
    id: string
}

export default function Setting (){
    const SETTING_PAGE_SIZE = 20;

    return (
        <>
            <Breadcrumbs items={[{
                href: "/",
                label: "Home"
            }, {
                href: "/setting",
                label: "Setting"
            }]}/>
            <DynamicLoginRequired>
                <Header className='mt-8' h5>카테고리</Header>
                <CategoryTable/>
                <Header className='mt-8' h5>포스트</Header>
                <PostTable/>
                <Header className='mt-8' h5>설정</Header>
                <SettingTable />
            </DynamicLoginRequired>
        </>
    )
}