import * as Mongoose from "mongoose";
import * as Seeder from "mongoose-seeder";
import {
  IMeasurementModel,
  IUserModel,
  MeasurementSchema,
  UserSchema,
} from "./";
import { seedData } from "./mongo-seed";

export const Measurement = Mongoose.model<IMeasurementModel>("Measurement", MeasurementSchema);
export const User = Mongoose.model<IUserModel>("User", UserSchema);

export class MongoConnector {
  public readonly mongooseConnection: Promise<void>;

  /**
   * Instantiate a MongoDB connection.
   * @param mongoDbConnectionString The URI for the MongoDB instance.
   * @param seed Enable data seed. This will **DROP** the excisting database.
   */
  constructor(mongoDbConnectionString: string, seed?: boolean) {
    this.mongooseConnection = Mongoose.connect(mongoDbConnectionString)
      .then(() => {
        if (seed) {
          return this.seedTestData()
            .catch((seedError) => this.log("Seed error", seedError));
        }
      }, (connectError) => {
        this.log("Could not connect to MongoDB:", connectError);
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
