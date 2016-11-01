import { User } from "../../models";

export const uploadedBy = (measurement) => {
  return User.findOneById(measurement.uploadedBy);
};
