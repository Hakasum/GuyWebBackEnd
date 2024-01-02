import mongoose, { Schema, Document } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

interface ProfileAdminI {
  username: string;
  password?: string;
  token: string;
}

export interface ProfileAdminModel extends ProfileAdminI, Document<string> {}

const ProfileAdminSchema = new Schema({
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
        type: String,
    }
  }, { versionKey: false });

export default mongoose.model<ProfileAdminModel>("ProfileAdmin", ProfileAdminSchema, "profileAdmins");
