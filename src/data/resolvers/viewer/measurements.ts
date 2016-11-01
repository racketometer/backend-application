import { Measurement } from "../../models";

export const measurements = (viewer, { userId }) => {
  if (userId) {
    return Measurement.findManyByUserId(userId);
  }
  return Measurement.findManyByUserId(viewer._id);
};
