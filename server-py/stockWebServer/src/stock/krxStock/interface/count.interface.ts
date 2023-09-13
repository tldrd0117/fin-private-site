import { Date, Types, Document } from 'mongoose';

export interface ICount extends Document {
    _id: string;
    count: number;
}
