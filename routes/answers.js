const Answer = require('../db/Answer')
const router = require('express').Router()


router.get('/', async (req, res)=> {
    console.log("Entra a get /api/answers");
    try{
        let docs = await Answer.showAnswers();
        console.log(docs);
        res.json(docs);
    }catch(error){
        console.log("error", error)
    }
})

module.exports = router;