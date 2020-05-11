const mongoose = require('./mongodb-connect'); 

let userSchema = mongoose.Schema({
    userID:{
        type: Number,
        required: true,
        unique: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true,
        min : 3,
        max: 25
   },
   lastName:{
        type: String,
        required: true,
        min : 3,
        max: 25

    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: [8,'Password too short']
    },
    collegeMajor:{
        type: String,
        required: true,
        enum: ['ISI', 'ISC','isi','isc']
    },
    department:{
        type: String,
        required: true,
        enum: ['DESI']
    },
    registerDate:{
        type: Date,
        required: true,
        default: Date.now
    },
    type:{
        type: Number,
        required: true,
        default: 4
    },
    allowLessons:{
        type: Boolean,
        required: true,
        default: false

    },
    token:{
        type: String,
        required: true,
        default: "ChangeThis!"
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

let newUser = {userID: 4, username: "angelel_21", name:"Angel", lastName:"Alfonso", email:"is701211@iteso.mx", password:"12348ii75", collegeMajor:"ISI", department: "DESI"}
// crearUsuario(newUser);

User.createUser = createUser;
User.getUsersAsync = getUsersAsync;

// getUsersAsync();
createUser(newUser);

module.exports = User;