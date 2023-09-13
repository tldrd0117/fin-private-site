import { Types } from 'mongoose';
import { IPost } from '../interface/post.interface';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PostCreate {
    @ApiProperty()
    author: string;
    @ApiProperty()
    authorName: string;
    @ApiProperty()
    summary: string;
    @ApiProperty()
    category: string;
    @ApiProperty()
    title: string;
    @ApiProperty()
    text: string;
    @ApiPropertyOptional()
    parent?: string;
    @ApiPropertyOptional()
    relatedPosts?: Array<string>;
    @ApiPropertyOptional()
    tags?: Array<string>;
    @ApiPropertyOptional()
    order?: number;
}

export class PostUpdate {
    @ApiProperty()
    _id: string;
    @ApiPropertyOptional()
    author?: string;
    @ApiPropertyOptional()
    authorName?: string;
    @ApiPropertyOptional()
    summary?: string;
    @ApiPropertyOptional()
    category?: string;
    @ApiPropertyOptional()
    title?: string;
    @ApiProperty()
    text: string;
    @ApiPropertyOptional()
    parent?: string;
    @ApiPropertyOptional()
    relatedPosts?: Array<string>;
    @ApiPropertyOptional()
    tags?: Array<string>;
    @ApiPropertyOptional()
    order?: number;
}

export class PostGetList {
    @ApiProperty()
    limit: number;
    @ApiProperty()
    offset: number;
}

export class PostSearchList extends PostGetList {
    @ApiProperty()
    word: string;
}

export class PostList {
    @ApiProperty()
    list: Array<IPost>;
    @ApiProperty()
    total: number;
}

export class PostGet {
    @ApiProperty()
    _id: string;
}

export class PostDelete {
    @ApiProperty()
    _id: string;
}
