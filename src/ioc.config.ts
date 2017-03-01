import { Container } from "inversify";

import { MongoConnector } from "./connectors/mongodb/mongoConnector";
import { GraphQLServer } from "./graphql";
import { TYPES } from "./ioc.types";
import { Server } from "./server";
import {
  AlgorithmMediator,
  AnalysisAlgorithm,
  AppConfig,
} from "./services";

export const container = new Container();

// Setup IoC mappings for all injectabletypes
container.bind<AppConfig>(TYPES.AppConfig)
  .to(AppConfig);
container.bind<AlgorithmMediator>(TYPES.AlgorithmMediator)
  .to(AlgorithmMediator);
container.bind<AnalysisAlgorithm>(TYPES.AnalysisAlgorithm)
  .to(AnalysisAlgorithm);
container.bind<Server>(TYPES.Server)
  .to(Server)
  .inSingletonScope();
container.bind<GraphQLServer>(TYPES.GraphQLServer)
  .to(GraphQLServer)
  .inSingletonScope();
container.bind<MongoConnector>(TYPES.MongoConnector)
  .to(MongoConnector)
  .inSingletonScope();
