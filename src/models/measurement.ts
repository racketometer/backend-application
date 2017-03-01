import { MongoConnector } from "../connectors";
import { container } from "../ioc.config";
import { TYPES } from "../ioc.types";
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
    const db = container.get<MongoConnector>(TYPES.MongoConnector).measurements;
    return db.find({ user_id: id })
      .then(((measurements) => measurements));
  }
}
