import mongoose from "mongoose";
import Profile from "../models/Profile";
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

async function createProfile() {
    const newProfile = new Profile();
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

async function approveRequest(requestIdToApprove: string, profileId: string) {
    if (!mongoose.Types.ObjectId.isValid(requestIdToApprove) || !mongoose.Types.ObjectId.isValid(requestIdToApprove)){
        throw new Error("Try Again")
    }
    const requestToAdd = await Request.findById(requestIdToApprove);
    const profile = await Profile.findById(profileId);
    switch(requestToAdd.type) {
        case "Tribute":
            const tributeToAdd = new Tribute(JSON.parse(requestToAdd.body));
            const tributeAdded = await tributeToAdd.save();
            profile.tributes.push(new mongoose.Types.ObjectId(tributeAdded._id));
            break;
        case "Writing":
            const writingToAdd = new Writing(JSON.parse(requestToAdd.body));
            const writingAdded = await writingToAdd.save();
            profile.tributes.push(new mongoose.Types.ObjectId(writingAdded._id));
            break;
        case "Gallery":
            break;
    }

    const result = profile.requests.splice(profile.requests.indexOf(new mongoose.Types.ObjectId(requestIdToApprove)),1);
    return result;
}

export default {
    getAllProfiles,
    getFullProfile,
    createProfile,
    deleteProfile,
    createRequest,
    approveRequest
}