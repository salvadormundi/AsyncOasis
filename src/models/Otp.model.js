import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema(
  {
    email: { type: String },
    otp: { type: String, index: true },
    phoneNumber: String,
    whatsappOtp: String,
  },
  { timestamps: true }
);

mongoose.pluralize(null);

export const OtpModel = mongoose.model("Otp", OtpSchema);

const otpIndexes = [{ otp: -1, createdAt: -1 }];

OtpModel.indexes = otpIndexes;
