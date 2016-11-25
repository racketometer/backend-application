
import { User as db } from "../../src/data/connectors";
import { User, IUser } from "../../src/data/models";
import * as sinon from "sinon";
import { expect } from "chai";

// inspiration to mock sinon date found her:
// http://stackoverflow.com/questions/31591098/how-do-i-stub-new-date-using-sinon

describe("Models: User", () => {
  let sandbox: Sinon.SinonSandbox;
  let clock: Sinon.SinonFakeTimers;
  let today: Date = new Date();
  let email = "mymail@test.dk";
  let token = "30213n0ek0x";
  let id = "thisisanid";

  let ret: IUser = {
    displayName: "test",
    firstName: "test",
    lastName: "test",
    email: "hho",
    password: "nono",
    updatedAt: new Date("2016-11-15T13:29:25.575Z"),
  };

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    clock = sinon.useFakeTimers(today.getTime());
  });

  afterEach(() => {
    sandbox.restore();
    clock.restore();
  });

  it("Setup: Test that updatedAt is not equals today", () => {
    expect(ret.updatedAt).is.not.eq(today);
  });

  it("User.findOneById: findById have been called with id", () => {
    const spy = sandbox.spy(db, "findById");
    User.findOneById(id);

    expect(spy.calledWith(id)).to.be.true;
  });

  it("User.findOneByToken: findOne have been called with token", () => {
    const spy = sandbox.spy(db, "findOne");
    User.findOneByToken(token);

    expect(spy.calledWith({ token })).to.be.true;
  });

  it("User.findOneByEmail: findOne have been called with email", () => {
    const spy = sandbox.spy(db, "findOne");
    User.findOneByEmail(email);

    expect(spy.calledWith({ email })).to.be.true;
  });

  it("User.create: updatedAt is set", () => {
    User.create(ret).then((updated) => {
      expect(updated.updatedAt).eq(today);
    });
  });

  it("User.create: create have been called", () => {
    const spy = sandbox.spy(db, "create");
    var test = User.create(ret);
    expect(spy.called).to.be.true;
  });

  it("User.save: updatedAt is set", () => {
    User.save(ret).then((updated) => {
      expect(updated.updatedAt).eq(today);
    });
  });

  it("User.save: findByIdAndUpdate have been called", () => {
    const spy = sandbox.spy(db, "findByIdAndUpdate");
    User.save(ret);

    expect(spy.called).to.be.true;
  });
});
