const Measurement = `
  type Measurement {
    date: String,
    uploadedBy: String,
    data: [Int],
    strokes: Int,
    strokeType: [String],
    maxRacketSpeed: Int,
    maxShuttlecockSpeed: Int, 
    sensorNo: String,
    racketType: String,
    algorithmVersion: String,
    user_id: String,
    createdAt: String,
    updatedAt: String
  }
`

export default Measurement;