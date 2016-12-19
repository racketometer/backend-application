import { Measurement } from "./measurement";
import { Mutation, MutationViewer } from "./mutations";
import { Query } from "./query";
import { User } from "./user";
import { Viewer } from "./viewer";

export class Resolvers {
  public getAll(): any {
    return {
      Query,
      Mutation,
      MutationViewer,
      User,
      Measurement,
      Viewer,
    };
  }
}
