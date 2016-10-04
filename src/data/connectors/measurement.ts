import {
  Document,
  Schema,
} from "mongoose";

export interface IMeasurement extends Document {
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
  }
);
