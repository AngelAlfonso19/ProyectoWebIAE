const express = require("express");
const usersRouter = require("./routes/users");

const app = express()
const port = 3000;

app.use(express.json());
app.use('/api/users', usersRouter);

app.listen(port, function(){
    console.log(`Listening http://localhost:${port}`);
});