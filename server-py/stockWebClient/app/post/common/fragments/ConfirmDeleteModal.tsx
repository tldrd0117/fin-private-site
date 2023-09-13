
import React, { useState } from "react";
import { Modal } from "@/components/organisms/Modal/Modal";
import { Span } from "@/components/atoms/Span/Span";
import { GrayButton } from "@/components/atoms/Button/GrayButton";

export interface ConfirmDeleteModalProps {
    isShow: boolean
    onClose: () => void
    onConfirm: () => void
}

export const ConfirmDeleteModal = ({ isShow, onClose, onConfirm}: ConfirmDeleteModalProps) => {
    return <Modal isShow={isShow} onClose={()=>onClose()}>
        <div className='bg-white ring-slate-200 ring-1 p-4 rounded-lg w-auto inline-block'>
                <Span className="text-gray-500 block mb-1 mt-4">해당 포스트를 삭제하시겠습니까?</Span>
                <div className='flex justify-end'>
                    <GrayButton onClick={() => onClose()} className='mt-4' >
                        취소
                    </GrayButton>
                    <GrayButton onClick={() => onConfirm()} type='submit' className='mt-4 ml-4'>
                        삭제
                    </GrayButton>
                </div>
        </div>
    </Modal>
}