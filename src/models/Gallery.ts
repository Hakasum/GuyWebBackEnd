// gallery.model.ts
import mongoose, { Schema, Document } from "mongoose";

interface GalleryI {
  photos: string[];
  videos: string[];
}

export interface GalleryModel extends GalleryI, Document<string> {}

const GallerySchema = new Schema({
  photos: [
    {
      type: String,
    },
  ],
  videos: [
    {
      type: String,
    },
  ],
}, { versionKey: false });

export default mongoose.model<GalleryModel>("Gallery", GallerySchema, "galleries");
