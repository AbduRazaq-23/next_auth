import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "please provide firstName"],
      unique: true,
    },
    lastName: {
      type: String,
      required: [true, "please provide lastName"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "please provide email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "please provide password"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
