import Gallery from "../models/Gallery";

async function createGallery() {
    const newGallery = new Gallery();
    await newGallery.save();
    return newGallery._id;
}

async function deleteGallery(_id: string) {
    //delete data from server
    //const gallery = Gallery.findById(_id).exec;
    Gallery.deleteOne({_id}).exec();
}

export default {
    createGallery
}