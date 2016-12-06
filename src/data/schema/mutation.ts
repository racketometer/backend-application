const mutation = `
  # List of possible mutations
  type Mutation {
    # Get the current viewer
    viewer(
      # Authentication token
      token: String!
    ): MutationViewer
  }
`;

export default mutation;
