import { Measurement } from "../../models";

export const measurements = (user) => {
 return Measurement.findManyByUserId(user._id);
};
