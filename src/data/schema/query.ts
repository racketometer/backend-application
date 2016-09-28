const RootQuery = `
  type Query {
    login(
      email: String!,
      password: String!
    ): User
    getMeasurements(
      userId: String!
    ): [Measurement]
  }
`;

export default RootQuery;
