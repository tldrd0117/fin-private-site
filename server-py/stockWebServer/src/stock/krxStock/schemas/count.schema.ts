import { Schema } from 'mongoose';
import { ICount } from '../interface/count.interface';

const countSchema = new Schema<ICount>({
    _id: { type: String, required: true },
    count: { type: Number, required: true },
});

export default countSchema;
