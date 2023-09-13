import React from "react";
import '@djthoms/pretty-checkbox';
import { Switch, SwitchProps } from 'pretty-checkbox-react';
import '@djthoms/pretty-checkbox';

export interface ToggleProps extends SwitchProps{
}

export const Toggle = (props: ToggleProps) => {
    return (
        <>
            <Switch 
            {...props}     
            />
        </>
    );
};