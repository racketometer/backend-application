import { IMeasurement, IUser, Measurement } from "../../models";

export interface IViewerMeasurementArgument {
  userId: string;
}

type MeasurementResolver = (root: IUser, userId: IViewerMeasurementArgument ) => Promise<Array<IMeasurement>>;
export const measurements: MeasurementResolver = (viewer, { userId }) => {
  if (userId) {
    return Measurement.findManyByUserId(userId);
  }
  return Measurement.findManyByUserId(viewer._id);
};
