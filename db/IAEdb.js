const mongoose = require('./mongodb-connect')

let IAESchema = mongoose.Schema({
    pollID:{
        type: String,
        required: true
    },
    subjectID:{
        type: Number,
        required: true
    },
    pollDate:{
        type: Date
    }
})

function createIae(iae){
    let iaeMongo = IAE(iae);
    iaeMongo.save()
    .then((resp)=> console.log(resp))
    .catch((err)=> console.log("Ocurrió un error", err))    
}

IAESchema.statics.deleteIAE = (id) => {
    return IAE.findByIdAndRemove(id);
}

IAESchema.statics.retrieveIAE = (pollID) => {
    return IAE.findOne({pollID})
}

let IAE = mongoose.model('iaes', IAESchema);
IAE.createIae = createIae;

module.exports = IAE