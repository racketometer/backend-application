const User = `
  type User {
    displayName: String,
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    isConsultant: Boolean,  
    isCoach: Boolean,
    birthday: String,
    startedPlaying: String,
    coaches: [String],
    friends: [String],
    createdAt: String,
    updatedAt: String
  }
`

const UserRef = `
  type UserRef {
    _id: String,
    name: String
  }
`

export default User;