import { User, Measurement } from "./connectors";
import { mutations } from "./mutations";

const resolvers = {
  Query: {
    login: (_, { email, password }) => {
      return User.findOne({ "email": email, "password": password });
    },
    getMeasurements: (_, { userId }) => {
      return Measurement.find({ "user_id": userId });
    },
  },
  Mutation: mutations,
  User: {
    measurements(user) {
      return Measurement.find({ "user_id": user._id });
    },
  },
  Measurement: {
    user(measurement) {
      return User.findOne({ "_id": measurement.user_id });
    },
    uploadedBy(measurement) {
      return User.findOne({ "_id": measurement.uploadedBy });
    },
  },
};

export default resolvers;
