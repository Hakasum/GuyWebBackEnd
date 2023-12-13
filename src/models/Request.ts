// Request.model.ts
import mongoose, { Schema, Document } from "mongoose";

interface RequestI {
  type: "Writing" | "Tribute" | "Gallery";
  body: string;
  images: string[];
}

export interface RequestModel extends RequestI, Document<string> {}

const RequestSchema = new Schema({
  type: {
    type: String,
    enum: ["Writing", "Image", "Tribute"],
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  photos: [
    {
      type: String,
    },
  ],
}, { versionKey: false });

export default mongoose.model<RequestModel>("Request", RequestSchema, "requests");
