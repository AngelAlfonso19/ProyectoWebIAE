const router = require("express").Router()
const User = require("../db/User")


router.get('/', async (req, res)=> {
    console.log("Entra a get /api/users");
    let docs = await User.getUsuariosSAFE()
    let tute = await User.getUsersAsync();
    console.log(tute);
    res.json(docs);
})

router.get('/:email', async (req,res) =>{
    let doc = await User.SearchbyeMail(req.params.email)
    res.send(doc);
})


router.post('/', validar, async(req,res)=>{
    let doc = await User.SearchbyeMail(req.body.email)
    if (doc){
        res.status(400).send({error: "Ya existe un usario registrado con ese eMail"})
    }else{
        try{    
            let usr = await User.createUser(req.body)
            res.status(201).send(usr)
        }catch(err){
            res.status(400).send({error: err})
        }
    }
})

function validar(req,res,next) {
    let {username, name, lastName, email, password, collegeMajor,typo } = req.body;
    if(typo < 4 && username&&name&&lastName&&email&&password){
        next()
        return;
    }else if((typo === undefined)&&username&&name&&lastName&&email&&password&&collegeMajor){
        next()
        return;
    }
    res.status(400).send({error: "Falta información"});
}

module.exports = router;