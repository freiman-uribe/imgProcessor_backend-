import { Schema, model } from "mongoose";
import { UserInterface } from "../../infrastructure/types/index";

const userSchema = new Schema<UserInterface>({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ["Client"], required: true },
});

export default model<UserInterface>("User", userSchema);