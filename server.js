const express = require("express");
const usersRouter = require("./routes/users");
const assignmentRouter = require("./routes/assignment")
const evaluacionRouter = require('./routes/evaluaciones')
var bodyParser = require('body-parser')
const app = express()
const port = 3000;
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());
app.use('/api/users', usersRouter);
app.use("/",express.static(__dirname+"/public/home"))
app.use("/users",express.static(__dirname+"public/css"))
app.use("/users",express.static(__dirname+"/public/users"))
//Assigment part
app.use('/api/assignment', assignmentRouter)
app.use("/assignment",express.static(__dirname+"/public/assignment"))
//app.use("/assignment",express.static(__dirname+"/public/css"))
//Evaluaciones window
app.use('/api/evaluaciones', evaluacionRouter)
app.use("/evaluaciones",express.static(__dirname+"/public/evaluaciones"))

app.listen(port, function(){
    console.log(`Listening http://localhost:${port}`);
});