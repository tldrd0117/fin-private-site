import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

import { CancelIcon } from './CancelIcon';


const meta: Meta<typeof CancelIcon> = {
    title: "Icon/Cancel",
    component: CancelIcon,
    args: {
        width: 24,
        height: 24,
        fill: 'green'
    }
};

export default meta;

type Story = StoryObj<typeof CancelIcon>;

export const Normal: Story = {
    args: {
    },
    play: async ({args, canvasElement}) => {
        const canvas = within(canvasElement);
        expect(canvas.getByTestId('cancel-icon')).toBeInTheDocument();

    }
}

