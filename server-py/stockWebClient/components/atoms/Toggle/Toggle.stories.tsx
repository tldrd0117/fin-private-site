import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
    title: "Toggle/Toggle",
    component: Toggle,
    render: (args) => <div className='borderBg'>
        <Toggle {...args}/>
    </div>,
    args: {
        children: "Toggle"
    }
};

export default meta;

type Story = StoryObj<typeof Toggle>;

export const Normal: Story = {
    args: {
    },
    play: async ({args, canvasElement}) => {

    }
}

export const Disabled: Story = {
    args: {
        disabled: true
    },
    play: async ({args, canvasElement}) => {
    }
}
