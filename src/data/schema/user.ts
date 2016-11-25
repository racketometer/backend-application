const user = `
  type UserRef {
    _id: String,
    name: String
  }

  type User {
    _id: String,
    displayName: String,
    autoGenerated: Boolean,
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

  input AutoUser {
    firstName: String!,
    lastName: String!,
    email: String!,
    birthday: String!,
    startedPlaying: String!,
    allowSharing: Boolean!
  }
`;

export default user;
