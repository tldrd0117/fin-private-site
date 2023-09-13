'use client'

import React, { use, useEffect } from 'react'
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { useLoginMutation } from '@/data/query/user'
import { Header } from '@/components/atoms/Header/Header';
import { TextInput } from '@/components/molecules/Input/TextInput';
import { PasswordInput } from '@/components/molecules/Input/PasswordInput';
import { GrayButton } from '@/components/atoms/Button/GrayButton';
import { Span } from '@/components/atoms/Span/Span';

export interface LoginProps{
}

export default function Login (props: LoginProps) {
    const { mutate, error, isError, isIdle, isPaused } = useLoginMutation()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('이메일 형식이 아닙니다').required('아이디를 입력하세요'),
            password: Yup.string().min(8, "8자리 이상 입력하세요").max(30, "30자리 이상 입력하세요")
                .required('비밀번호를 입력하세요')
        }),
        onSubmit: values => {
            mutate(values)
            console.log("submit",values, error, isError, isPaused)
        }
    })
    return <>
        <form onSubmit={formik.handleSubmit}>
            <Header h5 className="italic">Login</Header>
            <Span className="text-gray-500 mt-8 block mb-1">이메일</Span>
            <TextInput {...formik.getFieldProps("email")}/>
            {
                formik.touched.email && formik.errors.email? (
                    <Span className="text-red-500">{formik.errors.email}</Span>
                ) : null
            }
            <Span className="text-gray-500 mt-2 block mb-1">비밀번호</Span>
            <PasswordInput {...formik.getFieldProps("password")}/>
            {
                formik.touched.password && formik.errors.password? (
                    <Span className="text-red-500">{formik.errors.password}</Span>
                ) : null
            }
            {
                isError? <Span className="text-red-500 mt-4 block">{error.message}</Span> : null
            }
            <GrayButton type='submit' className='w-full mt-8'>
                로그인
            </GrayButton>
        </form>
    </>
}