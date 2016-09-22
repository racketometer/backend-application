import express from 'express';
import { apolloExpress, graphiqlExpress } from 'apollo-server';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import bodyParser from 'body-parser';
import Schema from './data/schema';
import Mocks from './data/mocks';
import Resolvers from './data/resolvers';

const GRAPHQL_PORT = 8080;

var graphQLServer = express();

const executableSchema =  makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers,
  allowDefaultResolve: true
});

graphQLServer.use('/graphql', bodyParser.json(), apolloExpress({
  schema: executableSchema,
}));

graphQLServer.use('/graphql', graphiqlExpress({
  endpointURL: "/graphql",
}));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`
));
