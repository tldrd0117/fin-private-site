import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';
import { PageLayout } from './PageLayout';
import { GrayButton } from '@/components/atoms/Button/GrayButton';


const meta: Meta<typeof PageLayout> = {
    title: "Layout/PageLayout",
    component: PageLayout,
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

type Story = StoryObj<typeof PageLayout>;

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
