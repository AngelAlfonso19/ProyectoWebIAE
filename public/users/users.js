const bat = document.getElementById('studentsTable').children
let xhr = new XMLHttpRequest();
xhr.open('GET', '/api/users')
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Content-Type", "text/html");
xhr.send();
xhr.onload = () =>{
    if(xhr.status != 200){
        alert(`${xhr.status} Fallo registro de obtener`)
    }
    else{
        let users = JSON.parse(xhr.responseText);

        let data1 = users.filter(usr =>usr.typo == 4)
        console.log(data1);
        userListToHTML1(data1);
        let data2 = users.filter(usr =>usr.typo == 3)
        userListToHTML2(data2);
        let data3 = users.filter(usr =>usr.typo == 2)
        userListToHTML3(data3);
        let data4 = users.filter(usr =>usr.typo == 1)
        userListToHTML4(data4);
    
        buttonsP();
    }
}


function userListToHTML1(userList){
    document.getElementById("studentsTable").innerHTML = userList.map(u => userToHTML(u)).join('')
}
function userListToHTML2(userList){
    document.getElementById("teachertable").innerHTML = userList.map(u => userToHTML(u)).join('')
}
function userListToHTML3(userList){
    document.getElementById("coordinatortable").innerHTML = userList.map(u => userToHTML(u)).join('')
}
function userListToHTML4(userList){
    document.getElementById("unitcoordinatortable").innerHTML = userList.map(u => userToHTML(u)).join('')
}

function userToHTML(user){
    return `                                                        
    <tr id="${user.username}" >
        <td> 
            <div class="container-fluid">
                <div class="row">
                    <div class="col-6 d-flex justify-content-center">
                        <img class="img-circle" id="tableProfilePhoto" src="${user.img}" alt="userProfilePhoto.jpg">
                    </div>
                    <div class="col-6 d-flex justify-content-center">
                        <p  class="userName">${user.name} ${user.lastName}</p>
                    </div>
                </div>
            </div>                                            
        </td>

        <td> 
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 mt-3 d-flex justify-content-center">
                        <p class="userName">${user.email}</p>
                    </div>
                </div>
            </div>                                
        </td>

        <td> 
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 mt-3 d-flex justify-content-center">
                        <p class="userName">${user.department}</p>
                    </div>
                </div>
            </div>                     
        </td>                        
    </tr>`;
}


function buttonsP (){
    for(let i =0 ; i<bat.length;i++){
        console.log(`btn ${i} listo:  ${bat[i]}`);
        bat[i].addEventListener('click',()=>{
            localStorage.setItem('username', bat[i].id)
            console.log(bat[i].id);
            toView('userProfile','userProfile')
        })
    }
}

function toView(link, view){
    xhrr.open('GET', `/${link}`)
    xhrr.send()
    xhrr.onload = ()=>{
        // localStorage.setItem('username', this.id)
        window.location.replace(`../${view}`)
    }
}


let form = document.querySelector('#usuario')
let invalid = document.querySelectorAll('input:invalid')
let butreg = document.querySelector('#CrearUsuario')

form.addEventListener("change", () =>{
    let invalid = document.querySelectorAll('input:invalid');
    console.log(invalid);
   if (invalid.length<3){
        butreg.disabled = false;
    }
    else if ( invalid.length >2){
        butreg.disabled = true;
    }
    
    
});

function makeid() {
  var result           = '';
  var characters       = '0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < 8; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * 10));
  }
  return result;
}
function makeid2() {
    var result           = '';
    var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 15; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * 10));
    }
    return result;
  }


butreg.addEventListener("click", function(event) {
    event.preventDefault();
    let data = document.querySelectorAll('input')
    let typo = Number(data[2].value);
  
    let cdata =   {
            "userID": makeid(),
            "name": data[0].value,
            "lastName": data[1].value,
            "typo":  typo,
            "email": data[3].value,
            "password": data[4].value,
            "username": `${makeid()}`,
            "allowLessons": true,
            "token": makeid2(),
            "img": ""
    }
    
    let reguser = JSON.stringify(cdata)
    sendregister(reguser)
  
})

function sendregister(datos){
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/users')
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(datos)
    xhr.onload = ()=>{
        if(xhr.status != 201){
            alert(`${xhr.status} Fallo registro`)
        }
        else{
            alert("La asignatura fue registrada")
        }
    }
}
