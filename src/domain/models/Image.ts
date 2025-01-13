
import { Schema, model } from "mongoose";
import { ImageInterface } from "../../infrastructure/types/index";

const imageSchema = new Schema<ImageInterface>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  url: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const ImageModel = model<ImageInterface>("Image", imageSchema);
export { ImageModel };