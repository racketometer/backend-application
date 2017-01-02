// Import schema definition
import { rootSchema } from "./rootSchema";

// Import query and mutation
import { rootMutationSchema } from "./mutation";
import { mutationViewerSchema } from "./mutationViewer";
import { rootQuerySchema } from "./query";

// Import types
import { measurementSchema } from "./measurement";
import { userSchema } from "./user";
import { viewerSchema } from "./viewer";

export const aggregatedSchemas = [
  rootSchema,
  rootQuerySchema,
  rootMutationSchema,
  userSchema,
  measurementSchema,
  viewerSchema,
  mutationViewerSchema,
];
