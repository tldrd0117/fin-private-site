import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

import { CloseIcon } from './CloseIcon';


const meta: Meta<typeof CloseIcon> = {
    title: "Icon/Close",
    component: CloseIcon,
    args: {
        width: 24,
        height: 24,
        fillColor: 'purple'
    }
};

export default meta;

type Story = StoryObj<typeof CloseIcon>;

export const Normal: Story = {
    args: {
    },
    play: async ({args, canvasElement}) => {
        const canvas = within(canvasElement);
        expect(canvas.getByTestId('close-icon')).toBeInTheDocument();
    }
}
