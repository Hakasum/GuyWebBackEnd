import mongoose from "mongoose";
import Profile, { ProfileModel } from "../models/Profile";
import GalleryService from "./GalleryService";
import Tribute, { TributeModel } from "../models/Tribute";
import Writing, { WritingModel } from "../models/Writing";
import {RequestModel} from "../models/Request";

async function getAllProfiles() {
    return await Profile.find().exec();
}


async function getFullProfile(id: string) {
    return await Profile.findById(id).populate("gallery").populate("writings").populate("tributes").exec();
}

async function createProfileTribute(newTribute: TributeModel) {
    const errors = newTribute.validateSync();
    if (errors) throw new Error("Cannot create new tribute")
    return newTribute.save;
}

async function deleteProfileTribute(_id: string) {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        throw new Error('Invalid tribute id');
    }
    const result = await Tribute.findByIdAndDelete(_id).exec();
    return result !== null;
}

async function createProfileWriting(newWriting: WritingModel) {
    const errors = newWriting.validateSync();
    if (errors) throw new Error("Cannot create new writing")
    return newWriting.save;
}

async function deleteProfileWriting(_id: string) {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        throw new Error('Invalid writing id');
    }
    const result = await Writing.findByIdAndDelete(_id).exec();
    return result !== null;
}

async function createRequest(newRequest: RequestModel) {
    const addedRequest = await newRequest.save();
    const newObjectId = new mongoose.Types.ObjectId(addedRequest._id);
    const profile = await Profile.findById(addedRequest.profileId);
    console.log(newObjectId, "----", profile.requests)
    profile.requests.push(newObjectId);
    profile.save();
}

async function createProfile(newProfile: ProfileModel) {
    const errors = newProfile.validateSync();
    if (errors) throw new Error("Try Again")
    newProfile.gallery = new mongoose.Types.ObjectId(await GalleryService.createGallery());
    console.log("Gallery", newProfile.gallery);
    return newProfile.save();
}
async function deleteProfile(_id: string) {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        throw new Error('Invalid profileId');
    }
    const result = await Profile.findOneAndDelete({ _id}).exec();
    return result !== null;
  }
export default {
    getAllProfiles,
    getFullProfile,
    createProfileTribute,
    deleteProfileTribute,
    createProfileWriting,
    deleteProfileWriting,
    createRequest,
    createProfile,
    deleteProfile
}