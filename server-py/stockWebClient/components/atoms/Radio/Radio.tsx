import React from "react";
import '@djthoms/pretty-checkbox';
import { Radio as BaseRadio, RadioProps as BaseRadioProps } from 'pretty-checkbox-react';
import '@djthoms/pretty-checkbox';
export interface RadioProps extends BaseRadioProps{
}

export const Radio = (props: RadioProps) => {
    return (
        <>
            <BaseRadio {...props} 
            
            />
        </>
    );
};