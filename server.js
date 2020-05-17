const express = require("express");
const usersRouter = require("./routes/users");
const assessmentRouter = require("./routes/assessmentDetail")
const assignmentRouter = require("./routes/assignment")
const evalRouter = require("./routes/evaluaciones")
const answerstRouter = require('./routes/answers')
const profileRouter = require('./routes/profile')
const specUserInfo = require('./routes/userProfile')
const IAERouter = require('./routes/iae')
var bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser')

const app = express()
const port = 3000;

app.use(bodyParser.json())
// app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
extended:true
}));

// API
app.use('/api/profile', profileRouter)
app.use('/api/iae', IAERouter)
app.use('/api/users', usersRouter);
app.use('/api/assignment', assignmentRouter)
app.use('/api/evaluaciones', evalRouter)
app.use('/api/assessmentDetail', assessmentRouter);
app.use('/api/answers', answerstRouter)
app.use('/api/userProfile', specUserInfo)


//Home & profiles

//Home-Profile
app.use("/",express.static(__dirname+"/public/profile"))
app.use("/userProfile",express.static(__dirname+"/public/userProfile"))

//Login
app.use("/login",express.static(__dirname+"/public/login"))

//IAE
app.use("/IAE", express.static(__dirname+"/public/IAE"))

//IAEDetails
app.use("/IAEDetail",express.static(__dirname+"/public/css"))
app.use("/IAEDetail", express.static(__dirname+"/public/IAEDetail"))

//Users
app.use("/users",express.static(__dirname+"/public/css"))
app.use("/users",express.static(__dirname+"/public/users"))

//Assigments
// app.use('/api/assignment', assignmentRouter)
app.use("/assignment",express.static(__dirname+"/public/css"))
app.use("/assignment",express.static(__dirname+"/public/assignment"))

//Evaluaciones
app.use("/evaluaciones",express.static(__dirname+"/public/evaluaciones"))

//AssessmentsDetail
app.use("/assessmentDetail",express.static(__dirname+"/public/css"))
app.use("/assessmentDetail",express.static(__dirname+"/public/assessmentDetail"))

//profiles
// app.use("/profile",express.static(__dirname+"/public/profile"))

app.listen(port, function(){
    console.log(`Listening http://localhost:${port}`);
});