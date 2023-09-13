'use client'
import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useJoinMutation } from '@/data/query/user'
import { Header } from '@/components/atoms/Header/Header';
import { Span } from '@/components/atoms/Span/Span';
import { TextInput } from '@/components/molecules/Input/TextInput';
import { PasswordInput } from '@/components/molecules/Input/PasswordInput';
import { GrayButton } from '@/components/atoms/Button/GrayButton';

export interface JoinProps{
}

export default function Join (props: JoinProps) {
    const { mutate, error, isError } = useJoinMutation()
    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            password: '',
            passwordConfirm: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('이메일 형식이 아닙니다').required('아이디를 입력하세요'),
            name: Yup.string().min(2, "2자리 이상 입력하세요").max(30, "30자리 이하로 입력하세요").required('닉네임을 입력하세요'),
            password: Yup.string().min(8, "8자리 이상 입력하세요").max(30, "30자리 이하로 입력하세요")
                .required('비밀번호를 입력하세요'),
            passwordConfirm: Yup.string().oneOf([Yup.ref('password'), undefined], '비밀번호가 일치하지 않습니다')
        }),
        onSubmit: values => {
            mutate(values)
            console.log("submit",values)
        }
    })
    return <>
        <form onSubmit={formik.handleSubmit}>
            <Header className="italic">Join</Header>
            <Span className="text-gray-500 mt-8 block mb-1">이메일</Span>
            <TextInput {...formik.getFieldProps("email")}/>
            {
                formik.touched.email && formik.errors.email? (
                    <Span className="text-red-500">{formik.errors.email}</Span>
                ) : null
            }
            <Span className="text-gray-500 mt-2 block mb-1">닉네임</Span>
            <TextInput {...formik.getFieldProps("name")}/>
            {
                formik.touched.name && formik.errors.name? (
                    <Span className="text-red-500">{formik.errors.name}</Span>
                ) : null
            }
            <Span className="text-gray-500 mt-2 block mb-1">비밀번호</Span>
            <PasswordInput {...formik.getFieldProps("password")}/>
            {
                formik.touched.password && formik.errors.password? (
                    <Span className="text-red-500">{formik.errors.password}</Span>
                ) : null
            }
            <Span className="text-gray-500 mt-2 block mb-1">비밀번호 확인</Span>
            <PasswordInput {...formik.getFieldProps("passwordConfirm")}/>
            {
                formik.touched.passwordConfirm && formik.errors.passwordConfirm? (
                    <Span className="text-red-500">{formik.errors.passwordConfirm}</Span>
                ) : null
            }
            {
                isError? <Span className="text-red-500 mt-4 block">{error.message}</Span> : null
            }
            <GrayButton type='submit' className='w-full mt-8' >가입</GrayButton>
        </form>
    </>
}