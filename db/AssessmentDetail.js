const mongoose = require('./mongodb-connect'); 

let assessmentSchema = mongoose.Schema({
    AssessmentID:{
        type: String,
        required: true
    },
    SubjectID:{
        type: String,
        required: true
    },
    PollID:{
        type: String,
        required: true
   },
   AssessmentDate:{
        type: Date,
        required: true
    },
    AssessmentResult:{
        type: String,
        required: true
    }
})

assessmentSchema.statics.showAssessments = ()=>{
    return Assessment.find({})
}

// User.find({}, (err, docs)=>{
//     if(docs){
//         console.log(docs)
//     }

//     if(err){
//         console.log(err);
//     }
// })

async function getAssesmentAsync(){
    let docs = [];
    try{
        docs = await Assessment.find({});
        console.log(docs); 
    }catch(error){
        console.log("error", error)
    }
    return docs;
}

function createAssessment(assessment){
    let assessmentMongo = Assessment(assessment);
    
    assessmentMongo.save()
    .then((resp)=> console.log(resp))
    .catch((err)=> console.log("Ocurrió un error", err))    
}

let Assessment = mongoose.model('assessments', assessmentSchema);

//let newUser = {name:"Test", lastName:"Rmz", email:"is703804@iteso.mx", password:"1234", role:"Professor", collegeMajor:"Ing. en sistemas"}
// crearUsuario(newUser);

Assessment.createAssessment = createAssessment;
Assessment.getAssesmentAsync = getAssesmentAsync;

module.exports = Assessment;