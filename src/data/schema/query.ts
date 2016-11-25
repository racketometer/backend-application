const query = `
  # List of possible queries
  type Query {
    viewer(
      token: String!
    ): Viewer

    login(
      email: String!,
      password: String!
    ): Viewer
  }
`;

export default query;
