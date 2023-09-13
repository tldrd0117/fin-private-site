import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

import { BaseIcon } from './BaseIcon';


const meta: Meta<typeof BaseIcon> = {
    title: "Icon/Base",
    component: BaseIcon,
    args: {
        children: <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24">
            <path fill="red" d="M382 816 154 588l57-57 171 171 367-367 57 57-424 424Z"></path>
        </svg>
    }
};

export default meta;

type Story = StoryObj<typeof BaseIcon>;

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
