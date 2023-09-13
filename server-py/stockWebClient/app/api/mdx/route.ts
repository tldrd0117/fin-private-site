import type { NextApiRequest, NextApiResponse } from 'next'
import remarkGfm from 'remark-gfm'
import {compile} from '@mdx-js/mdx'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {

    const body = await request.json()

    if(body.source === undefined) {
        return NextResponse.json({ code: ""})
    }

    const code = String(await compile(body.source, {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [],
        outputFormat: 'function-body',
        development: false
    }))

    return NextResponse.json({ code })
}
