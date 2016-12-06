const measurement = `
  # Measurements are data recordings from a single session
  type Measurement {
    # Date of measurement recording
    date: String,
    # Measurement uploaded by this user
    uploadedBy: User,
    # Raw measurement data
    data: [[Int]],
    # Calculated number of strokes
    strokes: Int,
    # Calculated stroke types
    strokeType: [String],
    # Calculated maximum racket speed
    maxRacketSpeed: Int,
    # Calculated maximum shuttlecock speed
    maxShuttlecockSpeed: Int,
    # Measurement recorded with this sensor number
    sensorNo: String,
    # Measurement recorded with this racket type
    racketType: String,
    # Calculated with this algorithm version
    algorithmVersion: String,
    # Session performed by this user
    user: User,
    # Measurement created at this date
    createdAt: String,
    # Measurement updated at this date
    updatedAt: String
  }
`;

export default measurement;
