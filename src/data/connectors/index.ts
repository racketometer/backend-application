import * as Mongoose from "mongoose";
import * as seeder from "mongoose-seeder";
import { seedData } from "./mongo-seed";
import {
  IMeasurement,
  IUser,
  MeasurementSchema,
  UserSchema,
} from "./";

export * from "./user";
export * from "./measurement";

export const Measurement = Mongoose.model<IMeasurement>("Measurement", MeasurementSchema);
export const User = Mongoose.model<IUser>("User", UserSchema);

export const MongooseConnection = Mongoose.connect("mongodb://localhost:27017/test")
  .catch((connectError) => {
    console.error("Could not connect to MongoDB on port 27017", connectError);
  })
  .then(() => seeder.seed(seedData, { dropCollections: false }))
  .catch((seedError) => {
    console.log("seed error", seedError);
  });
