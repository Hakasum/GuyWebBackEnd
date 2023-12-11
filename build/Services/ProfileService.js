"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Profile_1 = __importDefault(require("../models/Profile"));
function getAllProfile() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Profile_1.default.find().exec();
    });
}
function getFullProfile(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Profile_1.default.findById(id).populate("gallery").populate("writings").populate("tributes").exec();
    });
}
exports.default = {
    getAllProfile,
    getFullProfile
};
//# sourceMappingURL=ProfileService.js.map