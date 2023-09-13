import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';
import Login from './login';


const meta: Meta<typeof Login> = {
    title: "Pages/Login",
    parameters:{
        layout: 'fullscreen'
    },
    component: Login,
    args: {
    }
};

export default meta;

type Story = StoryObj<typeof Login>;

export const Normal: Story = {
    args: {
    },
    play: async ({args, canvasElement}) => {

    }
}

