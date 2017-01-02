import * as http from "http";
import * as Mongoose from "mongoose";
import * as sinon from "sinon";
import { server } from "../../src/server";

describe("Integration test", function () {
  let httpServer: http.Server;
  this.timeout(10000);

  before((done) => {
    httpServer = http.createServer(server.expressServer);
    httpServer.listen(3000, "localhost");
    httpServer.on("listening", () => {
      setTimeout(() => {
        done();
      }, 3000);
    });
  });

  after((done) => {
    Mongoose.disconnect(() => {
      httpServer.close(done);
    });
  });

  require("./login.spec");
  require("./viewer.spec");

});
