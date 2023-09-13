import { Date, Types, Document } from 'mongoose';

export interface IPost extends Document {
    _id: Types.ObjectId;
    author: Types.ObjectId;
    authorName: string;
    summary: string;
    category?: Types.ObjectId;
    title: string;
    text: string;
    createAt: Date;
    updateAt: Date;
    parent?: Types.ObjectId;
    relatedPosts?: Types.Array<Types.ObjectId>;
    tags?: Types.Array<Types.ObjectId>;
    order?: number;
}
