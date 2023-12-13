import Gallery from "../models/Gallery";

async function createGallery() {
    const newGallery = new Gallery();
    await newGallery.save();
    return newGallery._id;
}

export default {
    createGallery
}