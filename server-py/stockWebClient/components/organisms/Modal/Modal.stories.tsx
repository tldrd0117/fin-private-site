import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';
import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
    title: "Modal/Modal",
    component: Modal,
    parameters:{
        layout: 'fullscreen'
    },
    args: {
        isShow: true
    }
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Normal: Story = {
    args: {
    },
    render: (args) => {
        return <>
            <Modal {...args} containerProps={{
                className: 'w-96 h-96'
            }}>
                <div className='w-full h-full borderBg'>test</div>
            </Modal>
        </>
    },
    play: async ({args, canvasElement}) => {

    }
}


