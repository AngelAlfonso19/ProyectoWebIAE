const mongoose = require('./mongodb-connect'); 

let assessmentSchema = mongoose.Schema({
    assessmentID:{
        type: String,
        required: true
    },
    subjectID:{
        type: String,
        required: true
    },
    pollID:{
        type: String,
        required: true
   },
   assessmentDate:{
        type: Date,
        required: true
    },
    assessmentResult:{
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

async function getAssesmentAsyncByID(AssessmentID){
    let docs = [];
    try{
        docs = await Assessment.findOne({AssessmentID});
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
Assessment.createAssessment = getAssesmentAsyncByID;

module.exports = Assessment;