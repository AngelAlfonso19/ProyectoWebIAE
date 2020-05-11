const mongoose = require('./mongodb-connect'); 

let userSchema = mongoose.Schema({
    userID:{
        type: Number,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
   },
   lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    collegeMajor:{
        type: String,
        required: true,
    },
    department:{
        type: String,
        required: true,
    },
    registerDate:{
        type: Date,
        required: true,
    },
    type:{
        type: Number,
        required: true,
    },
    allowLessons:{
        type: Boolean,
        required: true,
    },
    token:{
        type: String,
        required: true,
    }
})

let User = mongoose.model('users', userSchema);

// User.find({}, (err, docs)=>{
//     if(docs){
//         console.log(docs)
//     }

//     if(err){
//         console.log(err);
//     }
// })

async function getUsersAsync(){
    let docs = [];
    try{
        docs = await User.find({});
        console.log(docs); 
    }catch(error){
        console.log("error", error)
    }
    return docs;
}

function createUser(user){
    let userMongo = User(user);
    
    userMongo.save()
    .then((resp)=> console.log(resp))
    .catch((err)=> console.log("Ocurrió un error", err))    
}

//let newUser = {name:"Test", lastName:"Rmz", email:"is703804@iteso.mx", password:"1234", role:"Professor", collegeMajor:"Ing. en sistemas"}
// crearUsuario(newUser);

User.createUser = createUser;
User.getUsersAsync = getUsersAsync;

module.exports = User;