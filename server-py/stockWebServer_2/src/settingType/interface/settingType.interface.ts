import { Types, Document } from 'mongoose';

export interface ISettingType extends Document {
    _id: Types.ObjectId;
    name: string;
    uid: string;
}
