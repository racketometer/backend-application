import {
  IMeasurement,
  IUser,
  User,
} from "../../models";

export const uploadedBy: (measurement: IMeasurement) => Promise<IUser> = (measurement) => {
  return User.findOneById(measurement.uploadedBy);
};
