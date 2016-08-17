import { Users } from './connectors';

const resolvers = {
  Query: {
    login(_, { username, password }) {
      return new Promise((resolve, reject) => {
        setTimeout( () => reject('MongoDB timeout when fetching user (timeout is 500ms)'), 500);
        Users.findOne( { "username": username, "password": password } ).then(
          (user) => resolve( { key: "somekey", role: "someRole", age: user.age, joinedAt: user.joinedAt }));
      });
    }
  }
}

export default resolvers;
