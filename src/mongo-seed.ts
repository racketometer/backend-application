const data = {
  "users": {
    "_model": "User",
    "coach": {
      "displayName": "coach",
      "email": "coach@test.dk",
      "password": "1234",
      "firstName": "Johnny",
      "lastName": "Bravo",
      "isConsultant": "true",
      "isCoach": "true",
      "birthday": "2016-09-27T11:39:22.993Z",
      "startedPlaying": "2016-09-27T11:39:22.993Z",
      "coaches": [
        { },
      ],
      "friends": [
        { "name": "->users.johnny", "_id": "->users.johnny" },
      ],
    },
    "johnny": {
      "displayName": "jonny",
      "email": "johnny@test.dk",
      "password": "1234",
      "firstName": "Johnny",
      "lastName": "Bravo",
      "isConsultant": "false",
      "isCoach": "false",
      "birthday": "2016-09-27T11:39:22.993Z",
      "startedPlaying": "2016-09-27T11:39:22.993Z",
      "coaches": [
        { "name": "->users.coach", "_id": "->users.coach" },
      ],
      "friends": [
        { "name": "->users.coach.displayName", "_id": "->users.coach" },
      ],
    },
  },
  "measurements": {
    "_model": "Measurement",
    "measurement1": {
      "date": "2001-04-23",
      "uploadedBy": "->users.coach",
      "data": [123, 456, 789],
      "strokes": "123",
      "strokeType": [

      ],
      "maxRacketSpeed": "210",
      "maxShuttlecockSpeed": "300",
      "sensorNo": "123141",
      "racketType": "SuperRacket9000",
      "algorithmVersion": "0.1v",
      "user_id": "->users.johnny",
    },
  },
};

export default data;
