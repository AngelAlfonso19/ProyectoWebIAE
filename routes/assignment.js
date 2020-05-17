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

router.get('/:subjectID', async (req, res)=> {
    console.log(req.params.SubjectID);
    try{
        let docs = await Assignment.findOne({subjectID: req.params.subjectID});
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

router.delete('/:subjectID', async (req, res) =>{
    console.log("Entra a delete /api/deletesubject");
    try{
        const removeSubject = await Assignment.remove({subjectID: req.params.subjectID});
        console.log(removeSubject);
        res.json(removeSubject)
        res.status(201)
    }catch(err){
        res.status(404).send({message: err})
    }
})

router.patch('/:subjectID', async (req, res) =>{
    console.log("Entra patch");
    try{
        const updatedPost = await Assignment.updatedPost({subjectID: req.params.subjectID},
             {$set:{
                subjectName: req.body.subjectName,
                availableTime: req.body.availableTime,
                teacherID: req.body.teacherID
             }})
             console.log(updatedPost);
             res.json(updatedPost)
    }catch(err){
        res.status(404).send({message: err})
    }
})


module.exports = router;