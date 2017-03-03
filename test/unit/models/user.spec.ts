import { expect } from "chai";
import { Model } from "mongoose";
import "reflect-metadata";
import * as sinon from "sinon";

import { IUserModel } from "../../../src/connectors/mongodb/user";
import { container } from "../../../src/ioc.config";
import { TYPES } from "../../../src/ioc.types";
import { IUser, User } from "../../../src/models";
import { FakeMongoConnector } from "../mocks/mongoConnector";

// inspiration to mock sinon date found her:
// http://stackoverflow.com/questions/31591098/how-do-i-stub-new-date-using-sinon

describe("Models.User", () => {
  let sandbox: sinon.SinonSandbox;
  let clock: sinon.SinonFakeTimers;
  let today: Date;
  let user: IUser;
  let db: Model<IUserModel>;

  beforeEach(() => {
    container.unbind(TYPES.MongoConnector);
    const connector = new FakeMongoConnector();
    container.bind(TYPES.MongoConnector).toConstantValue(connector);
    db = connector.users;
    sandbox = sinon.sandbox.create();
    today = new Date();
    clock = sinon.useFakeTimers(today.getTime());
    user = {
      _id: "someid",
      displayName: "test",
      firstName: "test",
      lastName: "test",
      email: "hho",
      password: "nono",
      updatedAt: new Date(today),
    };
    user.updatedAt.setHours(today.getHours() - 1);
  });

  afterEach(() => {
    sandbox.restore();
    clock.restore();
  });

  describe("findOneById()", () => {
    it("should call findById with id", () => {
      const id = "thisisanid";
      const spy = sandbox.spy(db, "findById");

      User.findOneById(id);

      expect(spy.calledWith(id)).to.be.true;
    });
  });

  describe("findOneByToken()", () => {
    it("should call findOne with token", () => {
      const token = "30213n0ek0x";
      const spy = sandbox.spy(db, "findOne");

      User.findOneByToken(token);

      expect(spy.calledWith({ token })).to.be.true;
    });
  });

  describe("findOneByEmail()", () => {
    it("should call findOne with email", () => {
      const email = "mymail@test.dk";
      const spy = sandbox.spy(db, "findOne");

      User.findOneByEmail(email);

      expect(spy.calledWith({ email })).to.be.true;
    });
  });

  describe("create()", () => {
    it("should call create", () => {
      const spy = sandbox.spy(db, "create");

      User.create(user);

      expect(spy.called).to.be.true;
    });
  });

  describe("save()", () => {
    it("should set updatedAt", () => {
      const spy = sandbox.spy(db, "findByIdAndUpdate");
      delete user.updatedAt;

      User.save(user);

      expect(spy.getCall(0).args[0]).to.be.eq(user._id);
      expect(spy.getCall(0).args[1].updatedAt).not.to.be.undefined;
    });

    it("should call findByIdAndUpdate", () => {
      const spy = sandbox.spy(db, "findByIdAndUpdate");

      User.save(user);

      expect(spy.called).to.be.true;
    });
  });
});
