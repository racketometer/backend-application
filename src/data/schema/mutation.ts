const RootMutation = `
  type Mutation {
    createUser(
      email: String!
      password: String!
    ): User
    createAutoUser(
      user: AutoUser!
    ): User
  }
`;

export default RootMutation;
