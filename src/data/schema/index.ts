// Import schema definition
const SchemaDefinition = require("./schemaDefinition.graphql");

// Import query and mutation
const RootQuery = require("./query.graphql");
const RootMutation = require("./mutation.graphql");
const MutationViewer = require("./mutationViewer.graphql");

// Import types
const User = require("./user.graphql");
const Measurement = require("./measurement.graphql");
const Viewer = require("./viewer.graphql");

export default [SchemaDefinition, RootQuery, RootMutation, User, Measurement, Viewer, MutationViewer];
