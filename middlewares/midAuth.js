const jwt = require('jsonwebtoken');
const key = require('../config_files')
const User = require('../db/User')


function checkToken(req,res,next){
    console.log('VERIFICANDO TOKEN' + "\n" + req.headers.cookie);
    const cookie = req.headers.cookie
    console.log(cookie);
    let token = cookie.substring(6,cookie.length)
    console.log(token);
    if(token!="" || token != undefined || token == "undefined"){
        jwt.verify(token,`${key.tokenPass}`,function(err, payload){
            if(err){
                res.status(401).send({error: "token invalido: ", err})
            }else{
                console.log(payload);
                req.email = payload.email;
                req.name = payload.name;
                req.lastName = payload.lastName;
                req.typo = payload.typo
                req.img = payload.img;
                next();
            }
        } )
    }else{
        res.status(401).send({error: "Not Authenticated"});
    }
}

async function validateRol (req,res,next){
    const img = req.img
    console.log(req.body);
    const email = req.email;
    req.params.email = email;
    try{
        // const user =  await User.searchbyeMail(req.params.email)
        const user = await User.SearchbyeMail(req.params.email)
        if(user && (user.typo == 0 ))
        {
            next()
        }else{
            res.send(req.body)
        }
    }catch(err){
        res.status(401).send({error: 'No está autorizado'})
    }
    
}
async function profileRol (req,res,next){
    const email = req.email;
    req.params.email = email;
    try{
        // const user =  await User.searchbyeMail(req.params.email)
        const user = await User.SearchbyeMail(req.params.email)
        if(user)
        {
            next()
        }else{
            res.send(req.body)
        }
    }catch(err){
        res.status(401).send({error: 'No está autorizado'})
    }
    
}





module.exports = {checkToken, validateRol, profileRol};