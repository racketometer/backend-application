
import * as request from "request";
import * as sinon from "sinon";
import { expect } from "chai";

describe("Hello World Server", function () {
  const baseUrl = "http://localhost:8080/graphql";

  const payload = JSON.stringify({
    params: {
      email: "johnny@test.dk",
      password: "1234",
    },
    query: `
    query login ($email: em, $password: pw) {
      login(email: $email, password: $password) {
        _id,
      }
    }
  `,
  });

  describe("GET /", function () {
    it("returns status code 200", function (done) {
      request.post(baseUrl, payload, function (error, response, body) {
        console.log("RESPONSE: " + body);
        expect(body).eq("Hello World");
        done();
      })
    });

    // it("returns Hello World", function (done) {
    //   request.post(baseUrl, payload, function (error, response, body) {
    //     expect(body).eq("Hello World");
    //     done();
    //   });
    // });
  });
});
