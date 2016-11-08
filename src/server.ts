import * as express from "express";
import * as mongoose from "mongoose";
import { graphqlExpress, graphiqlExpress } from "graphql-server-express";
import { makeExecutableSchema } from "graphql-tools";
import * as bodyParser from "body-parser";
import Schema from "./data/schema";
import Resolvers from "./data/resolvers";
import { MongooseConnection } from "./data/connectors";

import OpticsAgent from "optics-agent";

import { AlgorithmMediator } from "./algorithms";

const GRAPHQL_PORT = 8080;

(mongoose as any).Promise = global.Promise;

const app = express();

const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers,
  resolverValidationOptions: { requireResolversForNonScalar: false },
});

OpticsAgent.instrumentSchema(executableSchema);

app.use(OpticsAgent.middleware());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/graphql", graphqlExpress((req) => {

  return {
    schema: executableSchema,
    context: { opticsContext: OpticsAgent.context(req) },
  };
}));

app.use("/graphiql", graphiqlExpress({
  endpointURL: "/graphql",
}));

app.listen(GRAPHQL_PORT, () => {
  console.log(`GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`);
  console.log(`GraphiQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphiql`);

  MongooseConnection.then(() => {
    const algorithmMediator = new AlgorithmMediator();
    algorithmMediator.getAnalysis();
  });
});
