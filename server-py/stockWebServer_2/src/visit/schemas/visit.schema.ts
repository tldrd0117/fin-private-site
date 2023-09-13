import { Schema } from 'mongoose';
import { IVisit } from '../interface/visit.interface';

const visitSchema = new Schema<IVisit>({
    target: { type: String, required: true, refPath: 'type' },
    type: {
        type: String,
        required: true,
        enum: ['blog', 'Tag', 'Post', 'Category'],
    },
    count: { type: Number, required: true },
    createAt: { type: Date, required: true, default: Date.now },
});

visitSchema.index({ target: 1, type: 1 }, { unique: false });
visitSchema.index({ target: 1 }, { unique: false });
visitSchema.index({ type: 1 }, { unique: false });
visitSchema.index({ target: 1, type: 1, createAt: 1 }, { unique: true });

export default visitSchema;
