import * as http from "http";
import * as Mongoose from "mongoose";
import * as sinon from "sinon";
import { server } from "../../src/server";

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

describe("Integration test", () => {
  this.timeout(10000);

  before((done) => {
    server.listen(3000, "localhost");
    server.on("listening", () => {
      setTimeout(() => {
        // waiting for seeding to happen
        done();
      }, 2500);
    });
  });

  after(() => {
    server.close();
    Mongoose.disconnect();
  });

  require("./login.spec");
  require("./viewer.spec");

});
