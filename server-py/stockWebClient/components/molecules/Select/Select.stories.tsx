import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
    title: "Select/Base",
    render: (args) => <div className='p-4 borderBg'>
        <Select {...args}/>
    </div>,
    component: Select,
    args: {
        inputProps: {
            className: "w-40",
            readOnly: true
        },
        contextMenuProps: {
            className: "mt-2 cardBg",
            firstListItemProps: {
                className: "rounded-t-lg",
            },
            lastListItemProps: {
                className: "rounded-b-lg",
            },
            listProps: {
                className: "w-40",
            },
            listItemProps: {
                className: "w-40",
            },
            listItemsData: [
                {
                    id: "1",
                    value: "Item 1"
                },
                {
                    id: "2",
                    value: "Item 2"
                },
                {
                    id: "3",
                    value: "Item 3"
                },
            ]
        },
        
        
    }
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Normal: Story = {
    args: {
    },
    play: async ({args, canvasElement}) => {

    }
}

export const Selected: Story = {
    args: {
        selected:{
            id: "1",
            value: "Item 1"
        }
    },
    play: async ({args, canvasElement}) => {
    }
}
