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

describe("query Viewer", function () {

  let token: string;
  let id: string;
  let payloadViewer: string;

  beforeEach((done) => {
    let request = new XMLHttpRequest();
    request.onload = () => {
      const obj = JSON.parse(request.responseText)
      token = obj.data.login.token;
      id = obj.data.login._id;

      payloadViewer = JSON.stringify({
        query: `
          query viewer($token: String!, $userId: String!) {
            viewer(token: $token) {
              user {
                _id
              }
              measurements(userId: $userId) {
                date
              }
            }
          }
        `,
        variables: {
          token: token,
          userId: id,
        },
      });

      done();
    };

    request.open("POST", baseUrl);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(payload);

  });

  it("returns status code 200", function (done) {
    let request = new XMLHttpRequest();
    request.onload = () => {
      console.log(request);
      expect(request.status).eq(200);
      done();
    };
    request.open("POST", baseUrl);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(payloadViewer);
  });

  it("returns with a user model", function (done) {
    let request = new XMLHttpRequest();
    request.onload = () => {
      expect(JSON.parse(request.responseText).data.viewer.user._id).eq(id);
      done();
    };
    request.open("POST", baseUrl);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(payloadViewer);
  });

  it("can get measurements", function (done) {
    let request = new XMLHttpRequest();
    request.onload = () => {
      expect(JSON.parse(request.responseText).data.viewer.measurements).is.not.null;
      done();
    };
    request.open("POST", baseUrl);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(payloadViewer);
  });
});
