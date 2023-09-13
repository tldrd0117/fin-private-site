import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

import { FlexList } from './FlexList';
import { ListItem } from '../../molecules/ListItem/ListItem';
import { CardListItem } from '../../molecules/ListItem/CardListItem';

const meta: Meta<typeof FlexList> = {
    title: "List/Flex",
    component: FlexList,
    args: {
    }
};

export default meta;

type Story = StoryObj<typeof FlexList>;

export const Normal: Story = {
    render: (args) => {
        return <FlexList {...args} className='borderBg'>
        {
            [1,2,3].map((item) => <ListItem key={item.toString()}>{item}</ListItem>)
        }
        </FlexList>
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
        return <FlexList {...args} className='borderBg'>
        {
            [1,2,3].map((item) => <CardListItem key={item.toString()} 
                title={"title"+item.toString()}
                subTitle='subTitle'
                summary='summary'
                image= {{
                    src: "/images/profile.jpg",
                    alt: "profile"
                }}
            />)
        }
        </FlexList>
    },
    play: async ({args, canvasElement}) => {
        const canvas = within(canvasElement);
        const list = canvas.getByRole('list')
        expect(list.tagName).toBe('UL');
        expect(list).toBeInTheDocument();
        
    }
}
