import { Date, Types, Document } from 'mongoose';

export interface IVisitHistory extends Document {
    _id: Types.ObjectId;
    ip: string;
    target: string;
    type: string;
    createAt: Date;
    expiredAt: Date;
}
