const Assignment = require('../db/AssignmentsDB')
const router = require('express').Router()

router.get('/', async (req, res)=> {
  try{
      const docs = await Assignment.find();
      res.json(docs)
  }catch(error){
      console.log("error", error)
  }
})

router.post('/', async (req, res)=> {
    console.log("Entra a post /api/assignments");
    console.log(req.body);
   try{
      let savedAssignment = await Assignment.createAssignment(req.body);
      res.status(201).send(savedAssignment)
   }catch(err){
      res.status(404).send({message: err})
   }   
} )

module.exports = router;