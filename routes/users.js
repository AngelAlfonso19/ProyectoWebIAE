const router = require("express").Router()
const User = require("../db/User")
let lg = {}

router.get('/', async (req, res)=> {

    console.log("Entra a get /api/users");
    try{
        let docs = await User.getUsuariosSAFE();
        res.send(docs);
        lg = docs
    }catch(err){
        res.send({err})
    }
    // let tute = await User.getUsersAsync();
    // console.log(tute);
})

router.get('/:email', validar_lg, async (req,res) =>{
    console.log('searchUser');
    try{
        let doc = await User.SearchbyeMail(req.params.email)
        res.send(doc);
    }catch(err){err};
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

function validar_lg(req,res,next) {
    if(req.body){
        console.log(req.body);
        next()
        return;
    }else{
    res.status(400).send({error: "Falta info"});
    }
}

router.validar = validar;
router.validar_lg = validar_lg;

module.exports = router;