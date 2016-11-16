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

const user = process.env.ROM_DB_USER;
const pw = process.env.ROM_DB_PW;

export const MongooseConnection = Mongoose.connect("mongodb://" + user + ":" + pw + "@ds155737.mlab.com:55737/romdb")
  .catch((connectError) => {
    console.error("Could not connect to MongoDB on mlab", connectError);
  })
  .then(() => seeder.seed(seedData, { dropCollections: false }))
  .catch((seedError) => {
    console.log("seed error", seedError);
  });
