'use client'
import React, {Fragment, useState} from "react";
import CodeMirror, {useCodeMirror} from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import { useCompiledMdxMutation, usePost, usePostMutation, usePostUpdateMutation } from "@/data/query/post/query";
import { DynamicLoginRequired } from "@/app/common/DynamicLoginRequired";
import { useCategoryAll, useCategoryList } from "@/data/query/category/query";
import QUERY_KEYS from "@/data/query/auth/query";
import { POST_LIST } from "@/data/query/common/constants";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { ListItemData } from "@/components/organisms/ContextMenu/ContextMenu";
import { Breadcrumbs } from "@/components/organisms/Breadcrums/Breadcrumbs";
import { TextInput } from "@/components/molecules/Input/TextInput";
import { Select } from "@/components/molecules/Select/Select";
import { INPUT_STYLE_TYPE } from "@/components/molecules/Input/StylableInput";
import { TagInput } from "@/components/molecules/Input/TagInput";
import { FloatBottomLayout } from "@/components/molecules/Layout/FloatBottomLayout";
import { GrayButton } from "@/components/atoms/Button/GrayButton";
import { Modal } from "@/components/organisms/Modal/Modal";
import { Header } from "@/components/atoms/Header/Header";
import { Paragraph } from "@/components/atoms/Paragraph/Paragraph";

export interface WriteProps{
    id: string
}

export default function Write ({id}: WriteProps){
    let {data}: any = usePost(id)
    let {
        source,
        mdxContent,
        tags,
        title,
        category,
    }: any = data
    const isEdit = id?.length
    const {mutate} = usePostMutation()
    const {mutate: mutateUpdate} = usePostUpdateMutation()
    const {mutate: mutateCompiledMdx, isLoading: isCompiledMdxLoading} = useCompiledMdxMutation()
    const {data: categories} = useCategoryAll()
    const router = useRouter()

    const [code, setCode] = useState(source || "")
    const [tagValue, setTagValue] = useState(tags?.map((item: any)=>item.name) || [])
    const [titleValue, setTitleValue] = useState(title || "")
    const [selectedCategory, setSelectedCategory]: any = useState(category?{id: category?._id, value: category?.name} : {})
    const [isPreview, setIsPreview] = useState(false)
    const [mdxModule, setMdxModule]:any = useState()
    const MdxContent = mdxModule ? mdxModule.default : Fragment

    const queryClient = useQueryClient()

    const handleCodeMirrorChange = (value: string) => {
        setCode(value)
    }

    const handleCategoryChange = (itemData: ListItemData, e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        setSelectedCategory(itemData)
    }

    const handleOnTitleChange = (e: any) => {
        setTitleValue(e.target.value)
    }

    const handleOnTagsChange = (values: Array<string>) => {
        console.log(values  )
        setTagValue(values)
    }

    const handleOnClickPreview = async () => {
        setIsPreview(true)
        mutateCompiledMdx(code, {
            onError: (error) => {
                console.log(error)
            },
            onSuccess: (mo: any) => {
                setMdxModule(mo)
            }
        })
    }

    const handleOnClickComplete = async () => {
        if(isEdit){
            mutateUpdate({
                _id: data._id,
                text: code,
                title: titleValue,
                tags: tagValue,
                category: selectedCategory.id,
            }, {
                onSuccess: async () => {
                    setTimeout(() => {
                        queryClient.invalidateQueries({
                            queryKey: [QUERY_KEYS.POST.LIST],
                        })
                        router.push('/post/list')
                    }, 500)
                }
            })
        } else {
            mutate({
                text: code,
                title: titleValue,
                tags: tagValue,
                category: selectedCategory.id,
            }, {
                onSuccess: async () => {
                    setTimeout(() => {
                        queryClient.invalidateQueries({
                            queryKey: [QUERY_KEYS.POST.LIST],
                        })
                        router.push('/post/list')
                    }, 500)
                }
            })
        }
        
    }

    return <>
        <Breadcrumbs items={[{
            href: "/",
            label: "Home"
        }, {
            href: "/post/list",
            label: "PostList"
        }, {
            href: "/post/write",
            label: isEdit? title : "PostWrite"
        }]}/>
        <DynamicLoginRequired>
            <TextInput inputStyleType={INPUT_STYLE_TYPE.UNDERLINE}
                inputClassName = {"px-7 py-8 text-3xl font-bold "}
                className="mt-8"
                placeholder="제목" 
                onChange={handleOnTitleChange}
                value={ titleValue }/>
            <Select inputProps={{
                bgClassName: "mt-4 w-40",
                placeholder: "카테고리",
                inputStyleType: INPUT_STYLE_TYPE.UNDERLINE,
            }} contextMenuProps={{
                className: "mt-2 cardBg",
                firstListItemProps: {
                    className: "rounded-t-lg",
                },
                lastListItemProps: {
                    className: "rounded-b-lg",
                },
                listProps: {
                    className: "w-40",
                },
                listItemProps: {
                    className: "w-40",
                },
                listItemsData: categories?.list?.map((item:any)=>({id: item._id, value: item.name})),
            }}
            onItemSelect={handleCategoryChange}
            selected={isEdit?selectedCategory: undefined}
            />
            <TagInput inputStyleType={INPUT_STYLE_TYPE.UNDERLINE} className="mt-4"
                onTagChange={handleOnTagsChange}
                tagValue={tagValue}/>
            <CodeMirror
                className="mt-4"
                value={code}
                onChange={handleCodeMirrorChange}
                minHeight="400px"
                maxHeight='5000px'
                extensions={[langs.markdown()]}
                />
            <FloatBottomLayout
                leftComponent={
                    <>
                    </>
                }
                rightComponent={
                    <div className="flex gap-2 pr-8">
                        <GrayButton onClick={() => handleOnClickPreview()} >
                            미리보기
                        </GrayButton>
                        <GrayButton onClick={() => handleOnClickComplete()} >
                            작성완료
                        </GrayButton>
                    </div>
                }
                />
        </DynamicLoginRequired>
        <Modal isShow={isPreview} onClose={() => setIsPreview(false)}>
            
            <div className="borderBg p-16 prose max-h-screen overflow-auto min-w-[36ch] sm:min-w-[62ch]">
                {
                    isCompiledMdxLoading? <>
                        <Header h3><Skeleton/></Header>
                        <Paragraph><Skeleton/></Paragraph>
                        <TagInput inputStyleType={INPUT_STYLE_TYPE.NONE} className="mt-4 bg-transparent" tagValue={tagValue} readOnly/>
                        <Skeleton count={5}/>
                    </>: <>
                        <Header h3>{titleValue}</Header>
                        <Paragraph>{selectedCategory.value}</Paragraph>
                        <TagInput inputStyleType={INPUT_STYLE_TYPE.NONE} className="mt-4 bg-transparent" tagValue={tagValue} readOnly/>
                        <MdxContent/>
                    </>
                }
            </div>
        </Modal>
    </>
}



