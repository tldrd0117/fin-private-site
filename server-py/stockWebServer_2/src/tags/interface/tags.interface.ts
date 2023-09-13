import { Date, Types, Document } from 'mongoose';

export interface ITag extends Document {
    _id: Types.ObjectId;
    name: string;
    createAt: Date;
    updateAt: Date;
}
