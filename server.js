const express = require("express");
const usersRouter = require("./routes/users");
const assessmentRouter = require("./routes/assessmentDetail")
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

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
extended:true
}));

// API
app.use('/api/users', usersRouter);
app.use('/api/assessmentDetail', assessmentRouter);
app.use('/api/assignment', assignmentRouter)

//Home
app.use("/",express.static(__dirname+"/public/home"))

//Users
app.use("/users",express.static(__dirname+"/public/css"))
app.use("/users",express.static(__dirname+"/public/users"))

//Assessments
app.use("/assessmentDetail",express.static(__dirname+"/public/css"))
app.use("/assessmentDetail",express.static(__dirname+"/public/assessmentDetail"))

//Assigment part
app.use("/assignment",express.static(__dirname+"/public/css"))
app.use("/assignment",express.static(__dirname+"/public/assignment"))

//Evaluaciones window
app.use('/api/evaluaciones', evaluacionRouter)
app.use("/evaluaciones",express.static(__dirname+"/public/evaluaciones"))

app.listen(port, function(){
    console.log(`Listening http://localhost:${port}`);
});