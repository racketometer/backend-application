import {
  IMeasurement,
  IUser,
  Measurement,
} from "../../models";

type MeasurementResolver = (user: IUser) => Promise<Array<IMeasurement>>;
export const measurements: MeasurementResolver = (user) => {
  return Measurement.findManyByUserId(user._id);
};
