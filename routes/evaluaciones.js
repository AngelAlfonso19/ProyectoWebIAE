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


module.exports = router;