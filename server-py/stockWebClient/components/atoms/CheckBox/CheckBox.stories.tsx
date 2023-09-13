import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

import { CheckBox } from './CheckBox';

const meta: Meta<typeof CheckBox> = {
    title: "CheckBox/CheckBox",
    component: CheckBox,
    render: (args) => <div className='borderBg'>
            <CheckBox {...args}/>
        </div>,
    args: {
        children: "CheckBox"
    }
};

export default meta;

type Story = StoryObj<typeof CheckBox>;

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
