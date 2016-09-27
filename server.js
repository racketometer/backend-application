import express from 'express';
import { apolloExpress, graphiqlExpress } from 'apollo-server';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import bodyParser from 'body-parser';
import Schema from './data/schema';
import Resolvers from './data/resolvers';

const GRAPHQL_PORT = 8080;

var graphQLServer = express();

const executableSchema =  makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers,
  allowDefaultResolve: true,
  resolverValidationOptions: { requireResolversForNonScalar: false }
});

graphQLServer.use('/graphql', bodyParser.json(), apolloExpress({
  schema: executableSchema,
}));

graphQLServer.use('/graphiql', graphiqlExpress({
  endpointURL: "/graphql",
}));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
));
