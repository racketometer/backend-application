import {
  IMeasurement,
  IUser,
  User,
} from "../../models";

export const user: (measurement: IMeasurement) => Promise<IUser>  = (measurement) => {
  return User.findOneById(measurement.user_id);
};
