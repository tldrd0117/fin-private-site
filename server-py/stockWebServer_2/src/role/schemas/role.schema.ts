import { Schema } from 'mongoose';
import { IRole } from '../interface/role.interface';

const schema = new Schema<IRole>({
    name: { type: String, required: true },
    uid: { type: String, required: true, minlength: 32, maxlength: 32 },
});

schema.index({ name: 1 }, { unique: true });
schema.index({ uid: 1 }, { unique: true });

export default schema;
