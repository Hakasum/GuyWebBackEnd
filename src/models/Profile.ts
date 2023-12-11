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

ProfileSchema.pre('findOneAndDelete',{ document: true }, async function(next) {
  const query = this as mongoose.Query<Document & ProfileModel, Document & ProfileModel>;
    // Access the document being deleted
    const deletedProfile = await this.findOne().exec();
    console.log();
    
    if (deletedProfile) {
      // Access the related objects and delete them
      await mongoose.model("Gallery").deleteOne({ _id: deletedProfile.gallery }).exec();
      await mongoose.model("Writing").deleteMany({ _id: { $in: deletedProfile.writings } }).exec();
      await mongoose.model("Tribute").deleteMany({ _id: { $in: deletedProfile.tributes } }).exec();
      await mongoose.model("Request").deleteMany({ _id: { $in: deletedProfile.requests } }).exec();
    }
  

  //const id = this.getQuery()._id;
  //const galleryId = this.getQuery().gallery;
  // const tributes = this.getQuery().tributes;
  // const writings = this.getQuery().writings;
  //const requests = this.getQuery()["requests"];
  //console.log("Received Requests", requests);
  //console.log("Received id", id);
  //if (Gallery.findById(galleryId)){
  //  await Gallery.deleteOne(galleryId);
  //}
  //if (requests) {
  // Request.deleteMany({profileId: id})
  //}
  // if (tributes){
  //   tributes.array.forEach( async (tributeId: string)=> {
  //     await Tribute.deleteOne({_id: tributeId});
  //   });
  // }
  // if (writings){
  //   writings.array.forEach( async (writingId: string)=> {
  //     await Writing.deleteOne({_id: writingId});
  //   });
  // }
  next();
});

export default mongoose.model<ProfileModel>("Profile", ProfileSchema, "profiles");
