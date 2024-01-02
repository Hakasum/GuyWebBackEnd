import getNewToken from "../Helpers/jwtHelper";
import hash from "../Helpers/cryptoHelper";
import ProfileAdmin from "../models/ProfileAdmin";
import { Credentials } from "models/Credentials";

async function loginAsync(credentials: Credentials) {

    credentials.password = hash(credentials.password);

    const user = await ProfileAdmin.findOne({ "email": credentials.email, "password": credentials.password });
    if (!user) return null;
    if (user) user.token = getNewToken(user);
    delete user.password;
    return user;
}

export default {
    loginAsync
};