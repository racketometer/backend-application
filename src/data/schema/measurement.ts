const measurement = `
  # Measurements are data recordings from a single session
  type Measurement {
    date: String,
    uploadedBy: User,
    data: [[Int]],
    strokes: Int,
    strokeType: [String],
    maxRacketSpeed: Int,
    maxShuttlecockSpeed: Int,
    sensorNo: String,
    racketType: String,
    algorithmVersion: String,
    user: User,
    createdAt: String,
    updatedAt: String
  }
`;

export default measurement;