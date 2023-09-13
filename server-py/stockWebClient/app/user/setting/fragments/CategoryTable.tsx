import React from 'react'

//
import {
  ColumnDef, PaginationState,
} from '@tanstack/react-table'
import { useRecoilValue } from 'recoil'
import { roleTypeSelectList, settingTypeSelectList } from '@/data/recoil/states/user'
import { useTypes } from '@/data/query/info/query'
import { EditableTable } from '@/components/molecules/Table/EditableTable'
import { useDeleteSettingsMutation, useSettingListPaging, useUpdateSettingListMutation } from '@/data/query/setting/query'
import { useQueryClient } from '@tanstack/react-query'
import QUERY_KEYS from '@/data/query/auth/query'
import { SettingModal } from './SettingModal'
import _ from 'lodash'
import { useCategoryDeleteMutation, useCategoryList, useCategoryUpdateMutation } from '@/data/query/category/query'
import { CategoryModal } from './CategoryModal'
import { GrayButton } from '@/components/atoms/Button/GrayButton'

export type Setting = {
    _id: string
    type: any
    role: any
    userId: any
    name: string
    value: string
    createAt: string
    updateAt: string
}

const columnHeader = (text: string) => {
    return <p className='text-left ml-2 text-slate-400 font-normal'>{text}</p>
}

export function CategoryTable() {
    const [showAdd, setShowAdd] = React.useState(false);
    const [isEditable, setIsEditable] = React.useState(false);
    const {mutate} = useCategoryDeleteMutation()
    const {mutate: putMutate} = useCategoryUpdateMutation()
    const queryClient = useQueryClient()
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })
    const {data: items, isSuccess} = useCategoryList(pagination)
    const onHandleDelete = (rowIndex: number) => {
        mutate({_id: items.list[rowIndex]._id}, {
            onSuccess: () => {
                queryClient.invalidateQueries([QUERY_KEYS.CATEGORY.LIST, pagination])
            }
        })
    }
    
    const [modifyItems, setModifyItems] = React.useState<string[]>([])

    const onHandleChange = (rowIndex: number, id: string, value: string) => {
        console.log("change",items['list'][rowIndex][id], value)
        items['list'][rowIndex][id] = value
        const data = items['list'][rowIndex]
        if(!modifyItems.includes(data._id)){
            setModifyItems([...modifyItems, data._id])
        }
    }

    const onHandleChangeComplete = () => {
        if(isEditable){
            const targets = modifyItems.map( (id: string) => {
                const item = _.cloneDeep(items.list.find((item: any) => item._id === id))
                delete item.__v
                delete item.createAt
                delete item.updateAt
                return item
            })
            targets.forEach((item: any) => {
                putMutate(item, {
                    onSuccess: () => {
                        setModifyItems([])
                        queryClient.invalidateQueries([QUERY_KEYS.SETTING.LIST, pagination])
                    }
                })
            })
        }
        setIsEditable(!isEditable)
    }
    

    const columns = React.useMemo<ColumnDef<Setting>[]>(
        () => {
            let columnData = [
            {
                accessorKey: 'name',
                header: () => columnHeader('name'),
                footer: (props: any) => props.column.id,
                
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
            <GrayButton onClick={()=>setShowAdd(true)}>
            설정 추가
            </GrayButton>
            <GrayButton className='ml-4' onClick={()=>onHandleChangeComplete()}>
            {isEditable?"수정 완료": "설정 수정"}
            </GrayButton>
        </div>
        <CategoryModal isShow={showAdd} onClose={()=>setShowAdd(false)}/>
        {
            isSuccess?<EditableTable<Setting> 
                isEditable={isEditable} 
                items={items}
                columns={columns} 
                onDeleteRow={onHandleDelete}
                onChangeRow={onHandleChange}
                setPagination={setPagination}
            />: <p>loading</p>
        }
    </>

}
