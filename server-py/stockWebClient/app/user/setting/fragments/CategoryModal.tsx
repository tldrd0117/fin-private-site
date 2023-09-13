import { GrayButton } from "@/components/atoms/Button/GrayButton";
import { Span } from "@/components/atoms/Span/Span";
import { TextInput } from "@/components/molecules/Input/TextInput";
import { Modal } from "@/components/organisms/Modal/Modal";
import { useCategoryCreateMutation } from "@/data/query/category/query";
import { QUERY_KEYS } from "@/data/query/common/constants";
import { useTypes } from "@/data/query/info/query";
import { useAddSettingMutation } from "@/data/query/setting/query";
import { useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import React from "react";
import * as Yup from 'yup';

export interface SettingModalProps {
    isShow: boolean
    onClose: () => void
}

export const CategoryModal = ({isShow, onClose}: SettingModalProps) => {
    const queryClient = useQueryClient()
    const {mutate} = useCategoryCreateMutation()
    const {data: typeData} = useTypes()

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().max(64, "64자리 이하로 입력하세요").required('아이디를 입력하세요'),
        }),
        onSubmit: values => {
            mutate(values, {
                onSuccess: () => {
                    queryClient.invalidateQueries([QUERY_KEYS.CATEGORY.LIST])
                    onClose()
                }
            })
        }
    })
    return <Modal isShow={isShow} onClose={()=>onClose()}>
        <div className='bg-white ring-slate-200 ring-1 p-4 rounded-lg w-auto inline-block'>
            <form onSubmit={formik.handleSubmit}>
                <Span className="text-gray-500 block mb-1 mt-4">이름</Span>
                <TextInput {...formik.getFieldProps("name")} bgClassName='w-60' placeholder="설정 이름"/>
                {
                    formik.touched.name && formik.errors.name? (
                        <Span className="text-red-500">{formik.errors.name}</Span>
                    ) : null
                }
                
                <div className='flex justify-end'>
                    <GrayButton onClick={() => onClose()} className='mt-4' >
                    취소
                    </GrayButton>
                    <GrayButton type='submit' className='mt-4 ml-4' >
                    추가
                    </GrayButton>
                </div>
            </form>
        </div>
    </Modal>
}