'use client'

import { GrayButton } from '@/components/atoms/Button/GrayButton'
import { Header } from '@/components/atoms/Header/Header'
import { Paragraph } from '@/components/atoms/Paragraph/Paragraph'
import { Modal } from '@/components/organisms/Modal/Modal'
import { networkErrorHandleState } from '@/data/recoil/states/common'
import React, { Suspense, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

export const NetworkErrorHandle = ({ children }: { children: React.ReactNode, postId?: string }) => {
    const networkError = useRecoilValue(networkErrorHandleState)
    const [isShowModal, setIsShowModal] = useState(networkError?.isError)
    useEffect(() => {
        console.log("useEffet networkErrorHandleState")
        setIsShowModal(networkError?.isError)
    }, [networkError?.date])
    return <>
        { children }
            <Modal isShow={isShowModal} onClose={() => setIsShowModal(false)}>
            <div className="p-8 pt-4 overflow-auto w-[32ch] borderBg">
                <Header h6>에러</Header>
                <Paragraph className='whitespace-pre-wra mt-4'>{networkError.message}</Paragraph>
                <div className='flex justify-end'>
                    <GrayButton className='mt-8' onClick={() => setIsShowModal(false)}>
                    확인
                    </GrayButton>
                </div>
            </div>
            </Modal>: null
    </>
}