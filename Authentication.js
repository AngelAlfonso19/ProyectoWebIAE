const btn = document.querySelector('button.nav-link');
const form = document.querySelector('form.login-form');
let skel = {name: "", lastname: "",email: "",password: ""};

function auth(){
    const xhr = new XMLHttpRequest()
    skel.email = document.querySelector('input[placeholder="username"]');
    skel.password = document.querySelector('input[placeholder="password"]');
    let corr = skel.email.value
    // console.log(corr+" y "+skel.password.value);
    console.log(skel.password.value);
    xhr.open('GET',`http://localhost:3000/users?email=${corr}`)
    // xhr.open('GET',`http://localhost:3000/users`)
    xhr.setRequestHeader("Content-Type","application/json")
    xhr.setRequestHeader("charset","utf-8")
    xhr.send(JSON.stringify(skel));
    xhr.onload = ()=>{
        if(xhr.status != 200){
            alert(`${xhr.status} Fallo registro de obtener ${JSON.stringify(form)}`);
        }else{
            console.log('esto esta funcionando\n'+xhr.responseText);
            const jsn = JSON.parse(xhr.responseText);
            let jsn2 = jsn[0];
            console.log(jsn2.email);
            if (jsn2.email == corr  && jsn2.password == skel.password.value){console.log(`Este es BD: ${jsn2.email}\n Este es Ingreso: ${corr}`)};
        }
    }


}

btn.addEventListener('click',auth())
