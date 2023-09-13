import React, { useEffect, useState } from 'react'

//
import {
  Column,
  Table,
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  RowData,
  ColumnSizing,
  PaginationState,
  OnChangeFn,
} from '@tanstack/react-table'
import { format } from 'date-fns'
import _ from 'lodash'
import { IconButton } from '../IconButton/IconButton'
import { ArrowIcon } from '../../atoms/Icon/ArrowIcon'
import { type } from 'os'
import { Select } from '../Select/Select'
import { INPUT_STYLE_TYPE } from '../Input/StylableInput'
import { GrayButton } from '@/components/atoms/Button/GrayButton'
import { TextInput } from '../Input/TextInput'
import { Paragraph } from '@/components/atoms/Paragraph/Paragraph'

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void
    isEditable?: boolean
    onDeleteRow?: (rowIndex: number) => void
    onChangeRow?: (rowIndex: number, value: string, rowData: any) => void
  }
}

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    inputType?: string
    selectList?: any
  }
}

// Give our default column cell renderer editing superpowers!
export const defaultColumn: Partial<ColumnDef<any>> = {
  cell: function Cell(cellProps){
    const { getValue, row: { index, original }, column: { id, getSize, columnDef}, table } = cellProps
    const initialValue = getValue()
    const inputType = columnDef?.meta?.inputType;
    const selectList = columnDef?.meta?.selectList;
    const [value, setValue]: any = useState(initialValue)
    const onBlur = () => {
      table.options.meta?.updateData(index, id, value)
    }
    const onDeleteRow = () => {
        if(table.options.meta?.onDeleteRow)
            table.options.meta?.onDeleteRow(index)
    }

    const onChangeRow = (value: any) => {
        const newData = {...original}
        if(typeof value === "string")
            newData[id] = value
        else{
            newData[id] = {
                _id: value.id,
                name: value.value
            }
        }
        if(table.options.meta?.onChangeRow){
            table.options.meta?.onChangeRow(index, id, newData[id])
            table.options.meta?.updateData(index, id, newData[id])
        }
        setValue(value)
    }

    // If the initialValue is changed external, sync it up with our state
    useEffect(() => {
      setValue(initialValue)
    }, [initialValue])

    let formatId = ""
    let formatValue = ""
    if(value !== undefined && value !== null){
        if(typeof value === "object"){
            console.log(value)
            formatId = value._id ? value._id : value.name ? value.name : value.toString()
            formatValue = value.name ? value.name : value.toString()
        } else {
            formatId = value.toString()
            formatValue = value.toString()
        }
    }

    if(!table.options.meta?.isEditable){
        if(inputType === "calendarReadOnly"){
            return <div className='flex'>
                <p className='ml-2 h-full'>{format(new Date(formatValue), "yyyy-MM-dd")}</p>
            </div> 
        } else {
            return <div className='flex'>
                <p className='ml-2 h-full'>{formatValue}</p>
            </div>
        }

    } else {
        if(inputType === "textReadOnly"){
            return <p className='ml-2'>{formatValue}</p>
        }
        else if(inputType === "select"){
            let selectedValue = {id: formatId, value: formatValue}
            return <Select 
                inputProps={{
                bgClassName: "w-20 ring-slate-200",
                placeholder: "카테고리",
                inputStyleType: INPUT_STYLE_TYPE.OUTLINE,
                inputClassName: "w-20 pl-2",
            }} contextMenuProps={{
                className: "mt-2 cardBg",
                firstListItemProps: {
                    className: "rounded-t-lg",
                },
                lastListItemProps: {
                    className: "rounded-b-lg",
                },
                listProps: {
                    className: "w-20",
                },
                listItemProps: {
                    className: "w-20",
                },
                listItemsData: selectList
            }}
            onItemSelect={(item) => (onChangeRow(item))}
            selected={selectedValue}
            />
        }
        else if(inputType === "calendarReadOnly"){
            return <p className='ml-2'>{format(new Date(formatValue), "yyyy-MM-dd")}</p>
        }
        else if(inputType === "deleteButton"){
            return <GrayButton onClick={() => onDeleteRow()} >삭제</GrayButton>
        }
        else {
            return (
                <TextInput inputBgStyleType={INPUT_STYLE_TYPE.OUTLINE} value={formatValue}
                    onChange={e => onChangeRow(e.target.value)}
                    onBlur={onBlur}
                    />
              )
        }
    }
  },
}

