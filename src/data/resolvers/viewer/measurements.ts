import { Measurement, IMeasurement, IUser } from "../../models";

export interface IViewerMeasurement {
  userId: string;
}

type MeasurementResolver = (root: IUser, userId: IViewerMeasurement ) => Promise<IMeasurement>

export const measurements: MeasurementResolver = (viewer, { userId }) => {
  if (userId) {
    return Measurement.findManyByUserId(userId);
  }
  return Measurement.findManyByUserId(viewer._id);
};
