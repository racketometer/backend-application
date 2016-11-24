const mutation = `
  # List of possible mutations
  type Mutation {
    viewer(
      token: String!
    ): MutationViewer
  }
`;

export default mutation;
