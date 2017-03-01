import { Express } from "express";
import { graphiqlExpress, graphqlExpress } from "graphql-server-express";
import { makeExecutableSchema } from "graphql-tools";
import { inject, injectable } from "inversify";
import OpticsAgent from "optics-agent";

import { TYPES } from "./ioc.types";
import { Resolvers } from "./resolvers";
import { aggregatedSchemas } from "./schemas";
import { AppConfig } from "./services";

@injectable()
export class GraphQLServer {
  private app: Express;
  public set express(value: Express) {
    this.app = value;
  }

  private port: number;

  constructor(@inject(TYPES.AppConfig) config: AppConfig) {
    this.port = config.graphQLPort;
   }

  public start(): void {
    const resolvers = new Resolvers();

    const executableSchema = makeExecutableSchema({
      typeDefs: aggregatedSchemas,
      resolvers: resolvers.getAll(),
      resolverValidationOptions: { requireResolversForNonScalar: false },
    });
    OpticsAgent.instrumentSchema(executableSchema);

    this.app.use(OpticsAgent.middleware());

    this.app.use("/graphql", graphqlExpress((req) => {
      return {
        schema: executableSchema,
        context: { opticsContext: OpticsAgent.context(req) },
      };
    }));

    this.app.use("/graphiql", graphiqlExpress({
      endpointURL: "/graphql",
    }));

    this.app.listen(this.port, () => {
      console.log(`GraphQL Server is now running on http://localhost:${this.port}/graphql`);
      console.log(`GraphiQL Server is now running on http://localhost:${this.port}/graphiql`);
    });
  }
}
