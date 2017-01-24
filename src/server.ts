import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import * as mongoose from "mongoose";

import { MongoConnector } from "./connectors";
import { GraphQLServer } from "./graphql";
import { AlgorithmMediator, AppConfig } from "./services";

// Set mongoose promise implementation to native Node promises
(mongoose as any).Promise = global.Promise;

export class Server {
  /**
   * Express server instance.
   */
  public expressServer: express.Express;

  private readonly appConfig: AppConfig;

  /**
   * Server entry point.
   */
  constructor() {
    this.appConfig = new AppConfig();
    this.expressServer = express();
    this.setupMiddleware();

    const mongoConnector = new MongoConnector(this.appConfig.mongoDbUrl, this.appConfig.isDevelopment);
    mongoConnector.mongooseConnection
      .then(() => {
        const graphqlServer = new GraphQLServer(this.expressServer, this.appConfig.graphQLPort);

        const algorithmMediator = new AlgorithmMediator();
        algorithmMediator.getAnalysis();
      });
  }

  private setupMiddleware(): void {
    this.expressServer.use(cors());
    this.expressServer.use(bodyParser.urlencoded({ extended: true }));
    this.expressServer.use(bodyParser.json());
  }
}

export const server = new Server();
