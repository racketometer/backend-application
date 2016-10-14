const UserRef = `
  type UserRef {
    _id: String,
    name: String
  }
`;

const User = `
  type User {
    _id: String,
    displayName: String,
    email: String,
    firstName: String,
    lastName: String,
    isConsultant: Boolean,
    isCoach: Boolean,
    allowSharing: Boolean,
    birthday: String,
    startedPlaying: String,
    coaches: [ UserRef ],
    friends: [ UserRef ],
    createdAt: String,
    updatedAt: String,
    measurements: [ Measurement ]
  }
`;

const AutoUser = `
  input AutoUser {
    firstName: String!,
    lastName: String!,
    email: String!,
    birthday: String!,
    startedPlaying: String!,
    allowSharing: Boolean!
  }
`;

export default () => [UserRef, User, AutoUser];
