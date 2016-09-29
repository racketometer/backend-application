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
    birthday: String,
    startedPlaying: String,
    coaches: [ UserRef ],
    friends: [ UserRef ],
    createdAt: String,
    updatedAt: String,
    measurements: [ Measurement ]
  }
`;

export default () => [UserRef, User];
