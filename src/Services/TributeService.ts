import mongoose from "mongoose";
import Tribute, { TributeModel } from "../models/Tribute";

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

export default {
    createTribute,
    deleteTribute
}