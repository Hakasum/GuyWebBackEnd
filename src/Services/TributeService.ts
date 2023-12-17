import mongoose from "mongoose";
import Tribute, { TributeModel } from "../models/Tribute";
import Profile from "models/Profile";

async function createTribute(newTribute: TributeModel, profileId: string) {
    const errors = newTribute.validateSync();
    if (errors) {
        throw new Error("Cannot create new tribute");
    }
    const addedTribute = await newTribute.save();
    const profile = await Profile.findById(profileId);
    profile.tributes.push(new mongoose.Types.ObjectId(addedTribute._id))
    return addedTribute;
}

async function deleteTribute(_id: string) {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        throw new Error('Invalid tribute id');
    }
    const result = await Tribute.findByIdAndDelete(_id).exec();
    return result !== null;
}

export default {
    createTribute,
    deleteTribute
}