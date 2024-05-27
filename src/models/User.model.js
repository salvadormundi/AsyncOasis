import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    userNames: [{ type: String }],
  },
  { timestamps: true }
);

mongoose.pluralize(null);

export const UserModel = mongoose.model(
  'Users',
  UserSchema
);

const otpIndexes = [{ email: -1, phoneNumber: -1 }];

UserModel.indexes = otpIndexes;
