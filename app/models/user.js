import mongoose, {Schema} from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/i, "Invalid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    img: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    phone: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User = mongoose.models.Users || mongoose.model("Users", userSchema);
