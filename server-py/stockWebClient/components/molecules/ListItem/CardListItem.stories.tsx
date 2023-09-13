import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

import { CardListItem } from './CardListItem';
import profile from '@/public/images/profile.jpg';

const meta: Meta<typeof CardListItem> = {
    title: "ListItem/Card",
    component: CardListItem,
    args: {
        title: "title",
        subTitle: "subTitle",
        summary: "summary",
        image: {src:profile, alt:"profile"},
        
    }
};

export default meta;

type Story = StoryObj<typeof CardListItem>;

export const Normal: Story = {
    args: {
    },
    play: async ({args, canvasElement}) => {

    }
}
