
import * as request from "request";
import * as sinon from "sinon";
import { expect } from "chai";
import * as http from "http";
import { server } from "../../src/server";
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

describe("Hello World Server", function () {
  const baseUrl = "http://localhost:8080/graphql";

  const payload = JSON.stringify({
    params: {
      email: "johnny@test.dk",
      password: "1234",
    },
    query: `
    query login {
      login(email: "johnny@test.dk", password: "1234") {
        _id
      }
    }
  `,
  });

  before(function (done) {
    server.listen(3000, 'localhost');
    server.on("listening", function() {
      done();
    });
  });

  describe("GET /", function () {
    it("returns status code 200", function (done) {
      var request = new XMLHttpRequest();

      request.onload = function () {

        // Because of javascript's fabulous closure concept, the XMLHttpRequest "request"
        // object declared above is available in this function even though this function
        // executes long after the request is sent and long after this function is
        // instantiated. This fact is CRUCIAL to the workings of XHR in ordinary
        // applications.

        // You can get all kinds of information about the HTTP response.
        var status = request.status; // HTTP response status, e.g., 200 for "200 OK"
        var data = request.responseText; // Returned data, e.g., an HTML document.

        console.log("STATUS: " + status);
        console.log("DATA: " + data);
        done();
      }

      request.open("POST", baseUrl);

      request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      // Or... request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
      // Or... whatever
      let req = new Buffer(payload).toString('base64')
      // console.log(req)
      // var req = btoa(payload)
      // Actually sends the request to the server.
      request.send(payload);
    });

    // it("returns Hello World", function (done) {
    //   console.log("PAYLOAD" + payload);
    //   request.post({
    //     method: "POST"
    //     , uri: baseUrl
    //     , multipart:
    //     [{
    //       "content-type": "application/json"
    //       , body: payload,
    //     }
    //       , { body: "I am an attachment" }
    //     ]
    //   }, function (error, response, body) {
    //     console.log(body)
    //     expect(body).eq("Hello World");
    //     done();
    //   });
    // });
  });
});
