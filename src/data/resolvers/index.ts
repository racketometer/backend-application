import { Mutation, MutationViewer } from "./mutations";
import { Query } from "./query";
import { Viewer } from "./viewer";
import { Measurement } from "./measurement";
import { User } from "./user";

const resolvers = {
  Query,
  Mutation,
  MutationViewer,
  User,
  Measurement,
  Viewer,
};

export default resolvers;
