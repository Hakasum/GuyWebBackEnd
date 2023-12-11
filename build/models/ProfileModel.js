"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Profile {
    constructor(id, fullName, biography, gallery, writings, tributes, graveInfo) {
        this.id = id;
        this.fullName = fullName;
        this.biography = biography;
        this.gallery = gallery;
        this.writings = writings;
        this.tributes = tributes;
        this.graveInfo = graveInfo;
    }
    // Getters
    getId() {
        return this.id;
    }
    getFullName() {
        return this.fullName;
    }
    getBiography() {
        return this.biography;
    }
    getGallery() {
        return this.gallery;
    }
    getWritings() {
        return this.writings;
    }
    getTributes() {
        return this.tributes;
    }
    getGraveInfo() {
        return this.graveInfo;
    }
    // Setters
    setFullName(fullName) {
        this.fullName = fullName;
    }
    setBiography(biography) {
        this.biography = biography;
    }
    setGallery(gallery) {
        this.gallery = gallery;
    }
    setWritings(writings) {
        this.writings = writings;
    }
    setTributes(tributes) {
        this.tributes = tributes;
    }
    setGraveInfo(graveInfo) {
        this.graveInfo = graveInfo;
    }
}
exports.default = Profile;
//# sourceMappingURL=ProfileModel.js.map