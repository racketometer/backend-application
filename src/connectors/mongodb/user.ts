import {
  Document,
  Schema,
} from "mongoose";

import { IUser } from "../../models";

export interface IUserModel extends IUser, Document {
  _id: string;
}

export const UserSchema = new Schema(
  {
    displayName: String,
    email: String,
    password: String,
    autoGenerated: Boolean,
    firstName: String,
    lastName: String,
    isConsultant: Boolean,
    isCoach: Boolean,
    allowSharing: Boolean,
    birthday: Date,
    startedPlaying: Date,
    coaches: [{ _id: String, name: String }],
    friends: [{ _id: String, name: String }],
    token: String,
    createdBy: String,
  },
  {
    timestamps: true,
  },
);