const jwt = require('jsonwebtoken');
const key = require('../config_files')
const User = require('../db/User')

function checkToken(req,res,next){
    const token = req.get('x-auth');
    if(token){
        jwt.verify(token,`${key.tokenPass}`,function(err, payload){
            if(err){
                res.status(401).send({error: "token invalido: ", err})
            }else{
                console.log(payload);
                req.email = payload.email;
                next();
            }
        } )
    }else{
        res.status(401).send({error: "Not Authenticated"});
    }
}

async function validateRol (req,res,next){
    const email = req.email;
    req.params.email = email;
    try{
        // const user =  await User.searchbyeMail(req.params.email)
        const user = await User.SearchbyeMail(req.params.email)
        if(user && (user.typo == 0 )){next()}
    }catch(err){
        res.status(401).send({error: 'No está autorizado'})
    }
    
}


module.exports = {checkToken, validateRol};