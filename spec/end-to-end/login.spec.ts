
import * as sinon from "sinon";
import { expect } from "chai";
import * as http from "http";
import { server } from "../../src/server";
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

describe("Integration test", function () {
  const baseUrl = "http://localhost:8080/graphql";

  this.timeout(4000);

  const payload = JSON.stringify({
    query: `
    query login {
      login(email: "johnny@test.dk", password: "1234") {
        _id
      }
    }
  `,
  });

  const payloadWrongPassword = JSON.stringify({
    query: `
    query login {
      login(email: "johnny@test.dk", password: "1111") {
        _id
      }
    }
  `,
  });

  before(function (done) {
    server.listen(3000, "localhost");
    server.on("listening", function () {
      setTimeout(function () {
        // waiting for seeding to happen
        done();
      }, 1200);
    });
  });

  describe("query Login", function () {

    it("returns status code 200", function (done) {
      let request = new XMLHttpRequest();
      request.onload = function () {
        expect(request.status).eq(200);
        done();
      };
      request.open("POST", baseUrl);
      request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      request.send(payload);
    });

    it("returns user with _id field", function (done) {
      let request = new XMLHttpRequest();
      request.onload = function () {
        expect(request.responseText._id).to.not.be.null;
        done();
      };
      request.open("POST", baseUrl);
      request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      request.send(payload);
    });

    it("returns null when passing wrong password", function (done) {
      let request = new XMLHttpRequest();
      request.onload = function () {
        let obj = JSON.parse(request.responseText);
        expect(obj.data.login).to.be.null;
        done();
      };
      request.open("POST", baseUrl);
      request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      request.send(payloadWrongPassword);
    });

  });
});
