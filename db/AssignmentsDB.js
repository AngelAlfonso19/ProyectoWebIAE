const mongoose = require('./mongodb-connect')

let assignmentSchema = mongoose.Schema({
    subjectID: {
      type: Number,
      required: true,
    },
    teacherID: {
        type: Number,
        required: true
      },
    subjectName: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    availableTime: {
        type: String,
        required: true
    }
  })

  let userSchema = mongoose.Schema({
    userID:{
        type: Number,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
   },
   lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    collegeMajor:{
        type: String,
        required: true,
    },
    department:{
        type: String,
        required: true,
    },
    registerDate:{
        type: Date,
        required: true,
    },
    typo:{
        type: Number,
        required: true,
    },
    allowLessons:{
        type: Boolean,
        required: true,
    },
    token:{
        type: String,
        required: true,
    }
})


  assignmentSchema.statics.createAssignment = (assignmentData) =>{
    //assignmentData.SubjectID = Date.now();
    //assignmentData.TeacherID = 0;
    console.log(assignmentData);
    let newAssignment = Assignment(assignmentData);
    return newAssignment.save()
  }

  userSchema.statics.getTeachers = () =>{
    return Users.find({typo:3})
  }
  let Users = mongoose.model('Users', assignmentSchema)
  let Assignment = mongoose.model('Assignment', assignmentSchema)

  function createAssignment(assignment){
    let assignmentMongo = Assignment(assignment);

    assignmentMongo.save()
    .then((resp)=> console.log(resp))
    .catch((err)=> console.log("Ocurrió un error", err))    
}

Assignment.createAssignment = createAssignment;
module.exports = Users;
module.exports = Assignment;