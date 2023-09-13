import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';
import { FooterLayout } from './FooterLayout';


const meta: Meta<typeof FooterLayout> = {
    title: "Layout/Footer",
    component: FooterLayout,
    parameters:{
        layout: 'fullscreen'
    },
    
};

export default meta;

type Story = StoryObj<typeof FooterLayout>;

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
