import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

import { BaseImage } from './BaseImage';
import profile from '@/public/images/profile.jpg';

const meta: Meta<typeof BaseImage> = {
    title: "Image/Base",
    component: BaseImage,
    args: {
        alt: "profile",
    }
};

export default meta;

type Story = StoryObj<typeof BaseImage>;

export const StringSrc: Story = {
    args: {
        src: '/images/profile.jpg',
        fill: true
    },
    play: async ({args, canvasElement}) => {

    }
}

export const importSrc: Story = {
    args: {
        src: profile
    },
    play: async ({args, canvasElement}) => {
    }
}
