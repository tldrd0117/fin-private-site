import { Date, Types, Document } from 'mongoose';

export interface ISetting extends Document {
    _id: Types.ObjectId;
    type: Types.ObjectId;
    role: Types.ObjectId;
    userId: Types.ObjectId;
    name: string;
    value: string;
    createAt: Date;
    updateAt: Date;
}
