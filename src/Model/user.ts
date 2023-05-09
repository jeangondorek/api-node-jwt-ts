import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  email: string;
  password: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false },
  createdAt: { type: Date, default: Date.now },
});

UserSchema.pre<IUser>('save', function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.hash(user.password, 10, (err, encrypted) => {
    if (err) {
      return next(err);
    }

    user.password = encrypted;
    return next();
  });
});

export default mongoose.model<IUser>('User', UserSchema);
