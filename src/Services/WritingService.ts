import Writing, { WritingModel } from "models/Writing";
import mongoose from "mongoose";

async function createWriting(newWriting: WritingModel) {
    const errors = newWriting.validateSync();
    if (errors) throw new Error("Cannot create new writing")
    return newWriting.save;
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