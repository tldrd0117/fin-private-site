import { Date, Types, Document } from 'mongoose';

export interface ICategory extends Document {
    _id: Types.ObjectId;
    name: string;
    createAt: Date;
    updateAt: Date;
}
