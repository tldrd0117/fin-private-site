import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

import { DoneIcon } from './DoneIcon';


const meta: Meta<typeof DoneIcon> = {
    title: "Icon/Done",
    component: DoneIcon,
    args: {
        width: 24,
        height: 24,
        fill: 'blue'
    }
};

export default meta;

type Story = StoryObj<typeof DoneIcon>;

export const Normal: Story = {
    args: {
    },
    play: async ({args, canvasElement}) => {
        const canvas = within(canvasElement);
        expect(canvas.getByTestId('done-icon')).toBeInTheDocument();
    }
}

