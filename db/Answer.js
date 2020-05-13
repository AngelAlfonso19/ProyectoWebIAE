const mongoose = require('./mongodb-connect'); 

let answerSchema = mongoose.Schema({
    answerID:{
        type: String,
        required: true
    },
    pollID:{
        type: String,
        required: true
    },
    q1:{
        type: Number,
        required: true
   },
   q2:{
        type: Number,
        required: true
    },
    q3:{
        type: Number,
        required: true
    },
    q4:{
        type: Number,
        required: true
    },
    q5:{
        type: Number,
        required: true
    },
    q6:{
        type: String,
        required: true
    },
    q7:{
        type: String,
        required: true
    },
    q8:{
        type: String,
        required: true
    }
})

async function getAnswerAsync(){
    let docs = [];
    try{
        docs = await Answer.find({});
        console.log(docs); 
    }catch(error){
        console.log("error", error)
    }
    return docs;
}

answerSchema.statics.showAnswers = ()=>{
    return Answer.find({})
}

let Answer = mongoose.model('IAEAnswers', answerSchema);


Answer.getAnswerAsync = getAnswerAsync;

module.exports = Answer;