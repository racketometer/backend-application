import * as express from "express";
import * as mongoose from "mongoose";
import { apolloExpress, graphiqlExpress } from "apollo-server";
import { makeExecutableSchema } from "graphql-tools";
import { json } from "body-parser";
import Schema from "./data/schema";
import Resolvers from "./data/resolvers";
import { MongooseConnection } from "./data/connectors";

import { AlgorithmMediator } from "./algorithms";

const GRAPHQL_PORT = 8080;

(mongoose as any).Promise = global.Promise;

const graphQLServer = express();

const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers,
  resolverValidationOptions: { requireResolversForNonScalar: false },
});

graphQLServer.use("/graphql", json(), apolloExpress({
  schema: executableSchema,
}));

graphQLServer.use("/graphiql", graphiqlExpress({
  endpointURL: "/graphql",
}));

graphQLServer.listen(GRAPHQL_PORT, () => {
  console.log(`GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`);
  console.log(`GraphiQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphiql`);

  MongooseConnection.then(() => {
    const algorithmMediator = new AlgorithmMediator();
    algorithmMediator.getAnalysis();
  });
});
