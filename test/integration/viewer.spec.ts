import { expect } from "chai";
import { request } from "./request";

const loginPayload = JSON.stringify({
  query: `
    query login {
      login(email: "athlete@test.dk", password: "1234") {
        _id
        token
      }
    }
  `,
});

const viewerPayload = {
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
    token: undefined,
    userId: undefined,
  },
};

const viewerNoTokenPayload = {
  query: `
    query viewer($token: String!) {
      viewer(token: $token) {
        _id
      }
    }
  `,
  variables: {
    token: "someNonValidToken",
  },
};

describe("query Viewer", () => {
  let id: string;

  beforeEach(() => {
    return request<{ login: { _id: string, token: string } }>(loginPayload)
      .then((response) => {
        const token = response.data.login.token;
        id = response.data.login._id;

        viewerPayload.variables.token = token;
        viewerPayload.variables.userId = id;
      });
  });

  it("should return status code 200", () => {
    return request<void>(JSON.stringify(viewerPayload))
      .then((response) => {
        expect(response.message.statusCode).eq(200);
      });
  });

  it("should return user model", () => {
    return request<{ viewer: { user: { _id: string } } }>(JSON.stringify(viewerPayload))
      .then((response) => {
        expect(response.data.viewer.user._id).eq(id);
      });
  });

  it("should return measurements", () => {
    return request<{ viewer: { measurements: {} } }>(JSON.stringify(viewerPayload))
      .then((response) => {
        expect(response.data.viewer.measurements).is.not.null;
      });
  });

  it("should return viewer with null if not authorized", () => {
    return request<{ viewer: null }>(JSON.stringify(viewerNoTokenPayload))
      .then((response) => {
        expect(response.data.viewer).to.be.null;
      });
  });
});
