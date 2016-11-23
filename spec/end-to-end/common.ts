import * as sinon from "sinon";
import * as http from "http";
import { expect } from "chai";
import { server } from "../../src/server";

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

describe("Integration test", function () {
  this.timeout(10000);

  before((done) => {
    console.log("--- BEFORE!!! ---");
    server.listen(3000, "localhost");
    server.on("listening", function () {
      setTimeout(function () {
        // waiting for seeding to happen
        done();
      }, 2000);
    });
  });

  after(() => {
    console.log("--- AFTER!!! ---");
    server.close();
  });

  require("./login.spec");
  require("./viewer.spec");

});
