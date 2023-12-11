"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Tribute {
    constructor(id, title, image, contributorName, date) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.contributorName = contributorName;
        this.date = date;
    }
    // Getters
    getId() {
        return this.id;
    }
    getTitle() {
        return this.title;
    }
    getImage() {
        return this.image;
    }
    getContributorName() {
        return this.contributorName;
    }
    getDate() {
        return this.date;
    }
    // Setters
    setTitle(title) {
        this.title = title;
    }
    setImage(image) {
        this.image = image;
    }
    setContributorName(contributorName) {
        this.contributorName = contributorName;
    }
    setDate(date) {
        this.date = date;
    }
}
exports.default = Tribute;
//# sourceMappingURL=TributeModel.js.map