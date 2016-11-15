declare module 'optics-agent' {
  export function configureAgent(options: any): void;
  export function instrumentSchema(schema: any): any;
  export function middleware(): any;
  export function instrumentHapiServer(server: any): any;
  export function context(req: any): any;
  export const Agent: any;

  export default {
    configureAgent,
    instrumentSchema,
    middleware,
    instrumentHapiServer,
    context,
    Agent
  }
}
