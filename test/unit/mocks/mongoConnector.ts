import { DocumentQuery, Model } from "mongoose";

import { IUserModel } from "../../../src/connectors/mongodb/user";

export class FakeMongoConnector {
  public users = {
    findById: (_) => Promise.resolve<IUserModel>(undefined) as any as DocumentQuery<IUserModel, IUserModel>,
    findOne: () => Promise.resolve<IUserModel>(undefined) as any as DocumentQuery<IUserModel, IUserModel>,
    findByIdAndUpdate: () => Promise.resolve<IUserModel>(undefined) as any as DocumentQuery<IUserModel, IUserModel>,
    create: () => Promise.resolve<IUserModel>(undefined),
  } as Model<IUserModel>;
}
