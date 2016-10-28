const RootMutation = `
  type Mutation {
    createUser(
      email: String!
      password: String!
    ): User
    createAutoUser(
      user: AutoUser!
    ): User
    changePassword(
      email: String!
      oldPassword: String!
      newPassword: String!
    ): User
  }
`;

export default RootMutation;
