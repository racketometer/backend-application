import { injectable } from "inversify";
import * as Mongoose from "mongoose";
import * as Seeder from "mongoose-seeder";

import {
  IMeasurementModel,
  IUserModel,
  MeasurementSchema,
  UserSchema,
} from "./";
import { seedData } from "./mongo-seed";

@injectable()
export class MongoConnector {
  public mongooseConnection: Promise<void>;

  public users: Mongoose.Model<IUserModel>;
  public measurements: Mongoose.Model<IMeasurementModel>;

  /**
   * Instantiate a MongoDB connection.
   * @param mongoDbConnectionString The URI for the MongoDB instance.
   * @param seed Enable data seed. This will **DROP** the excisting database.
   */
  public connect(mongoDbConnectionString: string, seed?: boolean) {
    this.mongooseConnection = Mongoose.connect(mongoDbConnectionString)
      .then(() => {
        this.log("Connected to MongoDB");
        this.users = Mongoose.model<IUserModel>("User", UserSchema);
        this.measurements = Mongoose.model<IMeasurementModel>("Measurement", MeasurementSchema);
      }, (connectError) => {
        this.log("Could not connect to MongoDB:", connectError);
      })
      .then(() => {
        if (seed) {
          return this.seedTestData()
            .catch((seedError) => this.log("Seed error", seedError));
        }
      });
  }

  private seedTestData(): Promise<void> {
    this.log("Seeding database with test data");
    return new Promise<void>((resolve, reject) => {
      Seeder.seed(seedData, { dropCollections: false })
        .then(() => resolve(), (seedError) => {
          reject(seedError);
        });
    });
  }

  private log(message: string, ...args: Array<any>): void {
    console.log(`MongoConnector: ${message}`, ...args);
  }
}
