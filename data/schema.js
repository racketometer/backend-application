const typeDefinitions = `

type User {
  username: String
  email: String
  password: String
  key: String
  role: String
  age: Int
  joinedAt: String
}

# the schema allows the following two queries:
type Query {
  login(
    email: String!,
    password: String!
  ): User
}

# this schema allows the following mutations:
type Mutation {
  createUser(
    email: String!
    password: String!
  ): User
}

# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
schema {
  query: Query
  mutation: Mutation
}
`;

export default [typeDefinitions];
