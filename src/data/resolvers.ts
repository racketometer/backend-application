import { User, Measurement } from "./connectors";

const resolvers = {
  Query: {
    login: (_, { email, password }) => {
      return User.findOne({ "email": email, "password": password });
    },
    getMeasurements: (_, { userId }) => {
      return Measurement.find({ "user_id": userId });
    },
  },
  Mutation: {
    createUser: (root, { email, password }) => {
      return User.findOne({ "email": email, "password": password }).then((user) => {
        if (!user) {
          return null;
        }

        return User.create({ email: email, password: password }, (err, newUser) => {
          if (err) {
            return err;
          }

          return newUser;
        });
      });
    },
  },
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
