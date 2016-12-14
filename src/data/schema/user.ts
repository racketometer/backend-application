const user = `
  # User type representing players, coaches and consultants
  type User {
    # Unique user id.
    _id: String,
    # Optional user display name.
    displayName: String,
    # Indicate if password is autogenerated. If true, the password is auto generated.
    autoGenerated: Boolean,
    # User email address.
    email: String,
    # User's first name.
    firstName: String,
    # User's last name.
    lastName: String,
    # Indicate if user is consultant. If true, user is consultant.
    isConsultant: Boolean,
    # Indicate if user is coach. If true, user is coach.
    isCoach: Boolean,
    # Indicate if user has allowed anonymous data sharing.
    allowSharing: Boolean,
    # User's birthday.
    birthday: String,
    # Date of when the user started playing.
    startedPlaying: String,
    # List of coaches related to the user.
    coaches: [ User ],
    # List of friends
    friends: [ User ],
    # User created at this date
    createdAt: String,
    # User updated at this date
    updatedAt: String,
    # List of related measurements
    measurements: [ Measurement ]
  }

  # Input type for creating new users
  input AutoUser {
    # User's first name.
    firstName: String!,
    # User's last name.
    lastName: String!,
    # User email address.
    email: String!,
    # User's birthday.
    birthday: String!,
    # Date of when the user started playing.
    startedPlaying: String!,
    # Indicate if user has allowed anonymous data sharing.
    allowSharing: Boolean!
    # Indicate if user is a coach.
    isCoach: Boolean!
  }
`;

export default user;
