import Mongoose from "mongoose";

const mongo = Mongoose.connect('mongodb://localhost:27017/test', (err) => {
  if(err){
    console.error('Could not connect to MongoDB on port 27017');
  }
});

const UserSchema = Mongoose.Schema({
  username: String,
  password: String,
  email: String,
  role: String,
  age: Number,
  joinedAt: String,
})

const Users = Mongoose.model('users', UserSchema);

// export models
export { Users };
