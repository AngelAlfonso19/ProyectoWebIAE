const router = require('express').Router()
const User = require("../db/User")
const key = require('../config_files')
const midAuth = require('../middlewares/midAuth')


router.get('/', midAuth.getUserInfoo, async (req, res) =>{
    console.log('EnterSpecifi user INfo');
    let doc;
    try{
        doc = await User.SearchbyUN(req.params.username)
        console.log(' esto se manda: ',doc);
        res.send(doc)
    }catch(err){({ERROR: err})}
})

module.exports = router;