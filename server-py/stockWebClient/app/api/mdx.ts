// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { compileMDX } from 'next-mdx-remote/rsc'
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
import {compile} from '@mdx-js/mdx'

type Data = string

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    console.log("req",req.body)

    if(req.body.source === undefined) {
        res.status(200).send("")
    }

    const code = String(await compile(req.body.source, {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [],
        outputFormat: 'function-body',
        development: false
    }))
    res.status(200).send(JSON.stringify({
        code
    }))
}
