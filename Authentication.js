const btn = document.querySelector('input[value="Login"]');
const form = document.querySelector('form.login-form');
let skel = {name: "", lastname: "",email: "",password: ""};


btn.addEventListener("click",(e) =>{
    auth();
})

function auth(){
    const xhr = new XMLHttpRequest()
    skel.email = document.getElementById('usuarioLogIn').value;
    skel.password = document.getElementById('usuarioPass').value
    let corr = skel.email
    xhr.open('GET',`http://localhost:3000/usuarios`)
    xhr.setRequestHeader("Content-Type","application/json")
    // xhr.setRequestHeader("charset","utf-8")
    console.log(JSON.stringify(skel));
    xhr.send(JSON.stringify(skel));
    xhr.onload = ()=>{
        if(xhr.status != 200){
            alert(`${xhr.status} Error:  ${xhr.statusText}`);
        }else{
            console.log('El request fue exitoso');
            const jsn = JSON.parse(xhr.responseText);
            let jsn2 = jsn[0];
            if (jsn2.email == corr  && jsn2.password == skel.password){
                console.log(`Este es BD: ${jsn2.email}\n Este es Ingreso: ${corr}`)
                window.location.href = './profile.html';
            }else{
                alert('ERROR! Usuario o contraseña incorrectos')
            }
        }
    }


}