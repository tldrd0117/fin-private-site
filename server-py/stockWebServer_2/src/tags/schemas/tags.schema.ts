import { Schema } from 'mongoose';
import { ITag } from '../interface/tags.interface';

const schema = new Schema<ITag>({
    name: { type: String, required: true },
    createAt: { type: Date, required: true, default: Date.now },
    updateAt: { type: Date, required: true, default: Date.now },
});

schema.index({ name: 1 }, { unique: true });

export default schema;
