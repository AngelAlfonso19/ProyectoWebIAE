const btn = document.querySelector('input.logInButton');
const forma = document.getElementById('Registro');
const now = new Date();
const but = document.getElementById('guardarRegistro');
let skel = {username: "", name: "",lastName: "",email: "",password: "",collegeMajor:"",token:"",typo: Number};

// forma.addEventListener("change", () => {
//    let invalid = document.querySelectorAll('input[style]');
//    console.log(invalid);

//    console.log(invalid);
    
// });





btn.addEventListener("click",() =>{
    auth();
    

})


function auth(){
    const xhr = new XMLHttpRequest()
    skel.email = document.getElementById('usuarioLogIn').value;
    skel.password = document.getElementById('usuarioPass').value
    let corr = skel.email
    // xhr.open('GET',`http://localhost:3000/api/users/:email`)
    xhr.open('POST',`http://localhost:3000/api/users/login`)
    xhr.setRequestHeader("Content-Type","application/json")
    xhr.send(JSON.stringify(skel));
    xhr.onload = ()=>{
        if(xhr.status != 200){
            xhr.send(400).statusText('ERror!')
            // xhr.status(400).send('Error!')
           }
          else{
            console.log('El request fue exitoso');
            let jsn = JSON.parse(xhr.responseText);
            console.log(jsn.token);
            localStorage.setItem( "token",jsn.token)
            window.location.replace('../')
          } 
         }
        }
    
    //        let jsn2 = jsn[0];
    //        for(let i in jsn){
    //            if(`${jsn[i].email}` == skel.email){
    //                jsn2 = js;
    //            }
    //        }
    //        if (jsn2.email == corr  && jsn2.password == skel.password){
    //            console.log(`Este es BD: ${jsn2.email}\n Este es Ingreso: ${corr}`)
    //            window.location.href = './profile.html';
    //        }else{
    //            console.log(`Contraseñas: ${jsn2.password} y ${skel.password}`);;
    //            alert('ERROR! Usuario o contraseña incorrectos')
    //        }
    //    }
    // }


// }




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
    // let esk = {nombre: "", apellido: "",email: "",password: "",rol:"",token:"",fecha:""};
    let esk = {username: "", name: "",lastName: "",email: "",password: "",token:""};
    if(document.getElementById('password').value != document.getElementById('confirm').value){
        alert('Las contraseñas no coinciden');
        return;
    }
    // let nom=["username","name","lastName","email","password","collegeMajor","token","typo"];
    let nom=["username","name","lastName","email","password","token"];
    for (let i in nom){
        let e = `esk.${nom[i]}=document.querySelector('#${nom[i]}').value;`;
        // if(i==4){esk.rol="alumno"}
        if(i==5){
            esk.token= makeid(18);
            // console.log(nom[i]); // for debbugging
        }
        else{
            eval(e);
        }
        //return esk;
    }
    sendData(esk);
    // window.location.reload();
    
    // $('#registro').modal('hide');
    // // alert('Tu usario ha sido agregado correctamente');
    // // console.log(esk);// debbug



})
    // let successAlert=document.createElement('div');
    // successAlert.setAttribute("class", "alert alert-success");
    // successAlert.setAttribute("id", "hideMe");
    // let pointer = document.querySelector('div.jumbotron');
    // pointer.prepend(successAlert);
    // successAlert.innerHTML = "Tu ususario ha sido agregado correctamente!";
    // alertTimeout(5000);

// } )


function alertTimeout(wait){
    setTimeout(function(){
        // $('#hideMe').children('.alert:first-child').remove();
        $('#hideMe').remove();
    }, wait);
}

//send DATA
function sendData(jsonResp){
    const xhr = new XMLHttpRequest();

    // xhr.addEventListener("error", ()=>{alert('Oops! Something went wrong.');})
    xhr.open('POST', 'http://localhost:3000/api/users');
    xhr.setRequestHeader('Content-Type','application/json');
    // xhr.setRequestHeader('x-auth', `${localStorage.token}`);
    
    xhr.send(JSON.stringify(jsonResp));
    xhr.onload =()=>{
        window.location.reload();
    }

}    
//     xhr.onload = (e) =>{
//             // alert(e.target.responseText);  //debug
//             let TOK = JSON.parse(xhr.responseText);
//             if(xhr.status != 201 || TOK.token.value == ""){
//                 console.log('Ha ocurrido un error. \nERROR: ' + e.target.responseText );
//             alert (e.target.responseText);
//             }else if(TOK.token.value !=""){
//                 console.log('REGISTRADO!');
//                 window.location.href = './profile.html';
                
//         }else{
//             if(xhr.status != 201){console.log('Ha ocurrido un error desconocido : ' + xhr.response);}
//         }
//     }
// }

