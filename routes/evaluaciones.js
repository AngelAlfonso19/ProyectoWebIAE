const router = require('express').Router()
const IAE = require("../db/IAEdb")
const key = require('../config_files')
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


module.exports = router;