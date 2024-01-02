// Request.model.ts
import mongoose, { Schema, Document } from "mongoose";

interface RequestI {
  type: "Writing" | "Tribute" | "Gallery";
  data: string;
}

export interface RequestModel extends RequestI, Document<string> {}

const RequestSchema = new Schema({
  type: {
    type: String,
    enum: ["Writing", "Gallery", "Tribute"],
    required: true,
  },
  data: {
    type: Schema.Types.Mixed,
    required: true,
  },
}, { versionKey: false });

export default mongoose.model<RequestModel>("Request", RequestSchema, "requests");
