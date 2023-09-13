import mongoose, { Schema, Date } from 'mongoose';
import { IPost } from '../interface/post.interface';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const AutoIncrement = require('mongoose-sequence')(mongoose);

const postSchema = new Schema<IPost>({
    author: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    authorName: { type: String, required: true },
    summary: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, required: true, ref: 'Category' },
    title: { type: String, required: true },
    text: { type: String, required: true },
    createAt: { type: Date, required: true, default: Date.now },
    updateAt: { type: Date, required: true, default: Date.now },
    parent: { type: Schema.Types.ObjectId, ref: 'Post' },
    relatedPosts: { type: [Schema.Types.ObjectId], ref: 'Post' },
    tags: { type: [Schema.Types.ObjectId], ref: 'Tag' },
    order: { type: Number },
});

postSchema.plugin(AutoIncrement, { inc_field: 'order' });
postSchema.index({ summary: 'text', text: 'text' });

export default postSchema;
