import Mongoose from "mongoose";

const mongo = Mongoose.connect("mongodb://localhost:27017/test", (err) => {
  if(err){
    console.error("Could not connect to MongoDB on port 27017");
  }
});

const UserSchema = Mongoose.Schema({
  displayName: String,
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  isConsultant: Boolean,  
  isCoach: Boolean,
  birthday: Date,
  startedPlaying: Date,
  coaches: [{ _id, name }],
  friends: [{ _id, name }],
  timestamps: true
})

const MeasurementSchema = Mongoose.Schema({
  date: Date,
  uploadedBy: Schema.Types.ObjectId,
  data: [Number],
  strokes: Number,
  strokeType: [String],
  maxRacketSpeed: Number,
  maxShuttlecockSpeed: Number, 
  sensorNo: String,
  racketType: String,
  algorithmVersion: String,
  user_id: Schema.Types.ObjectId,
  timestamps: true
})

const Users = Mongoose.model("user", UserSchema);

const Measurements = Mongoose.model("measurement", MeasurementSchema);

// export models
export { Users, Measurements };
