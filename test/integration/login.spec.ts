import { expect } from "chai";
import { XMLHttpRequest } from "xmlhttprequest";

const baseUrl = "http://localhost:8080/graphql";

const payload = JSON.stringify({
  query: `
    query login {
      login(email: "athlete@test.dk", password: "1234") {
        _id
      }
    }
  `,
});

const payloadWrongPassword = JSON.stringify({
  query: `
    query login {
      login(email: "athlete@test.dk", password: "1111") {
        _id
      }
    }
  `,
});

describe("query Login", () => {

  it("returns status code 200", (done) => {
    let request = new XMLHttpRequest();
    request.onload = () => {
      expect(request.status).eq(200);
      done();
    };
    request.open("POST", baseUrl);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(payload);
  });

  it("returns user with _id field", (done) => {
    let request = new XMLHttpRequest();
    request.onload = () => {
      expect(request.responseText._id).to.not.be.null;
      done();
    };
    request.open("POST", baseUrl);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(payload);
  });

  it("returns null when passing wrong password", (done) => {
    let request = new XMLHttpRequest();
    request.onload = () => {
      let obj = JSON.parse(request.responseText);
      expect(obj.data.login).to.be.null;
      done();
    };
    request.open("POST", baseUrl);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(payloadWrongPassword);
  });
});
