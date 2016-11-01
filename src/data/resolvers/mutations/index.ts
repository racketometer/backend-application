export * from "./changePassword";
export * from "./createAutoUser";
export * from "./createUser";
export * from "./mutation";

import {
  changePassword,
  createAutoUser,
  createUser,
  viewer,
} from "./";

export const MutationViewer = {
  changePassword,
  createAutoUser,
  createUser,
};

export const Mutation = {
  viewer,
};
