import { IMeasurement } from "../../models";

import {
  Document,
  Schema,
} from "mongoose";

export interface IMeasurementModel extends IMeasurement, Document {
  _id: string;
}

export const MeasurementSchema = new Schema(
  {
    date: Date,
    uploadedBy: Schema.Types.ObjectId,
    data: [[Number]],
    strokes: Number,
    strokeType: [String],
    maxRacketSpeed: Number,
    maxShuttlecockSpeed: Number,
    sensorNo: String,
    racketType: String,
    algorithmVersion: String,
    user_id: Schema.Types.ObjectId,
  },
  {
    timestamps: true,
  },
);
