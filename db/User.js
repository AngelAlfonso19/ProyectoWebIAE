const mongoose = require('./mongodb-connect'); 
const bcrypt = require('bcrypt');

let userSchema = mongoose.Schema({
    userID:{
        type: Number,
        required: true,
        unique: true,
        default: function () 
        {
            var result  = '';
            var characters = '0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < 8; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }
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
        required: function () {
            return this.typo > 3;
        },
        enum: ['ISI', 'ISC'],
        default: 'ISC'
    },
    department:{
        type: String,
        required: true,
        enum: ['DESI'],
        default: 'DESI'
    },
    registerDate:{
        type: Date,
        required: true,
        default: Date.now
    },
    typo:{
        type: Number,
        required: true,
        default: 4,
        min: 0,
        max: 4
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
    },
    img: {
        type: String,
        default: function (){
            let rand = `https://randomuser.me/api/portraits/men/${this.userID%100}.jpg`
            return rand;
        }
    }
})

userSchema.statics.getUsuariosSAFE = () => {
        return User.find({},{_id:0, userID: 1, username: 1, name: 1,lastName: 1, img:1,email: 1,collegeMajor: 1, typo:1})
}

userSchema.statics.SearchbyeMail = (email) =>{
    return User.findOne({email},{name:1, email: 1, username:1,password:1,lastName:1,token: 1, img:1, typo: 1})
}
userSchema.statics.SearchbyUN = (username) =>{
    return User.findOne({username},{name:1, email: 1, username:1,password:1,lastName:1,token: 1, img:1, typo: 1})
}

userSchema.statics.createUser = (userData) =>{
    console.log(userData.password);
    userData.password = bcrypt.hashSync(userData.password, 8);
    console.log(userData.password);
    let newUser = User(userData);
    return newUser.save()
}

// userSchema.statics.updateUser = (userData) => {
userSchema.methods.updateUser = function (userData){
    return  User.findOneAndUpdate(
        {_id:this._id},
        {$set:userData},
        {new:true}
        )
}

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
    let usertMongo = User(user);

    usertMongo.save()
    .then((resp)=> console.log(resp))
    .catch((err)=> console.log("Ocurrió un error", err))    
}
// function createUser(user){
//     let userMongo = User(user);
    
//     userMongo.save()
//     .then((resp)=> console.log(resp))
//     .catch((err)=> console.log("Ocurrió un error", err))    
// }



// let newUser = {userID: 4, username: "angelel_21", name:"Angel", lastName:"Alfonso", email:"is701211@iteso.mx", password:"12348ii75", collegeMajor:"ISI", department: "DESI"}
// crearUsuario(newUser);

// User.createUser = createUser;
User.getUsersAsync = getUsersAsync;
User.createUser = createUser;
// getUsersAsync();
// createUser(newUser);

module.exports = User;