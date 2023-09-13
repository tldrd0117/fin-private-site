import clsx from "clsx";
import React, { MouseEventHandler, ReactNode, use, useEffect, useState } from "react";
import { TextInput } from "../Input/TextInput";
import { TextInputProps } from "../Input/TextInput";
import { DropdownIcon } from "../../atoms/Icon/DropdownIcon";
import { format, formatRelative, subDays } from 'date-fns';
import { ActiveModifiers, DayPicker, DayPickerSingleProps, SelectSingleEventHandler } from 'react-day-picker';
import { ContextMenuProps, ListItemData } from "@/components/organisms/ContextMenu/ContextMenu";

export interface SelectCalendarProps extends DayPickerSingleProps{
    inputProps?: TextInputProps
    contextMenuProps?: ContextMenuProps
    onItemSelect?: (itemData: ListItemData, e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void
    selected?: Date
}

export const SelectCalendar = (props: SelectCalendarProps) => {
    const {onSelect, contextMenuProps, inputProps, onItemSelect} = props
    const [isSelect, setIsSelect] = useState(false)
    const [selected, setSelected] = useState<Date>(new Date())
    useEffect(()=>{
        const date = new Date()
        setSelected(props.selected || date)
    },[])
    const handleOnFocus = () => {
        setIsSelect(true)
        console.log("focus")
    }
    const handleOnBlur = () => {
        setIsSelect(false)
        console.log("blur")
    }
    const handleOnItemClick: SelectSingleEventHandler = (
        day: Date | undefined, 
        selectedDay: Date, 
        activeModifiers: ActiveModifiers, e: React.MouseEvent) => {
        setIsSelect(false)
        setSelected(day || selectedDay)
    }
    return <>
        <TextInput rightIcon={<DropdownIcon/>} readOnly placeholder="select" {...inputProps} 
            onFocus={handleOnFocus} onBlur={handleOnBlur}
            value={formatRelative(subDays(selected, 3), new Date())
            }/>
        {
            isSelect?<DayPicker
                mode="single"
                selected={selected}
                onSelect={handleOnItemClick}
            />: null
        }
        
    </>
};