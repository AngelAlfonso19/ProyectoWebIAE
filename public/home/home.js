const User = require('../../db/User');
const btnn =  document.getElementById('logInButton');
const usr_lg = document.querySelector('#usuarioLogIn').value;
const pass_lg = document.querySelector('#usuarioPass').value;
const forma = document.getElementById('Registro');
const now = new Date();
const but = document.getElementById('guardarRegistro');
let skel = {username: "", name: "",lastName: "",email: "",password: "",collegeMajor:"",token:"",typo: Number};


console.log(btnn);

btnn.addEventListener("click", function () {
   console.log(btnn);
   User.getUserAsync(usr_lg);
   console.log(docs);
}