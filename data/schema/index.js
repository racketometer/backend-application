// Import schema definition
import SchemaDefinition from "./schemaDefinition";

// Import query and mutation
import RootQuery from "./query";
import RootMutation from "./mutation";

// Import types
import User from "./user"
import Measurement from "./measurement"

export default [SchemaDefinition, RootQuery, RootMutation, User, Measurement];