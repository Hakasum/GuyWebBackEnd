"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Writing {
    constructor(id, title, contributorName, date, content) {
        this.id = id;
        this.title = title;
        this.contributorName = contributorName;
        this.date = date;
        this.content = content;
    }
    // Getters
    getId() {
        return this.id;
    }
    getTitle() {
        return this.title;
    }
    getContributorName() {
        return this.contributorName;
    }
    getDate() {
        return this.date;
    }
    getContent() {
        return this.content;
    }
    // Setters
    setTitle(title) {
        this.title = title;
    }
    setContributorName(contributorName) {
        this.contributorName = contributorName;
    }
    setDate(date) {
        this.date = date;
    }
    setContent(content) {
        this.content = content;
    }
}
exports.default = Writing;
//# sourceMappingURL=WritingModel.js.map