import Mongoose from "mongoose";
import seeder from "mongoose-seeder";
import data from "../mongo-seed.json";

const UserSchema = Mongoose.Schema({
  displayName: String,
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  isConsultant: Boolean,  
  isCoach: Boolean,
  birthday: { type: Date, get: v => v.toISOString() },
  startedPlaying: { type: Date, get: v => v.toISOString() },
  coaches: [{ _id: String, name: String }],
  friends: [{ _id: String, name: String }],
},{
  timestamps: true
})

const MeasurementSchema = Mongoose.Schema({
  date: Date,
  uploadedBy: Mongoose.Schema.Types.ObjectId,
  data: [Number],
  strokes: Number,
  strokeType: [String],
  maxRacketSpeed: Number,
  maxShuttlecockSpeed: Number, 
  sensorNo: String,
  racketType: String,
  algorithmVersion: String,
  user_id: Mongoose.Schema.Types.ObjectId,
},{
  timestamps: true
});

const User = Mongoose.model("User", UserSchema);

const Measurement = Mongoose.model("Measurement", MeasurementSchema);

const mongo = Mongoose.connect("mongodb://localhost:27017/test", (err) => {
  if(err){
    console.error("Could not connect to MongoDB on port 27017");
  } else {
    seeder.seed(data, { dropCollections: false }).then((dbData) => {
      // The database objects are stored in dbData
    }).catch(function(err) {
      // handle error
      console.log(err);
    });
  }
});

// export models
export { User, Measurement };
