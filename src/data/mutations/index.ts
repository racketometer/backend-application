export * from "./changePassword";
export * from "./createAutoUser";
export * from "./createUser";

import {
  changePassword,
  createAutoUser,
  createUser,
} from "./";

export const mutations = {
  changePassword,
  createAutoUser,
  createUser,
};
