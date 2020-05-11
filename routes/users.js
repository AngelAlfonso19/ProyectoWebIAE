const router = require("express").Router()
const User = require("../db/User")


router.get('/', async (req, res)=> {
    console.log("Entra a get /api/users");
    let docs = await User.getUsersAsync();
    console.log(docs);
    res.json(docs);
})

module.exports = router;