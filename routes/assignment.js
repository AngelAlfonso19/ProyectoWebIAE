const Assignment = require('../db/AssignmentsDB')
const User = require('../db/AssignmentsDB')
const router = require('express').Router()

router.get('/', async (req, res)=> {
  try{
      const docs = await Assignment.find();
      res.json(docs)
  }catch(error){
      console.log("error", error)
  }
})

router.get('/:SubjectID', async (req, res)=> {
    console.log("Entra a get /api/assignments/:SubjectID");
    try{
        let docs = await Assignment.SearchByID(req.params.SubjectID);
        res.json(docs);
        console.log(docs);
    }catch(error){
        console.log("error", error);
    }
})

router.post('/', async (req, res)=> {
    console.log("Entra a post /api/assignments");
    console.log(req.body);
   try{
      let savedAssignment = await Assignment.createAssignment(req.body);
      res.status(201).send(savedAssignment);
   }catch(err){
      res.status(404).send({message: err})
   }   
} )

router.get('/api/users', async (req, res)=> {
  try{
      const docs = await User.getTeachers();
      console.log(docs);
      res.json(docs)
  }catch(error){
      console.log("error", error)
  }
})

module.exports = router;