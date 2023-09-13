import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';
import { FloatBottomLayout } from './FloatBottomLayout';
import { GrayButton } from '@/components/atoms/Button/GrayButton';


const meta: Meta<typeof FloatBottomLayout> = {
    title: "Layout/FloatBottomLayout",
    component: FloatBottomLayout,
    parameters:{
        layout: 'fullscreen'
    },
    render: (args) => <>
        <div className='w-9/12 h-5/6 absolute borderBg'>
            <FloatBottomLayout {...args}/>
        </div>
    </>,
    args: {
        leftComponent: <>
            <GrayButton>테스트</GrayButton>
            <GrayButton>테스트3</GrayButton>
        </>,
        rightComponent: <>
            <GrayButton>테스트5</GrayButton>
            <GrayButton>테스트6</GrayButton>
        </>,
    }
};

export default meta;

type Story = StoryObj<typeof FloatBottomLayout>;

export const Normal: Story = {
    args: {
    },
    play: async ({args, canvasElement}) => {

    }
}

export const Disabled: Story = {
    args: {
    },
    play: async ({args, canvasElement}) => {
    }
}
