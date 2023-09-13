import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

import { TagInput } from './TagInput';
import { SearchIcon } from '../../atoms/Icon/SearchIcon';
import { INPUT_STYLE_TYPE } from './StylableInput';

const meta: Meta<typeof TagInput> = {
    title: "Input/Tag",
    component: TagInput,
    render: (args) => <div className='p-4 borderBg'>
        <TagInput {...args} />
        </div>,
    args: {
        className: "w-80",
    }
};

export default meta;

type Story = StoryObj<typeof TagInput>;

export const Normal: Story = {
    args: {
    },
    play: async ({args, canvasElement}) => {
        const canvas = within(canvasElement);
        const element = canvas.getByPlaceholderText("NormalBaseInput")
        userEvent.type(element, "test")
        expect(args.onChange).toBeCalledTimes(4)
        expect(args.onKeyDown).toBeCalledTimes(4)
        expect(args.onKeyUp).toBeCalledTimes(4)
        expect(element).toBeInTheDocument()
        userEvent.type(element, "{backspace}".repeat(4))
        element.focus()
        expect(args.onFocus).toBeCalledTimes(1)

    }
}

export const UnderLine: Story = {
    args: {
        inputStyleType: INPUT_STYLE_TYPE.UNDERLINE
    },
    play: async ({args, canvasElement}) => {
        const canvas = within(canvasElement);
        const element = canvas.getByPlaceholderText("NormalBaseInput")
        userEvent.type(element, "test")
        expect(args.onChange).toBeCalledTimes(4)
        expect(args.onKeyDown).toBeCalledTimes(4)
        expect(args.onKeyUp).toBeCalledTimes(4)
        expect(element).toBeInTheDocument()
        userEvent.type(element, "{backspace}".repeat(4))
        element.focus()
        expect(args.onFocus).toBeCalledTimes(1)

    }
}

export const OutLine: Story = {
    args: {
        inputStyleType: INPUT_STYLE_TYPE.OUTLINE
    },
    play: async ({args, canvasElement}) => {
        const canvas = within(canvasElement);
        const element = canvas.getByPlaceholderText("NormalBaseInput")
        userEvent.type(element, "test")
        expect(args.onChange).toBeCalledTimes(4)
        expect(args.onKeyDown).toBeCalledTimes(4)
        expect(args.onKeyUp).toBeCalledTimes(4)
        expect(element).toBeInTheDocument()
        userEvent.type(element, "{backspace}".repeat(4))
        element.focus()
        expect(args.onFocus).toBeCalledTimes(1)

    }
}

export const ReadOnly: Story = {
    args: {
        placeholder: "DisabledBaseInput",
        readOnly: true,
    },
    play: async ({args, canvasElement}) => {
        const canvas = within(canvasElement);
        const element = canvas.getByPlaceholderText("DisabledBaseInput")
        userEvent.type(element, "test")
        expect(args.onChange).toBeCalledTimes(0)
        expect(args.onKeyDown).toBeCalledTimes(0)
        expect(args.onKeyUp).toBeCalledTimes(0)
        expect(element).toBeInTheDocument()
        element.focus()
        expect(args.onFocus).toBeCalledTimes(0)
    }
}

export const Disabled: Story = {
    args: {
        placeholder: "DisabledBaseInput",
        disabled: true,
    },
    play: async ({args, canvasElement}) => {
        const canvas = within(canvasElement);
        const element = canvas.getByPlaceholderText("DisabledBaseInput")
        userEvent.type(element, "test")
        expect(args.onChange).toBeCalledTimes(0)
        expect(args.onKeyDown).toBeCalledTimes(0)
        expect(args.onKeyUp).toBeCalledTimes(0)
        expect(element).toBeInTheDocument()
        element.focus()
        expect(args.onFocus).toBeCalledTimes(0)
    }
}

export const WithIcon: Story = {
    args: {
        placeholder: "WithIconBaseInput",
        icon: <SearchIcon/>,
    },
    play: async ({args, canvasElement}) => {
        const canvas = within(canvasElement);
        const element = canvas.getByPlaceholderText("WithIconBaseInput")
        userEvent.type(element, "test")
        expect(args.onChange).toBeCalledTimes(4)
        expect(args.onKeyDown).toBeCalledTimes(4)
        expect(args.onKeyUp).toBeCalledTimes(4)
        expect(element).toBeInTheDocument()
        element.focus()
        expect(args.onFocus).toBeCalledTimes(1)
    }
}

export const WithCancelButton: Story = {
    args: {
        placeholder: "WithCancelButtonBaseInput",
        cancelButton: true,
    },
    play: async ({args, canvasElement}) => {
        const canvas = within(canvasElement);
        const element = canvas.getByPlaceholderText("WithCancelButtonBaseInput")
        userEvent.type(canvas.getByRole('textbox'), "test")
        expect(args.onChange).toBeCalledTimes(4)
        expect(args.onKeyDown).toBeCalledTimes(4)
        expect(args.onKeyUp).toBeCalledTimes(4)
        expect(element).toBeInTheDocument()
        element.focus()
        expect(args.onFocus).toBeCalledTimes(1)
        canvas.getByRole("button").click();
        expect(args.onCancel).toBeCalledTimes(1);
    }
}

export const WithCancelButtonAndIcon: Story = {
    args: {
        placeholder: "WithCancelButtonAndIconBaseInput",
        cancelButton: true,
        icon: <SearchIcon/>,
    },
    
    play: async ({args, canvasElement}) => {
        const canvas = within(canvasElement);
        const element = canvas.getByPlaceholderText("WithCancelButtonAndIconBaseInput")
        userEvent.type(canvas.getByRole('textbox'), "test")
        expect(args.onChange).toBeCalledTimes(4)
        expect(args.onKeyDown).toBeCalledTimes(4)
        expect(args.onKeyUp).toBeCalledTimes(4)
        expect(element).toBeInTheDocument()
        element.focus()
        expect(args.onFocus).toBeCalledTimes(1)
        canvas.getByRole("button").click();
        expect(args.onCancel).toBeCalledTimes(1);
    }
}