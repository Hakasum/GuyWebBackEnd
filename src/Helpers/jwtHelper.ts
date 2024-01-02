import { config } from "../config";
import jwt from "jsonwebtoken";
import {ProfileAdminModel } from "../models/ProfileAdmin";

export default function getNewToken(payload:ProfileAdminModel) { // (payload will be the user object)
    return jwt.sign({ payload }, config.server.jwtKey,{expiresIn:"3h"});
}