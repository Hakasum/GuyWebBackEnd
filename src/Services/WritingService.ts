import Profile from "models/Profile";
import Writing, { WritingModel } from "models/Writing";
import mongoose from "mongoose";

async function createWriting(newWriting: WritingModel, profileId: String) {
    const errors = newWriting.validateSync();
    if (errors) {
        throw new Error("Cannot create new writing")
    }
    const addedWriting = await newWriting.save();
    const profile = await Profile.findById(profileId);
    profile.writings.push(new mongoose.Types.ObjectId(addedWriting._id))
    return addedWriting;
}

async function deleteWriting(_id: string) {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        throw new Error('Invalid writing id');
    }
    const result = await Writing.findByIdAndDelete(_id).exec();
    return result !== null;
}

export default {
    createWriting,
    deleteWriting
}