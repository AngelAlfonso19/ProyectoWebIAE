const jwt = require('jsonwebtoken');
const key = require('../config_files')
const User = require('../db/User')







function checkToken(req,res,next){
    console.log('VERIFICANDO TOKEN'); 
    const cookie = req.headers.cookie
    let token = cookie.substring(6,cookie.length)
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
                req.username = payload.username
                next();
            }
        } )
    }else{
        res.status(401).send({error: "Not Authenticated"});
    }
}

async function getUserInfoo(req,res,next){
    const un = req.headers.username
    console.log('Getting user info');
   console.log(un);
   req.params.username = un
   try{
    const user = await User.SearchbyUN(req.params.username)
    console.log(user);
    if(user){
        next();
    }
   }catch(err){
        res.status(401).send({ERROR: err})
   }

}

async function validateRol (req,res,next){
    console.log('VALIDATING ROL');
    const img = req.img
    const email = req.email;
    req.params.email = email;
    try{
        // const user =  await User.searchbyeMail(req.params.email)
        const user = await User.SearchbyeMail(req.params.email)
        if(user )//&&(user.typo == 0 ))
        {
            next()
        }else{
            res.send(req.body)
        }
    }catch(err){
        res.status(401).send({error: 'No está autorizado'})
    }
    
}
// async function profileRol (req,res,next){
//     const email = req.email;
//     req.params.email = email;
//     try{
//         // const user =  await User.searchbyeMail(req.params.email)
//         const user = await User.SearchbyeMail(req.params.email)
//         if(user)
//         {
//             next()
//         }else{
//             res.send(req.body)
//         }
//     }catch(err){
//         res.status(401).send({error: 'No está autorizado'})
//     }
    
// }





module.exports = {checkToken, validateRol, getUserInfoo}//, profileRol};