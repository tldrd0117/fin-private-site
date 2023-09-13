
export interface PostCreate{
    author: string
    authorName: string;
    summary: string;
    category?: string;
    title: string;
    text: string;
    parent?: string;
    relatedPosts?: Array<string>;
    order?: number
    tags?: Array<string>;
}

export interface PostRawCreate{
    text: string;
    title: string;
    category: string;
    tags: Array<string>;
    parent?: string;
    relatedPosts?: Array<string>;
    order?: number
}

export interface PostUpdate{
    _id: string
    author?: string
    authorName?: string;
    summary?: string;
    category?: string;
    title?: string;
    text: string;
    parent?: string;
    relatedPosts?: Array<string>;
    order?: number
    tags?: Array<string>;
}

export interface PostGetList{
    limit: number;
    offset: number;
}

export interface PostSearchList extends PostGetList{
    word: string;
}

export interface PostList{
    list: Array<PostCreate>
    total: number
}

export interface PostGet{
    _id: string;
}

export interface PostDelete{
    _id: string;
}
