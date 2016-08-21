const typeDefinitions = `
type Login {
  username: String
  password: String
}

type User {
  key: String
  role: String
  age: Int
  joinedAt: String
}

# the schema allows the following two queries:
type Query {
  login(username: String, password: String): User
  users: [User]
}

# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
schema {
  query: Query
}
`;

export default [typeDefinitions];
