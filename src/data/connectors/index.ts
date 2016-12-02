import * as Mongoose from "mongoose";
import * as seeder from "mongoose-seeder";
import { seedData } from "./mongo-seed";
import {
  IMeasurementModel,
  MeasurementSchema,
  UserSchema,
  IUserModel,
} from "./";

export * from "./user";
export * from "./measurement";

export const Measurement = Mongoose.model<IMeasurementModel>("Measurement", MeasurementSchema);
export const User = Mongoose.model<IUserModel>("User", UserSchema);

let ROM_DB_URL;

if (process.env.NODE_ENV === "prod") {
  ROM_DB_URL = process.env.ROM_DB_PROD;
} else if (process.env.NODE_ENV === "test") {
  ROM_DB_URL = process.env.ROM_DB_TEST;
}

export const MongooseConnection = Mongoose.connect(ROM_DB_URL)
  .catch((connectError) => {
    console.error("Could not connect to MongoDB on mlab", connectError);
  })
  .then(() => {
    if (process.env.NODE_ENV === "test" && process.env.NODE_ENV !== "prod") {
      seeder.seed(seedData, { dropCollections: false });
    }
  })
  .catch((seedError) => {
    console.log("seed error", seedError);
  });
