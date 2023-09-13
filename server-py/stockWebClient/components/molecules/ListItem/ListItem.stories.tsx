import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

import { ListItem } from './ListItem';

const meta: Meta<typeof ListItem> = {
    title: "ListItem/ListItem",
    component: ListItem,
    args: {
        className: "borderBg",
        children: "test"
    }
};

export default meta;

type Story = StoryObj<typeof ListItem>;

export const Normal: Story = {
    args: {
    },
    play: async ({args, canvasElement}) => {

    }
}
