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


  assignmentSchema.statics.createAssignment = (assignmentData) =>{
    //assignmentData.SubjectID = Date.now();
    //assignmentData.TeacherID = 0;
    console.log(assignmentData);
    let newAssignment = Assignment(assignmentData);
    return newAssignment.save()
  }

  assignmentSchema.statics.SearchByID = (SubjectID) =>{
  return Assignment.findOne({SubjectID}/*,{_id:0, SubjectID:1, TeacherID:1, SubjectName: 1, Score:1, AvailableTime: 1}*/)
  }

  let Assignment = mongoose.model('assignments', assignmentSchema)

  function createAssignment(assignment){
    let assignmentMongo = Assignment(assignment);
    
    assignmentMongo.save()
    .then((resp)=> console.log(resp))
    .catch((err)=> console.log("Ocurrió un error", err))    
}

Assignment.createAssignment = createAssignment;
module.exports = Assignment;