// Type definitions for optics-agent 1.0
// Project: https://github.com/apollostack/optics-agent-js
// Definitions by: Crevil <https://github.com/crevil>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import { GraphQLSchema } from "graphql";
import { Request, Response } from "express";

declare namespace OpticsAgent {
  export interface Options {
    /**
     * Your API key for the Optics service.
     *
     * This defaults to the OPTICS_API_KEY environment variable, but can be overridden here.
     */
    apiKey?: string;

    /**
     * Called to determine the query shape for for a GraphQL query.
     *
     * You shouldn't need to set this unless you are debugging.
     */
    normalizeQuery?: (graphQLResolveInfo: any) => string;
    /**
     * Where to send the reports. Defaults to the production Optics endpoint, or the OPTICS_ENDPOINT_URL environment variable if it is set.
     *
     * You shouldn't need to set this unless you are debugging.
     */
    endpointUrl?: string;

    /**
     * HTTP proxy to use when sending reports. Default to no proxying, or the HTTPS_PROXY environment variable if it is set.
     *
     * You should only set this when your servers cannot connect directly to the Optics service.
     */
    proxyUrl?: string;

    /**
     * How often to send reports in milliseconds. Defaults to 1 minute. Minimum 10 seconds.
     *
     * You shouldn't need to set this unless you are debugging.
     */
    reportIntervalMs?: number;
    /**
     * Print a JSON version of reports as they are sent. This may be useful for debugging. Defaults to false.
     */
    printReports?: boolean;
    /**
     * Send detailed traces along with usage reports. Defaults to true.
     */
    reportTraces?: boolean;
    /**
     * Send the query variables along with traces. Defaults to true.
     */
    reportVariables?: boolean;
  }

  export class Agent {
    constructor(options: OpticsAgent.Options);

    configureAgent(options: OpticsAgent.Options): Agent;
    instrumentSchema(schema: GraphQLSchema): void;
    middleware(): (req: Request, res: Response, next?: any) => void;
    instrumentHapiServer(server: any): void;
    context(req: Request): any;
  }
}

export function configureAgent(options: OpticsAgent.Options): OpticsAgent.Agent;
export function instrumentSchema(schema: GraphQLSchema): void;
export function middleware(): (req: Request, res: Response, next?: any) => void;
export function instrumentHapiServer(server: any): void;
export function context(req: Request): any;

export default {
  configureAgent,
  instrumentSchema,
  middleware,
  instrumentHapiServer,
  context,
  Agent: OpticsAgent.Agent,
};
