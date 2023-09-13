'use client'
import React, { ReactNode, useContext } from 'react'
import { useDeletePostListMutation, usePost } from '@/data/query/post/query'
import { useRecoilValue } from 'recoil'
import { userInfoState } from '@/data/recoil/states/user'
import { ConfirmDeleteModal } from '../common/fragments/ConfirmDeleteModal'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import QUERY_KEYS from '@/data/query/auth/query'
import { POST_LIST } from '@/data/query/common/constants'
import { set } from 'date-fns'
import { Breadcrumbs } from '@/components/organisms/Breadcrums/Breadcrumbs'
import { GrayButton } from '@/components/atoms/Button/GrayButton'
import { Header } from '@/components/atoms/Header/Header'
import { TagInput } from '@/components/molecules/Input/TagInput'
import { INPUT_STYLE_TYPE } from '@/components/molecules/Input/StylableInput'
import { Paragraph } from '@/components/atoms/Paragraph/Paragraph'


export interface PostProps{
    id: string
}

export default function Post ({id}: PostProps){
    const {data} = usePost(id)
    const queryClient = useQueryClient()
    const userInfo = useRecoilValue(userInfoState)
    const router = useRouter()
    let {
        source,
        mdxContent,
        tags,
        title,
        category,
    }: any = data

    console.log(data)

    const [isShowDeleteModal, setIsShowDeleteModal] = React.useState(false)

    const { mutate } =  useDeletePostListMutation()

    const handleOnClickEdit = () => {
        router.push(`/post/write/${id}`)
    }

    const handleOnClickDelete = () => {
        setIsShowDeleteModal(true)
    }

    const handleDeleteConfirm = () => {
        mutate([{_id: data._id}], {
            onSuccess: async () => {
                setIsShowDeleteModal(false)
                setTimeout(() => {
                    queryClient.invalidateQueries({
                        queryKey: [QUERY_KEYS.POST.LIST],
                    })
                    router.push('/post/list')
                }, 500)
                
            }
        })
    }

    return (
        <>
            <Breadcrumbs items={[{
                href: "/",
                label: "Home"
            }, {
                href: "/post/list",
                label: "PostList"
            }, {
                href: "/post/list",
                label: "title"
            }]}/>
            {
                userInfo?._id === data?.author?._id ? <>
                    <div className='flex justify-end'>
                        <GrayButton className='mt-4' onClick={handleOnClickEdit}>
                            수정
                        </GrayButton>
                        <GrayButton className='mt-4 ml-4' onClick={handleOnClickDelete}>
                            삭제
                        </GrayButton>
                    </div>
                </>: null
            }
            {
                isShowDeleteModal? <ConfirmDeleteModal isShow={isShowDeleteModal} 
                    onClose={() => setIsShowDeleteModal(false)} 
                    onConfirm={handleDeleteConfirm}/>: null
            }
            
            <div className ={"prose mt-16 mx-auto"}>
                <Header h3>{title}</Header>
                <Paragraph>{category?.name}</Paragraph>
                <TagInput inputStyleType={INPUT_STYLE_TYPE.NONE} className="mt-4 bg-transparent" tagValue={tags?.map((item:any) => item.name)} readOnly/>
                {
                    mdxContent
                }
            </div>
        </>
    )
}