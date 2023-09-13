import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';
import Join from './page';


const meta: Meta<typeof Join> = {
    title: "Pages/Join",
    parameters:{
        layout: 'fullscreen'
    },
    component: Join,
    args: {
    }
};

export default meta;

type Story = StoryObj<typeof Join>;

export const Normal: Story = {
    args: {
    },
    play: async ({args, canvasElement}) => {

    }
}

