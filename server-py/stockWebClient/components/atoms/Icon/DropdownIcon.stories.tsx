import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

import { DropdownIcon } from './DropdownIcon';


const meta: Meta<typeof DropdownIcon> = {
    title: "Icon/Dropdown",
    component: DropdownIcon,
    args: {
        width: 24,
        height: 24,
        fill: 'blue'
    }
};

export default meta;

type Story = StoryObj<typeof DropdownIcon>;

export const Normal: Story = {
    args: {
    },
    play: async ({args, canvasElement}) => {
        const canvas = within(canvasElement);
        expect(canvas.getByTestId('dropdown-icon')).toBeInTheDocument();
    }
}

