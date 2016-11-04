import { Measurement, IUser } from "../../models";

export const measurements: (user: IUser) => Promise<IUser> = (user) => {
 return Measurement.findManyByUserId(user._id);
};
