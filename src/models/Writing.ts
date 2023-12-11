// writing.model.ts
import mongoose, { Schema, Document } from "mongoose";

interface WritingI{
  title: string;
  user: string;
  type: string;
  content: string;
  images: string[];
  timelineDate: Date;
  location: string;
  createdDate: Date;
}

export interface WritingModel extends WritingI, Document<string> {}

const WritingSchema = new Schema({
  title: {
    type: String,
    required: [true, "Missing title"],
  },
  user: {
    type: String,
  },
  type: {
    type: String,
    required: [true, "Missing type"],
  },
  content: {
    type: String,
    required: [true, "Missing content"],
  },
  images: [
    {
      type: Array,
    },
  ],
  timelineDate: {
    type: Date,
  },
  location: {
    type: String,
  },
  createdDate: {
    type: Date,
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
  },
}, { versionKey: false });

export default mongoose.model<WritingModel>("Writing", WritingSchema, "writings");
