import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import { inject, injectable } from "inversify";

import { MongoConnector } from "./connectors";
import { GraphQLServer } from "./graphql";
import { TYPES } from "./ioc.types";
import { AlgorithmMediator, AppConfig } from "./services";

@injectable()
export class Server {
  /**
   * Express server instance.
   */
  public expressServer: express.Express;

  /**
   * Server entry point.
   */
  constructor(
    @inject(TYPES.AppConfig) private appConfig: AppConfig,
    @inject(TYPES.GraphQLServer) private graphqlServer: GraphQLServer,
    @inject(TYPES.AlgorithmMediator) private algorithmMediator: AlgorithmMediator,
    @inject(TYPES.MongoConnector) private mongoConnector: MongoConnector,
  ) {
    this.expressServer = express();
    this.setupMiddleware();

    this.mongoConnector.connect(this.appConfig.mongoDbUrl, this.appConfig.isDevelopment);
    mongoConnector.mongooseConnection
      .then(() => {
        this.graphqlServer.express = this.expressServer;
        this.graphqlServer.start();
        this.algorithmMediator.getAnalysis();
      });
  }

  private setupMiddleware(): void {
    this.expressServer.use(cors());
    this.expressServer.use(bodyParser.urlencoded({ extended: true }));
    this.expressServer.use(bodyParser.json());
  }
}
