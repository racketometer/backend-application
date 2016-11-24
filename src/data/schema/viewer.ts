const viewer = `
  # Queries restricted by viewer
  type Viewer {
    _id: String
    token: String
    user: User
    measurements(userId: String): [ Measurement ]
  }
`;

export default viewer;
