import React from "react";
import '@djthoms/pretty-checkbox';
import { Checkbox as BaseCheckBox, CheckboxProps as BaseCheckBoxProps } from 'pretty-checkbox-react';
import {DoneIcon} from '../Icon/DoneIcon'

export interface CheckBoxProps extends BaseCheckBoxProps{
}

export const CheckBox = (props: CheckBoxProps) => {
    return (
        <>
            <BaseCheckBox {...props}
                icon={<DoneIcon className="icon" width={18} height={18}/>}
                hasFocus={true}
            />
        </>
    );
};