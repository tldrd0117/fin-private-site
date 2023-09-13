import { Date, Types, Document } from 'mongoose';

export interface IVisit extends Document {
    _id: Types.ObjectId;
    type: string;
    target: string; // blog 혹은 post id
    count: number;
    createAt: Date;
}
