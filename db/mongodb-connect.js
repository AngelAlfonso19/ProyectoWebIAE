let dbUser = "dbUser"
let password = "test"
let dbName = "ProjectData"
const mongoose = require("mongoose")
const dbUrl = `mongodb+srv://${dbUser}:${password}@proyectocluster-ulcrj.mongodb.net/${dbName}?retryWrites=true&w=majority`

mongoose.connect(dbUrl, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }).then(()=>{
    console.log("Conectado a la base de datos");
  }).catch((err)=>{
    console.log("error al abrir la base de datos", err);
})


module.exports = mongoose;