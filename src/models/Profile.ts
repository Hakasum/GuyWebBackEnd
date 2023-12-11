// profile.model.ts
import mongoose, { Schema, Document } from "mongoose";
import Gallery, { GalleryModel } from "./Gallery";
import Tribute, { TributeModel } from "./Tribute";
import Writing from "./Writing";
import Request, { RequestModel } from "./Request";

interface ProfileI {
  fullName: string;
  biography: string;
  gallery: mongoose.Types.ObjectId;
  writings: mongoose.Types.ObjectId[];
  tributes: mongoose.Types.ObjectId[];
  requests: mongoose.Types.ObjectId[];
  graveInfo: string;
}

export interface ProfileModel extends ProfileI, Document<string> {}

const ProfileSchema = new Schema({
  fullName: {
    type: String,
    required: [true, "Missing fullName"],
  },
  biography: {
    type: String,
  },
  gallery: {
    type: Schema.Types.ObjectId,
    ref: "Gallery",
  },
  writings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Writing"
    },
  ],
  tributes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tribute"
    },
  ],
  requests: [
    {
      type: Schema.Types.ObjectId,
      ref: "Request"
    },
  ],
  graveInfo: {
    type: String,
  },
}, { versionKey: false, id: false }
);

ProfileSchema.methods.addTribute = async function (tribute:TributeModel) {
  
  await tribute.save();
  await this.tributes.push(tribute);
  await this.save();
};

ProfileSchema.pre('deleteOne', {document: true}, async function(next) {
  const deletedProfile = this;

  if (deletedProfile) {
    // Access the related objects and delete them
    await mongoose.model("Gallery").deleteOne({ _id: deletedProfile.gallery }).exec();
    await mongoose.model("Writing").deleteMany({ _id: { $in: deletedProfile.writings } }).exec();
    await mongoose.model("Tribute").deleteMany({ _id: { $in: deletedProfile.tributes } }).exec();
    await mongoose.model("Request").deleteMany({ _id: { $in: deletedProfile.requests } }).exec();
  }
  
  next();
});

export default mongoose.model<ProfileModel>("Profile", ProfileSchema, "profiles");
