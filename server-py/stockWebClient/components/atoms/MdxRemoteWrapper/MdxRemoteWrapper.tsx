'use client'
import React from "react";
import { MDXRemote } from "next-mdx-remote";

const MdxRemoteWrapper = (props: any) => {
    return <>
        <MDXRemote {...props}/>
    </>
}

export default MdxRemoteWrapper
