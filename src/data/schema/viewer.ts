const viewer = `
  # Queries restricted by viewer
  type Viewer {
    # Current user's id
    _id: String
    # Authentication token
    token: String
    # Current user
    user: User
    # My user
    users(creatorId: String): [User]
    # User's measurements if no user id is provided. Otherwise the provided user id's measurements.
    measurements(userId: String): [ Measurement ]
  }
`;

export default viewer;
