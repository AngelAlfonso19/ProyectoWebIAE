const mongoose = require('./mongodb-connect')

let assignmentSchema = mongoose.Schema({
    SubjectID: {
      type: Number,
      required: true,
    },
    TeacherID: {
        type: Number,
        required: true
      },
    SubjectName: {
        type: String,
        required: true
    },
    Score: {
        type: Number,
        required: true
    },
    AvailableTime: {
        type: String,
        required: true
    }
  })

  let Assignment = mongoose.model('Assignment', assignmentSchema)

  module.exports = Assignment;