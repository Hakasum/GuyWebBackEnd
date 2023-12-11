"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Gallery {
    constructor(id, photoUrls, videoUrls, profileId) {
        this.id = id;
        this.photoUrls = photoUrls;
        this.videoUrls = videoUrls;
        this.profileId = profileId;
    }
    // Getters
    getId() {
        return this.id;
    }
    getPhotoUrls() {
        return this.photoUrls;
    }
    getVideoUrls() {
        return this.videoUrls;
    }
    getProfileId() {
        return this.profileId;
    }
    // Setters
    setPhotoUrls(photoUrls) {
        this.photoUrls = photoUrls;
    }
    setVideoUrls(videoUrls) {
        this.videoUrls = videoUrls;
    }
    setProfileId(profileId) {
        this.profileId = profileId;
    }
}
exports.default = Gallery;
//# sourceMappingURL=GalleryModel.js.map