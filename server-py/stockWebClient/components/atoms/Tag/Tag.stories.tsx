import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';
import { Tag } from './Tag';

const meta: Meta<typeof Tag> = {
    title: "Tag/Base",
    render: (args) => <div className='p-4 borderBg'>
        <Tag {...args}/>
    </div>,
    component: Tag,
    args: {
        children: "Tag"
    }
};

export default meta;

type Story = StoryObj<typeof Tag>;

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
