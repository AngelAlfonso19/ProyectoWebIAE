const btn = document.querySelector('input[value="Login"]');
const forma = document.getElementById('Registro');
const now = new Date(0);
const but = document.getElementById('guardarRegistro');
let skel = {nombre: "", apellido: "",email: "",password: "",rol:"",token:"",id: Number};

// forma.addEventListener("change", () => {
//    let invalid = document.querySelectorAll('input[style]');
//    console.log(invalid);

//    console.log(invalid);
    
// });





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
console.log(forma);
function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}


but.addEventListener("click", () => {
    let esk = {nombre: "", apellido: "",email: "",password: "",rol:"",token:"",fecha:""};

    let nom=["nombre","apellido","email","password","rol","token","fecha"];
    for (let i in nom){
        let e = `esk.${nom[i]}=document.querySelector('#${nom[i]}').value;`;
        if(i==4){esk.rol="alumno"}
        else if(i==5){
            esk.token= makeid(18);
            // console.log(nom[i]); // for debbugging
        }
        else if(i==6){
            
            esk.fecha=now;
        }
        else{
            eval(e);
        }
        //return esk;
    }
    sendData(esk);
    
    $('#registro').modal('hide');
    // alert('Tu usario ha sido agregado correctamente');
    // console.log(esk);// debbug




    let successAlert=document.createElement('div');
    successAlert.setAttribute("class", "alert alert-success");
    successAlert.setAttribute("id", "hideMe");
    let pointer = document.querySelector('div.jumbotron');
    pointer.prepend(successAlert);
    successAlert.innerHTML = "Tu ususario ha sido agregado correctamente!";
    alertTimeout(5000);

} )


function alertTimeout(wait){
    setTimeout(function(){
        // $('#hideMe').children('.alert:first-child').remove();
        $('#hideMe').remove();
    }, wait);
}

//send DATA
function sendData(jsonResp){
    const xhr = new XMLHttpRequest();

    // xhr.addEventListener("load", (e) => {alert( event.target.responseText );})
    xhr.addEventListener("error", ()=>{alert('Oops! Something went wrong.');})
    xhr.open("POST", "http://localhost:3000/usuarios");
    xhr.setRequestHeader('Content-Type','application/json');
    // xhr.setRequestHeader('x-auth', `${localStorage.token}`);
    
    xhr.send(JSON.stringify(jsonResp));

    
    xhr.onload = (e) =>{
            // alert(e.target.responseText);  //debug
            let TOK = JSON.parse(xhr.responseText);
            if(xhr.status != 201 || TOK.token.value == ""){
                console.log('Ha ocurrido un error. \nERROR: ' + e.target.responseText );
            alert (e.target.responseText);
            }else if(TOK.token.value !=""){
                console.log('REGISTRADO!');
                window.location.href = './profile.html';
                
        }else{
            if(xhr.status != 201){console.log('Ha ocurrido un error desconocido : ' + xhr.response);}
        }
    }
}
