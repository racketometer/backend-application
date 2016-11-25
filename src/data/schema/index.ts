// Import schema definition
import SchemaDefinition from "./schemaDefinition";

// Import query and mutation
import RootQuery from "./query";
import RootMutation from "./mutation";
import MutationViewer from "./mutationViewer";

// Import types
import User from "./user";
import Measurement from "./measurement";
import Viewer from "./viewer";

export default [SchemaDefinition, RootQuery, RootMutation, User, Measurement, Viewer, MutationViewer];
