import { Schema } from 'mongoose';
import { ICategory } from '../interface/category.interface';

const schema = new Schema<ICategory>({
    name: { type: String, required: true },
    createAt: { type: Date, required: true, default: Date.now },
    updateAt: { type: Date, required: true, default: Date.now },
});

schema.index({ name: 1 }, { unique: true });

export default schema;
