const RootQuery = `
  type Query {
    login(
      email: String!,
      password: String!
    ): User
  }
`

export default RootQuery;