export interface TableProps<Type>{
    items: any
    columns: ColumnDef<Type>[]
    isEditable?: boolean
    onDeleteRow?: (rowIndex: number) => void
    setPagination: OnChangeFn<PaginationState>
    onChangeRow?: (rowIndex: number, id: string ,value: string) => void
}

// const columnHeader = (text: string) => {
//     return <p className='text-left ml-2 text-slate-400 font-normal'>{text}</p>
// }

export function EditableTable<Type>({ items, columns, isEditable, onDeleteRow, 
    setPagination, onChangeRow}: TableProps<Type>) {

  const rerender = React.useReducer(() => ({}), {})[1]
  const displayData = (items: Array<Type>) => {
    return items//_.cloneDeep(items)
  }

  const [data, setData] = React.useState(() => items.list)
  const refreshData = () => setData(() => items.list)
  console.log(data)
  useEffect(() => {
    refreshData()
    console.log("refresh")
  }, [...items.list.map((item: any)=>item._id), items.pageIndex, items.pageSize])

  const table = useReactTable<Type>({
    data,
    columns,
    defaultColumn,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    pageCount: items.pageCount,
    state: {
        pagination: { pageIndex: items.pageIndex, pageSize: items.pageSize },
    },
    manualPagination: true,
    meta: {
        isEditable: isEditable,
        updateData: (rowIndex, columnId, value) => {
            // Skip page index reset until after next rerender
            setData((old: any) =>
            old.map((row: any, index: number) => {
                if (index === rowIndex) {
                return {
                    ...old[rowIndex]!,
                    [columnId]: value,
                }
                }
                return row
            })
            )
        },
        onDeleteRow: onDeleteRow,
        onChangeRow: onChangeRow
    },
    debugTable: true,
  })

  return (
    <div className="p-2 block max-w-full overflow-x-auto overflow-y-hidden">
        <div className="h-2" />
        <div className='flex justify-between mb-4'>
            <div className='flex items-center'>
                <Paragraph>{table.getRowModel().rows.length} 개</Paragraph>
                <div className='w-40 ml-8'>
                <Select 
                    inputProps={{
                        bgClassName: "w-40 ring-slate-200",
                        placeholder: "카테고리",
                        inputStyleType: INPUT_STYLE_TYPE.OUTLINE,
                        inputClassName: "w-40 pl-2",
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
                        listItemsData: [10, 20, 30, 40, 50].map(item => ({id: item.toString(), value: "페이지 당 "+item.toString() + "행"}))
                    }}
                    onItemSelect={(item) => {
                        table.setPageSize(Number(item.id))
                    }}
                    selected={{id: items.pageSize?.toString(), 
                        value: "페이지 당 "+items.pageSize?.toString() + "행"}}
                    />
                </div>
            </div>
            <div className="flex items-center gap-2">
        <IconButton icon={<ArrowIcon doubleLeft/>} 
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        />
        <IconButton icon={<ArrowIcon left/>}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
        />
        <IconButton icon={<ArrowIcon right/>}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
        />
        <IconButton icon={<ArrowIcon doubleRight/>}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
        />
        <span className="flex items-center gap-1">
          <div>페이지</div>
          <strong>
            {table.getState().pagination.pageIndex + 1}/
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | 페이지 이동:
          <input
            type="number"
            value={table.getState().pagination.pageIndex + 1}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="border p-1 rounded w-16"
          />
        </span>
      </div>
        </div>
        
        
        
      <table className='w-full border-x-0'>
        <thead className='bg-slate-100'>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className='border-x-0'>
              {headerGroup.headers.map(header => {
                return (
                  <th key={header.id} 
                    colSpan={header.colSpan}
                    className='border-x-0 h-12'
                    style={{ position: 'relative', width: header.getSize() }}
                    >
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => {
                  return (
                    <td key={cell.id} style={{ width: cell.column.getSize() }} className='h-12'>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="h-2" />
      
      <div className='hidden'>
        <button onClick={() => rerender()}>Force Rerender</button>
      </div>
      <div className=''>
        <button onClick={() => refreshData()}>Refresh Data</button>
      </div>
    </div>
  )
}
