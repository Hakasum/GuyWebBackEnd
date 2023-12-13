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

async function createRequest(requestToAdd:RequestModel, profileId: String) {
    const profile = await Profile.findById(profileId);
    const addedRequest = await requestToAdd.save();
    const requestId = new mongoose.Types.ObjectId(addedRequest._id);
    const result = profile.requests.push(requestId);
    return result !== null
}

export default {
    getAllProfiles,
    getFullProfile,
    createProfile,
    deleteProfile,
    createRequest
}