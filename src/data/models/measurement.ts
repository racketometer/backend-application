import { Measurement as db } from "../connectors";
import { Authorize } from "./authorize";

export class Measurement extends Authorize {

  /**
   * Finds all measurements by user id.
   * @param id User id.
   */
  public static findManyByUserId(id: string) {
    return db.find({ user_id: id });
  }
}
