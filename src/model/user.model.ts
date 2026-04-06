import mongoose, { Schema, Document } from "mongoose";

// * Msg schema
export interface Msg extends Document {
  content: string;
  createdAt: Date;
}

const MsgSchema: Schema<Msg> = new Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
});

// * User schema
export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpire: Date;
  isVerified: boolean;
  isAcceptingMsg: boolean;
  messages: Msg[];
}

const UserSchema: Schema<User> = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },
    password: { type: String, required: [true, "Password is required"] },
    verifyCode: { type: String, required: [true, "Verify code is required"] },
    verifyCodeExpire: {
      type: Date,
      required: [true, "Verify code expiration is required"],
    },
    isVerified: { type: Boolean, default: false },
    isAcceptingMsg: { type: Boolean, default: true },
    messages: [MsgSchema],
  },
  {
    timestamps: true,
  },
);

export const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);
