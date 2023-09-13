import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import source from '!raw-loader!../../example/example.mdx'
import { compileMDX } from 'next-mdx-remote/rsc'
import Post from './post';


async function getData() {
    const {content, frontmatter} = await compileMDX({
        source: source.toString(),
        options:{
            mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [],
                development: process.env.NODE_ENV === 'development',
            },
            parseFrontmatter: true
        }
    })
    return {content, frontmatter}
}

const meta: Meta<typeof PostComponent> = {
    title: "Pages/Post",
    parameters:{
        layout: 'fullscreen'
    },
    render: (args, {loaded: {content, frontmatter}}) => {
        const tags = (frontmatter.tags as string).split("(((").slice(1)
        //mdxContents, title, category, tags
        return (
            <PostComponent id={"hello"} content={content} frontmatter={frontmatter}/>
        )
    },
    loaders: [
        async () => ({
            ...await getData(),
        })
    ]
};

export default meta;

type Story = StoryObj<typeof PostComponent>;

export const Normal: Story = {
    args: {
    },
    play: async ({args, canvasElement}) => {

    }
}

