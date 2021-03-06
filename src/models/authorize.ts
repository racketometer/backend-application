import * as uuidv4 from "uuid/v4";

import { MongoConnector } from "../connectors";
import { container } from "../ioc.config";
import { TYPES } from "../ioc.types";
import { IUser } from "./user";

export class Authorize {

  /**
   * Authorize user.
   * @param email User email.
   * @param password The users password.
   */
  public static authorize(email: string, password: string): Promise<IUser> {
    const db = container.get<MongoConnector>(TYPES.MongoConnector).users;
    return db.findOne({ email, password }).then((user) => {
      if (!user) {
        throw Error("Could not authorize");
      }
      user.token = uuidv4();
      return user.save();
    });
  }

  /**
   * Throws an error if token is not valid.
   * @param token Token to authorize.
   */
  public static isAuthorized(token: string): Promise<IUser> {
    if (!token) {
      throw Error("Token not set");
    }

    const db = container.get<MongoConnector>(TYPES.MongoConnector).users;
    return db.findOne({ token }).then((user) => {
      if (!user) {
        throw Error("Not authorized");
      }
      return user;
    });
  }

  /**
   * Clears authorization on user with id.
   * @param id User id.
   */
  public static clear(id: string): Promise<void> {
    const db = container.get<MongoConnector>(TYPES.MongoConnector).users;
    return db.findById(id).then((doc) => {
      doc.token = null;
      return doc.save().then(() => undefined);
    })
    .catch(() => {
      throw Error();
    });
  }
}
