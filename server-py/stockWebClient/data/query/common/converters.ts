import { parsePostText } from "@/data/post/util"
import _ from "lodash"
import { compileMDX } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"

export const convertMdxPost = async (post: any) => {
    let source = _.cloneDeep(post?.text)
    const {content, frontmatter} = await compileMDX({source, options: {
        mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [],
            development: true,  
        },
        parseFrontmatter: true,
        
    }})
    delete post.text
    return {
        ...post,
        source,
        mdxContent: content,
    }
}

export const convertList =async (result: any) => {
    result.list = result.list.map((item: any) => {
        const map = parsePostText(item.text)
        return {
            ...item,
            ...map
        }
    })
    return result
}