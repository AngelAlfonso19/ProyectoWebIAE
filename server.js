const express = require("express");
const usersRouter = require("./routes/users");
const assessmentRouter = require("./routes/assessmentDetail")
var bodyParser = require('body-parser')

const app = express()
const port = 3000;


app.use(express.json());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
extended:true
}));

// app.use('/api/users', usersRouter);
app.use('/api/assessmentDetail', assessmentRouter);

app.use("/",express.static(__dirname+"/public/home"))

app.use("/users",express.static(__dirname+"/public/css"))
app.use("/users",express.static(__dirname+"/public/users"))

app.use("/assessmentDetail",express.static(__dirname+"/public/css"))
app.use("/assessmentDetail",express.static(__dirname+"/public/assessmentDetail"))


app.listen(port, function(){
    console.log(`Listening http://localhost:${port}`);
});