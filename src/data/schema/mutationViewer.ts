const mutationViewer = `
  # Mutations restricted by viewer
  type MutationViewer {
    createUser(
      email: String!
      password: String!
    ): User

    createAutoUser(
      user: AutoUser!
    ): User

    changePassword(
      oldPassword: String!
      newPassword: String!
    ): User
    logout: Boolean
  }
`;

export default mutationViewer;
