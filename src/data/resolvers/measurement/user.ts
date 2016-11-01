import { User } from "../../models";

export const user = (measurement) => {
  return User.findOneById(measurement.user_id);
};
