import { expect } from "chai";
import { request } from "./request";

const loginPayload = JSON.stringify({
  query: `
    query login {
      login(email: "athlete@test.dk", password: "1234") {
        _id
      }
    }
  `,
});

const wrongPasswordPayload = JSON.stringify({
  query: `
    query login {
      login(email: "athlete@test.dk", password: "1111") {
        _id
      }
    }
  `,
});

describe("query Login", () => {
  it("should return status code 200", () => {
    return request(loginPayload)
      .then((response) => {
        expect(response.message.statusCode).eq(200);
      });
  });

  it("should return user with _id field", () => {
    return request<{ login: { _id: string } }>(loginPayload)
      .then((response) => {
        expect(response.data.login._id).to.not.be.null;
      });
  });

  it("should return null when passing wrong password", () => {
    return request<{ login: null }>(wrongPasswordPayload)
      .then((response) => {
        expect(response.data.login).to.be.null;
      });
  });
});
