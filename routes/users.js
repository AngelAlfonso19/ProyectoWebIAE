const router = require("express").Router()
const bcrypt = require('bcrypt')
const User = require("../db/User")
const key = require('../config_files')
const midAuth = require('../middlewares/midAuth')
const jwt = require('jsonwebtoken')

router.get('/',midAuth.checkToken, midAuth.validateRol, async (req, res)=> {
    console.log("Entra a get /api/users");
    console.log(req.query);
    console.log("usuario logueado", req.correo);
    try{
        let docs = await User.getUsuariosSAFE();
        res.send(docs);
    }catch(err){
        res.send({err})
    }
    // let tute = await User.getUsersAsync();
    // console.log(tute);
})




router.get('/:email'/*, validar_lg*/, async (req,res) =>{
    console.log('searchUser');
    try{
        let doc = await User.SearchbyeMail(req.params.email)
        console.log(doc);
    }catch(err){ERROR: err}
       
})



router.post('/login', async (req,res)=>{
    console.log('Login');
    try{
        let doc = await User.SearchbyeMail(req.body.email)
        console.log(doc);
        let dPass = doc.password
        let rPass = req.body.password
        if(bcrypt.compareSync(rPass,dPass)){
            let token = jwt.sign({email: doc.email, name: doc.name, lastName: doc.lastName, typo: doc.typo},`${key.tokenPass}`,{expiresIn: '1h' })
            // res.cookie('token', token);
            res.json({token});
            // res.redirect('/profile');
        }else{
            res.status(401).send({Error: 'Verifique usuario y contraseña. ErrInfo: ',})
        }
    }catch(err){console.log(err)
    }
})



router.post('/', async(req,res)=>{
    console.log('Will POST');
    let skip = 0
    let doc = await User.SearchbyeMail(req.body.email)
    if (doc){
        res.status(400).send({error: "Ya existe un usario registrado con ese eMail"})
    }else{
        try{    
            console.log(req.body);
            let userData = req.body
            let usr = await User.createUser(userData)
            console.log(usr);
            res.status(201).send(usr);
        }catch(err){
            console.log(req.body);
            res.status(400).send({error: err})
        }
    }
})

router.put('/:email',midAuth.checkToken,midAuth.validateRol, async (req,res) => {
    if(req.params.email == req.body.img){
        let doc;
        try{
            doc = await User.SearchbyeMail(req.params.email);
            if(doc){
                await doc.updateUser(req.body);
                res.send();
            }
        }catch(err){
            res.status(400).send({error: "No se encontró usuario"})
        }
    }else{
        res.status(400).send({error: "No se puede cambiar el correo"})
    }
})




// function validar(req,res,next) {
//     // let {username, name, lastName, email, password, collegeMajor,typo } = req.body;
//     // let skk = {username, name, lastName, email, password, collegeMajor,typo } 
//     let Req = req.body;
//     if(Req.email  ){
//         console.log(req.body);
//         next()
//         return;
//     }else{
//         res.status(400).send({error: "Falta información"});
//     }
// }

// function validar_lg(req,res,next) {
//     console.log(req.params);
//     if(req.params){
//         next()
//         return;
//     }else{
//     res.status(400).send({error: "Falta info"});
//     }
// }

// router.validar = validar;
// router.validar_lg = validar_lg;

module.exports = router;