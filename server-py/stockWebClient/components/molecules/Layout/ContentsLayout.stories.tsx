import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';
import { ContentsLayout } from './ContentsLayout';
import { GrayButton } from '@/components/atoms/Button/GrayButton';


const meta: Meta<typeof ContentsLayout> = {
    title: "Layout/ContentsLayout",
    component: ContentsLayout,
    parameters:{
        layout: 'fullscreen'
    },
    args: {
        children: <>
            <GrayButton>1</GrayButton>
            <GrayButton>2</GrayButton>
            <GrayButton>3</GrayButton>
        </>
    }
};

export default meta;

type Story = StoryObj<typeof ContentsLayout>;

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
