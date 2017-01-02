import { Express } from "express";
import { graphiqlExpress, graphqlExpress } from "graphql-server-express";
import { makeExecutableSchema } from "graphql-tools";
import OpticsAgent from "optics-agent";
import { Resolvers } from "./resolvers";
import { aggregatedSchemas } from "./schemas";

export class GraphQLServer {
  constructor(app: Express, port: number) {

    const resolvers = new Resolvers();

    const executableSchema = makeExecutableSchema({
      typeDefs: aggregatedSchemas,
      resolvers: resolvers.getAll(),
      resolverValidationOptions: { requireResolversForNonScalar: false },
    });
    OpticsAgent.instrumentSchema(executableSchema);

    app.use(OpticsAgent.middleware());

    app.use("/graphql", graphqlExpress((req) => {
      return {
        schema: executableSchema,
        context: { opticsContext: OpticsAgent.context(req) },
      };
    }));

    app.use("/graphiql", graphiqlExpress({
      endpointURL: "/graphql",
    }));

    app.listen(port, () => {
      console.log(`GraphQL Server is now running on http://localhost:${port}/graphql`);
      console.log(`GraphiQL Server is now running on http://localhost:${port}/graphiql`);
    });
  }
}
