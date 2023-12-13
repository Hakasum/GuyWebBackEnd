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

async function createTribute(newTribute: TributeModel) {
    const errors = newTribute.validateSync();
    if (errors) throw new Error("Cannot create new tribute")
    return newTribute.save;
}

async function deleteTribute(_id: string) {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        throw new Error('Invalid tribute id');
    }
    const result = await Tribute.findByIdAndDelete(_id).exec();
    return result !== null;
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
    const profileToDelete = await Profile.findOne({ _id: _id })
    const result = await profileToDelete.deleteOne();
    return result !== null;
  }
export default {
    getAllProfiles,
    getFullProfile,
    createProfile,
    deleteProfile
}