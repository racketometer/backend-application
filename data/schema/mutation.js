const RootMutation = `
  type Mutation {
    createUser(
      email: String!
      password: String!
    ): User
  }
`

export default RootMutation;