// Request.model.ts
import mongoose, { Schema, Document } from "mongoose";

interface RequestI {
  profileId: string;
  type: "Writing" | "Image" | "Tribute";
  body: string;
}

export interface RequestModel extends RequestI, Document<string> {}

const RequestSchema = new Schema({
  profileId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Writing", "Image", "Tribute"],
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
}, { versionKey: false });

export default mongoose.model<RequestModel>("Request", RequestSchema, "requests");
