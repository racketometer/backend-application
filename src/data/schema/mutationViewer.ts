const mutationViewer = `
  # Mutations restricted by viewer
  type MutationViewer {

    # Create a user with a specific email and password
    createUser(
      email: String!
      password: String!
    ): User

    # Create a user with an autogenerated password which is emailed to the provided email address
    createAutoUser(
      user: AutoUser!
    ): User

    # Change a users password
    changePassword(
      oldPassword: String!
      newPassword: String!
    ): User

    # Logout: returns true if successful
    logout: Boolean
  }
`;

export default mutationViewer;
