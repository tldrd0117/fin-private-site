import { Schema } from 'mongoose';
import { IUser } from '../interface/user.interface';

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: Schema.Types.ObjectId, required: true, ref: 'Role' },
    createAt: { type: Date, required: true, default: Date.now },
    updateAt: { type: Date, required: true, default: Date.now },
});

userSchema.index({ name: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ name: 1, email: 1 }, { unique: true });

export default userSchema;
