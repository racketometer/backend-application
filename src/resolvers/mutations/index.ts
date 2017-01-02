export * from "./changePassword";
export * from "./createAutoUser";
export * from "./createUser";
export * from "./viewer";
export * from "./logout";

import {
  changePassword,
  createAutoUser,
  createUser,
  logout,
  viewer,
} from "./";

export const MutationViewer = {
  changePassword,
  createAutoUser,
  createUser,
  logout,
};

export const Mutation = {
  viewer,
};
