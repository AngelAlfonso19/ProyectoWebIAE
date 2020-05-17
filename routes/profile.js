const router = require("express").Router()
const User = require("../db/User")
const key = require('../config_files')
const midAuth = require('../middlewares/midAuth')

router.get('/',midAuth.checkToken,midAuth.validateRol,async (req,res) => {
    console.log('Entering PROFILE');
    // console.log(token);
    let doc;
    try{
        doc = await User.SearchbyeMail(req.params.email)
        console.log(doc);
        res.send(doc)
    }catch(err){({ERROR: err})}
})


module.exports = router;