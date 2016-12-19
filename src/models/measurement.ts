import { Measurement as db } from "../connectors";
import { IMeasurement } from "./";
import { Authorize } from "./authorize";

export interface IMeasurement {
  _id: string;
  date: Date;
  uploadedBy: string;
  data: Array<Array<number>>;
  strokes: number;
  strokeTypes: Array<string>;
  maxRacketSpeed: number;
  maxShuttlecockSpeed: number;
  sensorNo: string;
  racketType: string;
  algorithmVersion: string;
  user_id: string;
}

export class Measurement extends Authorize {

  /**
   * Finds all measurements by user id.
   * @param id User id.
   */
  public static findManyByUserId(id: string): Promise<Array<IMeasurement>> {
    return db.find({ user_id: id })
      .then(((measurements) => measurements));
  }
}
