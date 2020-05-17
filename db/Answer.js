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
        type: Object,
        required: true
   },
   q2:{
        type: Object,
        required: true
    },
    q3:{
        type: Object,
        required: true
    },
    q4:{
        type: Object,
        required: true
    },
    q5:{
        type: Object,
        required: true
    },
    q6:{
        type: Object,
        required: true
    },
    q7:{
        type: Object,
        required: true
    },
    q8:{
        type: Object,
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

let Answer = mongoose.model('answers', answerSchema);


Answer.getAnswerAsync = getAnswerAsync;

module.exports = Answer;