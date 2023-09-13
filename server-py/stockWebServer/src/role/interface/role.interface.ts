import { Types, Document } from 'mongoose';

export interface IRole extends Document {
    _id: Types.ObjectId;
    name: string;
    uid: string;
}
