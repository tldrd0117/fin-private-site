import { GrayButton } from "@/components/atoms/Button/GrayButton";
import { Span } from "@/components/atoms/Span/Span";
import { TextInput } from "@/components/molecules/Input/TextInput";
import { Select } from "@/components/molecules/Select/Select";
import { Modal } from "@/components/organisms/Modal/Modal";
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

export const SettingModal = ({isShow, onClose}: SettingModalProps) => {
    const queryClient = useQueryClient()
    const {mutate} = useAddSettingMutation()
    const {data: typeData} = useTypes()

    const formik = useFormik({
        initialValues: {
            type: '',
            name: '',
            value: ''
        },
        validationSchema: Yup.object({
            type: Yup.string().required('설정 타입을 선택하세요'),
            name: Yup.string().max(64, "64자리 이하로 입력하세요").required('아이디를 입력하세요'),
            value: Yup.string().max(64, "64자리 이하로 입력하세요").required('비밀번호를 입력하세요')
        }),
        onSubmit: values => {
            mutate(values, {
                onSuccess: () => {
                    queryClient.invalidateQueries([QUERY_KEYS.SETTING.LIST])
                    onClose()
                }
            })
        }
    })
    return <Modal isShow={isShow} onClose={()=>onClose()}>
        <div className='bg-white ring-slate-200 ring-1 p-4 rounded-lg w-auto inline-block'>
            <form onSubmit={formik.handleSubmit}>
                <Span className="text-gray-500 block mb-1">설정 타입</Span>
                <Select
                    inputProps={{
                        ...formik.getFieldProps("type"),
                    }}
                    onItemSelect={(item) => {
                        formik.setFieldValue("type", item.value)
                    }}
                    contextMenuProps={{
                        className: "mt-2 cardBg",
                        firstListItemProps: {
                            className: "rounded-t-lg",
                        },
                        lastListItemProps: {
                            className: "rounded-b-lg",
                        },
                        listProps: {
                            className: "w-60",
                        },
                        listItemProps: {
                            className: "w-60",
                        },
                        listItemsData: typeData && typeData.settingTypes.length ? typeData.settingTypes.map((item: any)=> ({
                            id: item._id,
                            value: item.name
                        })) : []
                    }}
                />
                {
                    formik.touched.type && formik.errors.type? (
                        <Span className="text-red-500">{formik.errors.type}</Span>
                    ) : null
                }
                <Span className="text-gray-500 block mb-1 mt-4">설정 이름</Span>
                <TextInput {...formik.getFieldProps("name")} bgClassName='w-60' placeholder="설정 이름"/>
                {
                    formik.touched.name && formik.errors.name? (
                        <Span className="text-red-500">{formik.errors.name}</Span>
                    ) : null
                }
                <Span className="text-gray-500 block mb-1 mt-4">설정 값</Span>
                <TextInput {...formik.getFieldProps("value")} bgClassName='w-60' placeholder="설정 값"/>
                {
                    formik.touched.value && formik.errors.value? (
                        <Span className="text-red-500">{formik.errors.value}</Span>
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