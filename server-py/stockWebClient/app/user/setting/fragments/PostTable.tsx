import React from 'react'

//
import {
  ColumnDef, PaginationState,
} from '@tanstack/react-table'
import { useRecoilValue } from 'recoil'
import { roleTypeSelectList, settingTypeSelectList } from '@/data/recoil/states/user'
import { useTypes } from '@/data/query/info/query'
import { EditableTable } from '@/components/molecules/Table/EditableTable'
import { useDeleteSettingsMutation } from '@/data/query/setting/query'
import { useQueryClient } from '@tanstack/react-query'
import QUERY_KEYS from '@/data/query/auth/query'
import { useDeletePostListMutation, usePostList } from '@/data/query/post/query'
import { GrayButton } from '@/components/atoms/Button/GrayButton'

export type Post = {
    _id: string
    author: any
    authorName: any
    summary: any
    text: string
    createAt: string
    updateAt: string
    order: number
}


const columnHeader = (text: string) => {
    return <p className='text-left ml-2 text-slate-400 font-normal'>{text}</p>
}

export function PostTable() {
    const [isEditable, setIsEditable] = React.useState(false);
    const {mutate: delMutate} = useDeletePostListMutation()
    const queryClient = useQueryClient()

    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })
    const {data: items, isSuccess} = usePostList(pagination)

    const onHandleDelete = (rowIndex: number) => {
        delMutate([{
            _id: items.list[rowIndex]._id
        }],{
            onSuccess: () => {
                queryClient.invalidateQueries([QUERY_KEYS.POST.LIST, pagination])
            }
        })
    }

    const onHandleChangeComplete = () => {
        setIsEditable(!isEditable)
    }

    const columns = React.useMemo<ColumnDef<Post>[]>(
        () => {
            let columnData = [
            {
                accessorKey: 'author',
                header: () => columnHeader('author'),
                size: 80,
                footer: (props: any) => props.column.id,
                meta: {
                    inputType: "textReadOnly",
                },
            },
            {
                accessorKey: 'authorName',
                size: 80,
                header: () => columnHeader('authorName'),
                inputType: "select",
                footer: (props: any) => props.column.id,
                meta: {
                    inputType: "textReadOnly",
                },
            },
            {
                accessorKey: 'summary',
                size: 100,
                header: () =>  columnHeader('summary'),
                footer: (props: any) => props.column.id,
                meta: {
                    inputType: "textReadOnly",
                },
            },
            {
                accessorKey: 'text',
                header: () => columnHeader('text'),
                footer: (props: any) => props.column.id,
                meta: {
                    inputType: "textReadOnly",
                },
                
            },
            {
                accessorKey: 'createAt',
                size: 100,
                header: () => columnHeader('createAt'),
                footer: (props: any) => props.column.id,
                meta: {
                    inputType: "calendarReadOnly"
                }
            },
            {
                accessorKey: 'updateAt',
                size: 100,
                header: () => columnHeader('updateAt'),
                footer: (props: any) => props.column.id,
                meta: {
                    inputType: "calendarReadOnly"
                }
            },
            {
                accessorKey: 'order',
                size: 100,
                header: () => columnHeader('order'),
                footer: (props: any) => props.column.id,
                meta: {
                    inputType: "textReadOnly",
                },
            }
            ]
            if(isEditable){
                columnData = columnData.concat({
                    accessorKey: 'delete',
                    size: 100,
                    header: () => columnHeader('delete'),
                    footer: (props: any) => props.column.id,
                    meta: {
                        inputType: "deleteButton",
                    }
                })
            }
            return columnData
        },
        [isEditable]
    )
    return <>
        <div className='flex justify-end'>
            <GrayButton className='ml-4' onClick={()=>onHandleChangeComplete()}>
            {isEditable?"수정 완료": "설정 수정"} 
            </GrayButton>
        </div>
        {
            isSuccess?<EditableTable<Post> 
                isEditable={isEditable} 
                items={items}
                columns={columns} 
                onDeleteRow={onHandleDelete}
                setPagination={setPagination}
            />: <p>loading</p>
        }
    </>

}
