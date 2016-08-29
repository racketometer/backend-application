import { Users } from './connectors';

const resolvers = {
  Query: {
    login: (_, { email, pw }) => {
      return Users.findOne({ "email": email, "password": pw });
    }
  },
  Mutation: {
    createUser: (root, { email, pw }) => {
      return Users.findOne({ "email": email, "password": pw }).then( (user) => {
        if (user != null) return null

        return Users.create({ email: email, password: pw, joinedAt: new Date().toString(), age: 2, role: "boho" }, function(err, user) {
          if(err) return err;
        })
      });
    }
  }
}

export default resolvers;
