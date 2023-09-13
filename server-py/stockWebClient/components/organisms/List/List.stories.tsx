import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

import { List } from './List';
import profile from '@/public/images/profile.jpg';
import { ListItem } from '@/components/molecules/ListItem/ListItem';
import { CardListItem } from '@/components/molecules/ListItem/CardListItem';

const meta: Meta<typeof List> = {
    title: "List/List",
    component: List,
    args: {
    }
};

export default meta;

type Story = StoryObj<typeof List>;

export const Normal: Story = {
    render: (args) => {
        return <List {...args} className='borderBg'>
        {
            [1,2,3].map((item) => <ListItem key={item.toString()}>{item}</ListItem>)
        }
        </List>
    },
    play: async ({args, canvasElement}) => {
        const canvas = within(canvasElement);
        const list = canvas.getByRole('list')
        expect(list.tagName).toBe('UL');
        expect(list).toBeInTheDocument();
        
    }
}

export const Card: Story = {
    render: (args) => {
        return <List {...args} className='borderBg'>
        {
            [1,2,3].map((item) => <CardListItem key={item.toString()} 
                title={"title"+item.toString()}
                subTitle='subTitle'
                summary='summary'
            />)
        }
        </List>
    },
    play: async ({args, canvasElement}) => {
        const canvas = within(canvasElement);
        const list = canvas.getByRole('list')
        expect(list.tagName).toBe('UL');
        expect(list).toBeInTheDocument();
        
    }
}
