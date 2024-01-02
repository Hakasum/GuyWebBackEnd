import mongoose from "mongoose";
import Profile, { ProfileModel } from "../models/Profile";
import GalleryService from "./GalleryService";
import Tribute from "../models/Tribute";
import Writing from "../models/Writing";
import Request, {RequestModel} from "../models/Request";

async function getAllProfiles() {
    return await Profile.find().exec();
}


async function getFullProfile(id: string) {
    return await Profile.findById(id).populate("gallery").populate("writings").populate("tributes").exec();
}

async function createProfile(newProfile: ProfileModel) {
    newProfile.gallery = new mongoose.Types.ObjectId(await GalleryService.createGallery());
    return newProfile.save();
}
async function deleteProfile(profileId: string) {
    if (!mongoose.Types.ObjectId.isValid(profileId)) {
        throw new Error('Invalid profileId');
    }
    const profileToDelete = await Profile.findOne({ _id: profileId })
    const result = await profileToDelete.deleteOne();
    return result !== null;
}

async function createRequest(requestToAdd:RequestModel, profileId: string) {
    if (!mongoose.Types.ObjectId.isValid(profileId)) {
        throw new Error('Invalid profileId');
    }
    const profile = await Profile.findById(profileId);
    const addedRequest = await requestToAdd.save();
    const requestId = new mongoose.Types.ObjectId(addedRequest._id);
    const result = profile.requests.push(requestId);
    profile.save();
    return result !== null
}

async function approveRequest(requestIdToApprove: string, profileId: string) {
    if (!mongoose.Types.ObjectId.isValid(requestIdToApprove) || !mongoose.Types.ObjectId.isValid(requestIdToApprove)){
        throw new Error("Try Again")
    }
    const requestToAdd = await Request.findById(requestIdToApprove);
    const profile = await Profile.findById(profileId);
    switch(requestToAdd.type) {
        case "Tribute":
            const tributeToAdd = new Tribute(JSON.parse(requestToAdd.data));
            const tributeAdded = await tributeToAdd.save();
            profile.tributes.push(new mongoose.Types.ObjectId(tributeAdded._id));
            break;
        case "Writing":
            const writingToAdd = new Writing(requestToAdd.data);
            const writingAdded = await writingToAdd.save();
            profile.writings.push(new mongoose.Types.ObjectId(writingAdded._id));
            break;
        case "Gallery":
            break;
    }
    profile.requests.splice(profile.requests.indexOf(new mongoose.Types.ObjectId(requestIdToApprove)),1);
    const requestToRemove = Request.findById(new mongoose.Types.ObjectId(requestIdToApprove));
    requestToRemove.deleteOne().exec();
    const result = profile.save();
    return result !== null;
}

export default {
    getAllProfiles,
    getFullProfile,
    createProfile,
    deleteProfile,
    createRequest,
    approveRequest
}