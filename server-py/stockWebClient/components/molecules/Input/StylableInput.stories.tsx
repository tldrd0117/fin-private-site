import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';
import { Input } from '@/components/atoms/Input/Input';


const meta: Meta<typeof Input> = {
    title: "Input/Stylable",
    component: Input,
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Normal: Story = {
    
    args: {
        placeholder: "NormalBaseInput",
    },
    play: async ({args, canvasElement}) => {
        const canvas = within(canvasElement);
        userEvent.type(canvas.getByRole('textbox'), "test")
        expect(args.onChange).toBeCalledTimes(4)
        expect(args.onKeyDown).toBeCalledTimes(4)
        expect(args.onKeyUp).toBeCalledTimes(4)
        expect(canvas.getByPlaceholderText("NormalBaseInput")).toBeInTheDocument()
        userEvent.type(canvas.getByRole('textbox'), "{backspace}".repeat(4))
        canvas.getByRole('textbox').focus()
        expect(args.onFocus).toBeCalledTimes(1)

    }
}

export const Disabled: Story = {
    args: {
        placeholder: "DisabledBaseInput",
        disabled: true,
    },
    play: async ({args, canvasElement}) => {
        const canvas = within(canvasElement);
        userEvent.type(canvas.getByRole('textbox'), "test")
        expect(args.onChange).toBeCalledTimes(0)
        expect(args.onKeyDown).toBeCalledTimes(0)
        expect(args.onKeyUp).toBeCalledTimes(0)
        expect(canvas.getByPlaceholderText("DisabledBaseInput")).toBeInTheDocument()
        canvas.getByRole('textbox').focus()
        expect(args.onFocus).toBeCalledTimes(0)
    }
}
