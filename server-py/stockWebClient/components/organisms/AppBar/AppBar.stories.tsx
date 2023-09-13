import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

import { AppBar } from './AppBar';

const meta: Meta<typeof AppBar> = {
    title: "AppBar/AppBar",
    component: AppBar,
};

export default meta;

type Story = StoryObj<typeof AppBar>;

export const Normal: Story = {
    args: {
        title: "BLOG"
    },
    play: async ({args, canvasElement}) => {
    }
}

