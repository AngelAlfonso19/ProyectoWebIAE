const IAE = require('../db/IAEdb')
const router = require('express').Router()
const midAuth = require('../middlewares/midAuth')

router.get('/', async (req, res)=> {
  try{
      console.log("Entro al get");
      const docs = await IAE.find();
      console.log(docs);
      res.json(docs)
  }catch(error){
      console.log("error", error)
  }
})

router.post('/', async (req, res)=> {
    console.log("Entra a post /api/assignments");
    console.log(req.body);
   try{
      let savedIAE = await IAE.createIae(req.body);
      res.status(201).send(savedIAE)
   }catch(err){
      res.status(404).send({message: err})
   }   
} )

router.delete('/:pollID', async (req, res) =>{
    console.log("Entra a delete /api/deleteiae");
    try{
        const removeIAE = await IAE.remove({pollID: req.params.pollID});
        res.json(removeIAE)
        res.status(201)
    }catch(err){
        res.status(404).send({message: err})
    }
})

module.exports = router;