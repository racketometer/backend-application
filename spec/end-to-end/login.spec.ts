import * as sinon from "sinon";
import * as http from "http";
import { expect } from "chai";

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const baseUrl = "http://localhost:8080/graphql";

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

