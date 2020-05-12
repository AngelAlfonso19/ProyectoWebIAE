const express = require("express");
const usersRouter = require("./routes/users");

const app = express()
const port = 3000;

app.use(express.json());
app.use('/api/users', usersRouter);
app.use("/",express.static(__dirname+"/public/home"))
app.use("/users",express.static(__dirname+"public/css"))
app.use("/users",express.static(__dirname+"/public/users"))
app.use("/home",express.static(__dirname+"/public/home"))


app.listen(port, function(){
    console.log(`Listening http://localhost:${port}`);
});