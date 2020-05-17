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

router.post('/', async (req, res)=> {
    console.log("Entra a post /api/answers");
    console.log(req.body);
   try{
      let savedAnswer = await Answer.createAnswer(req.body);
      res.status(201).send(savedAnswer);
   }catch(err){
      res.status(404).send({message: err})
   }   
} )

module.exports = router;