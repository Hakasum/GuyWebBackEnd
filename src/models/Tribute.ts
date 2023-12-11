// tribute.model.ts
import mongoose, { Schema, Document } from "mongoose";

interface TributeI {
  title: string;
  contributorName: string;
  image: string;
  date: Date;
}

export interface TributeModel extends TributeI, Document<string> {}

const TributeSchema = new Schema({
  title: {
    type: String,
    required: [true, "Missing title"],
  },
  contributorName: {
    type: String,
    required: [true, "Missing contributorName"],
  },
  image: {
    type: String, 
  },
  date: {
    type: Date,
    required: [true, "Missing date"],
  },
}, { versionKey: false });

export default mongoose.model<TributeModel>("Tribute", TributeSchema, "tributes");
