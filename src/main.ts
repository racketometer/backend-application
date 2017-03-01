import "reflect-metadata";

import { container } from "./ioc.config";
import { TYPES } from "./ioc.types";
import { Server } from "./server";

export const server = container.get<Server>(TYPES.Server);
