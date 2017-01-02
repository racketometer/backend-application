export const rootQuerySchema = `
  # List of possible queries
  type Query {
    # Get the current viewer
    viewer(
      # Authentication token
      token: String!
    ): Viewer

    # Authenticate user
    login(
      email: String!,
      password: String!
    ): Viewer
  }
`;
