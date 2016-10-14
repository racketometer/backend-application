import {
  Document,
  Schema,
} from "mongoose";

export interface IUser extends Document {
  displayName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isConsultant: boolean;
  isCoach: boolean;
  allowSharing: boolean;
  birthday: Date;
  startedPlaying: Date;
  coaches: Array<{_id: string, name: string}>;
  friends: Array<{_id: string, name: string}>;
}

export const UserSchema = new Schema(
  {
    displayName: String,
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    isConsultant: Boolean,
    isCoach: Boolean,
    allowSharing: Boolean,
    birthday: Date,
    startedPlaying: Date,
    coaches: [{ _id: String, name: String }],
    friends: [{ _id: String, name: String }],
  },
  {
    timestamps: true,
  }
);
